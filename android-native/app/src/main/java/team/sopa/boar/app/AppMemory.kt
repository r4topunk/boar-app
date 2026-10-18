package team.sopa.boar.app

import android.app.ActivityManager
import android.content.Context
import java.io.File

/** The memory BOAR holds right now, as the drawer and Settings show it. */
object AppMemory {
    /**
     * VmRSS: everything resident, the model's pages included. RssAnon alone (heap and KV cache) read about 70 MB with
     * the 4B loaded (X6, Oct 11): its weights are mapped from the file, so they count as file pages. Those can drop
     * when Android needs the room, so the number moves a little after a load; that is what the app really holds.
     */
    fun residentBytes(): Long = runCatching {
        File("/proc/self/status").readLines().first { it.startsWith("VmRSS:") }.split(Regex("\\s+"))[1].toLong() * 1024
    }.getOrDefault(0L)

    /** The phone's memory: its total and what is in use now (by BOAR and everything else), as Android reports it. */
    data class Phone(val totalBytes: Long, val usedBytes: Long)

    fun phone(context: Context): Phone = runCatching {
        val info = ActivityManager.MemoryInfo()
        (context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager).getMemoryInfo(info)
        Phone(info.totalMem, (info.totalMem - info.availMem).coerceAtLeast(0L))
    }.getOrDefault(Phone(0L, 0L))
}
