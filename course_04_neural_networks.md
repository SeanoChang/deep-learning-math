# Course 4: Representation Learning and Neural Networks
**15-Week Rigorous Sequence — From Function Approximation to Learned Features**

> **Course philosophy:** A neural network is not magic — it is a parameterized family of composed nonlinear functions, trained by gradient-based optimization to simultaneously learn representations and predictions. The defining shift from classical ML to deep learning is that features are no longer handcrafted — they are learned. This course builds that understanding from universal approximation through modern architectural principles.

**Primary text:** Goodfellow, Bengio & Courville, *Deep Learning* | **Supplement:** Zhang et al., *Dive into Deep Learning* | **Reference:** Prince, *Understanding Deep Learning*

---

## Course Goal

Build the mathematical and computational foundation of deep learning from first principles: why neural networks can approximate functions, how backpropagation computes gradients, what initialization/normalization/residual connections do, and why depth and width matter differently. The conceptual spine is:

$$\text{approximation} \to \text{composition} \to \text{backprop} \to \text{activations} \to \text{initialization} \to \text{normalization} \to \text{residuals} \to \text{depth vs width}$$

---

## Week 1 — Function Approximation: What Neural Networks Compute

**Topics**
- Neural networks as parameterized function families
- Single hidden layer networks: $f(x) = W_2 \sigma(W_1 x + b_1) + b_2$
- Universal Approximation Theorem (Cybenko, Hornik)
- What UAT says and what it does not say
- Approximation vs learning: having capacity $\neq$ finding the solution
- Width vs depth in approximation power

**Derivation Targets**
- State the Universal Approximation Theorem precisely
- Show a constructive proof sketch: how step functions approximate continuous functions
- Demonstrate that UAT is an existence result, not an efficiency result
- Construct a function that requires exponentially many neurons with one layer but polynomially many with two layers

**Skill Focus:** Understanding neural networks as function approximators with known theoretical guarantees and limitations; separating approximation theory from optimization.

**Why this week matters:** Many people treat neural networks as black boxes. This week establishes that they are mathematically characterized function families with known approximation properties. The key insight: capacity to represent a function does not mean the optimizer will find it.

---

## Week 2 — Computational Graphs and the Forward Pass

**Topics**
- Computational graphs: nodes as operations, edges as data flow
- The forward pass as function evaluation
- Compositionality: deep networks as compositions $f = f_L \circ f_{L-1} \circ \cdots \circ f_1$
- Vectorized computation: batch operations and matrix formulation
- Static vs dynamic computation graphs
- Common layers: linear, activation, normalization, pooling
- Parameters vs hyperparameters vs activations

**Derivation Targets**
- Write the forward pass for a 3-layer MLP as explicit matrix operations
- Show that a computational graph defines a unique mathematical function
- Compute the output dimensions through a sequence of layers
- Trace the forward pass through a simple graph by hand, identifying all intermediate quantities

**Skill Focus:** Reading and constructing computational graphs; understanding exactly what computation a network performs.

**Why this week matters:** The computational graph is the fundamental abstraction of deep learning. Every forward pass, every gradient computation, every architectural innovation is a manipulation of this graph. Students who cannot read a computational graph cannot reason about deep learning.

---

## Week 3 — Backpropagation: Gradients Through Composition

**Topics**
- Backpropagation as the chain rule applied to computational graphs
- Forward mode vs reverse mode automatic differentiation
- Why reverse mode is efficient for scalar-output functions (ML losses)
- Jacobian-vector products and vector-Jacobian products
- Backprop for common layers: linear, ReLU, softmax + cross-entropy
- Computational cost of backprop: $\sim 2-3\times$ the forward pass

**Derivation Targets**
- Derive backprop for a 3-layer MLP from the chain rule: compute $\partial L / \partial W_l$ for each layer
- Show that reverse-mode AD computes all parameter gradients in one backward pass (cost proportional to forward pass)
- Derive the gradient of softmax + cross-entropy and show the elegant simplification: $\hat{y} - y$
- Prove that forward-mode AD costs $O(p)$ per parameter, making reverse mode exponentially better for typical ML ($p \gg 1$, scalar loss)

**Skill Focus:** Deriving backprop by hand; understanding automatic differentiation as a principled algorithm, not a black box.

**Why this week matters:** Backprop is the algorithm that makes deep learning possible. Without understanding it, the student cannot diagnose gradient issues, design custom layers, or understand why certain architectures train better than others. This is not optional knowledge.

---

## Week 4 — Activation Functions: Nonlinearity and Its Consequences

**Topics**
- Why nonlinearity is necessary: without it, deep = shallow
- Sigmoid and tanh: saturation and vanishing gradients
- ReLU: simplicity and the dead neuron problem
- Leaky ReLU, ELU, GELU, Swish/SiLU
- How activation choice affects gradient flow
- Activation functions and expressivity: piecewise linear networks
- Universal approximation with ReLU: piecewise linear function families

**Derivation Targets**
- Prove that a composition of linear functions is linear: no depth benefit without nonlinearity
- Derive the gradient of sigmoid and show saturation: $\sigma'(x) \to 0$ for $|x| \gg 0$
- Show that ReLU networks compute piecewise linear functions; count the number of linear regions
- Derive the gradient flow through $L$ sigmoid layers and show exponential decay (vanishing gradient)
- Compare gradient magnitudes through ReLU vs sigmoid vs GELU networks

**Skill Focus:** Understanding activation functions as the source of all nonlinear computation in neural networks; choosing activations based on gradient flow properties.

**Why this week matters:** The activation function is what makes a neural network more than a linear model. The choice of activation dramatically affects training dynamics — sigmoid's vanishing gradient problem delayed deep learning for years, and ReLU's simplicity enabled it. This week explains why.

---

## Week 5 — Loss Functions and Training Objectives

**Topics**
- Loss functions as the bridge between model output and learning signal
- Regression losses: MSE, MAE, Huber
- Classification losses: cross-entropy, hinge, focal loss
- Loss functions and probabilistic interpretation: cross-entropy = negative log-likelihood
- Multi-task and auxiliary losses
- Label smoothing and its regularization effect
- Loss landscape: how the choice of loss shapes the optimization surface

**Derivation Targets**
- Derive cross-entropy loss from MLE for categorical distributions
- Show that MSE is MLE for Gaussian-distributed targets
- Derive focal loss and show how it downweights easy examples
- Prove that cross-entropy is a proper scoring rule
- Analyze how label smoothing changes the optimal output distribution

**Skill Focus:** Selecting loss functions based on mathematical properties and problem requirements, not just convention.

**Why this week matters:** The loss function defines what the network learns. Choosing the wrong loss leads to systematically wrong behavior — even with perfect architecture and optimization. Understanding the probabilistic meaning of each loss function prevents this.

---

## Week 6 — Initialization: Breaking Symmetry and Controlling Scale

**Topics**
- Why initialization matters: symmetry breaking
- The exploding/vanishing activation problem at initialization
- Xavier/Glorot initialization: maintaining variance through layers
- He initialization: adapting to ReLU
- The mean field theory view: propagating signal through deep networks
- Orthogonal initialization
- Initialization and the edge of chaos

**Derivation Targets**
- Prove that identical initialization leads to identical gradients (symmetry)
- Derive Xavier initialization: if $w_{ij} \sim \mathcal{N}(0, 1/n_{\text{in}})$, variance is preserved through linear layers
- Derive He initialization for ReLU: account for the factor of 2 from ReLU killing half the distribution
- Compute the variance of activations through $L$ layers with random weights and show exponential growth/decay
- Show that orthogonal initialization preserves norms exactly

**Skill Focus:** Deriving initialization schemes from variance propagation analysis; understanding that initialization is a mathematical design choice, not an afterthought.

**Why this week matters:** Bad initialization can make a network untrainable. Good initialization is a mathematical condition: signal (activations and gradients) must propagate through the network without exploding or vanishing. This week derives the conditions.

---

## Week 7 — Normalization: Stabilizing Training Dynamics

**Topics**
- Batch normalization: normalize activations across the batch
- The forward pass: normalize, scale, shift
- BatchNorm during training vs inference
- Why BatchNorm works: multiple hypotheses (covariate shift, smoothing, regularization)
- Layer normalization: normalize across features
- Group normalization, instance normalization, RMSNorm
- When to use which normalization

**Derivation Targets**
- Derive the batch normalization forward pass and backpropagation
- Show that BatchNorm makes the loss landscape smoother (Li et al. result, sketch)
- Derive layer normalization and show it is batch-size independent
- Analyze how normalization interacts with learning rate: effective learning rate changes
- Show that BatchNorm introduces implicit regularization via batch noise

**Skill Focus:** Understanding normalization as a training dynamics intervention, not just a heuristic; deriving backward passes through normalization layers.

**Why this week matters:** Normalization was the key innovation that made training very deep networks practical. Understanding why it works — and why different normalizations suit different settings (BatchNorm for CNNs, LayerNorm for transformers) — is essential for practical deep learning.

---

## Week 8 — Residual Connections and Depth

**Topics**
- The degradation problem: deeper networks train worse (without residuals)
- Residual connections: $y = f(x) + x$
- Why residual connections help: gradient flow, identity mapping initialization
- ResNets and the skip connection principle
- Residual connections as ensembles of shallow networks
- The unrolled view: exponentially many paths of different lengths
- Dense connections (DenseNet) and other connectivity patterns

**Derivation Targets**
- Show that without residual connections, gradients through $L$ layers involve $L$ matrix multiplications (potential for vanishing/exploding)
- Prove that with residual connections, the gradient includes a direct path: $\partial y / \partial x = I + \partial f / \partial x$
- Derive the ensemble interpretation: a ResNet with $L$ blocks has $2^L$ paths
- Show that residual connections enable identity mapping at initialization (network starts as identity)
- Analyze gradient norms through residual vs non-residual networks

**Skill Focus:** Understanding residual connections as a principled solution to the depth problem, not just an architectural trick.

**Why this week matters:** Residual connections are arguably the most important architectural innovation in deep learning after backpropagation itself. They made training 100+ layer networks possible and appear in virtually every modern architecture (ResNets, transformers, diffusion models). Understanding the mathematical reason is essential.

---

## Week 9 — Regularization in Deep Learning

**Topics**
- Explicit regularization: weight decay ($\ell_2$), $\ell_1$
- Dropout: random feature deletion as regularization
- Dropout as approximate Bayesian inference (Gal & Ghahramani)
- Data augmentation as implicit regularization
- Early stopping: when to stop training
- Batch size as a regularizer: small batches = more noise = better generalization
- Spectral normalization and gradient penalties

**Derivation Targets**
- Derive the expected effect of dropout: show it is equivalent to geometric model averaging
- Show the connection between dropout and $\ell_2$ regularization for linear models
- Derive the relationship between early stopping and $\ell_2$ regularization for linear regression
- Prove that smaller batch sizes produce noisier gradients and analyze the regularization effect
- Show that weight decay in Adam (AdamW) is different from $\ell_2$ regularization in Adam

**Skill Focus:** Understanding the diversity of regularization mechanisms in deep learning; connecting each to a mathematical principle.

**Why this week matters:** Deep networks are massively overparameterized, yet they generalize. This apparent paradox is partly explained by the multiple regularization mechanisms operating simultaneously. This week catalogs and analyzes them, preparing for Course 5's deeper treatment.

---

## Week 10 — Training Dynamics: Learning Rate Schedules and Optimization Behavior

**Topics**
- Learning rate warmup: why start small
- Learning rate decay: step, cosine, exponential
- Cyclical learning rates and stochastic weight averaging
- The loss curve: what it tells you and what it doesn't
- Training loss vs validation loss: diagnosing problems
- Gradient accumulation for effective batch size
- Mixed-precision training: FP16/BF16 for efficiency

**Derivation Targets**
- Derive the cosine annealing schedule and its motivation from optimization theory
- Analyze the effect of learning rate warmup on gradient estimates in early training
- Show that gradient accumulation over $k$ steps is mathematically equivalent to batch size $k \times b$
- Derive the conditions under which mixed-precision training preserves convergence
- Analyze a typical loss curve and diagnose overfitting, underfitting, and instability from it

**Skill Focus:** Reading training dynamics; diagnosing training problems from loss curves and gradient statistics.

**Why this week matters:** Knowing the architecture is not enough — knowing how to train it is equally important. This week covers the practical dynamics of training: what to monitor, what each schedule does, and how to diagnose problems from training behavior.

---

## Week 11 — Fully Connected Networks: Architecture and Expressivity

**Topics**
- MLPs as the simplest deep architecture
- Width vs depth tradeoffs in expressivity
- Depth separation results: functions that need exponential width at bounded depth
- The lottery ticket hypothesis
- Network pruning and sparse networks
- Architecture as inductive bias: fully connected = no structural assumption
- When MLPs are appropriate and when structured architectures win

**Derivation Targets**
- Prove a depth separation result: there exist functions computable by depth-$k$ networks of polynomial width that require exponential width at depth $k-1$ (sketch)
- Analyze the number of parameters in an MLP as a function of width and depth
- Show that pruning 90% of weights can preserve accuracy (empirical + lottery ticket framework)
- Derive the number of linear regions of a ReLU MLP as a function of width and depth
- Compare the parameter efficiency of MLPs vs structured architectures for specific tasks

**Skill Focus:** Understanding the expressivity-efficiency tradeoff; knowing when structure in the architecture helps.

**Why this week matters:** MLPs are the baseline architecture. Understanding their power and limitations motivates every structured architecture that follows: CNNs exploit spatial structure, RNNs exploit temporal structure, and transformers exploit attention structure. Without understanding the baseline, the improvements are unmotivated.

---

## Week 12 — Automatic Differentiation: The Engine Under the Hood

**Topics**
- Forward-mode vs reverse-mode AD in depth
- AD as source code transformation vs operator overloading
- The Jacobian: forward mode computes columns, reverse mode computes rows
- Higher-order derivatives: Hessian-vector products
- AD frameworks: PyTorch, JAX, TensorFlow at a conceptual level
- Custom gradients and gradient checkpointing
- Memory-compute tradeoffs in AD

**Derivation Targets**
- Derive forward-mode AD for a simple computational graph
- Derive reverse-mode AD for the same graph and show it is more efficient for scalar outputs
- Show how to compute Hessian-vector products without forming the full Hessian: $O(n)$ cost
- Derive gradient checkpointing: trade $O(\sqrt{L})$ memory for $O(L)$ recomputation
- Show that AD gives exact gradients (up to floating point) — it is not finite differences

**Skill Focus:** Understanding AD as a mathematical algorithm, not just a software feature; reasoning about computational and memory costs.

**Why this week matters:** Every deep learning framework is built on AD. Understanding it means understanding what is possible and what is expensive: custom gradients, higher-order optimization, memory-efficient training, and meta-learning all require AD fluency.

---

## Week 13 — Multi-Layer Representations: What Do Networks Learn?

**Topics**
- Visualization of learned features: what each layer captures
- Feature hierarchies: edges → textures → parts → objects (vision preview)
- Probing classifiers: testing what information is encoded in representations
- Representation similarity analysis
- Transfer learning: why intermediate representations are reusable
- The information bottleneck view (with caveats)
- Representation collapse and feature diversity

**Derivation Targets**
- Define probing accuracy formally and show its limitations as a measure of representation quality
- Derive centered kernel alignment (CKA) for comparing representations
- Show that transfer learning works when source and target share feature structure
- Analyze the information bottleneck bound and discuss why it is controversial
- Demonstrate empirically that early layers learn general features while later layers specialize

**Skill Focus:** Analyzing what neural networks learn beyond just accuracy; understanding representations as the key output of deep learning.

**Why this week matters:** Deep learning's power comes from learned representations, not just predictions. Understanding what representations contain — and how to evaluate them — is the bridge to all modern AI: transfer learning, foundation models, and multimodal systems all depend on representation quality.

---

## Week 14 — Practical Deep Learning: The Full Pipeline

**Topics**
- Data pipeline: loading, preprocessing, augmentation
- Hyperparameter tuning: grid search, random search, Bayesian optimization
- Experiment tracking and reproducibility
- Debugging neural networks: systematic diagnosis
- Computational considerations: GPU/TPU, distributed training, data parallelism
- Common failure modes and their fixes
- When deep learning is and isn't appropriate

**Derivation Targets**
- Derive why random search is more efficient than grid search for hyperparameter tuning (Bergstra & Bengio argument)
- Analyze the computational cost of training: FLOPs as a function of batch size, model size, and dataset size
- Derive the scaling of data-parallel training: communication cost vs computation
- Show how learning rate should scale with batch size (linear scaling rule and its limitations)
- Construct a systematic debugging checklist based on mathematical principles

**Skill Focus:** Bridging theory and practice; systematic troubleshooting based on mathematical understanding.

**Why this week matters:** Theory without practice is sterile, but practice without theory is dangerous. This week teaches the discipline of practical deep learning — informed by all the mathematical understanding from previous weeks.

---

## Week 15 — Synthesis: The Representation Learning Worldview

**Purpose:** No new content. Consolidate the entire neural network/deep learning foundation.

**What to synthesize:**
$$\text{approximation} \to \text{computation graphs} \to \text{backprop} \to \text{activations} \to \text{initialization} \to \text{normalization} \to \text{residuals} \to \text{regularization} \to \text{representations}$$

**Capstone problems (select 2–3 for full reconstruction):**
- Derive backpropagation for a custom architecture from scratch
- Design an initialization scheme for a new activation function using variance propagation analysis
- Given a training failure (loss divergence, poor generalization, etc.), diagnose the mathematical cause and propose a fix
- Analyze what representations a trained network has learned using probing and visualization

**Final message:** Deep learning is representation learning via gradient-based optimization of composed nonlinear functions. Every architectural choice — activation, normalization, residual connection, loss function — is a mathematical design decision with consequences for what can be learned and how training behaves.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Approximation** | Universal Approximation Theorem; depth separation results |
| **Backprop** | Chain rule on computational graphs; reverse-mode AD efficiency |
| **Activations** | Gradient flow through sigmoid/ReLU; dead neurons; piecewise linear regions |
| **Initialization** | Xavier/He derivation; variance propagation through layers |
| **Normalization** | BatchNorm/LayerNorm forward and backward; smoothing effect |
| **Residuals** | Direct gradient path; ensemble interpretation; identity initialization |
| **Regularization** | Dropout as model averaging; early stopping ↔ L2; weight decay in Adam |
| **Representations** | Probing; CKA; transfer learning conditions |

---

## Problem Set Structure

**A. Derivation problems** — Derive backprop for a given architecture; derive initialization for a given activation; derive the gradient of a custom loss.

**B. Analysis problems** — Analyze gradient flow through a given architecture; predict training behavior from architectural choices; compute parameter counts and FLOPs.

**C. Design problems** — Design an architecture for a given inductive bias; justify each design choice mathematically.

**D. Debugging problems** — Given training logs (loss curves, gradient histograms, activation statistics), diagnose the problem and propose a mathematically grounded fix.

**E. Representation analysis** — Analyze learned features using probing, visualization, and similarity metrics; explain what the network has learned and why.

> If the problem sets only ask "train a network and report test accuracy," the course has failed. The student must understand what the network computes, how gradients flow, and why architectural choices matter.

---

*Course 5 continues with Generalization in Overparameterized Models, where the classical bias-variance story is updated for modern deep learning.*

---
---