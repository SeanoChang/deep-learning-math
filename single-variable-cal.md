# Honors Calculus I: Real Numbers, Limits, Continuity, and Differentiation

**15-Week Rigorous Proof-Based Sequence — Semester 1**

> **Course philosophy:** Calculus as the study of limit, approximation, accumulation, and structure. Every theorem is a consequence of the real number line's architecture — not intuition about graphs.

**Primary text:** Spivak, *Calculus* | **Supplement:** Apostol, *Calculus Vol. 1* | **Reference:** Rudin, *PMA*

---

## Semester Goal

Build calculus from the structure of the real line to the derivative and the major single-variable theorems, with proofs. The conceptual spine is:

$$\text{completeness of } \mathbb{R} \to \text{limits} \to \text{continuity} \to \text{derivative} \to \text{MVT} \to \text{global consequences of local linearity}$$

---

## Week 1 — Logic, Proof, and the Real Number System

**Topics**

- Mathematical statements, quantifiers, implication
- Direct proof, contrapositive, contradiction, induction
- Ordered field axioms of $\mathbb{R}$
- Intervals, absolute value, triangle inequality
- Upper/lower bounds, supremum and infimum

**Proof Targets**

- Uniqueness of supremum
- Basic consequences of order axioms
- Triangle inequality and reverse triangle inequality
- Existence/uniqueness properties from field axioms

**Proof Skill Focus:** Translating English into quantified statements; writing a proof from definitions only.

**Why this week matters:** Every later theorem rests on the structure of $\mathbb{R}$, not intuition about graphs.

---

## Week 2 — Completeness, Archimedean Property, Density

**Topics**

- Least upper bound property (completeness axiom)
- Archimedean property
- Density of $\mathbb{Q}$ in $\mathbb{R}$
- Existence of $n$-th roots
- Nested interval reasoning (intro)

**Proof Targets**

- Archimedean property from completeness
- Between any two reals lies a rational; between any two distinct reals lies an irrational
- Existence of $\sqrt{a}$ for $a > 0$

**Proof Skill Focus:** Constructing sets whose supremum solves an existence problem.

**Why this week matters:** Completeness is not decoration — it produces actual existence theorems.

---

## Week 3 — Sequences and the Formal Definition of Limit

**Topics**

- Sequences as functions $\mathbb{N} \to \mathbb{R}$
- $\epsilon$-$N$ definition of sequence convergence
- Uniqueness of limits
- Algebra of limits
- Boundedness of convergent sequences

**Proof Targets**

- Limit uniqueness
- Sum/product/scalar limit laws
- Convergent implies bounded
- Squeeze theorem for sequences

**Proof Skill Focus:** Managing $\epsilon$-arguments; choosing $N$ from multiple constraints.

**Why this week matters:** The first full deployment of rigorous limit machinery.

---

## Week 4 — Monotone Sequences, Subsequences, Bolzano-Weierstrass

**Topics**

- Monotone sequences and the Monotone Convergence Theorem
- Subsequences
- Bolzano-Weierstrass theorem
- Divergence versus oscillation

**Proof Targets**

- Every bounded monotone sequence converges
- Every bounded sequence has a convergent subsequence
- A sequence converges iff every subsequence converges to the same limit

**Proof Skill Focus:** Extracting subsequences; proof by construction/recursive selection.

**Why this week matters:** First deep compactness-type phenomenon on the real line.

---

## Week 5 — Cauchy Sequences and Completeness Revisited

**Topics**

- Cauchy sequences and the Cauchy criterion
- Completeness of $\mathbb{R}$
- Equivalence: convergent iff Cauchy in $\mathbb{R}$
- Nested intervals (formal use)
- Contrast with $\mathbb{Q}$ not complete

**Proof Targets**

- Convergent implies Cauchy
- Cauchy implies bounded
- Every Cauchy sequence in $\mathbb{R}$ converges

**Proof Skill Focus:** Understanding "eventually"; converting pairwise closeness into actual convergence.

**Why this week matters:** One of the central conceptual pivots of the sequence — completeness unified with limit behavior.

---

## Week 6 — Limits of Functions: Definition and Sequential Criterion

**Topics**

- $\epsilon$-$\delta$ definition of $\lim_{x \to c} f(x) = L$
- One-sided limits
- Sequential criterion for function limits
- Algebra of function limits

**Proof Targets**

- Uniqueness of function limits
- Sequential criterion for limits
- Squeeze theorem for functions
- Limit laws via $\epsilon$-$\delta$ or sequence transfer

**Proof Skill Focus:** The distinction between $x \to c$ and $x = c$; building $\delta$ from a target $\epsilon$.

**Why this week matters:** The transition from sequence limits to full function limits.

---

## Week 7 — Continuity

**Topics**

- Continuity at a point and on a set
- Sequential characterization of continuity
- Algebra of continuous functions
- Composition of continuous functions

**Proof Targets**

- Equivalent definitions of continuity
- Sum/product/quotient continuity
- Composition theorem
- Continuity of polynomials and rational functions on their domains

**Proof Skill Focus:** Reusing proven limit laws cleanly; organizing theorem dependencies.

**Why this week matters:** Continuity is where limit logic becomes structural rather than purely local.

---

## Week 8 — Topology of the Real Line, Closed Sets, Compactness

**Topics**

- Open sets, closed sets in $\mathbb{R}$; limit points; closure and interior
- Compact sets in $\mathbb{R}$
- Heine-Borel theorem (one dimension)

**Proof Targets**

- Equivalent characterizations of closed sets
- Closed subset of compact is compact
- Compact iff closed and bounded in $\mathbb{R}$
- Every infinite bounded subset has a limit point (Bolzano-Weierstrass, set form)

**Proof Skill Focus:** Set-theoretic argument structure; translating pointwise properties into set properties.

**Why this week matters:** The correct global language for continuity theorems.

---

## Week 9 — Continuous Functions on Compact Sets

**Topics**

- Image of compact under continuous map
- Extreme Value Theorem
- Uniform continuity on compact sets
- Connected intervals and IVT intuition

**Proof Targets**

- Continuous image of compact is compact
- Extreme Value Theorem
- Heine-Cantor theorem (continuous on compact $\Rightarrow$ uniformly continuous)
- Continuous image of interval is interval

**Proof Skill Focus:** Chaining theorems; using compactness as a reusable engine.

**Why this week matters:** Topology pays off — compactness gives strong global consequences.

---

## Week 10 — Intermediate Value Theorem and Connectedness

**Topics**

- Intermediate Value Theorem
- Connected subsets of $\mathbb{R}$
- Intervals as connected sets
- Existence theorems via continuity

**Proof Targets**

- Intermediate Value Theorem
- If $f$ is continuous on interval $I$, then $f(I)$ is an interval
- Existence of roots via IVT

**Proof Skill Focus:** Supremum-based proof strategy; proofs of existence without explicit construction.

**Why this week matters:** IVT is a pure existence theorem driven by completeness — illustrating the real gap between *continuous*, *differentiable*, and *algebraically nice*.

---

## Week 11 — Derivative: Definition and First Properties

**Topics**

- Difference quotient and derivative as a limit
- Differentiability implies continuity
- Tangent line and local linearization
- Examples of nondifferentiability

**Proof Targets**

- Differentiability implies continuity
- Derivative of constant, identity, powers from first principles
- Local linear approximation viewpoint

**Proof Skill Focus:** Proof from first principles; using a limit definition to derive algebraic facts.

**Why this week matters:** The derivative is introduced as a theorem-driven concept, not a formula machine.

---

## Week 12 — Algebra of Derivatives

**Topics**

- Linearity of the derivative
- Product rule, quotient rule, chain rule
- Derivatives of inverse functions (if time permits)

**Proof Targets**

- Product rule proof
- Quotient rule proof
- Chain rule proof
- Derivative of inverse function under suitable hypotheses

**Proof Skill Focus:** Expanding clever algebraic decompositions; understanding how proofs are engineered, not guessed.

**Why this week matters:** Differentiation rules are theorems, not axioms.

---

## Week 13 — Mean Value Theorems

**Topics**

- Local extrema and Fermat's theorem
- Rolle's theorem
- Mean Value Theorem
- Cauchy Mean Value Theorem (advanced)

**Proof Targets**

- Fermat's theorem
- Rolle's theorem
- Mean Value Theorem
- Monotonicity consequences from sign of derivative
- Constant derivative implies constant function

**Proof Skill Focus:** Identifying exact hypotheses; seeing the chain EVT $\to$ Rolle $\to$ MVT.

**Why this week matters:** The structural center of differential calculus. MVT converts local derivative information into global statements.

---

## Week 14 — Consequences of the Mean Value Theorem

**Topics**

- Monotonicity criteria
- Inequalities from MVT
- Convexity and second derivative intuition
- L'Hôpital's Rule (only if done rigorously)
- Error bounds and approximation

**Proof Targets**

- If $f' \geq 0$, then $f$ is increasing
- If $f' = 0$, then $f$ is constant
- Lipschitz-type consequences
- Basic convexity consequences if $f''$ exists

**Proof Skill Focus:** Turning theorem statements into corollaries efficiently; avoiding informal graph-based reasoning.

**Why this week matters:** The derivative controls shape and growth — here students see how.

---

## Week 15 — Taylor's Theorem and Semester Synthesis

**Topics**

- Higher derivatives
- Taylor polynomial and the remainder term (Lagrange form)
- Local approximation as central philosophy
- Review and synthesis of the semester

**Proof Targets**

- Taylor's theorem with Lagrange remainder
- Basic applications to approximation and error control

**Proof Skill Focus:** Long proof structure; seeing how many prior theorems feed one final theorem.

**Why this week matters:** The derivative is not just slope — higher derivatives build controlled approximations. This is the culmination of differentiation.

---

## Semester 1 — Core Proof Competencies

By the end of this semester, students should be able to independently prove:

| Domain | Theorems |
|---|---|
| **Real numbers** | Uniqueness of sup/inf; Archimedean property; density of $\mathbb{Q}$ |
| **Sequences** | Limit uniqueness; algebra of limits; bounded monotone convergence; Bolzano-Weierstrass; Cauchy criterion |
| **Topology** | Sequential criterion for continuity; Heine-Borel in $\mathbb{R}$ |
| **Continuity** | EVT; IVT; uniform continuity on compact sets |
| **Differentiation** | Differentiability $\Rightarrow$ continuity; product/quotient/chain rules; Rolle's theorem; MVT; Taylor's theorem |

---

*Semester 2 continues with Riemann integration, infinite series, and sequences of functions.*
