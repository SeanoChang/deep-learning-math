# Honors Calculus II: Integration, Series, and Functional Convergence

**15-Week Rigorous Proof-Based Sequence — Semester 2**

> **Course philosophy:** Every major theorem in calculus is a theorem about controlling approximation. This semester completes the logical construction of single-variable calculus and prepares the student for Real Analysis I.

**Primary text:** Apostol, *Calculus Vol. 1* | **Companion:** Spivak, *Calculus* | **Reference:** Rudin, *PMA*

**Assumed background:** Ordered field / completeness of $\mathbb{R}$; sequences and limits; $\epsilon$-$\delta$ continuity; compactness in $\mathbb{R}$; differentiation; MVT; Taylor's theorem.

---

## Semester Goal

Finish the rigorous single-variable theory and build the student's capacity to handle infinite processes with precision. The deep thread:

$$\text{approximation by partitions} \to \text{approximation by partial sums} \to \text{approximation by functions} \to \text{when limits can be interchanged}$$

---

## Week 1 — Why Integration Is Hard: Partitions, Upper/Lower Sums

**Topics**

- Partitions of $[a,b]$ and refinements
- Upper Darboux sum $U(f,P)$ and lower Darboux sum $L(f,P)$
- Upper integral / lower integral
- Definition of Riemann integrability via $\sup L(f,P) = \inf U(f,P)$

**Proof Targets**

- If $P'$ refines $P$, then $L(f,P) \leq L(f,P') \leq U(f,P') \leq U(f,P)$
- $L(f,P) \leq U(f,Q)$ for any partitions $P, Q$

**Proof Skill Focus:** Working directly from definitions; controlling inequalities through refinement; understanding "best lower approximation" vs "best upper approximation."

**Why this week matters:** The integral exists only if the lower and upper worlds collapse to one number. This is where integration begins structurally.

---

## Week 2 — Characterizing Integrability

**Topics**

- $\varepsilon$-partition criterion: $f$ is integrable $\iff \forall \varepsilon > 0,\ \exists P$ such that $U(f,P) - L(f,P) < \varepsilon$
- Oscillation on subintervals
- Boundedness as a necessary condition
- Examples of integrable and non-integrable functions (Dirichlet, Thomae)

**Proof Targets**

- Prove the $\varepsilon$-partition criterion
- Prove boundedness is necessary
- Prove a function differing at finitely many points from an integrable function remains integrable with same integral

**Proof Skill Focus:** "If and only if" proofs; turning global definitions into $\varepsilon$-control statements; careful counterexample construction.

**Why this week matters:** Not every function can be integrated in the Riemann sense. Students begin to see the limits of the theory.

---

## Week 3 — Continuous and Monotone Functions Are Integrable

**Topics**

- Integrability of continuous functions on closed intervals (via uniform continuity)
- Integrability of monotone functions
- What discontinuities Riemann integration can tolerate

**Proof Targets**

- Every continuous $f : [a,b] \to \mathbb{R}$ is Riemann integrable
- Every monotone $f : [a,b] \to \mathbb{R}$ is Riemann integrable

**Key chain to make explicit:**
$$\text{compactness of } [a,b] \Rightarrow \text{uniform continuity} \Rightarrow \text{integrability}$$

**Proof Skill Focus:** Using previous theorems instead of reproving from scratch; estimating oscillation on each subinterval.

**Why this week matters:** The first major "theory pays off" moment. Integration is not isolated — it depends on topology from Semester 1.

---

## Week 4 — Algebra and Order Properties of the Integral

**Topics**

- Linearity, monotonicity, additivity over intervals
- Comparison principle
- Triangle inequality for integrals
- Integral bounds: $m(b-a) \leq \int_a^b f \leq M(b-a)$

**Proof Targets**

- Linearity from Darboux definitions
- Additivity: $\int_a^b f = \int_a^c f + \int_c^b f$
- If $f \leq g$, then $\int_a^b f \leq \int_a^b g$

**Proof Skill Focus:** Algebra inside supremum/infimum arguments; splitting and recombining partitions; translating pointwise order into integral order.

**Why this week matters:** The integral becomes a stable algebraic operator. Without this, the FTC later feels magical rather than inevitable.

---

## Week 5 — The Fundamental Theorem of Calculus, Part I

**Topics**

- Define $F(x) = \int_a^x f(t)\,dt$
- Continuity of $F$
- If $f$ is continuous, then $F$ is differentiable and $F'(x) = f(x)$

**Proof Targets**

- $F$ is continuous assuming $f$ is integrable
- FTC I assuming $f$ is continuous

**Standard proof backbone:**
$$\frac{F(x+h)-F(x)}{h} = \frac{1}{h}\int_x^{x+h} f(t)\,dt$$
Squeeze by local min/max of $f$ near $x$; continuity collapses the bounds.

**Proof Skill Focus:** Converting integrals into average values; squeeze arguments with local estimates; precise use of continuity at a point.

**Why this week matters:** Integration and differentiation become structurally linked, not just computationally linked.

---

## Week 6 — FTC Part II, Substitution, and Integration by Parts

**Topics**

- FTC II: If $F' = f$ and $f$ is continuous, then $\int_a^b f(x)\,dx = F(b) - F(a)$
- Integration by parts (rigorous derivation from product rule)
- Substitution theorem (hypotheses stated carefully)

**Proof Targets**

- Prove FTC II from FTC I + derivative theory
- Derive IBP from $(fg)' = f'g + fg'$
- Prove substitution theorem under sufficient hypotheses (differentiability, continuity, interval mapping behavior)

**Proof Skill Focus:** Building corollaries from structure theorems; understanding when symbolic rules are justified.

**Why this week matters:** "Techniques of integration" are consequences of previous theorems, not independent tricks.

---

## Week 7 — Improper Integrals and Convergence

**Topics**

- Improper integrals on unbounded intervals and at singularities
- Cauchy criterion for improper integrals
- Comparison tests; absolute convergence for integrals

**Proof Targets**

- Formal definitions of $\int_a^\infty f(x)\,dx$ and $\int_a^b f$ with singularity
- Prove comparison criteria
- Examples of conditional vs absolute convergence: $\int_1^\infty \frac{1}{x^p}\,dx$, $\int_0^1 \frac{1}{x^p}\,dx$

**Proof Skill Focus:** Reusing sequence/limit logic inside integral definitions; tail estimates; exact convergence threshold arguments.

**Why this week matters:** Bridges finite accumulation to infinite accumulation — the integral-side analog of infinite series.

---

## Week 8 — Numerical Integration and Error as Controlled Approximation

**Topics**

- Riemann sums revisited; trapezoidal rule; midpoint rule; Simpson's rule
- Error bounds from derivative estimates

**Proof Targets**

- Derive at least one error estimate carefully
- Show how smoothness controls approximation error

**Proof Skill Focus:** Translating derivative bounds into approximation bounds; reading theorems as error-control tools.

**Why this week matters:** This week is not "less rigorous" — it teaches that theorems are valuable because they *quantify* error. Approximation is the soul of calculus.

---

## Week 9 — Infinite Sequences and Series: Formal Convergence

**Topics**

- Series as limits of partial sums
- Cauchy criterion for series
- Necessary condition: $\sum a_n$ convergent $\Rightarrow a_n \to 0$
- Positive term series

**Proof Targets**

- Cauchy criterion for series
- Prove term test; show converse fails (counterexample required)

**Proof Skill Focus:** Recasting sequence theorems inside series; tail control; counterexample design.

**Why this week matters:** The discrete analog of improper integrals — students should be told this explicitly.

---

## Week 10 — Comparison-Based Convergence Tests

**Topics**

- Comparison Test; Limit Comparison Test
- Integral Test (via monotonicity)
- Geometric series; $p$-series

**Proof Targets**

- Prove each test from order/tail logic
- Carefully justify Integral Test using monotonicity

**Structural connection to make explicit:**

- improper integrals ↔ monotone functions ↔ series tails
- One common pattern: comparison against known benchmark series

**Proof Skill Focus:** Reducing unknown objects to benchmark objects; precision with hypotheses (positivity, monotonicity).

**Why this week matters:** Tests are not a memorized list — they are variants of one proof strategy.

---

## Week 11 — Ratio/Root/Alternating; Absolute vs Conditional Convergence

**Topics**

- Ratio Test; Root Test; Alternating Series Test
- Absolute convergence vs conditional convergence
- Rearrangement sensitivity (conceptual introduction)

**Proof Targets**

- Ratio Test: eventual geometric domination
- Root Test: asymptotic exponential control
- Leibniz Alternating Series Test
- Absolute convergence implies convergence

**Key conceptual target:** Absolute convergence is robust; conditional convergence is fragile.

**Enrichment:** Riemann rearrangement theorem (preview at minimum; full proof if level allows).

**Proof Skill Focus:** "Eventually" arguments; converting asymptotic inequalities into convergence; alternating remainder bounds.

**Why this week matters:** Stability vs instability in infinite summation.

---

## Week 12 — Power Series and Local Representation of Functions

**Topics**

- Power series $\sum c_n(x-a)^n$
- Radius of convergence; interval of convergence
- Cauchy-Hadamard formula (statement; proof optional)
- Uniform convergence on compact subintervals inside the radius of convergence

**Proof Targets**

- Prove existence of radius $R$ with dichotomous convergence behavior:
  - absolute convergence for $|x-a| < R$
  - divergence for $|x-a| > R$
- Prove uniform convergence on $|x-a| \leq r < R$ via M-test

**Proof Skill Focus:** Turning scalar series tests into functional convergence results; distinguishing pointwise, absolute, and uniform convergence.

**Why this week matters:** First serious contact with functions built from infinite processes.

---

## Week 13 — Sequences of Functions: Pointwise vs Uniform Convergence

**Topics**

- Pointwise convergence; uniform convergence
- Cauchy criterion for uniform convergence
- Counterexamples: pointwise $\not\Rightarrow$ continuity preservation; pointwise $\not\Rightarrow$ integrability interchange

**Core Proof Targets**

- Uniform convergence implies pointwise convergence; show converse fails
- Uniform convergence preserves continuity: if $f_n$ continuous and $f_n \to f$ uniformly, then $f$ is continuous

**Canonical examples**

- $f_n(x) = x^n$ on $[0,1]$
- $f_n(x) = \frac{x}{1+nx^2}$

**Proof Skill Focus:** Correct order of quantifiers:
$$\forall \varepsilon > 0,\ \exists N,\ \forall n \geq N,\ \forall x \in E,\ |f_n(x) - f(x)| < \varepsilon$$
Diagnosing exactly where proofs break without uniformity.

**Why this week matters:** This is usually the week where students finally understand why analysis cares so much about quantifiers.

---

## Week 14 — Interchanging Limits and Integrals; M-test; Term-by-Term Operations

**Topics**

- Weierstrass M-test
- Limit-integral interchange under uniform convergence
- Term-by-term integration of power series
- Term-by-term differentiation (under sufficient hypotheses)

**Proof Targets**

- Prove M-test
- If $f_n \to f$ uniformly and each $f_n$ is integrable: $\int f_n \to \int f$
- Power series integrable/differentiable term-by-term inside radius of convergence

**Proof Skill Focus:** Dominating tails uniformly; bounding global error with one $N$; understanding exactly why swapping limits and integrals requires strong hypotheses.

**Why this week matters:** The capstone of the course. The student learns when infinite approximation is legitimate — and when it is not.

---

## Week 15 — Synthesis, Capstone Proofs, and Transition to Real Analysis

**Purpose:** No new content. Consolidate the full structure of the semester.

**What to synthesize**

- Riemann integration = control by partitions
- Series convergence = control by tails
- Uniform convergence = control by tails, uniformly in $x$
- Power series = locally uniform analytic machinery

**Capstone proof menu (select 2–3 for full reconstruction)**

- Continuous $\Rightarrow$ Riemann integrable
- FTC I
- Integral Test
- Uniform limit of continuous functions is continuous
- Weierstrass M-test
- Term-by-term integration of power series

**Transition lecture:** Show why this course naturally becomes Real Analysis I. The course has already used completeness, compactness, continuity, uniform continuity, Cauchy criteria, and interchange of limits. Real Analysis will generalize and sharpen all of it.

---

## Required Theorem Spine

### Integration Block

| Theorem | Status |
|---|---|
| Refinement inequalities for upper/lower sums | Must prove |
| $\varepsilon$-criterion for integrability | Must prove |
| Continuous functions on $[a,b]$ are integrable | Must prove |
| Monotone functions on $[a,b]$ are integrable | Must prove |
| Algebraic properties of the integral | Must prove |
| FTC I | Must prove |
| FTC II | Must prove |

### Series Block

| Theorem | Status |
|---|---|
| Cauchy criterion for series | Must prove |
| Comparison Test | Must prove |
| Integral Test | Must prove |
| Ratio Test | Must prove |
| Root Test | Must prove |
| Alternating Series Test | Must prove |
| Absolute convergence implies convergence | Must prove |

### Functional Convergence Block

| Theorem | Status |
|---|---|
| Uniform limit of continuous functions is continuous | Must prove |
| Weierstrass M-test | Must prove |
| Limit-integral interchange under uniform convergence | Must prove |
| Term-by-term integration of power series | Must prove |

---

## Problem Set Structure

Every weekly problem set must contain all three:

**1. Definition Drills** — Prove things directly from definitions.
*Example: Show $f$ is integrable using the $\varepsilon$-partition criterion.*

**2. Theorem Applications** — Use major theorems efficiently.
*Example: Use M-test to justify uniform convergence of a given series.*

**3. Counterexamples** — This is mandatory in a proof course.
*Example: Construct a pointwise-convergent sequence of continuous functions whose limit is discontinuous.*

> If students cannot produce counterexamples, they do not understand the hypotheses.

---

## Assessment Structure

### Midterm (≈ Week 8)

Covers: Riemann integrability; continuous/monotone integrability; properties of the integral; FTC; improper integrals.

- 2 theorem proofs
- 2 shorter definition-based proofs
- 2 counterexample/diagnosis problems
- 1 computational problem with proof justification

### Final Exam

Emphasis on: convergence tests; power series; pointwise vs uniform convergence; M-test; interchange of limits and integrals.

- 3 major proof problems
- 2 "state precisely and apply" theorem problems
- 2 counterexample problems
- 1 synthesis question linking integration, series, and functional limits

---

## Semester 2 — Exit Competencies

By the end of this semester, students should be able to:

- Prove a bounded function is or is not Riemann integrable
- Prove FTC under standard hypotheses
- Analyze convergence of numerical series with full justification
- Distinguish absolute, conditional, pointwise, and uniform convergence
- Prove that uniform convergence preserves continuity and integrability
- Justify when term-by-term operations on series are allowed
- Read a first real analysis text without significant difficulty

---

> **The unifying principle of the course:**
> Every major theorem in calculus is a theorem about controlling approximation.
