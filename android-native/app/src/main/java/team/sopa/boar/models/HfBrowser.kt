package team.sopa.boar.models

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.longOrNull
import team.sopa.boar.engine.models.AssetKind
import team.sopa.boar.engine.models.CatalogAsset
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder

/**
 * Searching Hugging Face for GGUF models beyond the curated catalog (src/services/modelBrowser.ts). One of the two
 * places BOAR uses the network, only when the user searches here; never during chat. Results aren't vetted: the
 * download is pinned to the commit that was listed, and checked against the LFS sha256 when Hugging Face gives one.
 */
object HfBrowser {
    private const val API = "https://huggingface.co/api"

    data class Repo(val id: String, val downloads: Long?, val likes: Long?)
    data class GgufFile(val filename: String, val sizeBytes: Long, val sha256: String?, val revision: String?)

    private fun get(url: String): String {
        val c = (URL(url).openConnection() as HttpURLConnection).apply { connectTimeout = 20_000; readTimeout = 30_000 }
        try {
            if (c.responseCode !in 200..299) error("Hugging Face answered ${c.responseCode}")
            return c.inputStream.bufferedReader().readText()
        } finally {
            c.disconnect()
        }
    }

    fun search(query: String, limit: Int = 15): List<Repo> {
        val q = URLEncoder.encode(query, "UTF-8")
        return Json.parseToJsonElement(get("$API/models?search=$q&filter=gguf&limit=$limit&sort=downloads&direction=-1")).jsonArray.map {
            val o = it.jsonObject
            Repo(o.str("id") ?: "", o.num("downloads"), o.num("likes"))
        }.filter { it.id.isNotEmpty() }
    }

    fun files(repoId: String): List<GgufFile> {
        val o = Json.parseToJsonElement(get("$API/models/$repoId?blobs=true")).jsonObject
        val revision = o.str("sha")?.takeIf { Regex("^[0-9a-f]{40}$").matches(it) }
        return (o["siblings"] as? JsonArray).orEmpty().map { it.jsonObject }
            .filter { it.str("rfilename")?.lowercase()?.endsWith(".gguf") == true }
            .map { GgufFile(it.str("rfilename")!!, it.num("size") ?: 0, (it["lfs"] as? JsonObject)?.str("oid"), revision) }
            .sortedBy { it.sizeBytes }
    }

    private fun slug(s: String) = s.lowercase().replace(Regex("[^a-z0-9]+"), "-").trim('-')

    /** toCatalogModel: the same id and file name as the Expo app, so a model added in either is the same file. */
    fun toAsset(repoId: String, f: GgufFile): CatalogAsset {
        val id = "hf-${slug(repoId)}-${slug(f.filename)}".take(120)
        return CatalogAsset(
            id = id, kind = AssetKind.LLM, label = f.filename.removeSuffix(".gguf").removeSuffix(".GGUF"),
            filename = "models/$id.gguf", sizeBytes = f.sizeBytes, sha256 = f.sha256 ?: "",
            sourceUrl = "https://huggingface.co/$repoId/resolve/${f.revision ?: "main"}/${f.filename}",
            license = "Unknown — check the model's Hugging Face page",
            description = "$repoId — added via model search, not vetted by aoair", required = false,
        )
    }

    private fun JsonObject.str(k: String) = (this[k] as? JsonPrimitive)?.contentOrNull
    private fun JsonObject.num(k: String) = (this[k] as? JsonPrimitive)?.longOrNull
}
