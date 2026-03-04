# Probability I: Foundations, Random Variables, and Limit Laws

**15-Week Rigorous Proof-Based Sequence — Semester 1**

> **Course philosophy:** A random variable is not "a random number." It is a function from outcomes to numbers, and its distribution is derived from the underlying probability measure. Every major result in this course is a theorem — not a formula — and must be justified from first principles.

**Primary text:** Blitzstein & Hwang, *Introduction to Probability* | **Supplement:** Ross, *A First Course in Probability* | **Reference:** Durrett, *Probability: Theory and Examples* (Ch. 1–2)

**Prerequisites:** Single-variable calculus (series, integrals); linear algebra (for multivariate sections); proof maturity (quantifiers, $\epsilon$-arguments, induction).

---

## Semester Goal

Build probability from the Kolmogorov axioms through the Weak Law of Large Numbers, with proofs at every step. The conceptual spine is:

$$\text{axioms} \to \text{events} \to \text{random variables} \to \text{expectation} \to \text{joint structure} \to \text{conditioning} \to \text{inequalities} \to \text{limit laws}$$

---

## Course-Wide Learning Objectives

By the end of this course, students must be able to:

1. Derive consequences of the Kolmogorov axioms from scratch
2. Translate real-world statements into precise event algebra
3. Define a random variable as a function on a sample space and derive its distribution
4. Compute and prove properties of expectation, variance, and covariance from first principles
5. Work rigorously with both discrete (PMF) and continuous (PDF) random variables
6. State and apply conditional probability and conditional expectation with full logical precision
7. Prove and apply Markov's inequality, Chebyshev's inequality, and the law of total expectation
8. Prove the Weak Law of Large Numbers via Chebyshev
9. Produce counterexamples that demonstrate the necessity of hypotheses

---

## Milestone Structure

| Milestone | Weeks | Gate theorem |
|---|---|---|
| **M1: Event algebra** | 1–2 | Inclusion-exclusion for $n$ sets |
| **M2: Conditioning and independence** | 3 | Bayes' theorem + pairwise $\not\Rightarrow$ mutual independence |
| **M3: Random variables and expectation** | 4–6 | Linearity of expectation; variance identity |
| **M4: Distribution library** | 7–9 | Memoryless property; Poisson as a limit |
| **M5: Joint structure** | 10–11 | Factorization under independence; law of total expectation |
| **M6: Inequalities and limit laws** | 12–14 | WLLN via Chebyshev |
| **M7: Synthesis** | 15 | Full reconstruction of 2–3 major theorem chains |

---

## Week 1 — Why Probability Needs Axioms

**Topics**

- Deterministic vs random models; motivation for a formal framework
- Sample space $\Omega$; events as subsets of $\Omega$
- Probability as a set function $P : \mathcal{F} \to [0,1]$
- Kolmogorov axioms: nonnegativity, normalization, countable additivity
- Event algebra: union, intersection, complement, disjointness

**Proof Targets**

- $P(\varnothing) = 0$
- $P(A^c) = 1 - P(A)$
- If $A \subseteq B$, then $P(A) \leq P(B)$
- Inclusion-exclusion for two sets: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- Continuity of probability: if $A_n \nearrow A$, then $P(A_n) \to P(A)$

**Proof Skill Focus:** Proving from axioms only, with no appeal to intuition; translating English probabilistic statements into set-theoretic notation precisely.

**Why this week matters:** Probability is assigned to *events*, not directly to numbers. Every later concept — random variables, expectation, conditioning — is built on top of this event-algebra foundation. If axiom-based reasoning is weak here, everything later becomes symbolic confusion.

**Problem set includes:**

- Prove $P(A \cup B \cup C)$ formula from axioms
- Find $P(A)$ given only $P(A \cap B)$, $P(A \cap B^c)$ and axioms
- Construct a sample space and probability function for a concrete experiment

---

## Week 2 — Counting and Finite Probability Models

**Topics**

- Finite sample spaces with uniform probability
- Multiplication principle; permutations; combinations
- Binomial coefficients and identities
- Inclusion-exclusion for $n$ sets
- Birthday paradox and occupancy problems

**Proof Targets**

- Derive $\binom{n}{k}$ by double counting
- Prove Vandermonde's identity: $\binom{m+n}{r} = \sum_k \binom{m}{k}\binom{n}{r-k}$
- Prove general inclusion-exclusion: $P\!\left(\bigcup_{i=1}^n A_i\right) = \sum |S|$-alternating sum
- Use double counting to establish a non-obvious probability identity

**Proof Skill Focus:** Exact counting without overcounting; proof by double counting; distinguishing ordered from unordered selections.

**Why this week matters:** Finite probability models are the cleanest testing ground for axiomatic probability. Combinatorial discipline here prevents systematic errors throughout the course.

**Problem set includes:**

- Derive inclusion-exclusion for 3 sets from the 2-set version
- Prove Pascal's identity $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$ combinatorially
- Counterexample: exhibit two events that are more likely jointly than the product formula would suggest

---

## Week 3 — Conditional Probability and Independence

**Topics**

- Conditional probability: $P(A \mid B) = P(A \cap B)/P(B)$
- Multiplication rule; chain rule for $n$ events
- Law of total probability
- Bayes' theorem
- Independence of events: $P(A \cap B) = P(A)P(B)$
- Pairwise vs mutual independence

**Proof Targets**

- Prove Bayes' theorem from the definition of conditional probability
- Prove the law of total probability for a finite partition
- Construct an explicit example of three events that are pairwise independent but not mutually independent
- Prove: if $A \perp B$, then $A \perp B^c$

**Proof Skill Focus:** Conditioning is *information updating*, not just a fraction formula; independence is a *factorization property*, not vague non-interaction; counterexample construction is mandatory.

**Why this week matters:** Conditioning and independence are the conceptual heart of probability. Every later concept — conditional expectation, independence of random variables, Markov chains — rests on these definitions being understood with precision.

**Problem set includes:**

- Formal Bayes' theorem proof and application
- Construct a probability space where three events are pairwise but not mutually independent
- Prove: independence of $A$ and $B$ does NOT follow from $P(A \cap B) \approx P(A)P(B)$ numerically

---

## Week 4 — Random Variables as Functions

**Topics**

- Random variable as a map $X : \Omega \to \mathbb{R}$
- Induced distribution: $P_X(B) = P(X^{-1}(B)) = P(\omega : X(\omega) \in B)$
- Cumulative distribution function (CDF): definition and properties
- Probability mass function (PMF) for discrete random variables
- Events defined by random variables: $\{X \leq x\}$, $\{X = k\}$ as subsets of $\Omega$

**Proof Targets**

- Prove every CDF satisfies: nondecreasing, right-continuous, $F(-\infty) = 0$, $F(+\infty) = 1$
- Prove $P(X = k) = F(k) - F(k^-)$ in the discrete case
- Prove that the PMF and CDF determine each other uniquely
- Given a function $g : \Omega \to \mathbb{R}$, verify it induces a valid probability distribution

**Proof Skill Focus:** Maintaining the function-level viewpoint; distinguishing the random variable $X$ from a realized value $x$; translating probabilistic events back to subsets of $\Omega$.

**Why this week matters:** This is the conceptual pivot of the course. Students who treat a random variable as "a variable that takes random values" will fail to understand independence, conditioning, and convergence. The function definition must be fully internalized here.

**Problem set includes:**

- Construct $\Omega$, $X$, and verify CDF properties for a concrete discrete example
- Prove: if $X$ and $Y$ have the same CDF, they have the same distribution
- Counterexample: exhibit two different random variables on the same $\Omega$ with the same distribution

---

## Week 5 — Expectation as Weighted Summation

**Topics**

- Expectation of a discrete random variable: $E[X] = \sum_x x \cdot P(X = x)$
- Expectation of a function: $E[g(X)] = \sum_x g(x) P(X = x)$ (law of the unconscious statistician)
- Linearity of expectation: $E[aX + bY] = aE[X] + bE[Y]$
- Indicator random variables: $\mathbf{1}_A$
- Expectation as integration (informal but precise framing)

**Proof Targets**

- Prove linearity of expectation from the definition (discrete case)
- Prove $E[\mathbf{1}_A] = P(A)$
- Use indicator decomposition to compute $E[X]$ for non-trivial $X$ (e.g. number of fixed points of a random permutation)
- Prove LOTUS: $E[g(X)] = \sum_x g(x) P(X=x)$

**Proof Skill Focus:** Expectation is not "average" in the casual sense — it is a *weighted sum against a probability measure*, and eventually an *integral*. Linearity holds unconditionally; it does not require independence.

**Why this week matters:** Linearity of expectation is one of the most powerful tools in the subject. Indicator decompositions turn hard counting problems into simple addition. Students must prove these tools, not just use them.

**Problem set includes:**

- Prove $E[X+Y] = E[X] + E[Y]$ without any independence assumption
- Compute $E[\text{number of successes}]$ by indicator decomposition (hat-check problem, etc.)
- Counterexample: exhibit a case where $E[g(X)] \neq g(E[X])$

---

## Week 6 — Variance, Covariance, and Second-Order Structure

**Topics**

- Variance: $\operatorname{Var}(X) = E[(X - E[X])^2]$
- Standard deviation
- Covariance: $\operatorname{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])]$
- Correlation coefficient
- Variance of sums; independence and variance additivity

**Proof Targets**

- Prove the computational identity: $\operatorname{Var}(X) = E[X^2] - (E[X])^2$
- Prove $\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)$
- Prove: if $X \perp Y$, then $\operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y)$
- Prove the covariance bilinearity: $\operatorname{Cov}(aX + bY, Z) = a\operatorname{Cov}(X,Z) + b\operatorname{Cov}(Y,Z)$
- Prove $|\operatorname{Corr}(X,Y)| \leq 1$ (Cauchy–Schwarz in probability)

**Proof Skill Focus:** Algebra inside expectation; second-moment reasoning as a structural tool; distinguishing uncorrelatedness from independence.

**Why this week matters:** Variance is the first measure of spread, and covariance is the beginning of multivariate structure. The Cauchy–Schwarz bound on correlation is the probabilistic analog of a core inequality from linear algebra — students should see this connection explicitly.

**Problem set includes:**

- Construct $X, Y$ that are uncorrelated but not independent
- Prove $\operatorname{Var}(\sum_{i=1}^n X_i) = \sum \operatorname{Var}(X_i) + 2\sum_{i<j} \operatorname{Cov}(X_i, X_j)$
- Verify correlation lies in $[-1,1]$ using the Cauchy–Schwarz proof

---

## Week 7 — Core Discrete Distributions

**Topics**

- Bernoulli($p$); Binomial($n,p$); Geometric($p$); Negative Binomial; Poisson($\lambda$)
- Each distribution derived from its generative assumptions, not memorized
- Poisson as the rare-event limit of binomial (careful argument)

**Proof Targets**

- Derive $E[X]$ and $\operatorname{Var}(X)$ for Binomial, Geometric, and Poisson from definitions
- Prove the Poisson limit: $\binom{n}{k}p^k(1-p)^{n-k} \to \frac{e^{-\lambda}\lambda^k}{k!}$ as $n\to\infty$, $np \to \lambda$
- Prove Geometric is memoryless in the discrete sense: $P(X > m+n \mid X > m) = P(X > n)$
- Prove Poisson probabilities sum to 1 using the Taylor series for $e^\lambda$

**Proof Skill Focus:** Every distribution is derived from a *model story* + *assumptions* — not retrieved from memory. Students must be able to re-derive any formula from its probabilistic premises.

**Why this week matters:** Building a library of canonical models with proven properties, not formula cards. The Poisson limit is the first serious asymptotic result in the course.

**Problem set includes:**

- Prove the sum of two independent Poisson random variables is Poisson (additivity)
- Derive Geometric variance from the definition
- Counterexample: exhibit a distribution satisfying $E[X] = \lambda$ that is *not* Poisson

---

## Week 8 — Continuous Random Variables and Densities

**Topics**

- Continuous random variables: $P(X = x) = 0$ for all $x$
- Probability density function (PDF): $P(a \leq X \leq b) = \int_a^b f(x)\,dx$
- CDF and PDF relationship: $F'(x) = f(x)$ wherever $F$ is differentiable
- Expectation for continuous random variables: $E[X] = \int_{-\infty}^\infty x f(x)\,dx$
- Uniform, Exponential distributions

**Proof Targets**

- Prove that a valid PDF must satisfy $f \geq 0$ and $\int f = 1$, and that this induces a valid probability measure
- Prove $F(x) = \int_{-\infty}^x f(t)\,dt$ and use this to recover $f$ from $F$
- Prove $E[g(X)] = \int g(x) f(x)\,dx$ (LOTUS for continuous case)
- Derive $E[X]$ and $\operatorname{Var}(X)$ for Uniform and Exponential from definitions

**Proof Skill Focus:** Distinguishing density from probability; the CDF-PDF relationship as a Fundamental Theorem of Calculus instance; careful handling of improper integrals.

**Why this week matters:** The continuous case introduces the integral definition of expectation that will generalize all the way to the measure-theoretic definition in Probability II. Students must see the parallel structure between discrete (sum) and continuous (integral) cases explicitly.

**Problem set includes:**

- Verify a given function is a valid PDF; compute $P(a < X < b)$ from it
- Prove $E[X^2]$ for Uniform$[0,1]$ and derive the variance
- Counterexample: exhibit an $f \geq 0$ with $\int f = 1$ that induces a degenerate-looking distribution

---

## Week 9 — Core Continuous Distributions and Structural Properties

**Topics**

- Exponential distribution: full treatment including memoryless property
- Normal distribution: definition, standardization, symmetry properties
- Log-normal and Gamma (overview level)
- Transformations of continuous random variables: change-of-variable formula

**Proof Targets**

- Prove the exponential memoryless property: $P(X > s+t \mid X > s) = P(X > t)$
- Prove that the Exponential is the *unique* continuous memoryless distribution
- Derive the change-of-variable formula: if $Y = g(X)$ with $g$ monotone, then $f_Y(y) = f_X(g^{-1}(y)) \cdot |{(g^{-1})'(y)}|$
- Prove $E[X] = 1/\lambda$ and $\operatorname{Var}(X) = 1/\lambda^2$ for Exponential from the integral definition

**Proof Skill Focus:** The memoryless uniqueness proof is a functional equation argument — this is the first time students encounter characterization theorems in probability.

**Why this week matters:** The memoryless property is the continuous analog of the geometric distribution — students should see this bridge explicitly. Characterization theorems (uniqueness proofs for distributional properties) are a central technique in advanced probability.

**Problem set includes:**

- Prove uniqueness of the memoryless distribution (functional equation method)
- Compute the PDF of $Y = X^2$ where $X \sim \text{Uniform}(0,1)$
- Prove the Normal density integrates to 1 using the Gaussian integral $\int_{-\infty}^\infty e^{-x^2/2}\,dx = \sqrt{2\pi}$

---

## Week 10 — Joint Distributions and Multivariate Random Variables

**Topics**

- Joint PMF and joint PDF
- Marginal distributions by summing/integrating out
- Conditional distributions: $f_{X|Y}(x|y) = f_{X,Y}(x,y)/f_Y(y)$
- Independence of random variables: joint factorization $f_{X,Y}(x,y) = f_X(x)f_Y(y)$
- Functions of several random variables; convolution

**Proof Targets**

- Prove: $X \perp Y$ iff $f_{X,Y}(x,y) = f_X(x)f_Y(y)$ for all $x,y$
- Prove: $X \perp Y$ implies $E[XY] = E[X]E[Y]$
- Derive the convolution formula for $Z = X + Y$ with $X, Y$ independent
- Prove that the sum of two independent Normal random variables is Normal (via convolution or MGF)

**Proof Skill Focus:** Independence is a *global factorization property of the joint law* — not a local numerical coincidence. The direction $E[XY] = E[X]E[Y]$ does not imply independence; this must be demonstrated by counterexample.

**Why this week matters:** Multivariate probability is where the subject becomes genuinely powerful. Every result from here onward — conditioning, limit laws, stochastic processes — depends on understanding joint distributions and independence at this level.

**Problem set includes:**

- Prove: $E[XY] = E[X]E[Y]$ does not imply $X \perp Y$ (explicit counterexample required)
- Derive the marginals from a given joint PDF and verify they integrate to 1
- Prove the sum of two independent Poisson random variables is Poisson

---

## Week 11 — Conditional Expectation

**Topics**

- Conditional expectation $E[X \mid Y = y]$ as a function of $y$
- $E[X \mid Y]$ as a random variable
- Law of total expectation: $E[X] = E[E[X \mid Y]]$
- Law of total variance: $\operatorname{Var}(X) = E[\operatorname{Var}(X|Y)] + \operatorname{Var}(E[X|Y])$
- Conditional expectation as best prediction given partial information

**Proof Targets**

- Prove the law of total expectation from the definition of conditional expectation
- Prove the law of total variance
- Prove: $E[X \mid Y]$ minimizes $E[(X - g(Y))^2]$ over all functions $g$ (best predictor theorem)
- Compute $E[X \mid Y]$ in explicit discrete and continuous examples

**Proof Skill Focus:** $E[X \mid Y]$ is a *random variable*, not a number — this distinction is critical and must be made precise; the tower property is not obvious and must be proved; conditional expectation is the correct notion of "best guess given partial information."

**Why this week matters:** Conditional expectation is the most important concept in advanced probability. This elementary version is the foundation for martingales, Bayesian updating, stochastic processes, and the formal measure-theoretic definition in Probability II.

**Problem set includes:**

- Prove: $E[E[X|Y]] = E[X]$ carefully from the discrete joint distribution definition
- Compute $E[X|Y]$ for a non-trivial joint distribution and verify it is a function of $Y$
- Prove the best predictor theorem: $E[X|Y]$ minimizes mean squared error

---

## Week 12 — Inequalities and Tail Control

**Topics**

- Markov's inequality: $P(X \geq a) \leq E[X]/a$ for $X \geq 0$
- Chebyshev's inequality: $P(|X - \mu| \geq k\sigma) \leq 1/k^2$
- Union bound (Boole's inequality)
- Jensen's inequality for convex functions
- One-sided tail bounds and their sharpness

**Proof Targets**

- Prove Markov's inequality from the definition of expectation
- Prove Chebyshev's inequality as a corollary of Markov applied to $(X - \mu)^2$
- Prove Jensen's inequality: if $\varphi$ is convex, $\varphi(E[X]) \leq E[\varphi(X)]$
- Prove the union bound from countable subadditivity
- Show Markov and Chebyshev are sharp (exhibit distributions achieving equality)

**Proof Skill Focus:** Tail control via moment bounds; non-exact but structurally powerful reasoning; every inequality in probability is a statement about what distributions can and cannot do — sharpness proofs demonstrate the limits of each tool.

**Why this week matters:** Much of probability is not exact calculation but *bounding what is unlikely*. These inequalities are used in almost every proof in advanced probability and statistics. Students must not only apply them but understand why each hypothesis is necessary.

**Problem set includes:**

- Prove Chebyshev implies: $P(|X - \mu| \geq \epsilon) \to 0$ if $\operatorname{Var}(X)/\epsilon^2 \to 0$
- Construct a distribution achieving Markov equality
- Use Jensen's inequality to prove: $E[X^2] \geq (E[X])^2$; $E[e^X] \geq e^{E[X]}$

---

## Week 13 — Transforms and Sums of Independent Random Variables

**Topics**

- Moment generating function (MGF): $M_X(t) = E[e^{tX}]$
- Relationship between MGF and moments: $M_X^{(k)}(0) = E[X^k]$
- MGFs multiply under independence: $M_{X+Y}(t) = M_X(t)M_Y(t)$
- Probability generating functions (PGFs) for integer-valued random variables
- Using transforms to identify distributions and prove additivity

**Proof Targets**

- Prove $E[X^k] = M_X^{(k)}(0)$ (formal differentiation under expectation)
- Prove $M_{X+Y}(t) = M_X(t) \cdot M_Y(t)$ when $X \perp Y$
- Use MGFs to prove: sum of independent Normals is Normal
- Use MGFs to prove: sum of independent Poissons is Poisson
- Prove: if two distributions have identical MGFs on an open interval around 0, they are identical (state this as a fact; use without full proof)

**Proof Skill Focus:** Converting hard summation problems into transform algebra; recognizing independence as multiplicativity; MGFs as the algebraic shadow of distributions.

**Why this week matters:** Transforms convert the hard problem of characterizing sums of random variables into multiplication of functions. This is the clean algebraic engine behind the Central Limit Theorem and makes proofs of additivity clean and structural.

**Problem set includes:**

- Compute the MGF of Exponential and use it to derive all moments
- Prove additivity of Gamma distribution via MGFs
- Prove the MGF of $\bar{X}_n = (X_1 + \cdots + X_n)/n$ satisfies $M_{\bar{X}}(t) = [M_X(t/n)]^n$

---

## Week 14 — Law of Large Numbers and Central Limit Theorem

**Topics**

- Sample mean $\bar{X}_n = (X_1 + \cdots + X_n)/n$
- Weak Law of Large Numbers (WLLN): $\bar{X}_n \xrightarrow{P} \mu$
- Convergence in probability: formal definition
- Central Limit Theorem: statement, normalization, interpretation
- What CLT does and does not say; Normal approximation in practice

**Proof Targets**

- Prove WLLN: for iid $X_i$ with finite mean $\mu$ and variance $\sigma^2$:
$$P(|\bar{X}_n - \mu| > \epsilon) \leq \frac{\sigma^2}{n\epsilon^2} \to 0$$
  (via Chebyshev; proof from first principles)
- Prove: $E[\bar{X}_n] = \mu$ and $\operatorname{Var}(\bar{X}_n) = \sigma^2/n$
- State the CLT precisely: $\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \xrightarrow{d} N(0,1)$; identify what "convergence in distribution" means informally
- Demonstrate via MGF heuristic why normalization by $\sqrt{n}$ is correct

**Proof Skill Focus:** The WLLN proof is a complete, rigorous argument — students must write it cleanly with all hypotheses stated; CLT is stated as a theorem with precise hypotheses, not as a vague fact about bell curves.

**Why this week matters:** This is the philosophical center of the course. Individual randomness produces stable collective behavior. The LLN and CLT together explain why randomness is tractable — this is what makes probability a science, not just a collection of calculations.

**Problem set includes:**

- Write out the full WLLN proof with all hypotheses and logical steps
- Prove: $\operatorname{Var}(\bar{X}_n) = \sigma^2/n$ from independence and variance linearity
- Show via example that CLT approximation quality depends on the distribution of $X_i$
- Counterexample: exhibit iid random variables where WLLN holds but $E[X]$ does not exist (Cauchy distribution)

---

## Week 15 — Synthesis and Transition to Probability II

**Purpose:** No new content. Consolidate the logical architecture of the entire course.

**What to synthesize:**

| Concept | Precise definition |
|---|---|
| Events | Subsets of $\Omega$; assigned probability by $P$ via Kolmogorov axioms |
| Random variables | Functions $X : \Omega \to \mathbb{R}$; distribution derived from $P$ |
| Expectation | Weighted sum against PMF (discrete) or integral against PDF (continuous) |
| Variance | Second central moment; measures spread |
| Conditioning | Information update; $P(A|B)$ is a new probability measure on events given $B$ |
| Independence | Joint factorization of distributions |
| Limit laws | Aggregate behavior of large iid systems |

**Capstone proofs (select 2–3 for full reconstruction):**

- Bayes' theorem chain: law of total probability $\to$ Bayes
- Linearity of expectation $\to$ indicator method $\to$ non-trivial expectation computation
- Markov $\to$ Chebyshev $\to$ WLLN (the full chain)
- Law of total expectation and its application

**Transition to Probability II:** The next course will generalize each concept:

- $\sigma$-algebras formalize the event algebra
- Measure theory formalizes integration / expectation
- Conditional expectation $E[X|\mathcal{G}]$ becomes a theorem (Radon–Nikodym)
- Almost sure convergence, $L^p$ convergence require measure-theoretic language
- Martingales formalize the conditioning-as-information idea

---

## Required Theorem Spine

### Axioms and Events

| Theorem | Status |
|---|---|
| $P(A^c) = 1 - P(A)$ | Must prove |
| Monotonicity: $A \subseteq B \Rightarrow P(A) \leq P(B)$ | Must prove |
| Inclusion-exclusion ($n$ sets) | Must prove |
| Continuity of probability | Must prove |

### Random Variables and Expectation

| Theorem | Status |
|---|---|
| CDF properties (nondecreasing, right-continuous) | Must prove |
| Linearity of expectation | Must prove |
| $E[\mathbf{1}_A] = P(A)$ | Must prove |
| LOTUS (discrete and continuous) | Must prove |
| Variance identity $\operatorname{Var}(X) = E[X^2] - (E[X])^2$ | Must prove |
| Variance additivity under independence | Must prove |
| $|\operatorname{Corr}(X,Y)| \leq 1$ | Must prove |

### Distributions

| Theorem | Status |
|---|---|
| Poisson as binomial limit | Must prove |
| Geometric memoryless property | Must prove |
| Exponential memoryless property + uniqueness | Must prove |

### Conditioning and Independence

| Theorem | Status |
|---|---|
| Bayes' theorem | Must prove |
| Law of total probability | Must prove |
| $X \perp Y \Leftrightarrow$ joint factorization | Must prove |
| Law of total expectation | Must prove |
| Law of total variance | Must prove |
| Best predictor theorem for $E[X|Y]$ | Must prove |

### Inequalities and Limit Laws

| Theorem | Status |
|---|---|
| Markov's inequality | Must prove |
| Chebyshev's inequality | Must prove |
| Jensen's inequality | Must prove |
| MGF factorization under independence | Must prove |
| WLLN via Chebyshev | Must prove |

---

## Assessment Structure

### Midterm (≈ Week 8)

Covers: Kolmogorov axioms through continuous distributions.

- 2 full theorem proofs (e.g. Bayes', law of total expectation, LOTUS)
- 2 definition-based short proofs
- 2 counterexample problems (independence, uncorrelated $\not\Rightarrow$ independent)
- 1 modeling problem with justification of distribution choice

### Final Exam

Full semester; emphasis on Weeks 9–14.

- 3 major proof problems (must include WLLN chain)
- 2 "state precisely and apply" problems
- 2 counterexample problems
- 1 synthesis question connecting two theorem chains

---

> **The unifying principle of the course:**
> Probability is assigned to events. Random variables are functions. Expectation is integration. Conditioning is information management. Limit laws explain why randomness becomes predictable in aggregate.
