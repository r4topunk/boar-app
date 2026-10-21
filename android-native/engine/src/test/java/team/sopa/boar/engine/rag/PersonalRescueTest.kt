package team.sopa.boar.engine.rag

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** A question about the user's own things keeps their best files below the 0.7 gate (DOCS-RECALL, Oct 21). */
class PersonalRescueTest {
    private fun chunk(id: String, body: String, sim: Double) = Chunk(id, id, id, body, score = sim, similarity = sim)
    private val medical = chunk("medical-summary", "Allergies: penicillin. Medication: levothyroxine 75 mcg every morning.", 0.577)
    private val vaccines = chunk("vaccines", "Tetanus booster in 2022, next in 2032.", 0.588)
    private val recipe = chunk("cinnamon-rolls", "Grandma's cinnamon rolls with cardamom.", 0.52)

    @Test fun personalQuestionsAreRecognised() {
        assertTrue(RagPure.isPersonal("Which medicine do I take every morning?"))
        assertTrue(RagPure.isPersonal("What is my car insurance policy number?"))
        assertTrue(RagPure.isPersonal("Qual é o meu tipo sanguíneo?"))
        assertFalse(RagPure.isPersonal("What is loratadine?"))
        assertFalse(RagPure.isPersonal("Is Kilimanjaro a volcano?"))
    }

    @Test fun keepsTheBestTwoAboveTheFloor() {
        val kept = RagPure.personalRescue("Which medicine do I take every morning and what am I allergic to?", listOf(recipe, medical, vaccines))
        assertEquals(listOf("vaccines", "medical-summary"), kept.map { it.chunkId })
    }

    @Test fun termCoverageLowersTheFloor() {
        // 0.542 is under 0.57, but the file has the question's only term.
        val kept = RagPure.personalRescue("Do I have any allergies?", listOf(chunk("medical-summary", "Allergies: penicillin.", 0.542)))
        assertEquals(listOf("medical-summary"), kept.map { it.chunkId })
    }

    @Test fun nothingForWeakMatchesOrGeneralQuestions() {
        assertTrue(RagPure.personalRescue("How can I sleep better?", listOf(chunk("cinnamon-rolls", "Grandma's cinnamon rolls.", 0.377))).isEmpty())
        assertTrue(RagPure.personalRescue("What is loratadine?", listOf(medical.copy(similarity = 0.9, score = 0.9))).isEmpty())
    }
}
