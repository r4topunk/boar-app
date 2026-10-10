package team.sopa.boar

import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.createAndroidComposeRule
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
 * The whole first run on a cleared install (adb shell pm clear team.sopa.aoair.native first): hardware, the 1.5B
 * model, the real download and indexing, launch, then the PIN offer and a PIN set through it. Needs Wi-Fi and about
 * 1 GB; it skips on an install that already has a model.
 */
@RunWith(AndroidJUnit4::class)
class SetupFlowDeviceTest {
    @get:Rule val compose = createAndroidComposeRule<MainActivity>()
    private val ctx = InstrumentationRegistry.getInstrumentation().targetContext
    private fun t(key: String) = I18n.t(ctx, key)

    private fun click(text: String, substring: Boolean = false) {
        val node = compose.onNode(hasText(text, substring = substring) and hasClickAction())
        node.performScrollTo()
        node.performSemanticsAction(SemanticsActions.OnClick)
        compose.waitForIdle()
    }

    private fun shows(text: String) = runCatching { compose.onNodeWithText(text).assertExists() }.isSuccess

    @Test fun firstRunEndsOnThePinOfferAndSetsAPin() {
        val services = BoarServices.get(ctx)
        assumeTrue("needs a cleared install", services.activeModel() == null && !services.pinLock.isSet)

        click(t("setupWizard.step1.selectTierButton"))
        val compact = services.catalog.answerModels.first { it.id == "qwen2.5-1.5b-instruct-q4km" }
        click(compact.label, substring = true)
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
    }
}
