# Course 2: Statistical Learning and Classical Machine Learning
**15-Week Rigorous Sequence — The Foundation of Learning from Data**

> **Course philosophy:** Machine learning is not a collection of algorithms — it is the study of when and why learning from finite data can generalize to unseen data. Every algorithm is an answer to: what assumptions about the data-generating process make generalization possible? This course builds that understanding from risk minimization through the major algorithm families, always asking not just "how" but "why" and "when."

**Primary text:** Hastie, Tibshirani & Friedman, *The Elements of Statistical Learning* | **Supplement:** Shalev-Shwartz & Ben-David, *Understanding Machine Learning* | **Reference:** Bishop, *Pattern Recognition and Machine Learning*

---

## Course Goal

Build the conceptual and mathematical machinery of statistical learning well enough that the student can analyze any supervised or unsupervised learning method in terms of its assumptions, capacity, generalization properties, and failure modes. The conceptual spine is:

$$\text{risk} \to \text{ERM} \to \text{bias-variance} \to \text{linear models} \to \text{kernel methods} \to \text{trees/ensembles} \to \text{unsupervised learning} \to \text{learning theory}$$

---

## Week 1 — The Learning Problem: From Data to Decisions

**Topics**
- What is a learning problem: input space, output space, hypothesis class, loss function
- Population risk vs empirical risk
- Empirical Risk Minimization (ERM)
- The fundamental tension: fitting training data vs generalizing to unseen data
- Train / validation / test splits: why three sets, not two
- Sources of error: approximation, estimation, optimization

**Derivation Targets**
- Formally define population risk $R(h) = \mathbb{E}[\ell(h(X), Y)]$ and empirical risk $\hat{R}_n(h)$
- Decompose excess risk into approximation + estimation + optimization error
- Show that minimizing empirical risk on training data does not minimize population risk without further assumptions
- Derive why a separate test set is necessary for unbiased evaluation

**Skill Focus:** Formalizing intuitive notions of "learning" and "generalization"; distinguishing the three sources of error.

**Why this week matters:** Without this framing, ML reduces to curve fitting. This week establishes that the real question is not "does the model fit the data?" but "will the model work on new data?" — and that answering this requires mathematical structure.

---

## Week 2 — Bias-Variance Tradeoff and Model Complexity

**Topics**
- Bias-variance decomposition for squared loss
- Bias: systematic error from model assumptions
- Variance: sensitivity to training set randomness
- The U-shaped test error curve
- Model complexity and its effect on bias and variance
- Overfitting and underfitting: precise definitions
- Cross-validation: k-fold, leave-one-out

**Derivation Targets**
- Derive the bias-variance decomposition: $\text{MSE} = \text{Bias}^2 + \text{Variance} + \text{Noise}$
- Show that increasing model complexity reduces bias but increases variance
- Prove that leave-one-out CV is approximately unbiased for prediction error
- Construct explicit examples where high-bias or high-variance dominates

**Skill Focus:** Diagnosing whether a model fails from bias or variance; using this diagnosis to guide model selection.

**Why this week matters:** The bias-variance tradeoff is the most important conceptual tool in classical ML. It explains why simple models underfit, complex models overfit, and regularization works. Without it, model selection is guesswork.

---

## Week 3 — Linear Regression: The Complete Theory

**Topics**
- Ordinary least squares: geometric and algebraic derivation
- Normal equations: $\hat{\beta} = (X^TX)^{-1}X^Ty$
- Projection interpretation: $\hat{y} = X(X^TX)^{-1}X^Ty$ as orthogonal projection
- Statistical properties: unbiasedness, variance of $\hat{\beta}$, Gauss-Markov theorem
- Ridge regression: $\hat{\beta}_\lambda = (X^TX + \lambda I)^{-1}X^Ty$
- Lasso: $\ell_1$ penalization and sparsity
- Bias-variance tradeoff in regularized regression

**Derivation Targets**
- Derive OLS from calculus (gradient = 0) and from geometry (projection)
- Prove the Gauss-Markov theorem: OLS is BLUE
- Derive ridge regression and show it shrinks eigencomponents of $X^TX$
- Show geometrically why lasso induces sparsity (diamond constraint set)

**Skill Focus:** Seeing linear regression as a complete mathematical object with geometric, algebraic, statistical, and optimization characterizations.

**Why this week matters:** Linear regression is not a toy — it is the template for all parametric learning. Ridge and lasso introduce regularization. The projection interpretation connects to inner product spaces. Every concept here reappears in more complex models.

---

## Week 4 — Classification: Logistic Regression and Decision Boundaries

**Topics**
- Classification as a learning problem
- Linear decision boundaries
- Logistic regression: modeling $P(Y=1|X)$ via sigmoid
- Maximum likelihood estimation for logistic regression
- Cross-entropy loss and its properties
- Gradient descent for logistic regression (no closed form)
- Multiclass extension: softmax regression
- Calibration: when predicted probabilities are meaningful

**Derivation Targets**
- Derive logistic regression from the log-odds model
- Show that MLE for logistic regression is equivalent to minimizing cross-entropy
- Prove that cross-entropy is convex in the parameters
- Derive the gradient of the cross-entropy loss for softmax
- Show that logistic regression can separate linearly separable data perfectly (and what happens with regularization)

**Skill Focus:** Understanding classification as probability estimation, not just label prediction; connecting likelihood to loss.

**Why this week matters:** Logistic regression is the simplest nontrivial classifier and introduces the concepts of probabilistic prediction, cross-entropy, and calibration that dominate all of modern deep learning classification.

---

## Week 5 — Generative vs Discriminative Models

**Topics**
- Discriminative approach: model $P(Y|X)$ directly
- Generative approach: model $P(X|Y)$ and $P(Y)$, then use Bayes' rule
- Naive Bayes: conditional independence assumption
- Gaussian Discriminant Analysis (GDA): generative Gaussian model
- When generative beats discriminative and vice versa
- The Ng-Jordan result: generative converges faster in parameters, discriminative has lower asymptotic error

**Derivation Targets**
- Derive the Naive Bayes classifier from Bayes' rule + conditional independence
- Derive GDA and show it produces a linear decision boundary when covariances are equal
- Show that GDA and logistic regression produce the same functional form but different parameter estimates
- Analyze the bias-variance comparison: generative models have higher bias but lower variance

**Skill Focus:** Understanding the generative-discriminative distinction as a fundamental modeling choice, not just two types of classifiers.

**Why this week matters:** This distinction reappears everywhere: GANs vs classifiers, language models vs text classifiers, Bayesian vs frequentist approaches. Understanding it here prevents confusion in later courses.

---

## Week 6 — Nearest Neighbors and Nonparametric Methods

**Topics**
- k-Nearest Neighbors: algorithm and decision boundaries
- The curse of dimensionality
- Bias-variance analysis of k-NN
- Stone's theorem: k-NN is universally consistent
- Kernel density estimation
- Local methods vs global methods
- Distance metrics and their effect on k-NN

**Derivation Targets**
- Prove that 1-NN has asymptotic risk at most $2R^*$ where $R^*$ is the Bayes risk (Cover-Hart theorem)
- Show that in high dimensions, distances concentrate: all points become approximately equidistant
- Analyze the bias-variance tradeoff as a function of k
- Prove universal consistency of k-NN under mild conditions (sketch)

**Skill Focus:** Understanding what nonparametric means mathematically; grappling with the curse of dimensionality as a fundamental barrier.

**Why this week matters:** k-NN is the purest learning algorithm: no training phase, no parameters, just data. It reveals what is easy and hard about learning in its most transparent form. The curse of dimensionality is the fundamental reason why structure (models, features, architectures) is needed.

---

## Week 7 — Decision Trees and Ensemble Methods

**Topics**
- Decision trees: recursive partitioning
- Splitting criteria: Gini impurity, entropy, misclassification rate
- Pruning and depth control
- Instability of trees: high variance
- Bagging: variance reduction via averaging
- Random forests: bagging + feature randomization
- Why random forests reduce variance without increasing bias much

**Derivation Targets**
- Derive the Gini impurity criterion from misclassification probability
- Show that bagging reduces variance: if models have variance $\sigma^2$ and correlation $\rho$, the ensemble has variance $\rho\sigma^2 + (1-\rho)\sigma^2/B$
- Prove that random feature selection reduces correlation between trees
- Analyze why deeper trees have lower bias but higher variance

**Skill Focus:** Understanding the variance-reduction principle behind ensembles; seeing random forests as a principled combination of bias-variance management.

**Why this week matters:** Random forests are one of the most practically important algorithms in all of ML. They also provide the clearest example of the ensemble principle — which reappears in boosting, model averaging, and even implicit ensembling in deep learning.

---

## Week 8 — Boosting: From Weak to Strong Learning

**Topics**
- The boosting question: can weak learners be combined into a strong learner?
- AdaBoost: iterative reweighting of training examples
- Forward stagewise additive modeling
- Gradient boosting: boosting as gradient descent in function space
- XGBoost and practical boosting
- Bias-variance analysis of boosting: primarily reduces bias
- Boosting and margins

**Derivation Targets**
- Derive AdaBoost and show it minimizes exponential loss
- Prove the training error bound for AdaBoost: exponential decrease with rounds
- Derive gradient boosting as functional gradient descent
- Show the margin interpretation of boosting and its connection to generalization

**Skill Focus:** Understanding boosting as a fundamentally different ensemble strategy from bagging; seeing gradient boosting as optimization in function space.

**Why this week matters:** Gradient boosting (XGBoost, LightGBM) dominates tabular data problems. Boosting also introduces the idea of optimization in function space — fitting residuals iteratively — which is a beautiful mathematical idea that connects to many other areas.

---

## Week 9 — Support Vector Machines and the Kernel Trick

**Topics**
- Maximum margin classification
- Hard-margin SVM: constrained optimization formulation
- Soft-margin SVM: slack variables and the C parameter
- The dual problem and support vectors
- The kernel trick: implicit feature maps
- Common kernels: polynomial, RBF, string kernels
- Kernel methods as a framework: kernel ridge regression, kernel PCA
- Reproducing kernel Hilbert spaces (conceptual introduction)

**Derivation Targets**
- Derive the hard-margin SVM dual from the primal via Lagrangian duality
- Show that the decision function depends only on inner products: $f(x) = \sum_i \alpha_i y_i K(x_i, x) + b$
- Prove Mercer's theorem (sketch): valid kernels correspond to inner products in some feature space
- Derive the RBF kernel as an inner product in infinite-dimensional space
- Apply KKT conditions to show only support vectors have $\alpha_i > 0$

**Skill Focus:** Understanding kernels as implicit feature maps; connecting optimization (duality), geometry (margins), and function spaces (RKHS).

**Why this week matters:** SVMs are the pinnacle of classical ML theory. They bring together optimization, geometry, functional analysis, and statistical learning in one elegant framework. The kernel trick is also one of the most beautiful ideas in ML — and it foreshadows the representation learning of deep networks.

---

## Week 10 — Unsupervised Learning: Clustering and Dimensionality Reduction

**Topics**
- Unsupervised learning: what does it mean to learn without labels?
- K-means clustering: algorithm, convergence, limitations
- Hierarchical clustering: linkage criteria
- Principal Component Analysis: derivation from maximum variance and minimum reconstruction error
- PCA as eigendecomposition of the covariance matrix
- Connection to SVD
- Limitations of PCA: linearity assumption

**Derivation Targets**
- Derive PCA as the solution to $\max_{\|w\|=1} w^T \Sigma w$
- Show equivalence between maximum variance and minimum reconstruction error formulations
- Prove k-means converges in finite steps (monotone decrease of objective)
- Derive the proportion of variance explained by the first $k$ principal components

**Skill Focus:** Understanding unsupervised learning as structure discovery; connecting PCA to linear algebra (eigenvalues, SVD) and to information compression.

**Why this week matters:** Unsupervised learning is where ML meets data exploration. PCA in particular connects beautifully to linear algebra and provides the first glimpse of representation learning: finding a low-dimensional structure that captures the essential variation.

---

## Week 11 — Feature Engineering and the Representation Problem

**Topics**
- Why features matter: garbage in, garbage out
- Manual feature engineering: domain knowledge encoded as transformations
- Polynomial features, interaction terms, basis expansions
- Feature selection: filter, wrapper, embedded methods
- Feature scaling and normalization
- The curse and blessing of dimensionality
- Why classical ML requires good features (preview of why DL changes this)

**Derivation Targets**
- Show that polynomial features make linear models nonlinear in input space
- Derive feature importance from random forests (permutation importance)
- Analyze how PCA can be used for feature engineering
- Show the bias-variance tradeoff as features are added or removed

**Skill Focus:** Understanding that in classical ML, the quality of features determines the quality of learning; appreciating what deep learning automates.

**Why this week matters:** This is the pivotal week. In classical ML, the human provides features; the algorithm fits parameters. In deep learning (Course 4), both are learned jointly. Understanding what feature engineering requires — and why it's the bottleneck — motivates the entire transition to representation learning.

---

## Week 12 — Evaluation: Metrics, Methodology, and Honest Assessment

**Topics**
- Classification metrics: accuracy, precision, recall, F1, ROC-AUC, PR-AUC
- Regression metrics: MSE, MAE, $R^2$, explained variance
- Calibration: reliability diagrams, Brier score
- Proper scoring rules
- Cross-validation: stratified, grouped, time-series
- Statistical testing of model comparisons
- Data leakage: causes, consequences, prevention

**Derivation Targets**
- Prove that log loss is a proper scoring rule
- Derive the relationship between ROC-AUC and the probability that a random positive is ranked above a random negative
- Show how data leakage inflates performance metrics with concrete examples
- Derive the variance of k-fold CV estimates

**Skill Focus:** Rigorous evaluation methodology; understanding that choosing the wrong metric or evaluation procedure can make a bad model look good.

**Why this week matters:** An ML practitioner who cannot evaluate models honestly is dangerous. This week teaches the discipline of honest assessment — which is equally important in deep learning, RL, and generative modeling.

---

## Week 13 — Learning Theory: Generalization Bounds

**Topics**
- Finite hypothesis classes: union bound and the growth function
- VC dimension: measuring hypothesis class complexity
- VC generalization bound: $R(h) \leq \hat{R}_n(h) + O(\sqrt{d_{VC}/n})$
- Rademacher complexity
- Structural risk minimization
- PAC learning framework
- No free lunch theorem

**Derivation Targets**
- Prove the finite hypothesis class generalization bound via union bound + Hoeffding
- Compute VC dimension for linear classifiers in $\mathbb{R}^d$: $d_{VC} = d+1$
- State and interpret the VC bound
- Prove the no free lunch theorem (sketch): no algorithm is best on all problems

**Skill Focus:** Understanding generalization mathematically, not just intuitively; reading bounds and knowing what they guarantee.

**Why this week matters:** Learning theory answers the deepest question in ML: why does learning from finite data work at all? VC theory provides the first rigorous answer. It also reveals the limitations of classical theory (VC bounds are loose for modern deep learning), motivating Course 5.

---

## Week 14 — The Bayesian Perspective on Learning

**Topics**
- Bayesian vs frequentist viewpoints
- Prior, likelihood, posterior
- MAP estimation as regularized MLE
- Bayesian model comparison and Occam's razor
- Predictive distributions
- Bayesian linear regression
- When Bayesian and frequentist answers agree and disagree

**Derivation Targets**
- Derive MAP estimation and show it equals ridge regression for Gaussian prior
- Derive the Bayesian linear regression posterior in closed form
- Show that Bayesian model comparison naturally penalizes complexity (Occam's razor)
- Compute the predictive distribution and show it accounts for parameter uncertainty

**Skill Focus:** Understanding the Bayesian framework as an alternative foundation for learning; connecting it to regularization and model selection.

**Why this week matters:** The Bayesian perspective provides a principled framework for uncertainty, model comparison, and regularization that complements the frequentist/optimization viewpoint. It is the foundation for Course 3 (Probabilistic Modeling) and essential for understanding modern Bayesian deep learning.

---

## Week 15 — Synthesis: The Statistical Learning Worldview

**Purpose:** No new content. Consolidate the entire statistical learning framework.

**What to synthesize:**
$$\text{risk/ERM} \to \text{bias-variance} \to \text{linear models} \to \text{kernels/SVMs} \to \text{trees/ensembles} \to \text{unsupervised} \to \text{evaluation} \to \text{theory}$$

**Capstone problems (select 2–3 for full reconstruction):**
- Given a new learning problem, formally specify it (input space, output space, loss, hypothesis class, evaluation) and recommend an algorithm family with mathematical justification
- Derive the bias-variance decomposition and apply it to diagnose a specific model
- Prove the VC generalization bound from scratch
- Design a complete evaluation pipeline for a model comparison, including proper cross-validation and statistical testing

**Final message:** Statistical learning is the science of generalization. Every algorithm encodes assumptions about the data. The art is matching assumptions to reality. The theory tells you when and why this works.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Risk** | Population vs empirical risk; excess risk decomposition; ERM |
| **Bias-Variance** | Decomposition for squared loss; tradeoff with complexity |
| **Linear models** | OLS derivation; Gauss-Markov; ridge/lasso |
| **Classification** | Logistic regression MLE = cross-entropy minimization; softmax |
| **Generative** | Naive Bayes; GDA; generative-discriminative equivalence |
| **Nonparametric** | k-NN consistency; curse of dimensionality |
| **Ensembles** | Bagging variance reduction; boosting training error bound |
| **SVMs** | SVM dual; kernel trick; Mercer's theorem |
| **Theory** | Finite class bound; VC dimension; no free lunch |

---

## Problem Set Structure

**A. Formalization problems** — Given a real-world scenario, formalize the learning problem: define inputs, outputs, loss, hypothesis class, and evaluation protocol.

**B. Algorithm derivation** — Derive an algorithm from its objective; show how changing the loss or regularizer changes the solution.

**C. Bias-variance analysis** — For a given model family, analyze bias and variance as a function of complexity; predict where overfitting/underfitting occurs.

**D. Evaluation design** — Design a rigorous evaluation protocol; identify potential data leakage; choose appropriate metrics.

**E. Theory problems** — Prove generalization bounds; compute VC dimensions; construct examples showing bounds are tight or loose.

**F. Comparison problems** — Given two algorithms, analyze when each is preferred based on mathematical properties (not just "run both and compare accuracy").

> If the problem sets only ask "fit model X and report accuracy," the course has failed. The student must understand why the algorithm works, when it fails, and what generalization means mathematically.

---

*Course 3 continues with Probabilistic Modeling, where uncertainty becomes the central object of study.*

---