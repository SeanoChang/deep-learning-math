# Course 3: Probabilistic Modeling
**15-Week Rigorous Sequence — The Mathematics of Uncertainty and Hidden Structure**

> **Course philosophy:** A model is not just a function — it is a statement about the data-generating process. Probabilistic modeling makes that statement explicit: what is random, what is observed, what is hidden, and how they relate. Without this, "AI" has no principled language for uncertainty, missing data, or latent structure. This course builds that language.

**Primary text:** Murphy, *Probabilistic Machine Learning: An Introduction* | **Supplement:** Koller & Friedman, *Probabilistic Graphical Models* | **Reference:** Bishop, *Pattern Recognition and Machine Learning*

---

## Course Goal

Build the mathematical framework for reasoning under uncertainty: specifying probabilistic models, performing inference (exact and approximate), learning parameters, and understanding when probabilistic assumptions help or hurt. The conceptual spine is:

$$\text{likelihood} \to \text{Bayes' rule} \to \text{graphical models} \to \text{latent variables} \to \text{EM} \to \text{approximate inference} \to \text{sampling} \to \text{variational methods}$$

---

## Week 1 — Probability as the Language of Uncertainty

**Topics**
- Review of probability: joint, marginal, conditional distributions
- Bayes' rule as the fundamental inference operation
- Common distributions: Gaussian, Bernoulli, categorical, Poisson, exponential family
- Sufficient statistics and exponential families
- Information-theoretic quantities: entropy, KL divergence, mutual information

**Derivation Targets**
- Derive Bayes' rule and interpret each component (prior, likelihood, posterior, evidence)
- Show that the exponential family has a unified form and derive sufficient statistics for Gaussian, Bernoulli, Poisson
- Prove that KL divergence is non-negative (Gibbs' inequality)
- Derive the relationship between entropy and coding: Shannon's source coding theorem (sketch)

**Skill Focus:** Fluency with probabilistic notation and manipulation; seeing information theory as the natural language of probabilistic modeling.

**Why this week matters:** Every subsequent week builds on this vocabulary. Students who are shaky on conditional distributions, Bayes' rule, or KL divergence will struggle with everything that follows. This week makes the foundation airtight.

---

## Week 2 — Maximum Likelihood Estimation: Learning as Optimization

**Topics**
- Likelihood function: $L(\theta) = \prod_{i=1}^n p(x_i | \theta)$
- Log-likelihood and why we use it
- MLE as an optimization problem
- MLE for common distributions: Gaussian, Bernoulli, multinomial
- Properties of MLE: consistency, asymptotic normality, efficiency
- Fisher information and the Cramér-Rao bound
- When MLE fails: multimodality, unbounded likelihood, overfitting

**Derivation Targets**
- Derive MLE for Gaussian parameters (mean and variance)
- Derive MLE for multinomial distribution
- Prove consistency of MLE (sketch via law of large numbers on log-likelihood)
- Derive the Fisher information matrix and Cramér-Rao lower bound
- Construct examples where MLE overfits (e.g., Gaussian mixture with collapsing variance)

**Skill Focus:** Treating parameter estimation as a well-defined optimization problem with known properties and failure modes.

**Why this week matters:** MLE is the workhorse of parametric learning. Every neural network trained with cross-entropy is doing MLE. Understanding its properties — and its pathologies — is essential for all subsequent learning.

---

## Week 3 — Bayesian Inference: Priors, Posteriors, and Prediction

**Topics**
- The Bayesian framework: prior $\to$ likelihood $\to$ posterior
- Conjugate priors: Beta-Bernoulli, Gaussian-Gaussian, Dirichlet-Multinomial
- MAP estimation as a bridge between MLE and full Bayes
- Posterior predictive distribution
- Bayesian updating: sequential data processing
- Prior selection: informative, weakly informative, improper priors
- Bayesian vs frequentist: when they agree and disagree

**Derivation Targets**
- Derive the Beta-Bernoulli conjugate posterior in closed form
- Derive the Gaussian-Gaussian conjugate posterior (known variance, unknown mean)
- Show that MAP with Gaussian prior = ridge regression
- Compute the posterior predictive for Bayesian linear regression
- Show that Bayesian updating is order-independent (exchangeability)

**Skill Focus:** Computing posteriors analytically when possible; understanding the prior as an inductive bias with mathematical consequences.

**Why this week matters:** Bayesian inference is the principled way to handle uncertainty about parameters. It naturally incorporates prior knowledge, quantifies uncertainty, and provides the mathematical foundation for model comparison. This week makes it computational, not just philosophical.

---

## Week 4 — Directed Graphical Models: Bayesian Networks

**Topics**
- Graphical models as factorization of joint distributions
- Directed acyclic graphs (DAGs) and conditional independence
- d-separation: reading independence from the graph
- Plate notation for repeated structure
- Common structures: chains, trees, polytrees, naive Bayes as a graph
- Conditional probability tables and parameterization
- Examples: medical diagnosis, spam filtering, genetic networks

**Derivation Targets**
- Prove the factorization theorem: a DAG encodes $p(x_1, \ldots, x_n) = \prod_i p(x_i | \text{pa}(x_i))$
- Derive the d-separation criterion and prove it characterizes conditional independence
- Show that naive Bayes is a specific graphical model and derive its inference rules
- Compute the number of parameters saved by graphical model factorization vs full joint table

**Skill Focus:** Reading and constructing graphical models; extracting conditional independence statements from graphs.

**Why this week matters:** Graphical models are the universal language for structured probabilistic models. They make the assumptions of any model visually explicit and provide mechanical rules for inference. This is the framework that unifies HMMs, topic models, VAEs, and much of modern probabilistic AI.

---

## Week 5 — Undirected Graphical Models: Markov Random Fields

**Topics**
- Undirected graphical models: Markov Random Fields (MRFs)
- Potential functions and the Gibbs distribution
- The partition function and why it is hard to compute
- Conditional independence in undirected models: Markov blanket
- Directed vs undirected: Hammersley-Clifford theorem
- Energy-based models as a modern perspective
- Ising model, Boltzmann machines (historical context)

**Derivation Targets**
- Derive the Gibbs distribution from maximum entropy with constraints
- Prove the Hammersley-Clifford theorem (sketch): positive distribution factorizes over cliques iff Markov properties hold
- Show that the partition function makes exact computation intractable
- Derive the Ising model partition function for small systems and show exponential growth

**Skill Focus:** Understanding the energy/partition function framework; recognizing when directed vs undirected models are appropriate.

**Why this week matters:** Undirected models provide the theoretical foundation for energy-based learning, Boltzmann machines, and modern diffusion/score-based models. The partition function problem — and the tricks to avoid it — drives much of approximate inference and generative modeling.

---

## Week 6 — Exact Inference: Variable Elimination and Message Passing

**Topics**
- The inference problem: compute marginals and conditionals from the joint
- Variable elimination: summing out variables in order
- Elimination ordering and computational complexity
- The junction tree algorithm (conceptual treatment)
- Belief propagation on trees
- Factor graphs as a unified framework
- When exact inference is tractable: trees, bounded treewidth

**Derivation Targets**
- Derive variable elimination for a chain-structured model
- Show that the complexity depends on elimination order
- Derive belief propagation as message passing on a factor graph
- Prove that BP gives exact marginals on trees
- Show that for general graphs, exact inference is NP-hard (sketch via reduction)

**Skill Focus:** Understanding inference as computation; recognizing when exact methods work and when approximation is necessary.

**Why this week matters:** Inference is the core computational problem of probabilistic modeling. Understanding exact methods first — and exactly where they break — motivates all the approximate methods that follow. Without this, approximate inference seems unmotivated.

---

## Week 7 — Latent Variable Models and the EM Algorithm

**Topics**
- Latent variables: what is hidden and why
- Gaussian Mixture Models: the prototypical latent variable model
- The incomplete data problem: marginalizing over hidden variables
- The EM algorithm: E-step and M-step
- EM as coordinate ascent on a lower bound
- Convergence properties of EM
- EM for specific models: GMMs, missing data problems

**Derivation Targets**
- Derive the EM algorithm from the ELBO (evidence lower bound)
- Show that EM monotonically increases the log-likelihood
- Derive the E-step and M-step for Gaussian Mixture Models in full detail
- Prove that EM converges to a local maximum (or saddle point) of the likelihood
- Show the connection: EM = alternating maximization of $\mathcal{L}(q, \theta) = \mathbb{E}_q[\log p(x,z|\theta)] + H(q)$

**Skill Focus:** Deriving EM for new models; understanding the ELBO as the key quantity; recognizing latent variable structure in diverse problems.

**Why this week matters:** EM is one of the most important algorithms in all of probabilistic ML. It handles missing data, mixture models, and hidden structure. The ELBO perspective directly leads to variational autoencoders in Course 10. This week is the bridge between classical statistics and modern generative modeling.

---

## Week 8 — Hidden Markov Models: Latent Variables in Sequence

**Topics**
- Hidden Markov Models: definition and graphical model structure
- The three HMM problems: evaluation, decoding, learning
- Forward-backward algorithm: computing marginals efficiently
- Viterbi algorithm: most likely state sequence
- Baum-Welch = EM for HMMs
- HMMs as a special case of graphical model inference
- Applications: speech recognition, biological sequences, financial modeling

**Derivation Targets**
- Derive the forward algorithm and show it computes $p(x_{1:T})$ in $O(TK^2)$
- Derive the backward algorithm and the forward-backward computation of state posteriors
- Derive the Viterbi algorithm as dynamic programming for the most likely path
- Show that Baum-Welch is EM applied to the HMM
- Prove the computational complexity improvements over naive enumeration

**Skill Focus:** Seeing dynamic programming and message passing as inference in structured probabilistic models; connecting temporal structure to tractable inference.

**Why this week matters:** HMMs are the foundational sequence model in probabilistic ML. They demonstrate how temporal structure makes inference tractable and introduce the forward-backward and Viterbi algorithms that reappear in CRFs, RNNs, and attention mechanisms. This is the bridge to Course 6 (Sequence Modeling).

---

## Week 9 — Monte Carlo Methods: Sampling as Inference

**Topics**
- Why sampling: when exact and deterministic approximations fail
- Monte Carlo estimation: $\mathbb{E}[f(X)] \approx \frac{1}{N}\sum f(x_i)$
- Rejection sampling and importance sampling
- Markov Chain Monte Carlo: the idea of constructing a chain with the right stationary distribution
- Metropolis-Hastings algorithm
- Gibbs sampling as a special case
- Convergence diagnostics: mixing, burn-in, autocorrelation

**Derivation Targets**
- Prove that Monte Carlo estimates are unbiased and derive their variance
- Derive importance sampling and show the variance depends on the proposal distribution
- Prove that Metropolis-Hastings satisfies detailed balance (and hence has the correct stationary distribution)
- Derive Gibbs sampling from MH with proposal = full conditional
- Analyze a simple example where MCMC mixes slowly (multimodal distribution)

**Skill Focus:** Understanding sampling as a computational tool for inference; diagnosing when MCMC works and when it fails.

**Why this week matters:** MCMC is the default tool for Bayesian inference in complex models. Understanding it — including its failure modes — is essential for anyone who wants to do serious probabilistic modeling. It also provides the foundation for understanding MCMC-based training methods and diffusion models.

---

## Week 10 — Variational Inference: Optimization as Approximate Inference

**Topics**
- The ELBO revisited: $\log p(x) \geq \mathbb{E}_q[\log p(x,z)] - \mathbb{E}_q[\log q(z)]$
- Variational inference: turn inference into optimization
- Mean-field approximation: factored variational family
- Coordinate ascent variational inference (CAVI)
- Stochastic variational inference: scaling to large datasets
- Variational inference vs MCMC: tradeoffs
- Amortized inference (preview of VAEs)

**Derivation Targets**
- Derive the ELBO from Jensen's inequality
- Show that maximizing the ELBO is equivalent to minimizing $\text{KL}(q \| p(\cdot|x))$
- Derive CAVI updates for a Gaussian mixture model
- Show that mean-field underestimates posterior variance
- Derive the reparameterization trick for Gaussian variational distributions (preview)

**Skill Focus:** Formulating inference as optimization; understanding the ELBO as the central object; knowing when variational approximation is good or bad.

**Why this week matters:** Variational inference is the computational backbone of modern probabilistic deep learning. VAEs, normalizing flows, and much of Bayesian deep learning use variational objectives. The ELBO is arguably the most important single equation in modern generative modeling.

---

## Week 11 — Bayesian Model Selection and Information Criteria

**Topics**
- Model comparison: which model explains the data best?
- Bayesian model evidence (marginal likelihood): $p(x) = \int p(x|\theta) p(\theta) d\theta$
- Bayes factors
- The Bayesian Occam's razor: automatic complexity penalty
- Information criteria: AIC, BIC, DIC, WAIC
- Cross-validation as model selection
- Bayesian nonparametrics: Dirichlet process (conceptual introduction)

**Derivation Targets**
- Derive BIC as a Laplace approximation to the log marginal likelihood
- Show why the marginal likelihood penalizes complex models (Bayesian Occam's razor geometry)
- Derive AIC from an asymptotic expansion of cross-validation
- Compare BIC and AIC: when they agree and disagree
- Show that the Dirichlet process allows infinite mixture components with finite data (sketch)

**Skill Focus:** Principled model comparison; understanding the tension between fit and complexity in probabilistic terms.

**Why this week matters:** Model selection is one of the most practically important problems in ML. Bayesian model evidence provides the gold standard, and understanding it — including when cheaper approximations (AIC, BIC, cross-validation) are adequate — is essential for principled modeling.

---

## Week 12 — Gaussian Processes: Nonparametric Bayesian Learning

**Topics**
- Gaussian processes: a distribution over functions
- GP as infinite-width limit of Bayesian neural networks (preview)
- Kernel functions and the GP prior
- GP regression: posterior and predictive distribution in closed form
- GP classification: Laplace approximation and EP
- Hyperparameter optimization: marginal likelihood
- Connections to kernel methods and RKHS

**Derivation Targets**
- Derive the GP posterior predictive: $p(f_* | X, y, X_*) = \mathcal{N}(\mu_*, \Sigma_*)$ in full
- Show the connection between GP regression and kernel ridge regression
- Derive the marginal likelihood for GP hyperparameter optimization
- Show that the RBF kernel GP is a universal approximator
- Compute GP predictions for a simple 1D regression example by hand

**Skill Focus:** Understanding function-space thinking; seeing GPs as the Bayesian nonparametric analog of kernel methods.

**Why this week matters:** GPs represent the cleanest integration of Bayesian inference, kernel methods, and function approximation. They provide exact uncertainty quantification and connect to neural network theory (the neural tangent kernel, infinite-width limits). This is where probabilistic modeling, learning theory, and deep learning theory converge.

---

## Week 13 — Topic Models and Structured Latent Variables

**Topics**
- Latent Dirichlet Allocation (LDA): the generative story
- Inference for LDA: collapsed Gibbs, variational EM
- Beyond LDA: correlated topic models, dynamic topic models
- Mixed membership models
- Non-negative matrix factorization as a related approach
- Hierarchical Bayesian models
- Exchangeability and de Finetti's theorem

**Derivation Targets**
- Derive the LDA generative model and its graphical model representation
- Derive the collapsed Gibbs sampler for LDA
- Derive the variational EM updates for LDA
- Prove de Finetti's theorem (sketch): exchangeable sequences are mixtures of iid sequences
- Show the connection between NMF and probabilistic topic models

**Skill Focus:** Building complex latent variable models; combining multiple inference techniques for a single model.

**Why this week matters:** Topic models are the canonical example of structured latent variable models — and the first place where students see the full pipeline: specify a generative model, derive an inference algorithm, and evaluate the learned structure. This pattern reappears in VAEs, diffusion models, and modern representation learning.

---

## Week 14 — Causal Inference and Structural Models

**Topics**
- Causation vs correlation: why it matters for AI
- Structural causal models (SCMs)
- do-calculus and interventions
- Confounders, colliders, and causal paths
- The adjustment formula and backdoor criterion
- Instrumental variables
- Counterfactuals in the structural causal framework
- Causal discovery: from data to causal structure

**Derivation Targets**
- Derive the adjustment formula from the backdoor criterion
- Show why conditioning on a collider introduces spurious correlation
- Prove the rules of do-calculus (sketch)
- Construct examples where correlation and causation diverge dramatically
- Show the difference between observational, interventional, and counterfactual quantities

**Skill Focus:** Distinguishing causal from statistical reasoning; understanding when learning from data can and cannot answer causal questions.

**Why this week matters:** Most of ML learns correlations. But decisions require causal reasoning. This week introduces the mathematical framework for causality — which is essential for understanding distribution shift, fairness, robustness, and alignment in Course 12.

---

## Week 15 — Synthesis: The Probabilistic Lens on AI

**Purpose:** No new content. Consolidate the entire probabilistic modeling framework.

**What to synthesize:**
$$\text{likelihood} \to \text{Bayes} \to \text{graphical models} \to \text{latent variables} \to \text{EM/VI} \to \text{sampling} \to \text{model selection} \to \text{causality}$$

**Capstone problems (select 2–3 for full reconstruction):**
- Specify a new latent variable model for a given problem: draw the graphical model, write the joint distribution, derive an EM or variational inference algorithm
- Derive the ELBO and show its relationship to KL divergence and log-likelihood
- Compare MCMC and variational inference on a specific model: analyze tradeoffs in bias, variance, and computation
- Given a dataset with potential confounders, specify a causal model and derive what causal quantities can be identified

**Final message:** Probabilistic modeling gives AI a principled language for uncertainty, hidden structure, and the difference between correlation and causation. Without it, models are confident when they should be uncertain, and correlative when they should be causal.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Likelihood** | MLE derivation; Fisher information; Cramér-Rao bound |
| **Bayesian** | Conjugate posteriors; MAP = regularized MLE; predictive distributions |
| **Graphical models** | Factorization theorem; d-separation; Hammersley-Clifford |
| **Inference** | Variable elimination; belief propagation on trees; junction tree |
| **EM** | ELBO derivation; EM convergence; GMM E-step and M-step |
| **HMMs** | Forward-backward; Viterbi; Baum-Welch |
| **Sampling** | MH detailed balance; Gibbs from MH; Monte Carlo variance |
| **Variational** | ELBO = log p(x) - KL; CAVI; reparameterization trick |
| **GPs** | GP posterior predictive; marginal likelihood; kernel connection |
| **Causality** | do-calculus; backdoor criterion; adjustment formula |

---

## Problem Set Structure

**A. Model specification** — Given a problem, specify a complete probabilistic model: draw the graphical model, write the joint distribution, identify parameters and latent variables.

**B. Inference derivation** — Derive an inference algorithm (exact, EM, variational, or sampling) for a given model from scratch.

**C. Computational analysis** — Analyze the computational complexity of inference; explain why exact methods fail and which approximation is appropriate.

**D. Bayesian analysis** — Compute posteriors, predictive distributions, and model evidence; compare Bayesian and frequentist approaches.

**E. Causal reasoning** — Given a causal graph, identify confounders; derive adjustment formulas; show what can and cannot be estimated from observational data.

**F. Model comparison** — Given two probabilistic models for the same data, compare them using marginal likelihood, information criteria, and cross-validation.

> If the problem sets only ask "fit a GMM and plot the clusters," the course has failed. The student must be able to specify, derive inference for, and critically evaluate probabilistic models.

---

*Course 4 continues with Representation Learning and Neural Networks, where learned features replace handcrafted ones.*

---
---