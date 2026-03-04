# Course 12: Theory, Robustness, and Limits
**15-Week Rigorous Sequence — Where AI Meets Its Boundaries**

> **Course philosophy:** A field that does not understand its own failure modes is not a serious field. This course studies what can go wrong — and what is fundamentally hard — in AI systems. Distribution shift, adversarial vulnerability, calibration failure, causal confusion, objective misspecification, and the limits of current approaches. The goal is not pessimism but intellectual honesty: knowing what you can trust, what you cannot, and why.

**Primary text:** Research papers (curated) | **Supplement:** Goodfellow et al., *Adversarial Machine Learning* | **Reference:** Pearl, *Causality* | Peters, Janzing & Scholkopf, *Elements of Causal Inference*

---

## Course Goal

Build the mathematical framework for understanding the failure modes, robustness properties, and fundamental limitations of AI systems. The student should be able to identify, analyze, and mitigate the most common ways AI systems fail — and know which failures are fixable and which are fundamental. The conceptual spine is:

$$\text{distribution shift} \to \text{adversarial robustness} \to \text{calibration} \to \text{causality} \to \text{fairness} \to \text{interpretability} \to \text{alignment} \to \text{fundamental limits}$$

---

## Week 1 — Distribution Shift: When the World Changes

**Topics**
- The iid assumption and why it fails in practice
- Types of distribution shift: covariate shift, label shift, concept drift, domain shift
- Formal definitions: $P_{\text{train}}(X, Y) \neq P_{\text{test}}(X, Y)$
- Covariate shift: $P(X)$ changes but $P(Y|X)$ is stable
- Label shift: $P(Y)$ changes but $P(X|Y)$ is stable
- Dataset shift benchmarks: Camelyon17, WILDS, DomainBed
- Why models degrade under shift: they rely on spurious correlations

**Derivation Targets**
- Formalize covariate shift and derive importance weighting: $\mathbb{E}_{P_{\text{test}}}[f(X)] = \mathbb{E}_{P_{\text{train}}}[\frac{P_{\text{test}}(X)}{P_{\text{train}}(X)} f(X)]$
- Derive the label shift correction via Bayes' rule
- Show that models trained by ERM exploit spurious correlations: features correlated with labels in training but not in test
- Analyze the gap between in-distribution and out-of-distribution performance for specific models
- Derive bounds on performance under distribution shift as a function of the divergence between distributions

**Skill Focus:** Formalizing distribution shift; understanding when models can and cannot be expected to generalize beyond their training distribution.

**Why this week matters:** The single most common failure mode of deployed AI systems is distribution shift. Understanding it mathematically — not just as "the data changes" — is essential for building reliable systems.

---

## Week 2 — Domain Adaptation and Domain Generalization

**Topics**
- Domain adaptation: adapting a model to a new target domain with some target data
- Unsupervised domain adaptation: no labels in the target domain
- Domain-invariant representations: learn features that transfer
- Domain adversarial neural networks (DANN)
- Domain generalization: performing well on unseen domains
- Invariant risk minimization (IRM): learning invariant predictors
- Distributionally robust optimization (DRO): optimizing worst-case performance

**Derivation Targets**
- Derive the Ben-David domain adaptation bound: target error ≤ source error + domain divergence + ideal joint error
- Derive DANN: adversarial training to make representations domain-invariant
- Derive IRM: $\min_\phi \sum_e R^e(\phi)$ subject to $\phi$ being optimal for all environments
- Derive DRO: $\min_\theta \max_{P \in \mathcal{P}} \mathbb{E}_P[\ell(f_\theta(X), Y)]$
- Show the limitations of domain-invariant representations: they can discard useful information

**Skill Focus:** Understanding adaptation and generalization as mathematical problems; analyzing the tradeoffs between different approaches.

**Why this week matters:** If distribution shift is the problem, domain adaptation and generalization are the solutions. Understanding their mathematical formulations — and their limitations — is essential for building robust systems.

---

## Week 3 — Adversarial Robustness: Worst-Case Vulnerability

**Topics**
- Adversarial examples: small perturbations that cause misclassification
- Threat models: $\ell_\infty$, $\ell_2$, $\ell_0$, semantic perturbations
- White-box attacks: FGSM, PGD, C&W
- Black-box attacks: transfer attacks, query-based attacks
- Adversarial training: the standard defense
- Certified robustness: provable guarantees
- The accuracy-robustness tradeoff

**Derivation Targets**
- Derive PGD as projected gradient ascent: $x_{t+1} = \Pi_\Delta(x_t + \alpha \cdot \text{sign}(\nabla_x L))$
- Derive the adversarial training objective: $\min_\theta \mathbb{E}[\max_{\delta \in \Delta} L(f_\theta(x + \delta), y)]$
- Derive randomized smoothing: if $f$ classifies correctly under Gaussian noise with probability $> 0.5$, the smoothed classifier has a certifiable robustness radius
- Prove the accuracy-robustness tradeoff: there exist distributions where no classifier can be both accurate and robust
- Analyze the computational cost of adversarial training: roughly $k\times$ more expensive for $k$ PGD steps

**Skill Focus:** Understanding adversarial vulnerability as a mathematical phenomenon; analyzing the fundamental tradeoffs of robustness.

**Why this week matters:** Adversarial examples reveal that neural networks perceive data very differently from humans. For safety-critical applications, understanding and mitigating this vulnerability is essential.

---

## Week 4 — Calibration: When Confidence Does Not Mean Accuracy

**Topics**
- Calibration: does the model's confidence match its accuracy?
- Perfect calibration: $P(Y = y | f(X) = p) = p$
- Expected Calibration Error (ECE)
- Modern neural networks are poorly calibrated: overconfident on wrong predictions
- Temperature scaling: the simplest calibration fix
- Platt scaling, isotonic regression
- Selective prediction: abstaining when uncertain
- The relationship between calibration and decision-making

**Derivation Targets**
- Formally define calibration and derive ECE
- Show that modern neural networks are systematically overconfident (Guo et al.)
- Derive temperature scaling: $\hat{p} = \text{softmax}(z / T)$ and show it can fix calibration post-hoc
- Derive Platt scaling and show it is a post-hoc logistic regression on logits
- Analyze the selective prediction framework: show that with good uncertainty, abstaining improves accuracy

**Skill Focus:** Understanding calibration as a separate dimension from accuracy; knowing how to measure and fix calibration.

**Why this week matters:** A model that says "I'm 99% sure" and is wrong 50% of the time is dangerous. Calibration matters whenever decisions are made based on model confidence — which is essentially always in deployment.

---

## Week 5 — Uncertainty Quantification Beyond Calibration

**Topics**
- Aleatoric vs epistemic uncertainty
- Bayesian neural networks: posterior over parameters
- MC Dropout as approximate Bayesian inference
- Deep ensembles: multiple models for uncertainty
- Conformal prediction: distribution-free prediction intervals
- Selective prediction and the reject option
- When uncertainty estimation fails

**Derivation Targets**
- Derive the decomposition: predictive uncertainty = aleatoric + epistemic
- Derive MC Dropout as approximate variational inference
- Derive deep ensemble uncertainty as disagreement between members
- Derive conformal prediction: given exchangeability, construct prediction sets with $P(Y \in C(X)) \geq 1-\alpha$
- Show that conformal prediction makes no distributional assumptions (unlike Bayesian methods)
- Analyze the limitations of each method: when do they under- or over-estimate uncertainty?

**Skill Focus:** Understanding different approaches to uncertainty quantification; knowing their assumptions and failure modes.

**Why this week matters:** Uncertainty is essential for safe decision-making. Different methods quantify different types of uncertainty under different assumptions. Knowing which to use — and when they fail — is essential for deploying AI responsibly.

---

## Week 6 — Causality vs Correlation in Machine Learning

**Topics**
- Review of causal inference: SCMs, do-calculus, interventions
- Why ML models learn correlations, not causes
- Spurious correlations and confounders in training data
- Causal features vs spurious features
- Invariant Causal Prediction (ICP)
- Causal representation learning
- Counterfactual fairness and causal approaches to bias
- The fundamental limitation: causality requires interventional data or strong assumptions

**Derivation Targets**
- Derive why a model trained by ERM will exploit spurious correlations when they are predictive
- Show that interventional data can distinguish causal from spurious features
- Derive ICP and show it identifies causal parents under linear assumptions
- Show the counterfactual framework: $Y_{A \leftarrow a}$ and why it requires a causal model
- Derive when causal discovery from observational data is possible and when it is not (faithfulness, causal sufficiency)

**Skill Focus:** Understanding the fundamental difference between correlation and causation in ML; knowing when causal reasoning is possible.

**Why this week matters:** Most ML failures in the real world involve confounding: the model uses a spurious correlation that breaks under distribution shift. Understanding causality is the deepest solution to the robustness problem.

---

## Week 7 — Fairness: Mathematical Frameworks for Equitable AI

**Topics**
- Why fairness matters: AI systems make consequential decisions
- Group fairness: demographic parity, equalized odds, predictive parity
- Individual fairness: similar individuals should be treated similarly
- Impossibility results: you cannot satisfy all fairness criteria simultaneously
- Fairness through causal reasoning: counterfactual fairness
- Bias in data, bias in models, bias in deployment
- Mitigation strategies: pre-processing, in-processing, post-processing

**Derivation Targets**
- Formally define demographic parity, equalized odds, and predictive parity
- Prove the impossibility theorem (Chouldechova/Kleinberg): unless base rates are equal, you cannot simultaneously satisfy calibration, equalized odds, and predictive parity
- Derive counterfactual fairness: $P(Y_{A \leftarrow a} | X = x) = P(Y_{A \leftarrow a'} | X = x)$
- Show that demographic parity can be achieved by post-processing but may reduce accuracy
- Analyze the accuracy-fairness tradeoff: derive conditions under which it exists and when it can be avoided

**Skill Focus:** Understanding fairness as a mathematical framework with precise definitions, impossibility results, and tradeoffs.

**Why this week matters:** AI systems affect people's lives. Building fair systems requires mathematical precision about what fairness means — and honest engagement with the fact that different fairness definitions conflict. This week provides that precision.

---

## Week 8 — Interpretability and Explainability

**Topics**
- What does it mean to "understand" a model?
- Feature attribution: which inputs matter? (SHAP, LIME, integrated gradients)
- Attention as explanation: when attention weights are and aren't explanatory
- Concept-based explanations: testing for human-understandable concepts
- Mechanistic interpretability: reverse-engineering neural network circuits
- Probing classifiers: what information is encoded in representations
- The faithfulness problem: are explanations faithful to the model's actual computation?

**Derivation Targets**
- Derive SHAP values from Shapley values in cooperative game theory
- Show that SHAP values are the unique attribution satisfying local accuracy, missingness, and consistency
- Derive integrated gradients: $\text{IG}_i(x) = (x_i - x'_i) \int_0^1 \frac{\partial f(x' + \alpha(x - x'))}{\partial x_i} d\alpha$
- Show that attention weights are not always faithful explanations: construct examples where attention and feature importance diverge
- Derive probing classifiers and analyze their limitations: show that probing accuracy does not imply the model uses the probed information

**Skill Focus:** Understanding interpretability methods mathematically; knowing what they actually explain and what they don't.

**Why this week matters:** Interpretability is essential for trust, debugging, and scientific understanding. But many popular interpretability methods are poorly understood or misleading. This week develops the critical skills to use and evaluate interpretability methods rigorously.

---

## Week 9 — Reward Misspecification and Goodhart's Law

**Topics**
- Goodhart's law: "When a measure becomes a target, it ceases to be a good measure"
- Reward hacking in RL: optimizing a proxy reward leads to unintended behavior
- Reward misspecification in RLHF: the reward model is an imperfect proxy
- Specification gaming: agents that exploit loopholes
- The alignment tax: the cost of making models safer
- Scalable oversight: how to supervise systems smarter than the overseer
- Iterated amplification and debate as alignment strategies

**Derivation Targets**
- Formalize Goodhart's law: show that optimizing a proxy reward $\hat{R}$ that is imperfectly correlated with true reward $R$ leads to regret $\propto \sqrt{1 - \text{corr}(\hat{R}, R)^2}$
- Derive the reward hacking problem in RLHF: show that as optimization pressure increases, divergence from true intent increases
- Analyze specification gaming: construct examples where agents solve the problem "correctly" according to the reward but not according to the intent
- Derive the scalable oversight problem formally: how can a human oversee a system with greater capability?
- Analyze debate as an alignment strategy: show conditions under which a debate between two AI systems converges to truth

**Skill Focus:** Understanding alignment failure as a mathematical problem, not just a philosophical one.

**Why this week matters:** As AI systems become more powerful, the alignment problem becomes more pressing. Understanding Goodhart's law, reward hacking, and scalable oversight mathematically is essential for building AI systems that actually do what we want.

---

## Week 10 — Data Leakage, Shortcuts, and Evaluation Pitfalls

**Topics**
- Data leakage: when information from the test set contaminates training
- Spurious shortcuts: features that are predictive in the dataset but not in the real world
- Benchmark saturation: when benchmarks stop measuring progress
- Evaluation methodology: what makes a good evaluation?
- Contamination in LLMs: when training data contains benchmark answers
- Reproducibility crisis: when results don't replicate
- The meta-science of ML: are we making real progress?

**Derivation Targets**
- Construct concrete examples of data leakage and show their effect on evaluation
- Derive the shortcut learning framework: show that ERM will learn shortcuts when they are easier than genuine features
- Analyze benchmark contamination formally: derive the expected inflation in scores as a function of overlap
- Derive the probability that a "significant" result fails to replicate: connect to multiple comparisons and publication bias
- Analyze the difference between benchmark progress and real-world progress

**Skill Focus:** Critical evaluation methodology; identifying and avoiding the most common experimental pitfalls.

**Why this week matters:** Many ML results are inflated by leakage, shortcuts, or contamination. The ability to critically evaluate results — your own and others' — is the most important practical skill in the field.

---

## Week 11 — Privacy: Differential Privacy and Machine Unlearning

**Topics**
- Privacy risks in ML: membership inference, model inversion, data extraction
- Differential privacy: formal privacy guarantees
- The definition: $P[\mathcal{M}(D) \in S] \leq e^\epsilon P[\mathcal{M}(D') \in S] + \delta$
- DP-SGD: differentially private training
- The privacy-utility tradeoff
- Machine unlearning: removing individual data points from a trained model
- Federated learning: training without centralizing data

**Derivation Targets**
- Derive the Gaussian mechanism for differential privacy: adding $\mathcal{N}(0, \sigma^2 I)$ noise with $\sigma = \Delta f \sqrt{2\ln(1.25/\delta)} / \epsilon$
- Derive DP-SGD: clip gradients + add noise + compose over iterations
- Prove the composition theorem: $(\epsilon, \delta)$-DP composes over $k$ steps to $(\sqrt{2k\ln(1/\delta')}\epsilon + k\epsilon(e^\epsilon - 1), k\delta + \delta')$
- Analyze membership inference attacks and show how they detect training set membership
- Derive the privacy-utility tradeoff: show that stricter privacy (smaller $\epsilon$) requires more utility loss

**Skill Focus:** Understanding privacy as a mathematical guarantee; analyzing the cost of privacy in model quality.

**Why this week matters:** Models trained on personal data can leak that data. Differential privacy provides the gold-standard mathematical guarantee — but at a cost to utility. Understanding this tradeoff is essential for responsible AI deployment.

---

## Week 12 — Computational Limits and the Theory of Deep Learning

**Topics**
- What can neural networks compute? Circuit complexity perspectives
- The expressivity hierarchy: depth, width, and computational power
- Training complexity: is finding optimal neural network weights NP-hard?
- Statistical limits: minimax rates and lower bounds
- Information-theoretic limits: when no algorithm can succeed
- The computational-statistical gap: problems that are statistically easy but computationally hard
- Fundamental barriers to current approaches

**Derivation Targets**
- Show that boolean circuits of depth $d$ and polynomial width can compute functions requiring exponential width at depth $d-1$
- Prove that training even a two-layer network is NP-hard in general (sketch)
- Derive minimax lower bounds for nonparametric regression: $\Omega(n^{-2s/(2s+d)})$ for $s$-smooth functions in $d$ dimensions
- Show the computational-statistical gap for specific problems: planted clique, sparse PCA
- Analyze what these limits mean for practical deep learning: do the hardness results apply to realistic cases?

**Skill Focus:** Understanding fundamental computational and statistical limits; knowing which impossibility results are practically relevant.

**Why this week matters:** Understanding what is fundamentally impossible prevents wasting effort on impossible goals. Knowing the computational and statistical limits of learning provides the deepest perspective on what AI can and cannot achieve.

---

## Week 13 — The Science of Deep Learning: What We Know and Don't Know

**Topics**
- What do we rigorously understand about deep learning?
- Approximation theory: deep networks can represent complex functions
- Optimization theory: gradient-based methods find good solutions despite nonconvexity
- Generalization theory: overparameterized models generalize via implicit regularization
- The gaps: where theory and practice disagree
- The role of empirical science in AI: experiment-driven discovery
- Open theoretical questions

**Derivation Targets**
- Survey the current state of approximation theory for deep networks
- Identify specific predictions of generalization theory that match or mismatch practice
- Analyze the "unreasonable effectiveness" of scaling: why does making models bigger keep working?
- Derive the NTK explanation and identify where it fails to explain practice
- Formulate the three most important open problems in deep learning theory as precise mathematical questions

**Skill Focus:** Understanding the current state of deep learning theory; distinguishing rigorous results from folklore.

**Why this week matters:** An honest scientist knows what is understood and what is not. This week provides an unflinching assessment of our theoretical understanding — what we can prove, what we can only conjecture, and what remains mysterious.

---

## Week 14 — AI Safety: Long-Term Challenges

**Topics**
- The long-term safety problem: ensuring AI systems remain beneficial as they become more capable
- Mesa-optimization: when learned models develop their own internal optimization
- Deceptive alignment: models that appear aligned but are not
- Power-seeking behavior: instrumental convergence
- Corrigibility: building systems that allow themselves to be corrected
- AI governance: institutional approaches to safety
- Technical research agendas: MIRI, ARC, DeepMind safety, Anthropic safety

**Derivation Targets**
- Formalize instrumental convergence: show that for most objectives, power-seeking is instrumentally useful
- Analyze the mesa-optimization hypothesis: under what conditions would a model develop internal goals?
- Derive the corrigibility problem: show that a utility-maximizing agent resists being shut down
- Analyze the detection problem: can we detect deceptive alignment? Show the theoretical difficulty
- Formalize the scalable oversight problem and analyze proposed solutions

**Skill Focus:** Understanding AI safety as a collection of precise technical problems, not just philosophical speculation.

**Why this week matters:** If AI systems become significantly more capable, alignment failure could have catastrophic consequences. Understanding the technical challenges — formalized as mathematical problems — is essential for working on or reasoning about advanced AI.

---

## Week 15 — Synthesis: The Complete Map of AI

**Purpose:** No new content. Consolidate the entire 12-course journey.

**What to synthesize across all 12 courses:**
$$\text{optimization} \to \text{statistical learning} \to \text{probabilistic modeling} \to \text{representation learning} \to \text{generalization theory}$$
$$\to \text{architectures (sequences, vision)} \to \text{domains (NLP, CV)} \to \text{RL} \to \text{generation}$$
$$\to \text{foundation models} \to \text{robustness, safety, limits}$$

**Capstone: The Seven Permanent Ideas of AI**
1. **Function approximation** — Models map inputs to outputs
2. **Optimization** — Learning is parameter search under an objective
3. **Generalization** — Fitting data is not the same as learning structure
4. **Representation** — Good internal features make hard tasks easier
5. **Uncertainty** — Good systems handle ambiguity, noise, and partial information
6. **Sequential decision-making** — Some problems require actions that change future data
7. **Scaling and composition** — Modern AI performance comes from combining objective, architecture, data, and inference-time scaffolding

**Final capstone problems (select 2-3 for full reconstruction):**
- Given a novel AI application, design a complete system: specify the learning problem, choose the method family (supervised, generative, RL), select the architecture, design the training pipeline, plan the evaluation, identify failure modes, and propose mitigations — with mathematical justification for every choice
- Identify the three most important open problems in AI and formulate them as precise mathematical questions
- Given a deployed AI system, perform a complete robustness audit: check for distribution shift, adversarial vulnerability, calibration, fairness, data leakage, and alignment — propose fixes for each identified issue
- Write a complete derivation of one algorithm from each of the 12 courses, showing the mathematical dependencies between them

**Final message:** AI is not one technique or one model. It is a field built on optimization, estimation, approximation, generalization, uncertainty, decision-making, and the honest assessment of failure modes. The permanent ideas transcend any particular architecture or dataset. The rigorous path is the lasting one.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Distribution shift** | Importance weighting; covariate/label shift correction; domain adaptation bounds |
| **Adversarial** | PGD; adversarial training minimax; certified robustness; accuracy-robustness tradeoff |
| **Calibration** | ECE definition; temperature scaling; conformal prediction guarantees |
| **Uncertainty** | Aleatoric/epistemic decomposition; MC Dropout; deep ensembles; conformal prediction |
| **Causality** | Spurious correlations under ERM; ICP; counterfactual fairness |
| **Fairness** | Fairness definitions; impossibility theorem; accuracy-fairness tradeoff |
| **Interpretability** | SHAP from Shapley values; integrated gradients; probing limitations |
| **Alignment** | Goodhart formalization; reward hacking; scalable oversight |
| **Privacy** | Differential privacy definition; Gaussian mechanism; DP-SGD; composition |
| **Limits** | Circuit complexity; training NP-hardness; minimax lower bounds |

---

## Problem Set Structure

**A. Failure analysis** — Given a deployed model, identify potential failure modes (shift, adversarial, calibration, fairness) and propose mathematically grounded mitigations.

**B. Robustness evaluation** — Design and execute robustness tests: adversarial attacks, distribution shift experiments, calibration analysis.

**C. Fairness analysis** — Apply fairness metrics; identify and analyze fairness-accuracy tradeoffs; propose mitigation strategies.

**D. Theory problems** — Prove impossibility results; derive computational or statistical lower bounds; formalize open problems.

**E. System audit** — Perform a complete audit of an AI system: data, training, evaluation, deployment, monitoring — identify all potential failure modes.

**F. Synthesis problems** — Connect concepts across the entire 12-course sequence: show how optimization, generalization, representation, and robustness interact in a specific system.

> If the problem sets only ask about theory in isolation, the course has failed. The student must be able to connect theoretical limits to practical system failures and propose mathematically grounded solutions.

---

## Closing: The Complete Dependency Graph

```
Calculus, Linear Algebra, Probability
            |
      [Course 1] Optimization
            |
      [Course 2] Statistical Learning
            |
      [Course 3] Probabilistic Modeling
            |
      [Course 4] Neural Networks / Deep Learning
            |
      [Course 5] Generalization Theory
           / \
    [Course 6]  [Course 7]
    Sequences    Vision
    Attention    CNNs/ViTs
         |          |
    [Course 8]  (merges back)
       NLP
         |
    [Course 9] Reinforcement Learning
         |
    [Course 10] Generative Modeling
         |
    [Course 11] Foundation Models / Multimodal
         |
    [Course 12] Theory, Robustness, Limits
```

> The correct way to organize AI is not by hype labels, not by course titles, but by dependency of concepts.

---

*End of the 12-course sequence. Total: 180 weeks of rigorous study. The student who completes this path understands AI not as a collection of tools but as a coherent mathematical discipline.*