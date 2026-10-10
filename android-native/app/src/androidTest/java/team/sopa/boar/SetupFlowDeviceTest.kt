package team.sopa.boar

import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.createEmptyComposeRule
import androidx.test.core.app.ActivityScenario
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performSemanticsAction
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import org.junit.Assert.assertTrue
import org.junit.Assume.assumeTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import team.sopa.boar.app.BoarServices
import team.sopa.boar.ui.I18n

/**
 * The whole first run, on the throwaway devtest install (its files are emptied first): hardware, the 1.5B
 * model, the real download and indexing, launch, then the PIN offer and a PIN set through it. Needs Wi-Fi and about
 * 1 GB; it only runs on the devtest install.
 */
@RunWith(AndroidJUnit4::class)
class SetupFlowDeviceTest {
    @get:Rule val compose = createEmptyComposeRule()
    private val ctx = InstrumentationRegistry.getInstrumentation().targetContext
    private fun t(key: String) = I18n.t(ctx, key)

    private fun click(text: String, substring: Boolean = false) {
        val node = compose.onNode(hasText(text, substring = substring) and hasClickAction())
        node.performScrollTo()
        node.performSemanticsAction(SemanticsActions.OnClick)
        compose.waitForIdle()
    }

    private fun shows(text: String) = runCatching { compose.onNodeWithText(text).assertExists() }.isSuccess // false until a screen exists

    @Test fun firstRunEndsOnThePinOfferAndSetsAPin() {
        // A first run: this throwaway install's files are emptied before the app starts (nothing else in this process
        // has opened them yet), so setup begins from step 1.
        assumeTrue("only on the throwaway devtest install", ctx.packageName.endsWith(".devtest"))
        ctx.filesDir.listFiles().orEmpty().forEach { it.deleteRecursively() }
        val scenario = ActivityScenario.launch(MainActivity::class.java)
        val services = BoarServices.get(ctx)
        // The engine and the screen take a moment on a first start.
        compose.waitUntil(60_000) { shows(t("setupWizard.step1.selectTierButton")) }

        click(t("setupWizard.step1.selectTierButton"))
        val compact = services.catalog.answerModels.first { it.id == "qwen2.5-1.5b-instruct-q4km" }
        click(compact.shortName, substring = true) // the name the setup screen shows
        click(t("setupWizard.step2.installButton"))
        // Downloads (verified) and indexing, then the launch button.
        compose.waitUntil(30 * 60_000L) { shows(t("setupWizard.step3.launchButton")) }
        click(t("setupWizard.step3.launchButton"))

        compose.waitUntil(10_000) { shows(t("native.pin.offerTitle")) }
        click(t("native.pin.offerSet"))
        repeat(2) {
            "2580".forEach { d -> click(d.toString()) }
            click("✓")
        }
        compose.waitUntil(20_000) { services.pinLock.isSet }
        assertTrue(services.pinLock.isSet)
        assertTrue(services.activeModel()?.id == compact.id)
        scenario.close()
    }
}
