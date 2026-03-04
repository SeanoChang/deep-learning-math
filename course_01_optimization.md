# Course 1: Optimization and Numerical Thinking
**15-Week Rigorous Sequence — The Engine of All Modern ML**

> **Course philosophy:** Every machine learning algorithm is an optimization algorithm. The model is the parameterization; the loss is the objective; training is the search. If you cannot reason about gradients, curvature, convergence, and stability, you cannot reason about learning. This course builds that language from first principles.

**Primary text:** Boyd & Vandenberghe, *Convex Optimization* | **Supplement:** Nocedal & Wright, *Numerical Optimization* | **Reference:** Bertsekas, *Nonlinear Programming*

---

## Course Goal

Build the mathematical machinery of optimization well enough that the student can derive, analyze, and critique any training algorithm encountered in ML or DL. The conceptual spine is:

$$\text{objectives} \to \text{gradients} \to \text{convexity} \to \text{unconstrained methods} \to \text{stochastic methods} \to \text{constrained optimization} \to \text{nonconvex landscapes} \to \text{modern adaptive methods}$$

---

## Week 1 — Objective Functions and the Optimization Framing

**Topics**
- What is an optimization problem: $\min_{x \in \mathcal{X}} f(x)$
- Decision variables, objective functions, feasible sets
- Local vs global minima; infima vs minima
- Existence of minimizers: Weierstrass extreme value theorem
- Examples from ML: least squares, maximum likelihood, empirical risk

**Derivation Targets**
- Formulate linear regression as an optimization problem and derive the normal equations
- Show that maximum likelihood for a Gaussian is equivalent to least squares
- Prove that a continuous function on a compact set attains its minimum

**Skill Focus:** Translating learning problems into optimization problems; distinguishing the model from the objective from the algorithm.

**Why this week matters:** Before you can optimize, you must formalize what you are optimizing. Students who skip this step confuse the loss function with the model, or the algorithm with the objective. This week makes those distinctions precise.

---

## Week 2 — Gradients, Jacobians, and First-Order Structure

**Topics**
- Gradient as the direction of steepest ascent
- Directional derivatives and the gradient's role
- Jacobian matrices for vector-valued functions
- Chain rule in multiple dimensions
- First-order necessary conditions: $\nabla f(x^*) = 0$
- Gradient fields and level sets

**Derivation Targets**
- Prove the gradient points in the direction of steepest ascent
- Derive the multivariable chain rule and connect to backpropagation preview
- Show first-order necessary conditions for unconstrained minima
- Compute gradients for common ML losses: squared error, cross-entropy, hinge loss

**Skill Focus:** Fluent gradient computation; geometric intuition for gradients as normal vectors to level sets.

**Why this week matters:** The gradient is the single most important object in all of machine learning optimization. Every training algorithm — from linear regression to transformer pretraining — ultimately reduces to following gradients. If the gradient is not second nature, nothing downstream works.

---

## Week 3 — Second-Order Structure: Hessians, Curvature, and Conditioning

**Topics**
- Hessian matrix: second-order partial derivatives
- Taylor expansion to second order
- Positive definite / semidefinite / indefinite classification
- Curvature and its effect on optimization difficulty
- Condition number: $\kappa = \lambda_{\max} / \lambda_{\min}$
- Ill-conditioning and why it slows convergence

**Derivation Targets**
- Derive the second-order sufficient conditions for a local minimum
- Show that the Hessian eigenvalues determine local curvature
- Prove that gradient descent on a quadratic converges at rate $(1 - 2/(\kappa+1))^t$
- Construct examples where conditioning makes optimization easy or hard

**Skill Focus:** Reading curvature from the Hessian; understanding why some problems are geometrically harder than others.

**Why this week matters:** First-order methods are blind to curvature. Understanding the Hessian explains why some loss landscapes are easy (well-conditioned) and others are treacherous (ill-conditioned). This is the mathematical root of why learning rates must be tuned and why preconditioning helps.

---

## Week 4 — Convexity: The Tractable Case

**Topics**
- Convex sets and convex functions: definitions
- Epigraph characterization
- First-order and second-order conditions for convexity
- Operations preserving convexity
- Local minima = global minima in convex problems
- Strict and strong convexity
- Jensen's inequality and its applications

**Derivation Targets**
- Prove: if $f$ is convex and differentiable, every local minimum is global
- Prove: $f$ is convex iff $H_f(x) \succeq 0$ everywhere (twice differentiable case)
- Show that nonnegative weighted sums, compositions with affine maps, and pointwise suprema preserve convexity
- Prove Jensen's inequality and apply it to derive the AM-GM inequality

**Skill Focus:** Recognizing convexity quickly; using convexity as a structural guarantee rather than just a definition.

**Why this week matters:** Convexity is the dividing line between optimization that is mathematically guaranteed and optimization that requires faith and heuristics. Many classical ML objectives (linear regression, logistic regression, SVMs) are convex. Understanding why convexity guarantees global optimality — and what breaks when you lose it — is fundamental.

---

## Week 5 — Gradient Descent: Theory and Behavior

**Topics**
- Gradient descent: $x_{t+1} = x_t - \eta \nabla f(x_t)$
- Fixed step size analysis for smooth convex functions
- Convergence rate: $O(1/t)$ for convex, $O(e^{-ct})$ for strongly convex
- Step size selection: exact line search, backtracking (Armijo), fixed
- Gradient descent on quadratics as a model problem
- Zigzagging behavior and its relationship to conditioning

**Derivation Targets**
- Prove the $O(1/t)$ convergence rate for gradient descent on $L$-smooth convex functions
- Prove the linear convergence rate for strongly convex functions
- Derive the optimal fixed step size for quadratics: $\eta = 2/(\lambda_{\min} + \lambda_{\max})$
- Analyze the zigzag behavior geometrically on an elongated quadratic

**Skill Focus:** Rigorous convergence analysis; connecting convergence rates to problem structure (smoothness, strong convexity, conditioning).

**Why this week matters:** Gradient descent is the prototype for all first-order optimization in ML. Understanding its convergence — when it is fast, when it is slow, and why — gives the student a mental model for every optimizer that follows.

---

## Week 6 — Stochastic Gradient Descent and Variance

**Topics**
- Empirical risk as a sum: $f(x) = \frac{1}{n}\sum_{i=1}^n f_i(x)$
- Stochastic gradient: unbiased estimator of the true gradient
- SGD: $x_{t+1} = x_t - \eta_t \nabla f_{i_t}(x_t)$
- Variance of the stochastic gradient
- Mini-batching and variance reduction
- Decreasing vs constant step sizes
- SGD convergence: $O(1/\sqrt{t})$ for convex

**Derivation Targets**
- Prove that the mini-batch gradient is an unbiased estimator
- Show that mini-batch size $b$ reduces variance by factor $1/b$
- Derive the SGD convergence rate for convex objectives with bounded variance
- Analyze the tradeoff: smaller batches = more noise but cheaper iterations

**Skill Focus:** Reasoning about stochastic approximation; understanding the noise-convergence tradeoff that governs all of deep learning training.

**Why this week matters:** No one runs full-batch gradient descent on real ML problems. SGD is the actual engine. Understanding its noise properties, convergence behavior, and the role of batch size is essential for everything from training neural networks to understanding generalization (which SGD noise affects).

---

## Week 7 — Momentum and Accelerated Methods

**Topics**
- Polyak's heavy ball method
- Nesterov's accelerated gradient descent
- Acceleration as using past gradient information
- Convergence improvement: $O(1/t^2)$ for smooth convex (Nesterov)
- Geometric interpretation of momentum
- Why momentum helps with ill-conditioning

**Derivation Targets**
- Derive the heavy ball update and analyze on a quadratic
- State and prove (or sketch proof of) the $O(1/t^2)$ rate for Nesterov's method
- Show that momentum effectively smooths the optimization trajectory
- Compare convergence of GD vs momentum on a poorly conditioned quadratic

**Skill Focus:** Understanding acceleration as a fundamental phenomenon, not just a trick; reading optimizer dynamics geometrically.

**Why this week matters:** Momentum is used in essentially every modern optimizer (SGD+momentum, Adam, etc.). Understanding why it helps — and the deeper phenomenon of acceleration — gives the student a principled view of optimizer design rather than treating each method as an arbitrary recipe.

---

## Week 8 — Adaptive Methods: AdaGrad, RMSProp, Adam

**Topics**
- Per-parameter learning rates
- AdaGrad: accumulating squared gradients
- RMSProp: exponential moving average of squared gradients
- Adam: combining momentum with adaptive rates
- Bias correction in Adam
- AdamW and decoupled weight decay
- When adaptive methods help and when they hurt

**Derivation Targets**
- Derive the AdaGrad update and show it adapts to geometry
- Derive Adam from first principles: momentum estimate + variance estimate + bias correction
- Show that Adam reduces to SGD+momentum when $\beta_2 \to 1$ with proper scaling
- Analyze failure cases: Adam's known convergence issues on simple convex problems

**Skill Focus:** Understanding adaptive methods as curvature approximations; knowing when to use SGD+momentum vs Adam.

**Why this week matters:** Adam is the default optimizer in most deep learning. But using it without understanding it leads to silent failures — wrong learning rates, poor generalization, training instability. This week gives the mathematical foundation to diagnose optimizer behavior.

---

## Week 9 — Constrained Optimization and Duality

**Topics**
- Constrained optimization: equality and inequality constraints
- Lagrangian function: $L(x, \lambda, \mu) = f(x) + \lambda^T h(x) + \mu^T g(x)$
- KKT conditions: stationarity, primal feasibility, dual feasibility, complementary slackness
- Lagrangian duality and the dual problem
- Weak and strong duality
- Slater's condition for strong duality

**Derivation Targets**
- Derive the KKT conditions from first principles
- Prove weak duality: dual objective $\leq$ primal objective
- Show strong duality holds under Slater's condition for convex problems
- Apply KKT to derive the SVM dual (preview of Layer 2)

**Skill Focus:** Translating constraints into multipliers; reading complementary slackness conditions; understanding duality as a structural tool.

**Why this week matters:** Constrained optimization appears throughout ML: SVMs, constrained policy optimization in RL, fairness constraints, norm-bounded perturbations in robustness. Duality is also the mathematical foundation of many theoretical results (minimax theorems, GANs, etc.).

---

## Week 10 — Regularization as Optimization + Inductive Bias

**Topics**
- Regularization as a penalty: $\min_x f(x) + \lambda R(x)$
- $\ell_2$ regularization (ridge / Tikhonov): shrinkage toward zero
- $\ell_1$ regularization (lasso): sparsity induction
- Equivalence between penalized and constrained formulations
- Elastic net and other hybrid penalties
- Bayesian interpretation: regularization as prior
- Early stopping as implicit regularization

**Derivation Targets**
- Prove the equivalence between $\ell_2$-penalized and norm-constrained problems
- Derive the ridge regression closed form: $(X^TX + \lambda I)^{-1}X^Ty$
- Show why $\ell_1$ induces sparsity geometrically (corner of the constraint set)
- Prove that $\ell_2$ regularization corresponds to a Gaussian prior on parameters

**Skill Focus:** Seeing regularization as choosing an inductive bias, not just "preventing overfitting"; connecting penalized, constrained, and Bayesian views.

**Why this week matters:** Regularization is the bridge between optimization and generalization. Every ML model uses regularization in some form — explicit penalties, early stopping, dropout, weight decay. Understanding the mathematical unity behind these techniques is essential for principled model design.

---

## Week 11 — Nonconvex Optimization: Landscapes and Challenges

**Topics**
- Why deep learning objectives are nonconvex
- Saddle points vs local minima vs global minima
- High-dimensional saddle point proliferation
- Loss surface visualization and qualitative structure
- Escaping saddle points: noise, perturbation, and negative curvature directions
- Random initialization and symmetry breaking

**Derivation Targets**
- Show that a critical point with indefinite Hessian is a saddle point
- Prove that in high dimensions, random quadratic forms have saddle points with high probability
- Analyze gradient descent near a saddle: show exponentially slow escape without noise
- Show that SGD noise helps escape saddle points (intuitive argument + reference to formal results)

**Skill Focus:** Reasoning about optimization in nonconvex settings without convexity guarantees; understanding what makes deep learning optimization different from classical optimization.

**Why this week matters:** All of deep learning is nonconvex optimization. The student must transition from the clean guarantees of convex optimization to the messier but practically successful world of nonconvex optimization. This week builds the bridge.

---

## Week 12 — Optimization in Practice: Numerical Stability and Implementation

**Topics**
- Floating-point arithmetic and numerical precision
- Catastrophic cancellation and overflow/underflow
- Log-sum-exp trick for numerical stability
- Softmax computation: stable implementation
- Gradient clipping: why and when
- Mixed-precision training: FP16/BF16/FP32
- Numerical issues in backpropagation: vanishing and exploding gradients (preview)

**Derivation Targets**
- Derive the log-sum-exp trick and prove it prevents overflow
- Show that naive softmax computation overflows and derive the stable version
- Analyze gradient magnitudes through a deep chain of multiplications (vanishing/exploding gradient preview)
- Derive conditions under which gradient clipping preserves descent direction

**Skill Focus:** Bridging theory and implementation; understanding that numerical issues are not "bugs" but fundamental constraints.

**Why this week matters:** Beautiful optimization theory is useless if the implementation silently produces NaN. This week teaches the numerical hygiene that separates working systems from broken ones. Every practitioner encounters these issues; few understand them mathematically.

---

## Week 13 — Convergence Theory: Putting It All Together

**Topics**
- Convergence rate taxonomy: sublinear, linear, superlinear, quadratic
- Convergence of GD, SGD, momentum, Newton's method: unified view
- Oracle complexity: lower bounds on optimization
- Nesterov's lower bound for first-order methods on smooth convex functions
- Optimality of accelerated methods
- Gap between theory and practice in deep learning optimization

**Derivation Targets**
- Prove the $\Omega(1/t^2)$ lower bound for first-order methods (sketch)
- Show that Nesterov's method matches this lower bound
- Compare theoretical convergence rates: GD vs SGD vs Momentum vs Adam
- Discuss where classical convergence theory fails to explain deep learning success

**Skill Focus:** Reading convergence results critically; understanding what convergence rates actually guarantee and what they don't.

**Why this week matters:** Convergence theory tells you what is possible and what is not. Understanding lower bounds prevents wasting time trying to beat fundamental limits. Understanding gaps between theory and practice points toward where new theory is needed.

---

## Week 14 — Special Topics: Optimization Meets Learning

**Topics**
- Bilevel optimization: hyperparameter optimization as nested optimization
- Implicit differentiation through optimization
- Optimization for meta-learning
- Natural gradient and Fisher information matrix
- Mirror descent and Bregman divergences
- Connections to online learning and regret minimization

**Derivation Targets**
- Derive the natural gradient update and its relationship to the Fisher information matrix
- Show that mirror descent with KL divergence recovers exponentiated gradient
- Formulate hyperparameter tuning as bilevel optimization
- Derive implicit gradients through an argmin operation

**Skill Focus:** Seeing optimization as a broader toolkit; connecting optimization theory to learning theory.

**Why this week matters:** Advanced ML increasingly uses optimization as a subroutine inside other optimization. Meta-learning, hyperparameter search, and architecture search all require reasoning about optimization within optimization. The natural gradient foreshadows information-geometric ideas in later courses.

---

## Week 15 — Synthesis: The Optimization Lens on Machine Learning

**Purpose:** No new content. Consolidate the entire optimization toolkit.

**What to synthesize:**
$$\text{objectives} \to \text{gradients/Hessians} \to \text{convexity} \to \text{GD/SGD} \to \text{momentum/adaptive} \to \text{constraints/duality} \to \text{regularization} \to \text{nonconvex landscapes}$$

**Capstone problems (select 2–3 for full reconstruction):**
- Derive SGD convergence from scratch with all assumptions stated
- Formulate a complete ML pipeline as an optimization problem: data → loss → regularization → algorithm → convergence analysis
- Analyze a nonconvex landscape: identify saddle points, local/global minima, and discuss algorithm behavior
- Derive Adam and explain each component's purpose

**Final message:** Optimization is not a preprocessing step for ML — it is the computational substrate of learning itself. Every model, every training run, every hyperparameter choice is an optimization decision.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **First-order** | Gradient as steepest ascent; first-order necessary conditions; chain rule |
| **Second-order** | Hessian classification of critical points; condition number and convergence |
| **Convexity** | Local = global for convex; preservation operations; Jensen's inequality |
| **GD convergence** | $O(1/t)$ convex; $O(e^{-ct})$ strongly convex; dependence on $\kappa$ |
| **SGD** | Unbiased gradient; variance reduction via batching; $O(1/\sqrt{t})$ rate |
| **Momentum** | Heavy ball; Nesterov $O(1/t^2)$; matching lower bound |
| **Constrained** | KKT conditions; weak/strong duality; Slater's condition |
| **Regularization** | Penalized ↔ constrained equivalence; $\ell_1$ sparsity; Bayesian interpretation |

---

## Problem Set Structure

**A. Formulation problems** — Translate a learning scenario into a formal optimization problem; identify objective, constraints, and decision variables.

**B. Convergence analysis** — Prove convergence rates for specific methods on specific problem classes; identify how structure (smoothness, convexity, noise) affects rates.

**C. Algorithm derivation** — Derive an optimizer from first principles; explain each design choice mathematically.

**D. Numerical experiments** — Implement GD, SGD, momentum, Adam; compare on quadratics and simple nonconvex functions; observe convergence behavior vs theory.

**E. Failure analysis** — Construct examples where an optimizer fails or behaves unexpectedly; diagnose the mathematical cause.

> If the problem sets only ask "run Adam on MNIST," the course has failed. The student must be able to derive, analyze, and critique optimizers, not just call them.

---

*Course 2 continues with Statistical Learning and Classical ML, where the optimization machinery is applied to the problem of learning from data.*


---