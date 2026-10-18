package team.sopa.boar.engine

/** Which localized text a failure shows (native.* keys): users never see raw exception text. */
object UserErrors {
    /** What ChatViewModel stores in ChatState.error when no answer model could be loaded. */
    const val NO_MODEL = "no-model"

    /** The line shown in place of a failed answer. */
    fun chatKey(error: String): String = if (error == NO_MODEL) "native.chat.errorNoModel" else "native.chat.errorGeneric"
}
