package expo.modules.devicekey

import android.os.Build
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.security.KeyPairGenerator
import java.security.KeyStore
import java.security.PrivateKey
import java.security.Signature
import java.security.spec.ECGenParameterSpec

/**
 * The key a shared evaluation run is signed with. It is made inside the phone's secure hardware
 * (StrongBox when there is one, else the TEE) and can't be read out. Its attestation certificate
 * chain, signed by Google's attestation root, tells the server that the key lives in real
 * hardware and was made for this app, signed with BOAR's release key; the server checks that
 * once and then only the signatures. See supabase/functions/submit-results.
 */
class DeviceKeyModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("DeviceKey")

    Function("hasKey") {
      keyStore().containsAlias(ALIAS)
    }

    /** A new key whose attestation carries the server's challenge; returns the chain, leaf first. */
    AsyncFunction("createKey") { challenge: String ->
      val ks = keyStore()
      if (ks.containsAlias(ALIAS)) ks.deleteEntry(ALIAS)
      try {
        // StrongBox is missing on most phones (StrongBoxUnavailableException) and fails on some
        // that claim it (ProviderException): either way the TEE does the job.
        try {
          generate(challenge, strongBox = Build.VERSION.SDK_INT >= Build.VERSION_CODES.P)
        } catch (e: Exception) {
          if (ks.containsAlias(ALIAS)) ks.deleteEntry(ALIAS)
          generate(challenge, strongBox = false)
        }
      } catch (e: Exception) {
        throw CodedException("ERR_DEVICE_KEY", "Couldn't create a hardware key: ${e.message}", e)
      }
      val chain = ks.getCertificateChain(ALIAS)
        ?: throw CodedException("ERR_DEVICE_KEY", "The new key has no attestation chain", null)
      mapOf(
        "attestation" to chain.map { Base64.encodeToString(it.encoded, Base64.NO_WRAP) },
        "publicKey" to Base64.encodeToString(chain[0].publicKey.encoded, Base64.NO_WRAP)
      )
    }

    /** ECDSA P-256 / SHA-256 signature (DER) of the UTF-8 bytes of [data]. */
    AsyncFunction("sign") { data: String ->
      val key = keyStore().getKey(ALIAS, null) as? PrivateKey
        ?: throw CodedException("ERR_DEVICE_KEY_MISSING", "No device key yet", null)
      val signature = Signature.getInstance("SHA256withECDSA").run {
        initSign(key)
        update(data.toByteArray(Charsets.UTF_8))
        sign()
      }
      Base64.encodeToString(signature, Base64.NO_WRAP)
    }

    Function("deleteKey") {
      val ks = keyStore()
      if (ks.containsAlias(ALIAS)) ks.deleteEntry(ALIAS)
    }
  }

  private fun keyStore(): KeyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }

  private fun generate(challenge: String, strongBox: Boolean) {
    val spec = KeyGenParameterSpec.Builder(ALIAS, KeyProperties.PURPOSE_SIGN)
      .setAlgorithmParameterSpec(ECGenParameterSpec("secp256r1"))
      .setDigests(KeyProperties.DIGEST_SHA256)
      .setAttestationChallenge(challenge.toByteArray(Charsets.UTF_8))
      .apply { if (strongBox && Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) setIsStrongBoxBacked(true) }
      .build()
    KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_EC, "AndroidKeyStore").run {
      initialize(spec)
      generateKeyPair()
    }
  }

  companion object {
    private const val ALIAS = "boar-share-v1"
  }
}
