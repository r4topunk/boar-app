package team.sopa.boar

import android.content.Context
import android.content.res.Configuration
import android.os.Bundle
import androidx.activity.compose.BackHandler
import androidx.compose.runtime.saveable.rememberSaveable
import team.sopa.boar.engine.settings.AppSettings
import team.sopa.boar.ui.settings.DisplayPrefs
import team.sopa.boar.ui.settings.SettingsScreen
import team.sopa.boar.setup.SetupViewModel
import team.sopa.boar.models.ModelsViewModel
import team.sopa.boar.documents.DocumentsViewModel
import team.sopa.boar.ui.documents.DocumentsScreen
import team.sopa.boar.ui.about.AboutScreen
import team.sopa.boar.ui.drawer.BoarDrawer
import team.sopa.boar.ui.drawer.DrawerItem
import team.sopa.boar.ui.eval.EvaluationScreen
import team.sopa.boar.eval.EvaluationViewModel
import team.sopa.boar.ui.models.ModelsScreen
import team.sopa.boar.ui.setup.SetupScreen
import androidx.compose.runtime.DisposableEffect
import androidx.compose.ui.platform.LocalView
import java.io.File
import java.util.Locale
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.launch
import team.sopa.boar.app.BoarServices
import team.sopa.boar.chat.ChatViewModel
import team.sopa.boar.engine.chat.ChatSession
import team.sopa.boar.ui.chat.ChatScreen
import team.sopa.boar.ui.t
import team.sopa.boar.ui.theme.Boar
import team.sopa.boar.ui.theme.BoarTheme

/** The app: first-run setup until the required models are on disk, then the chat with past chats and settings in the drawer. */
class MainActivity : ComponentActivity() {
    /** The app language from settings ("en", "pt"), else the phone's. */
    override fun attachBaseContext(base: Context) {
        val lang = AppSettings(File(base.filesDir, "settings.json")).languageId
        if (lang == null) return super.attachBaseContext(base)
        val config = Configuration(base.resources.configuration).apply { setLocale(Locale.forLanguageTag(lang)) }
        super.attachBaseContext(base.createConfigurationContext(config))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        val services = BoarServices.get(this)
        setContent {
            var theme by remember { mutableStateOf(services.settings.themeId) }
            var fontScale by remember { mutableStateOf(services.settings.fontScale) }
            val prefs = object : DisplayPrefs {
                override fun setTheme(id: String) { theme = id }
                override fun setFontScale(scale: String) { fontScale = scale }
                override fun setLanguage(id: String?) { recreate() }
            }
            BoarTheme(theme, fontScale) {
                App(services, prefs)
            }
        }
    }
}

@Composable
private fun App(services: BoarServices, prefs: DisplayPrefs, vm: ChatViewModel = viewModel(), setup: SetupViewModel = viewModel()) {
    val state by vm.state.collectAsState()
    var screen by rememberSaveable { mutableStateOf(if (setup.ready()) "chat" else "setup") }
    if (screen == "setup") {
        val setupState by setup.state.collectAsState()
        // Downloads pause in the background on MIUI: the screen stays on while setup runs.
        val view = LocalView.current
        DisposableEffect(Unit) { view.keepScreenOn = true; onDispose { view.keepScreenOn = false } }
        BackHandler(setupState.step == 2) { setup.back() }
        SetupScreen(setupState, setup) { vm.refreshModel(); screen = "chat" }
        return
    }
    if (screen == "models") {
        val models: ModelsViewModel = viewModel()
        val modelsState by models.state.collectAsState()
        BackHandler { vm.refreshModel(); screen = "chat" }
        ModelsScreen(modelsState, models) { vm.refreshModel(); screen = "chat" }
        return
    }
    if (screen == "documents") {
        val docs: DocumentsViewModel = viewModel()
        val docsState by docs.state.collectAsState()
        BackHandler { screen = "chat" }
        DocumentsScreen(docsState, docs) { screen = "chat" }
        return
    }
    if (screen == "evaluation") {
        val eval: EvaluationViewModel = viewModel()
        val evalState by eval.state.collectAsState()
        // A run takes many minutes: the screen stays on, and back does nothing until it ends (as Done hides).
        val view = LocalView.current
        DisposableEffect(evalState.running) { view.keepScreenOn = evalState.running; onDispose { view.keepScreenOn = false } }
        BackHandler { if (!evalState.running) { vm.refreshModel(); screen = "chat" } }
        EvaluationScreen(evalState, eval, chatBusy = state.answeringId != null) { vm.refreshModel(); screen = "chat" }
        return
    }
    if (screen == "about") {
        BackHandler { screen = "chat" }
        AboutScreen { screen = "chat" }
        return
    }
    if (screen == "settings") {
        BackHandler { vm.refreshSettings(); screen = "chat" }
        SettingsScreen(services, prefs) { vm.refreshSettings(); screen = "chat" }
        return
    }
    val drawer = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    var sessions by remember { mutableStateOf<List<ChatSession>>(emptyList()) }
    LaunchedEffect(drawer.isOpen, state.answeringId) { if (drawer.isOpen) sessions = services.chats.listSessions() }
    ModalNavigationDrawer(
        drawerState = drawer,
        drawerContent = {
            ModalDrawerSheet(drawerContainerColor = Boar.colors.bgCardElevated, modifier = Modifier.width(310.dp)) {
                fun go(target: () -> Unit) { target(); scope.launch { drawer.close() } }
                BoarDrawer(
                    sessions = sessions,
                    activeSessionId = state.sessionId,
                    // ChatScreen.tsx's items; Evaluation stands in for Execution Telemetry (not in the native app yet),
                    // and the model catalog has its own entry (the Expo app reaches it through Settings).
                    items = listOf(
                        DrawerItem("knowledge", t("chatScreen.drawerItems.myDocuments")) { go { screen = "documents" } },
                        DrawerItem("models", t("modelCatalogScreen.title")) { go { screen = "models" } },
                        DrawerItem("settings", t("chatScreen.drawerItems.settings")) { go { screen = "settings" } },
                        DrawerItem("evaluation", t("evaluation.title")) { go { screen = "evaluation" } },
                        DrawerItem("about", t("chatScreen.drawerItems.about")) { go { screen = "about" } },
                    ),
                    lastTokPerSec = state.liveTokPerSec.takeIf { state.answeringId == null },
                    storageUsed = { services.storageUsedBytes() },
                    ramBudgetBytes = services.catalog.ramBudgetBytes,
                    storageBudgetBytes = services.catalog.storageBudgetBytes,
                    onNewChat = { go { vm.newChat() } },
                    onSelect = { id -> go { vm.openSession(id) } },
                    onDelete = { id -> vm.deleteSession(id); sessions = sessions.filter { it.id != id } },
                )
            }
        },
    ) {
        ChatScreen(
            state,
            onSend = vm::send,
            onStop = vm::stop,
            onNewChat = vm::newChat,
            onMenu = { scope.launch { drawer.open() } },
            onCycleTone = vm::cycleTone,
            onRate = vm::rate,
            onDismissCrash = vm::dismissLoadCrash,
            onReused = { vm.showToast("chatScreen.messageReused") },
            onToastHidden = vm::hideToast,
        )
    }
}
