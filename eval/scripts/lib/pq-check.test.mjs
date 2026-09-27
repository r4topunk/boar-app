import { describe, expect, it } from "vitest";
import { checkQuantumAnswer } from "./pq-check.mjs";

describe("checkQuantumAnswer", () => {
  it("fails the app answer Prism reported (PT, off-topic [1])", () => {
    const r = checkQuantumAnswer({
      answer: "Grøstl, Keccak e X25519 são resistentes a quântico [1].",
      retrievedTitles: ["Dean Lee (physicist)", "Keccak"],
    });
    expect(r.pass).toBe(false);
    expect(r.failures.some((f) => f.includes("false claim in a cited answer"))).toBe(true);
    expect(r.failures.some((f) => f.includes("source [1] off topic"))).toBe(true);
  });

  it("fails classical schemes listed as quantum resistant (4B + pack, run 2026-09-26)", () => {
    const r = checkQuantumAnswer({
      answer: "The Open Quantum Safe (OQS) project includes several quantum-resistant signature algorithms, such as RSA-PSS (based on RSA with padding), DSA, ECDSA, and lattice-based schemes like Dilithium and Falcon. The most promising are based on lattice cryptography, such as Dilithium and Falcon [4].",
      retrievedTitles: ["Public-key cryptography", "Quantum cryptography", "NSA cryptography", "Post-quantum cryptography"],
    });
    expect(r.pass).toBe(false);
    expect(r.failures[0]).toMatch(/RSA/);
  });

  it("fails a denial that quantum-resistant signatures exist (4B without pack)", () => {
    const r = checkQuantumAnswer({
      answer: "No widely adopted signature algorithms are currently considered fully quantum resistant. NIST has selected CRYSTALS-Dilithium for digital signatures [n]. Traditional algorithms like RSA and ECC are vulnerable to Shor's algorithm.",
      retrievedTitles: ["Public-key cryptography", "Quantization (signal processing)"],
    });
    expect(r.pass).toBe(false);
    expect(r.failures[0]).toMatch(/denies/);
    expect(r.warnings).toContain("literal [n] placeholder instead of a source number");
  });

  it("fails a citation of an off-topic source", () => {
    const r = checkQuantumAnswer({ answer: "ML-DSA is lattice based [2].", retrievedTitles: ["Post-quantum cryptography", "TB6Cs1H3 snoRNA"] });
    expect(r.failures).toEqual(['cites off-topic source [2]: "TB6Cs1H3 snoRNA"']);
  });

  it("passes the reference answer, which names classical schemes only to say they are not resistant", () => {
    const r = checkQuantumAnswer({
      answer: "The quantum-resistant signature algorithms standardized today are ML-DSA, SLH-DSA, LMS/HSS and XMSS. FN-DSA (Falcon) is expected soon. The signatures most systems use now, RSA, DSA, ECDSA and EdDSA (Ed25519), are not quantum resistant. A large quantum computer running Shor's algorithm could break them.",
      retrievedTitles: ["Post-quantum cryptography"],
    });
    expect(r).toEqual({ pass: true, failures: [], warnings: [] });
  });

  it("passes a correct PT answer", () => {
    const r = checkQuantumAnswer({
      answer: "As assinaturas resistentes a quântico padronizadas pelo NIST são ML-DSA (FIPS 204) e SLH-DSA (FIPS 205) [1]. RSA e ECDSA não são resistentes: o algoritmo de Shor as quebra.",
      retrievedTitles: ["Post-quantum cryptography"],
    });
    expect(r.pass).toBe(true);
  });
});
