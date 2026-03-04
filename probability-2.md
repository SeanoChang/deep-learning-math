# Probability II: Convergence, Conditioning, and Stochastic Processes

**15-Week Rigorous Proof-Based Sequence — Semester 2**

> **Course philosophy:** Advanced probability is the study of how information, dependence, and asymptotics shape uncertainty. This course develops the mature version of every concept from Probability I — convergence has multiple meanings, conditioning is a theorem not a formula, and stochastic processes are probability measures on paths.

**Primary text:** Durrett, *Probability: Theory and Examples* (Ch. 1–5) | **Supplement:** Blitzstein & Hwang (advanced chapters) | **Reference:** Billingsley, *Probability and Measure*

**Prerequisites:** Full Probability I content; single-variable calculus; linear algebra; proof maturity. Familiarity with $\epsilon$-$\delta$ arguments and series convergence essential.

---

## Semester Goal

Generalize every major concept from Probability I into its precise, mature form. The conceptual spine is:

$$\text{modes of convergence} \to \text{almost sure behavior} \to \text{conditional expectation as structure} \to \text{martingales} \to \text{random processes} \to \text{CLT via characteristic functions}$$

---

## Course-Wide Learning Objectives

By the end of this course, students must be able to:

1. Define and distinguish almost sure, in-probability, in-distribution, and $L^p$ convergence with full logical precision
2. Prove the implication chain between convergence modes and produce counterexamples to non-implications
3. Apply the Borel–Cantelli lemmas to establish almost sure behavior of event sequences
4. Define conditional expectation $E[X \mid \mathcal{G}]$ as a random variable and prove its key properties
5. Define and work with discrete-time martingales; prove the optional stopping theorem under standard hypotheses
6. Analyze simple random walk, Poisson processes, and finite Markov chains rigorously
7. Prove the Strong LLN (under finite fourth moment or via Borel–Cantelli) and the CLT via characteristic functions
8. Apply Chernoff bounds and sub-Gaussian concentration inequalities
9. Recognize where measure-theoretic formalism is required and read measure-theoretic probability at an introductory level

---

## Milestone Structure

| Milestone | Weeks | Gate theorem |
|---|---|---|
| **M1: Convergence theory** | 1–3 | Full implication chain + counterexample suite |
| **M2: Almost sure behavior** | 4 | First and second Borel–Cantelli lemmas |
| **M3: Conditional expectation** | 5 | Tower property; best predictor theorem |
| **M4: Martingales** | 6 | Optional stopping theorem |
| **M5: Random processes** | 7–10 | Recurrence of SRW; Markov chain convergence |
| **M6: Concentration** | 11 | Chernoff bound |
| **M7: Limit theorems** | 12–13 | SLLN; CLT via characteristic functions |
| **M8: Synthesis** | 14–15 | Full proof reconstruction across all blocks |

---

## Week 1 — Review Through Structure: What Probability I Built

**Topics**

- Random variables as measurable functions (informal presentation; $\sigma$-algebra as the correct event-algebra generalization)
- Expectation as integration: $E[X] = \int X\,dP$ (informal measure-theoretic framing)
- The four views from Probability I: sample space / random variable / computational / structural
- Why the course must generalize: What does $X_n \to X$ mean? In what sense?
- Preview of the semester's spine

**Proof Targets**

- Re-prove: $E[X] = \int_0^\infty P(X > t)\,dt$ for non-negative $X$ (layer-cake representation)
- Re-prove WLLN and identify its weaknesses (finite variance assumed; convergence only in probability)
- State precisely what "almost sure," "in probability," and "in distribution" would mean before defining them formally

**Proof Skill Focus:** Framing every concept from Probability I as a special case of something more general; identifying which proofs from Semester 1 secretly used measure-theoretic ideas.

**Why this week matters:** Students must enter the semester knowing what is being generalized and why. The layer-cake formula is the first hint that expectation is genuinely an integral — a fact that Probability II will make precise.

---

## Week 2 — Modes of Convergence

**Topics**

- Almost sure (a.s.) convergence: $P(X_n \to X) = 1$
- Convergence in probability: $P(|X_n - X| > \epsilon) \to 0$ for all $\epsilon > 0$
- Convergence in distribution: $F_{X_n}(x) \to F_X(x)$ at all continuity points of $F_X$
- $L^p$ convergence: $E[|X_n - X|^p] \to 0$
- The correct quantifier structure for each definition

**Proof Targets**

- Prove: a.s. convergence implies convergence in probability
- Prove: convergence in probability implies convergence in distribution
- Prove: $L^p$ convergence implies convergence in probability (via Markov)
- Prove: a.s. convergence does NOT imply $L^1$ convergence (exhibit counterexample)

**Proof Skill Focus:** Quantifier-level precision is mandatory — the difference between a.s. and in-probability is entirely a matter of quantifier order ($\forall \epsilon$ inside or outside $\limsup$); students must write definitions without ambiguity.

**Why this week matters:** Without distinguishing these modes, every statement about "convergence" in probability is ambiguous. These definitions are the foundation of all limit theorems: LLN and CLT have different modes, and confusing them is a systematic error.

**Problem set includes:**

- Write out all four definitions in full quantifier form
- Prove a.s. $\Rightarrow$ in probability using the $\limsup$ characterization
- Construct: $X_n \to 0$ in probability but $X_n \not\to 0$ a.s. (typewriter sequence)

---

## Week 3 — Relations Among Convergence Modes and Counterexamples

**Topics**

- Full implication diagram between convergence modes
- Uniform integrability and $L^1$ convergence (sufficient condition for upgrading in-probability to $L^1$)
- Subsequence criterion for a.s. convergence from in-probability
- Slutsky's theorem (statement and application)
- Continuous mapping theorem (statement)

**Proof Targets**

- Prove: if $X_n \xrightarrow{P} X$, then there exists a subsequence $X_{n_k} \xrightarrow{a.s.} X$
- Prove Slutsky's theorem: if $X_n \xrightarrow{d} X$ and $Y_n \xrightarrow{P} c$ (constant), then $X_n + Y_n \xrightarrow{d} X + c$
- Prove: $L^2$ convergence implies $L^1$ convergence (Cauchy–Schwarz)
- Exhibit all four non-implications in the convergence hierarchy with explicit examples

**Proof Skill Focus:** The subsequence extraction argument is a key proof technique; constructing a clean counterexample suite (one for each failed implication) requires understanding the exact role of each hypothesis.

**Why this week matters:** Students must be able to look at any convergence claim and immediately know what is being asserted, what it implies, and what it does not imply. This fluency is prerequisite for every proof in the rest of the course.

**Problem set includes:**

- Complete the full implication diagram with proofs for each arrow that holds
- Construct explicit counterexamples for every arrow that fails
- Apply Slutsky to a CLT conclusion to derive a new limit result

---

## Week 4 — Borel–Cantelli Lemmas and Almost Sure Behavior

**Topics**

- $\limsup$ of events: $\{A_n \text{ i.o.}\} = \bigcap_{n=1}^\infty \bigcup_{k=n}^\infty A_k$
- First Borel–Cantelli lemma: $\sum P(A_n) < \infty \Rightarrow P(A_n \text{ i.o.}) = 0$
- Second Borel–Cantelli lemma: if $A_n$ independent and $\sum P(A_n) = \infty$, then $P(A_n \text{ i.o.}) = 1$
- Applications: almost sure convergence; strong LLN intuition; repeated rare events

**Proof Targets**

- Prove the First Borel–Cantelli lemma (using countable subadditivity + tail bound)
- Prove the Second Borel–Cantelli lemma (using independence; the core inequality $1-x \leq e^{-x}$)
- Application: prove that if $X_n \xrightarrow{P} X$ and $\sum P(|X_n - X| > \epsilon) < \infty$ for all $\epsilon$, then $X_n \xrightarrow{a.s.} X$
- Use Borel–Cantelli to prove: for iid standard Normals, $P(\limsup X_n/\sqrt{2 \log n} = 1) = 1$ (statement only; prove the $\leq 1$ direction)

**Proof Skill Focus:** $\limsup$ of events requires careful set-theoretic manipulation; both lemmas have simple-looking proofs that conceal deep content — students must understand why independence is essential for the second lemma.

**Why this week matters:** Borel–Cantelli is the key tool for upgrading from convergence in probability to almost sure convergence, and it controls the recurrence/transience of random events. It is used in virtually every proof of the Strong LLN.

**Problem set includes:**

- Prove the First Borel–Cantelli lemma from axioms
- Prove the Second Borel–Cantelli lemma; explain exactly where independence is used
- Exhibit: $\sum P(A_n) = \infty$ but $P(A_n \text{ i.o.}) = 0$ when independence fails

---

## Week 5 — Conditional Expectation as Structure

**Topics**

- $E[X \mid \mathcal{G}]$ as the unique $\mathcal{G}$-measurable random variable satisfying $E[E[X|\mathcal{G}]\mathbf{1}_G] = E[X\mathbf{1}_G]$ for all $G \in \mathcal{G}$
- $\sigma$-algebra $\mathcal{G}$ as encoding "partial information"
- Tower property: $E[E[X|\mathcal{G}_1]|\mathcal{G}_2] = E[X|\mathcal{G}_2]$ when $\mathcal{G}_2 \subseteq \mathcal{G}_1$
- Conditional expectation as orthogonal projection in $L^2$
- Properties: linearity, monotonicity, Jensen, taking out known factors

**Proof Targets**

- Prove the tower property from the defining integral condition
- Prove: $E[XY|\mathcal{G}] = Y \cdot E[X|\mathcal{G}]$ when $Y$ is $\mathcal{G}$-measurable ("taking out known factors")
- Prove: $E[E[X|\mathcal{G}]] = E[X]$ (law of total expectation as a special case of tower)
- Prove: $E[X|\mathcal{G}]$ minimizes $E[(X - Z)^2]$ over all $\mathcal{G}$-measurable $Z$ (orthogonal projection in $L^2$)
- Prove conditional Jensen's inequality: $\varphi(E[X|\mathcal{G}]) \leq E[\varphi(X)|\mathcal{G}]$ for convex $\varphi$

**Proof Skill Focus:** The defining property of conditional expectation is an integral condition — students must prove consequences from this definition, not from intuition; the $L^2$ projection viewpoint connects probability to linear algebra.

**Why this week matters:** This is the most important and most misunderstood concept in the course. The measure-theoretic definition subsumes every elementary version. Martingales, Markov property, stochastic control, and Bayesian analysis all rest on this definition being understood precisely.

**Problem set includes:**

- Prove the tower property from the integral definition
- Prove conditional Jensen's inequality
- Show: in the discrete case, $E[X|\mathcal{G}]$ reduces to the elementary conditional expectation formula
- Prove: if $X \perp \mathcal{G}$, then $E[X|\mathcal{G}] = E[X]$

---

## Week 6 — Discrete-Time Martingales

**Topics**

- Filtration $\{\mathcal{F}_n\}$: increasing sequence of $\sigma$-algebras (information accumulation)
- Martingale: adapted process with $E[X_{n+1}|\mathcal{F}_n] = X_n$
- Submartingale and supermartingale
- Martingale examples: partial sums of mean-zero iid; products of mean-one iid; Doob's martingale
- Optional stopping theorem (OST): hypotheses and conclusion

**Proof Targets**

- Prove: if $X_n$ is a martingale, then $E[X_n] = E[X_0]$ for all $n$
- Prove: $\varphi(X_n)$ is a submartingale when $X_n$ is a martingale and $\varphi$ is convex (conditional Jensen)
- Prove the Optional Stopping Theorem under the bounded stopping time hypothesis: if $\tau \leq N$ a.s. then $E[X_\tau] = E[X_0]$
- Prove: $E[X_\tau] = E[X_0]$ fails without appropriate hypotheses (exhibit counterexample: simple random walk with $\tau = $ hitting time of level 1)

**Proof Skill Focus:** The martingale condition is a statement about conditional expectation — every proof must use the tower property and the adapted/measurability conditions precisely; the OST is a theorem with hypotheses that cannot be dropped.

**Why this week matters:** Martingales are the correct mathematical model for fair games, optimal stopping, Bayesian posterior sequences, and many convergence theorems. The OST is one of the most useful results in applied probability.

**Problem set includes:**

- Prove $E[X_n] = E[X_0]$ for martingales using tower property by induction
- Verify Doob's martingale: $M_n = E[Z|\mathcal{F}_n]$ is a martingale
- Apply OST to compute expected stopping times for simple random walk
- Exhibit a martingale where OST fails without boundedness (Wald's counterexample)

---

## Week 7 — Simple Random Walk

**Topics**

- Simple symmetric random walk on $\mathbb{Z}$: $S_n = X_1 + \cdots + X_n$, $X_i$ iid $\pm 1$
- Hitting times and hitting probabilities
- Gambler's ruin problem: exact solution via martingale/harmonic function methods
- Recurrence of symmetric random walk (and transience in dimension $\geq 3$, stated)
- Reflection principle and its applications

**Proof Targets**

- Prove: $S_n$ is a martingale; $S_n^2 - n$ is a martingale
- Derive gambler's ruin probabilities using the OST applied to $S_n$
- Prove: symmetric random walk on $\mathbb{Z}$ is recurrent ($P(S_n = 0 \text{ i.o.}) = 1$) using Borel–Cantelli or Chung–Fuchs
- Prove the reflection principle: $P(\max_{k \leq n} S_k \geq a) = 2P(S_n \geq a) - P(S_n = a)$

**Proof Skill Focus:** The random walk is the most important concrete stochastic process — every proof here combines martingale structure, Borel–Cantelli, and exact combinatorial arguments; the gambler's ruin is a complete application of OST.

**Why this week matters:** Random walk is the discrete prototype for Brownian motion and diffusion. Recurrence/transience is the first deep result about the long-run behavior of a process, not just its expectation.

**Problem set includes:**

- Full gambler's ruin solution using martingale methods
- Prove $S_n^2 - n$ is a martingale and use it to compute $E[\tau_a]$
- Prove recurrence of SRW using the second Borel–Cantelli or Chung–Fuchs theorem
- Apply reflection principle to compute the distribution of the maximum of $S_n$

---

## Week 8 — Poisson Processes

**Topics**

- Counting process definition: $N(t) = $ number of events in $[0,t]$
- Three equivalent definitions: (1) independent increments + Poisson marginals; (2) exponential interarrival times; (3) independent increments + stationarity + no simultaneous events
- Superposition and thinning of Poisson processes
- Conditional structure: given $N(t) = n$, event times are order statistics of Uniform$[0,t]$

**Proof Targets**

- Prove equivalence of two of the three definitions (at least the exponential interarrival $\leftrightarrow$ independent increments direction)
- Prove: superposition of two independent Poisson processes with rates $\lambda_1, \lambda_2$ is Poisson with rate $\lambda_1 + \lambda_2$
- Prove: thinning a Poisson process with probability $p$ yields a Poisson process with rate $\lambda p$
- Prove the conditional uniformity: given $N(t) = n$, the $n$ event times are uniform order statistics on $[0,t]$

**Proof Skill Focus:** Each definition of the Poisson process encodes different structural properties — students must see why the definitions are equivalent rather than just working from one arbitrarily chosen definition.

**Why this week matters:** The Poisson process is the fundamental continuous-time stochastic process. Its structural properties (memoryless, independent increments) are paradigmatic and appear throughout queueing theory, reliability, finance, and neuroscience.

**Problem set includes:**

- Prove superposition theorem from the generating function definition
- Derive the distribution of the $k$-th arrival time (Gamma distribution)
- Prove the conditional uniformity property
- Show the Poisson process satisfies $E[N(t)] = \lambda t$ and $\operatorname{Var}(N(t)) = \lambda t$

---

## Week 9 — Finite-State Markov Chains: Structure

**Topics**

- Markov property: $P(X_{n+1} = j \mid X_0, \ldots, X_n) = P(X_{n+1} = j \mid X_n)$
- Transition matrix $P$; $n$-step transitions via matrix powers $P^n$
- Communication classes; irreducibility
- Period of a state; aperiodic chains
- Recurrent vs transient states: definition and first criteria

**Proof Targets**

- Prove the Chapman–Kolmogorov equations: $P^{m+n} = P^m P^n$
- Prove: if state $i$ communicates with state $j$, they have the same period
- Prove: in a finite irreducible chain, all states are recurrent
- Prove: $i$ is recurrent iff $\sum_{n=0}^\infty P^n_{ii} = \infty$ (recurrence criterion)

**Proof Skill Focus:** Markov chains combine linear algebra (matrix powers), probability (conditional distributions), and long-run analysis — the recurrence criterion is a non-trivial equivalence between a probabilistic definition and an analytic series condition.

**Why this week matters:** Markov chains are the most broadly applicable stochastic process model. The structure theory (communication, period, recurrence) determines whether and how the chain has long-run stable behavior.

**Problem set includes:**

- Prove Chapman–Kolmogorov equations
- Classify states of an explicit Markov chain (communication classes, periods, recurrence)
- Prove: all states in a finite irreducible chain are recurrent
- Construct a chain that is irreducible but periodic, and explain why the stationary distribution still exists

---

## Week 10 — Markov Chains: Stationary Distributions and Convergence

**Topics**

- Stationary distribution $\pi$: $\pi P = \pi$, $\sum_j \pi_j = 1$
- Existence and uniqueness for finite irreducible aperiodic chains
- Detailed balance (reversibility): $\pi_i P_{ij} = \pi_j P_{ji}$
- Convergence theorem: $P^n_{ij} \to \pi_j$ for irreducible aperiodic chains
- Ergodic theorem for Markov chains: time average equals space average

**Proof Targets**

- Prove existence of a stationary distribution for finite irreducible chains (Perron–Frobenius or direct fixed-point argument)
- Prove uniqueness of stationary distribution for finite irreducible chains
- Prove: detailed balance implies stationarity (the converse fails; exhibit counterexample)
- Prove the ergodic theorem: $\frac{1}{n}\sum_{k=0}^{n-1} f(X_k) \to \sum_j f(j)\pi_j$ a.s. for bounded $f$
- State the convergence theorem and prove it for $2 \times 2$ irreducible aperiodic chains explicitly

**Proof Skill Focus:** Connecting matrix algebra (eigenvectors of $P$) to probabilistic structure (long-run frequencies); the ergodic theorem is the Markov chain version of the Strong LLN — this connection must be made explicit.

**Why this week matters:** Stationary distributions are the long-run description of a Markov chain. This is foundational for Monte Carlo methods, statistical physics, and Markov chain Monte Carlo (MCMC) — among the most widely used computational tools in science.

**Problem set includes:**

- Prove detailed balance implies stationarity; construct a chain that is stationary but not reversible
- Find stationary distributions of explicitly given chains
- Prove uniqueness from irreducibility using a coupling or spectral argument
- Apply the ergodic theorem to compute long-run averages for a concrete chain

---

## Week 11 — Concentration Inequalities

**Topics**

- Revisit Markov and Chebyshev as first-generation bounds
- MGF method and Chernoff bounds: $P(X \geq t) \leq \inf_\theta e^{-\theta t} E[e^{\theta X}]$
- Sub-Gaussian random variables: $E[e^{\theta(X - \mu)}] \leq e^{\theta^2 \sigma^2/2}$
- Hoeffding's inequality for bounded independent random variables
- Comparison: Chebyshev vs Chernoff (exponential vs polynomial tail decay)

**Proof Targets**

- Derive the Chernoff bound from MGF optimization
- Prove Hoeffding's lemma: if $X \in [a,b]$ and $E[X] = 0$, then $E[e^{\theta X}] \leq e^{\theta^2(b-a)^2/8}$
- Prove Hoeffding's inequality for sums of bounded independent random variables
- Demonstrate: Chernoff gives exponential tails while Chebyshev gives polynomial tails — exhibit the gap explicitly

**Proof Skill Focus:** The Chernoff method is a variational argument — optimizing over $\theta$ — that produces exponentially tight bounds; Hoeffding's lemma requires a careful Taylor expansion argument; students must understand why the improvement over Chebyshev is both important and not free (requires bounded/sub-Gaussian assumptions).

**Why this week matters:** Exponential concentration inequalities are the foundation of modern statistical learning theory, randomized algorithms, and high-dimensional probability. The difference between $O(1/n)$ and $O(e^{-cn})$ tail bounds determines which algorithms work at scale.

**Problem set includes:**

- Prove the Chernoff bound from scratch
- Prove Hoeffding's lemma using the convexity of $e^{\theta x}$
- Compare Chebyshev and Hoeffding bounds numerically for the sample mean of Bernoulli random variables
- Apply Hoeffding to prove: for bounded iid $X_i$, $P(|\bar X_n - \mu| \geq \epsilon) \leq 2e^{-2n\epsilon^2/(b-a)^2}$

---

## Week 12 — Strong Law of Large Numbers

**Topics**

- Strong Law of Large Numbers: $\bar{X}_n \xrightarrow{a.s.} \mu$ for iid $X_i$ with $E[|X_1|] < \infty$
- Proof strategy via Borel–Cantelli and truncation (under fourth moment)
- The gap between WLLN and SLLN: what additional work is required
- Consequences: empirical distribution, time averages, Monte Carlo justification

**Proof Targets**

- Prove SLLN under finite fourth moment: use $E[(S_n - n\mu)^4] = O(n^2)$, then Markov + Borel–Cantelli along $n^2$ subsequence, then interpolate
- Prove: a.s. convergence of $\bar{X}_{n^2}$ along subsequence implies a.s. convergence for all $n$ (monotone interpolation for iid non-negative variables)
- Prove: if $X_i$ iid with $E[X_i] = \infty$, then $\bar{X}_n \to \infty$ a.s.
- State the full SLLN (finite mean sufficient) and discuss where the fourth-moment proof breaks down

**Proof Skill Focus:** The SLLN proof requires chaining Borel–Cantelli + subsequence extraction + interpolation — this is a multi-step structural argument, not a computation; students must be able to identify which step uses which tool.

**Why this week matters:** The SLLN is the rigorous foundation of empirical averages, Monte Carlo simulation, and statistical consistency. It is also the first proof in the course where the full power of Borel–Cantelli, moment bounds, and subsequence arguments are combined.

**Problem set includes:**

- Write out the full fourth-moment SLLN proof with all steps labeled
- Prove: $\bar{X}_n \to \infty$ a.s. when $E[X_i] = \infty$ and $X_i \geq 0$
- Apply SLLN to justify a Monte Carlo estimator rigorously
- Prove: SLLN $\Rightarrow$ WLLN (as a logical implication between theorems)

---

## Week 13 — Central Limit Theorem via Characteristic Functions

**Topics**

- Characteristic functions: $\varphi_X(t) = E[e^{itX}]$
- Properties: $|\varphi_X(t)| \leq 1$; $\varphi_X(0) = 1$; continuity; factorization under independence
- Uniqueness theorem: distribution is determined by its characteristic function (state; proof requires Fourier analysis background)
- CLT proof: expansion $\varphi_X(t) = 1 - \frac{t^2\sigma^2}{2n} + o(1/n)$; convergence to $e^{-t^2\sigma^2/2}$
- Lévy's continuity theorem: pointwise convergence of characteristic functions implies convergence in distribution (state without proof)

**Proof Targets**

- Prove basic properties of characteristic functions: $\varphi_{X+Y}(t) = \varphi_X(t)\varphi_Y(t)$ under independence
- Prove: $\varphi_X^{(k)}(0) = i^k E[X^k]$ (connection to moments)
- Prove CLT: if $X_i$ iid with mean $\mu$, variance $\sigma^2$, then $\frac{\sqrt{n}(\bar{X}_n - \mu)}{\sigma} \xrightarrow{d} N(0,1)$, using characteristic function expansion + Lévy's theorem
- Verify: the characteristic function of $N(0,1)$ is $e^{-t^2/2}$

**Proof Skill Focus:** The CLT proof via characteristic functions is a complete rigorous argument — students must expand $\varphi(t/\sqrt{n})$ to second order, take the $n$-th power, and use Lévy's theorem; the universality of the CLT is a consequence of the second-order expansion, not a miracle.

**Why this week matters:** Characteristic functions are the most powerful tool for proving limit theorems. The CLT proof via them reveals exactly *why* the Normal distribution appears — the quadratic term in the expansion is universal, and higher-order terms vanish. This is the correct understanding of universality.

**Problem set includes:**

- Prove $\varphi_{X+Y} = \varphi_X \varphi_Y$ under independence
- Prove the CLT via characteristic functions with all steps written out
- Show: the CLT normalization must be $\sqrt{n}$ by scaling argument
- Exhibit a distribution where CLT fails (Cauchy: no second moment) and explain which step of the proof breaks

---

## Week 14 — Statistical Connections and Transition Concepts

**Topics**

- Estimation as random variable construction: estimators as functions of a sample
- Bias, variance, and mean squared error of an estimator
- Consistency: $\hat\theta_n \xrightarrow{P} \theta$ (WLLN as the foundational consistency result)
- Asymptotic normality: $\sqrt{n}(\hat\theta_n - \theta) \xrightarrow{d} N(0, \sigma^2)$ (CLT as the foundational asymptotic normality result)
- Confidence intervals from CLT
- Introduction to measure-theoretic probability: $\sigma$-algebras, measures, measurable functions, Lebesgue integral as the rigorous foundation of expectation

**Proof Targets**

- Prove: the sample mean is unbiased ($E[\bar{X}_n] = \mu$) and consistent ($\bar{X}_n \xrightarrow{P} \mu$)
- Prove: the sample variance $S_n^2 = \frac{1}{n-1}\sum(X_i - \bar{X}_n)^2$ is unbiased
- Prove: asymptotic normality of $\bar{X}_n$ via CLT and delta method (if $g$ differentiable: $\sqrt{n}(g(\bar{X}_n) - g(\mu)) \xrightarrow{d} N(0, [g'(\mu)]^2\sigma^2)$)
- State and explain: measure-theoretic expectation as $\int X\,dP$ subsumes both discrete sums and Riemann integrals

**Proof Skill Focus:** Statistical inference is a direct application of limit theory — consistency is WLLN; asymptotic normality is CLT; students should see statistics as applied probability, not a separate subject.

**Why this week matters:** This week bridges the course to statistical theory, showing that every fundamental statistical result (bias, consistency, confidence intervals) is a theorem in probability. It also formally introduces the measure-theoretic language that the student will encounter in any advanced probability course.

**Problem set includes:**

- Prove sample mean consistency from WLLN
- Prove unbiasedness of $S_n^2$
- Apply the delta method to derive the asymptotic distribution of $1/\bar{X}_n$
- State the Radon–Nikodym theorem and explain its role as the foundation of conditional expectation

---

## Week 15 — Synthesis and Transition to Measure-Theoretic Probability

**Purpose:** Consolidate the full probabilistic architecture across both semesters.

**What to synthesize:** The generalization chain from Probability I to Probability II:

| Probability I | Probability II generalization |
|---|---|
| $P(A \mid B)$ | $E[X \mid \mathcal{G}]$ via Radon–Nikodym |
| Convergence in probability | a.s., $L^p$, in distribution — fully distinguished |
| WLLN (Chebyshev) | SLLN (Borel–Cantelli + 4th moment) |
| CLT (MGF heuristic) | CLT (characteristic function proof) |
| Discrete Markov chains | General Markov processes |
| Elementary conditioning | Martingale theory |
| Independence as factorization | Independence of $\sigma$-algebras |

**Capstone proofs (select 2–3 for full reconstruction):**

- Full SLLN proof (fourth-moment method)
- CLT via characteristic functions
- Optional stopping theorem with all hypotheses verified
- Chernoff bound derivation

**Transition to measure-theoretic probability:** The next course (Real Analysis + Measure Theory + Durrett Ch. 1) will formalize:

- $\sigma$-algebras as the correct domain of events
- Lebesgue integral as the unified definition of expectation
- Conditional expectation via Radon–Nikodym theorem
- Martingale convergence theorem
- Weak convergence and tightness

**Final message:** Advanced probability is the study of how information, dependence, and asymptotics shape uncertainty. Every theorem in this course is about controlling what a random system can and cannot do — over time, in aggregate, and under partial information.

---

## Required Theorem Spine

### Convergence Theory

| Theorem | Status |
|---|---|
| a.s. $\Rightarrow$ in probability | Must prove |
| In probability $\Rightarrow$ in distribution | Must prove |
| $L^p \Rightarrow$ in probability | Must prove |
| Subsequence extraction: in-prob $\Rightarrow$ a.s. subseq | Must prove |
| All four non-implications (with counterexamples) | Must prove |

### Almost Sure Behavior

| Theorem | Status |
|---|---|
| First Borel–Cantelli lemma | Must prove |
| Second Borel–Cantelli lemma | Must prove |

### Conditional Expectation and Martingales

| Theorem | Status |
|---|---|
| Tower property | Must prove |
| Taking out known factors | Must prove |
| Best predictor theorem ($L^2$ projection) | Must prove |
| Conditional Jensen's inequality | Must prove |
| $E[X_n] = E[X_0]$ for martingales | Must prove |
| Optional Stopping Theorem (bounded case) | Must prove |

### Random Processes

| Theorem | Status |
|---|---|
| Gambler's ruin via martingale/OST | Must prove |
| Recurrence of simple random walk | Must prove |
| Chapman–Kolmogorov equations | Must prove |
| Stationary distribution existence + uniqueness | Must prove |
| Ergodic theorem for finite Markov chains | Must prove |
| Poisson process superposition + thinning | Must prove |

### Concentration and Limit Theorems

| Theorem | Status |
|---|---|
| Chernoff bound | Must prove |
| Hoeffding's inequality | Must prove |
| SLLN (fourth-moment proof) | Must prove |
| CLT via characteristic functions | Must prove |
| Delta method | Must prove |

---

## Assessment Structure

### Midterm (≈ Week 8)

Covers: convergence modes; Borel–Cantelli; conditional expectation; martingales; random walk; Poisson process.

- 2 full theorem proofs (e.g. Borel–Cantelli, OST)
- 1 convergence mode counterexample suite
- 2 process analysis problems (gambler's ruin; Poisson process)
- 1 conditional expectation computation with justification

### Final Exam

Full semester; emphasis on Weeks 9–14.

- 3 major proof problems (must include SLLN or CLT)
- 2 process analysis problems (Markov chain stationary distribution; concentration bound application)
- 2 counterexample problems
- 1 synthesis question connecting martingale theory, Borel–Cantelli, and limit theorems

---

> **The unifying principle of the course:**
> Every major theorem in probability is a theorem about controlling what random systems can do — in the long run, under partial information, and in aggregate. Rigor is not decoration; it is the tool that separates correct from plausible.
