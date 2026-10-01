import CryptoKit
import DeviceCheck
import ExpoModulesCore

/// The key a shared evaluation run is signed with: an App Attest key in the Secure Enclave.
/// Apple's attestation tells the server the key belongs to this app on a real device; after
/// that each run carries an assertion over its payload. See supabase/functions/submit-results.
public class DeviceKeyModule: Module {
  private static let keyIdDefault = "boar.deviceKey.appAttestKeyId"

  public func definition() -> ModuleDefinition {
    Name("DeviceKey")

    Function("isSupported") {
      DCAppAttestService.shared.isSupported
    }

    Function("hasKey") {
      UserDefaults.standard.string(forKey: Self.keyIdDefault) != nil
    }

    /// A new key attested over SHA-256(challenge); returns its id and Apple's attestation.
    AsyncFunction("createKey") { (challenge: String) -> [String: Any] in
      let service = DCAppAttestService.shared
      guard service.isSupported else {
        throw Exception(name: "ERR_DEVICE_KEY", description: "App Attest isn't available on this device")
      }
      let keyId = try await service.generateKey()
      let clientDataHash = Data(SHA256.hash(data: Data(challenge.utf8)))
      let attestation = try await service.attestKey(keyId, clientDataHash: clientDataHash)
      UserDefaults.standard.set(keyId, forKey: Self.keyIdDefault)
      return ["keyId": keyId, "attestation": [attestation.base64EncodedString()]]
    }

    /// An assertion over SHA-256 of the UTF-8 bytes of data.
    AsyncFunction("sign") { (data: String) -> String in
      guard let keyId = UserDefaults.standard.string(forKey: Self.keyIdDefault) else {
        throw Exception(name: "ERR_DEVICE_KEY_MISSING", description: "No device key yet")
      }
      let clientDataHash = Data(SHA256.hash(data: Data(data.utf8)))
      let assertion = try await DCAppAttestService.shared.generateAssertion(keyId, clientDataHash: clientDataHash)
      return assertion.base64EncodedString()
    }

    Function("deleteKey") {
      // App Attest keys can't be deleted; forgetting the id makes the next share attest a new one.
      UserDefaults.standard.removeObject(forKey: Self.keyIdDefault)
    }
  }
}
