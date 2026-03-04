# Course 5: Generalization in Overparameterized Models
**15-Week Rigorous Sequence — Why Deep Learning Works When Classical Theory Says It Shouldn't**

> **Course philosophy:** Classical learning theory predicts that overparameterized models should overfit catastrophically. Modern deep learning contradicts this prediction daily. This course investigates the gap: what new theory explains generalization in deep networks? The answer involves implicit bias, optimization dynamics, the structure of real data, and a rethinking of the bias-variance tradeoff. This is the frontier where theory meets practice.

**Primary text:** Research papers (curated reading list) | **Supplement:** Belkin, *Fit Without Fear* | **Reference:** Shalev-Shwartz & Ben-David, *Understanding Machine Learning* (for classical baseline)

---

## Course Goal

Update the student's mental model of generalization from the classical regime (underfitting ↔ overfitting controlled by capacity) to the modern regime (interpolation, implicit regularization, double descent, scaling laws). The conceptual spine is:

$$\text{classical bounds} \to \text{interpolation} \to \text{implicit bias} \to \text{double descent} \to \text{scaling laws} \to \text{feature learning} \to \text{the role of data}$$

---

## Week 1 — The Puzzle: Why Do Overparameterized Models Generalize?

**Topics**
- Review of classical generalization theory: VC dimension, Rademacher complexity
- The classical prediction: more parameters → more overfitting
- The empirical reality: modern networks interpolate training data and still generalize
- Zhang et al. (2017): networks can memorize random labels — so why don't they on real data?
- The puzzle formalized: what mechanism controls generalization when capacity is not the bottleneck?

**Derivation Targets**
- State the VC bound and show it is vacuous for modern networks (bound >> 1)
- Show that a network that perfectly fits $n$ training points has zero training error — and may also have low test error
- Compute parameter counts for common architectures and compare to dataset sizes
- Reproduce the key observation: same architecture memorizes random labels but generalizes on real labels

**Skill Focus:** Articulating precisely why classical theory is insufficient; understanding the empirical phenomena that demand new theory.

**Why this week matters:** This is the motivating puzzle for the entire course. Without understanding why classical theory fails, the student cannot appreciate why new theory is needed. The Zhang et al. experiment is the most important single result in modern generalization theory.

---

## Week 2 — The Interpolation Regime and Benign Overfitting

**Topics**
- Interpolation: achieving zero training error
- The interpolation threshold: when the number of parameters exceeds the number of data points
- Benign overfitting: interpolation without catastrophic generalization failure
- Conditions for benign overfitting: when does it work?
- Minimum-norm interpolation: among all interpolating solutions, which one generalizes?
- The role of high dimensionality in enabling benign overfitting

**Derivation Targets**
- Derive the minimum-norm interpolator for linear regression: $\hat{\beta} = X^T(XX^T)^{-1}y$
- Show that minimum-norm interpolation generalizes well when the data lies in a low-dimensional subspace of a high-dimensional space
- Prove that in low dimensions, interpolation always overfits, but in high dimensions it need not
- Analyze the bias and variance of the minimum-norm interpolator as a function of dimensionality

**Skill Focus:** Understanding interpolation as a regime, not a pathology; knowing when interpolation is benign and when it is harmful.

**Why this week matters:** The interpolation regime is the default operating mode of modern deep learning. Understanding it requires abandoning the classical intuition that interpolation = overfitting.

---

## Week 3 — Double Descent: Beyond the U-Shaped Error Curve

**Topics**
- Classical U-shaped test error: bias-variance tradeoff
- The double descent curve: test error decreases again past the interpolation threshold
- Model-wise double descent: varying model complexity
- Epoch-wise double descent: varying training duration
- Sample-wise double descent: varying dataset size
- Mechanisms: the interpolation peak and why it resolves

**Derivation Targets**
- Derive double descent for linear regression / random features model
- Show that the interpolation peak occurs when parameters ≈ data points (the "critical regime")
- Analyze why the peak resolves: beyond the threshold, the model has many interpolating solutions and selects a smooth one
- Reproduce double descent in a controlled setting: random features regression

**Skill Focus:** Understanding double descent as a precise mathematical phenomenon, not just an empirical curiosity.

**Why this week matters:** Double descent overturns the textbook narrative that more complexity always means more overfitting after a point. Understanding when and why it occurs updates the student's entire framework for model selection.

---

## Week 4 — Implicit Bias of Gradient Descent

**Topics**
- The optimizer selects among many possible solutions — which one?
- Gradient descent on underdetermined systems: converges to minimum-norm solution
- Implicit bias in linear models: GD → minimum $\ell_2$ norm
- Implicit bias in matrix factorization: GD → low rank
- Implicit bias with different optimizers: SGD, Adam, different geometries
- Mirror descent and the geometry of implicit regularization

**Derivation Targets**
- Prove that gradient descent initialized at zero converges to the minimum $\ell_2$-norm solution for underdetermined linear systems
- Show that gradient descent on matrix factorization $UV^T$ has implicit bias toward low-rank solutions
- Derive the implicit bias of mirror descent and show it depends on the geometry
- Show that explicit and implicit regularization can produce different solutions

**Skill Focus:** Understanding that the optimizer is not just finding a minimum — it is selecting a specific minimum with specific properties.

**Why this week matters:** Implicit bias is perhaps the most important concept in modern generalization theory. The optimizer doesn't just find any solution that fits the data — it finds a specific one, and the properties of that solution determine generalization. This explains why training procedure matters as much as architecture.

---

## Week 5 — The Role of SGD Noise in Generalization

**Topics**
- SGD noise: mini-batch randomness as a stochastic process
- SGD as approximate Bayesian inference (loose analogy)
- Flat vs sharp minima: the flatness hypothesis
- SGD prefers flat minima: noise escapes sharp basins
- Batch size effects: large batches → sharper minima → worse generalization
- The temperature interpretation: learning rate / batch size as noise temperature
- PAC-Bayes bounds and their connection to flatness

**Derivation Targets**
- Derive the effective temperature of SGD: $T \propto \eta / B$ (learning rate / batch size)
- Show that SGD escapes sharp minima faster than flat minima (barrier argument)
- State PAC-Bayes bounds and show they can give non-vacuous generalization bounds for deep networks
- Analyze the flatness-generalization connection and its caveats (invariance under reparameterization)
- Derive the relationship between batch size and learning rate for constant SGD dynamics

**Skill Focus:** Understanding SGD as more than just an optimizer — it is a regularizer that shapes what solutions the network finds.

**Why this week matters:** The noise in SGD is not a nuisance — it is a feature. Understanding how SGD noise shapes generalization explains why large-batch training requires careful tuning and why certain training procedures generalize better than others.

---

## Week 6 — Neural Tangent Kernel: The Lazy Training Regime

**Topics**
- Neural Tangent Kernel (NTK): the kernel that describes infinite-width networks
- Linearization: for very wide networks, training is approximately kernel regression
- The NTK at initialization: $\Theta(x, x') = \nabla_\theta f(x)^T \nabla_\theta f(x')$
- NTK convergence: as width → ∞, the NTK becomes deterministic and constant during training
- Lazy training: parameters barely move from initialization
- Limitations of the NTK regime: it does not capture feature learning
- Beyond NTK: the mean-field regime and feature learning

**Derivation Targets**
- Derive the NTK formula for a single hidden layer network
- Show that in the infinite-width limit, the NTK is deterministic at initialization
- Prove that in the NTK regime, training dynamics are linear: $f_t(x) = f_0(x) + \Theta(x, X)(I - e^{-\eta\Theta t})y$
- Show that the NTK regime does not learn features: the kernel is fixed at initialization
- Analyze what changes in the mean-field / feature learning regime

**Skill Focus:** Understanding the NTK as a precise mathematical description of one regime of deep learning; knowing its limitations.

**Why this week matters:** The NTK provides the first rigorous theory of deep network training — but it describes a regime where networks behave like kernel methods, missing the key advantage of deep learning (feature learning). Understanding both what NTK explains and what it misses is essential.

---

## Week 7 — Feature Learning vs Kernel Regime

**Topics**
- The feature learning regime: representations change during training
- Width scaling: NTK regime ($1/\sqrt{n}$ scaling) vs mean-field regime ($1/n$ scaling)
- Why feature learning matters: tasks where fixed features fail
- The benefit of depth in feature learning
- Feature learning dynamics: which features emerge early vs late
- The lottery ticket hypothesis revisited: sparse networks that learn features
- Empirical evidence for feature learning in modern networks

**Derivation Targets**
- Show that NTK parameterization ($1/\sqrt{n}$) limits feature learning while mean-field parameterization ($1/n$) allows it
- Construct a task where kernel methods (including NTK) fail but feature-learning networks succeed
- Analyze how feature learning depends on depth: deeper networks learn more compositional features
- Derive conditions under which feature learning provides a provable advantage over kernel methods

**Skill Focus:** Understanding the distinction between the kernel regime and the feature learning regime; knowing which practical settings require feature learning.

**Why this week matters:** The entire value proposition of deep learning over kernel methods is feature learning. This week makes that distinction precise and shows when and why feature learning matters.

---

## Week 8 — Scaling Laws and Emergent Behavior

**Topics**
- Empirical scaling laws: loss as a power law in model size, data size, and compute
- The Chinchilla scaling law: optimal allocation of compute between model size and data
- Data scaling: diminishing returns and data quality
- Emergence: capabilities that appear suddenly at scale
- Phase transitions in learning: sharp transitions vs gradual improvement
- Scaling laws as a guide to resource allocation
- Limitations of scaling laws: extrapolation risk, task dependence

**Derivation Targets**
- State the empirical scaling laws: $L(N) \propto N^{-\alpha_N}$, $L(D) \propto D^{-\alpha_D}$, $L(C) \propto C^{-\alpha_C}$
- Derive the compute-optimal model size from the Chinchilla analysis: $N \propto C^a$, $D \propto C^b$
- Analyze the joint scaling law $L(N, D) = \left(\frac{N_c}{N}\right)^{\alpha_N} + \left(\frac{D_c}{D}\right)^{\alpha_D} + L_\infty$
- Show the limitations: scaling laws are empirical fits, not derived from first principles
- Analyze emergence as a possible measurement artifact vs genuine phase transition

**Skill Focus:** Reading and interpreting scaling laws; understanding their implications for research and engineering decisions.

**Why this week matters:** Scaling laws are the most practically important empirical finding in modern AI. They guide billion-dollar compute allocation decisions. Understanding them — including their limitations — is essential for anyone working at the frontier.

---

## Week 9 — Norm-Based and PAC-Bayes Generalization Bounds

**Topics**
- Norm-based bounds: generalization controlled by weight norms, not parameter count
- Margin-based bounds for deep networks
- PAC-Bayes framework: generalization via posterior distributions over parameters
- Non-vacuous PAC-Bayes bounds for deep networks
- Compression-based bounds: networks that can be compressed generalize
- The role of noise stability in generalization
- Comparing bound families: which is tightest?

**Derivation Targets**
- Derive a norm-based generalization bound: bound depends on $\prod_l \|W_l\|$ not on parameter count
- Derive the PAC-Bayes bound: $R(Q) \leq \hat{R}(Q) + \sqrt{\frac{KL(Q\|P) + \log(n/\delta)}{2n}}$
- Show that PAC-Bayes can give non-vacuous bounds for real networks (with careful prior and posterior choice)
- Derive a compression-based bound and connect to information-theoretic generalization
- Compare bound tightness for specific architectures

**Skill Focus:** Understanding modern generalization bounds that work in the overparameterized regime; evaluating which theoretical tools are most useful.

**Why this week matters:** Classical VC bounds are vacuous for deep networks. This week presents the bounds that actually work — norm-based, PAC-Bayes, and compression-based — and develops the skill to evaluate which theoretical tools provide genuine insight.

---

## Week 10 — Data-Dependent Generalization: Structure in Real Data

**Topics**
- Why theory must account for data structure, not just model capacity
- Low-dimensional structure in high-dimensional data: manifold hypothesis
- Benign overfitting conditions: data covariance structure
- The role of label noise vs structural noise
- Task-relevant vs task-irrelevant features
- Data augmentation as encoding data structure
- Distribution of real-world data: heavy tails, class imbalance, spurious correlations

**Derivation Targets**
- Show that generalization bounds improve when data lies on a low-dimensional manifold
- Derive conditions for benign overfitting in terms of the eigenspectrum of the data covariance
- Show that label noise degrades generalization more than feature noise (at fixed total noise)
- Analyze how data augmentation changes the effective hypothesis class
- Prove that spurious correlations can lead to good training performance but poor out-of-distribution performance

**Skill Focus:** Understanding that generalization is not just about the model — it depends critically on the structure of the data.

**Why this week matters:** The deepest insight of modern generalization theory is that generalization depends on the interaction between model, optimizer, and data structure. Models generalize because real data has structure that the model + optimizer can exploit. This week makes that precise.

---

## Week 11 — Grokking and Phase Transitions in Learning

**Topics**
- Grokking: sudden generalization long after memorization
- Delayed generalization: training loss converges early, test loss improves much later
- Circuit formation: the mechanistic view of grokking
- Phase transitions in training: sharp changes in capability
- The role of regularization in grokking
- Slingshot dynamics and oscillatory training behavior
- Connections to statistical physics of learning

**Derivation Targets**
- Analyze grokking in simple settings: modular arithmetic, group operations
- Show that weight decay is often necessary for grokking to occur
- Derive the connection between weight norm dynamics and the transition from memorization to generalization
- Analyze the loss landscape geometry near phase transitions
- Model grokking as a competition between memorization and generalization circuits

**Skill Focus:** Understanding non-monotonic training dynamics; recognizing that generalization can emerge through discrete transitions, not just smooth improvement.

**Why this week matters:** Grokking demonstrates that generalization is not always a smooth function of training time. Understanding these dynamics changes how you think about training schedules, early stopping, and the relationship between memorization and generalization.

---

## Week 12 — Interpolation Theory for Specific Architectures

**Topics**
- Generalization of linear models in the interpolation regime
- Random features models: the connection to NTK
- Two-layer neural networks: known results
- Deep networks: the frontier
- The role of architecture in generalization: CNNs vs MLPs vs transformers
- Equivariance and its effect on generalization
- Architecture-dependent implicit bias

**Derivation Targets**
- Derive the generalization error of the minimum-norm interpolator for random features
- Show how the spectrum of the feature covariance matrix determines generalization
- Analyze the implicit bias of gradient descent on two-layer networks
- Prove that equivariant architectures (CNNs) have better generalization bounds than generic architectures
- Compare theoretical predictions to empirical observations for specific architectures

**Skill Focus:** Understanding how architecture and interpolation theory interact; knowing what theory says for different architectural choices.

**Why this week matters:** Different architectures interpolate differently and generalize differently. This week connects the abstract theory of interpolation to the practical question of architecture choice.

---

## Week 13 — Information-Theoretic Perspectives on Generalization

**Topics**
- Mutual information between training data and learned parameters
- The information bottleneck: compression of input information
- Conditional mutual information bounds on generalization
- Algorithmic stability: stable algorithms generalize
- Differential privacy and generalization
- Connections between compression, stability, and information

**Derivation Targets**
- Derive the mutual information generalization bound: $|R(A(S)) - \hat{R}(A(S))| \leq \sqrt{I(S; A(S)) / 2n}$
- Show that differentially private algorithms satisfy generalization bounds
- Derive the connection between algorithmic stability and generalization (McDiarmid-style)
- Analyze the information bottleneck for deep networks and discuss the Shwartz-Ziv & Tishby hypothesis
- Show limitations of information-theoretic bounds: they can be vacuous when MI is large

**Skill Focus:** Using information theory as a lens on generalization; understanding the connections between different theoretical frameworks.

**Why this week matters:** Information theory provides a different and complementary perspective on generalization. Understanding it connects to privacy, compression, and representation learning — and provides tools that other frameworks lack.

---

## Week 14 — Open Problems and Current Frontiers

**Topics**
- What we still don't understand about generalization
- The gap between theory and practice: where theory lags
- Feature learning theory: the biggest open problem
- Generalization in foundation models: scaling regime
- Generalization in few-shot and in-context learning
- The role of pretraining data in downstream generalization
- Alignment and generalization: when models generalize in unintended ways

**Derivation Targets**
- Identify specific predictions of current theory that disagree with practice
- Analyze generalization in the few-shot regime: how does it differ from classical theory?
- Show that in-context learning can be viewed as implicit Bayesian inference (sketch)
- Discuss the "generalization on the training distribution" vs "generalization to new distributions" distinction
- Formulate open problems precisely: what would a satisfying theory of deep learning generalization look like?

**Skill Focus:** Understanding the frontier of the field; knowing what is solved, what is partially understood, and what remains mysterious.

**Why this week matters:** An honest course acknowledges what is not known. This week puts the entire course in perspective: the student understands what modern theory explains, where it falls short, and what the most important open questions are.

---

## Week 15 — Synthesis: The Modern Generalization Worldview

**Purpose:** No new content. Consolidate the updated theory of generalization.

**What to synthesize:**
$$\text{classical bounds} \to \text{interpolation} \to \text{implicit bias} \to \text{double descent} \to \text{SGD noise} \to \text{NTK/feature learning} \to \text{scaling laws} \to \text{data structure}$$

**Capstone problems (select 2–3 for full reconstruction):**
- Given a modern training setup (large model, small dataset, Adam, weight decay), predict generalization behavior using the tools from this course — not classical theory
- Derive the implicit bias of GD for a specific architecture and explain its generalization implications
- Analyze a double descent curve: identify the interpolation threshold, explain the peak, and predict behavior beyond it
- Critique a scaling law: state its assumptions, domain of validity, and potential failure modes

**Final message:** The classical story — more parameters means more overfitting — is incomplete. Modern deep learning lives in a regime where optimization, architecture, and data structure jointly determine generalization. Understanding this regime requires new tools: implicit bias, interpolation theory, scaling laws, and data-dependent analysis.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Classical** | VC bounds; Rademacher complexity; why they are vacuous for deep nets |
| **Interpolation** | Minimum-norm interpolator; benign overfitting conditions |
| **Double descent** | Interpolation peak; resolution beyond threshold; epoch-wise DD |
| **Implicit bias** | GD → min-norm; matrix factorization → low rank; mirror descent geometry |
| **SGD** | Effective temperature; flat/sharp minima; PAC-Bayes connection |
| **NTK** | NTK formula; linearized dynamics; lazy training limitations |
| **Scaling laws** | Power law fits; compute-optimal allocation; limitations |
| **Bounds** | Norm-based; PAC-Bayes (non-vacuous); compression-based |
| **Data** | Manifold hypothesis; covariance spectrum; spurious correlations |

---

## Problem Set Structure

**A. Theory problems** — Derive generalization bounds; compute implicit bias; analyze interpolation behavior for specific models.

**B. Empirical analysis** — Reproduce key phenomena (double descent, grokking, scaling laws) in controlled settings; compare to theoretical predictions.

**C. Critique problems** — Given a claim about generalization, evaluate its theoretical support; identify assumptions and potential failure modes.

**D. Prediction problems** — Given an architecture, optimizer, and dataset, predict generalization behavior using modern theory.

**E. Open-ended problems** — Formulate a precise conjecture about generalization and provide evidence for or against it.

> If the problem sets only test classical learning theory, the course has failed. The student must be able to reason about generalization in the interpolation regime using modern tools.

---

*Course 6 continues with Sequence Modeling and Attention, where architectural choices meet the structure of sequential data.*

---
---