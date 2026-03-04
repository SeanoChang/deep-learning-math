# Course 6: Sequence Modeling and Attention
**15-Week Rigorous Sequence — From Recurrence to Transformers**

> **Course philosophy:** Sequence modeling is not "the RNN chapter" or "the transformer chapter" — it is the study of how to process ordered, variable-length data while capturing dependencies at multiple scales. The evolution from recurrence to attention to transformers is not a series of unrelated inventions but a progression driven by precise mathematical limitations of each approach. This course traces that progression rigorously.

**Primary text:** Jurafsky & Martin, *Speech and Language Processing* (3rd ed.) | **Supplement:** Vaswani et al., *Attention Is All You Need* (and follow-up papers) | **Reference:** Graves, *Supervised Sequence Labelling with Recurrent Neural Networks*

---

## Course Goal

Build the mathematical understanding of sequence modeling from first principles: why sequential data requires special architectures, how recurrence works and fails, why attention was invented, how transformers work, and what makes them so effective. The conceptual spine is:

$$\text{sequences} \to \text{embeddings} \to \text{recurrence} \to \text{gating} \to \text{attention} \to \text{self-attention} \to \text{transformers} \to \text{pretraining}$$

---

## Week 1 — Sequential Data and the Modeling Challenge

**Topics**
- What makes sequential data different: order matters, length varies
- Types of sequence tasks: classification, tagging, generation, transduction
- The Markov assumption and its limitations
- N-gram models: counting as prediction
- Limitations of fixed-context models
- The need for learned representations of sequences

**Derivation Targets**
- Derive the n-gram probability model: $P(w_t | w_{t-1}, \ldots, w_{t-n+1})$
- Show that n-gram models have exponential parameter growth with context length
- Analyze perplexity as an evaluation metric: $\text{PPL} = \exp(-\frac{1}{T}\sum \log P(w_t | \text{context}))$
- Prove that the Markov assumption limits the model to fixed-range dependencies
- Show the sparsity problem in n-gram models: most contexts are never observed

**Skill Focus:** Understanding the fundamental challenges of sequence modeling; appreciating what any good sequence model must overcome.

**Why this week matters:** Before learning architectures, the student must understand the problem. Sequential data has variable length, long-range dependencies, and compositional structure. Every architecture is an answer to these challenges — and this week defines the challenges precisely.

---

## Week 2 — Distributed Representations and Embeddings

**Topics**
- The distributional hypothesis: meaning from context
- One-hot representations and their limitations
- Word2Vec: Skip-gram and CBOW
- The embedding matrix as a learned lookup table
- Embedding geometry: analogies, similarity, clustering
- Subword tokenization: BPE, WordPiece, SentencePiece
- Embeddings as the input layer of all deep sequence models

**Derivation Targets**
- Derive the Skip-gram objective: $\max \sum_{t} \sum_{j} \log P(w_{t+j} | w_t)$
- Show that Skip-gram with negative sampling approximates PMI factorization
- Derive why low-dimensional embeddings can capture semantic relationships
- Analyze how tokenization granularity affects the statistical problem
- Show the connection between embedding quality and downstream task performance

**Skill Focus:** Understanding embeddings as learned distributed representations; connecting distributional semantics to mathematical optimization.

**Why this week matters:** Embeddings are the bridge between discrete symbols and continuous computation. Every modern deep learning model for language, code, proteins, or molecules starts with embeddings. Understanding their mathematical properties is prerequisite to everything that follows.

---

## Week 3 — Recurrent Neural Networks: Processing Sequences Iteratively

**Topics**
- Vanilla RNN: $h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t + b)$
- Unrolling through time: the computational graph of an RNN
- Backpropagation through time (BPTT)
- Hidden state as a compressed memory of the past
- RNNs as dynamical systems: fixed points, orbits, chaos
- Bidirectional RNNs: processing sequences in both directions

**Derivation Targets**
- Derive BPTT: compute $\partial L / \partial W_{hh}$ through the unrolled graph
- Show that the gradient involves products of Jacobians: $\prod_{k=s}^{t} \frac{\partial h_k}{\partial h_{k-1}}$
- Analyze the eigenvalues of $W_{hh}$ and their effect on gradient magnitude
- Prove that if $\|W_{hh}\| < 1$, gradients vanish exponentially; if $\|W_{hh}\| > 1$, they explode
- Derive gradient clipping as a practical mitigation for exploding gradients

**Skill Focus:** Understanding RNNs as dynamical systems; diagnosing gradient pathologies from the mathematics of the recurrence.

**Why this week matters:** RNNs are the first architecture designed specifically for sequences. Understanding their mathematics — especially the vanishing/exploding gradient problem — is essential because it motivates every subsequent architecture: LSTMs, GRUs, attention, and transformers all exist to solve problems that vanilla RNNs cannot.

---

## Week 4 — Gated Recurrence: LSTMs and GRUs

**Topics**
- The vanishing gradient problem in detail: why long-range learning fails
- LSTM: the cell state as a highway for gradient flow
- LSTM gates: forget, input, output
- The LSTM cell state update: $c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$
- GRU: a simplified gating architecture
- Comparing LSTM and GRU: when each is preferred
- Gradient flow through gated architectures

**Derivation Targets**
- Derive the LSTM forward pass in full: all gates and the cell state update
- Show that the cell state allows gradients to flow through many time steps without vanishing (the gradient highway)
- Derive BPTT for LSTM and show the gradient path through the cell state
- Derive GRU and show it is a simplification of LSTM with fewer parameters
- Analyze the gradient magnitudes in LSTM vs vanilla RNN on a long-range dependency task

**Skill Focus:** Understanding gating as a principled solution to gradient flow problems; analyzing gradient paths through complex architectures.

**Why this week matters:** LSTMs and GRUs were the dominant sequence models for a decade and enabled breakthroughs in translation, speech recognition, and text generation. Understanding their design rationale — gates as gradient highways — is essential for understanding why attention was the next logical step.

---

## Week 5 — Sequence-to-Sequence Models and the Bottleneck Problem

**Topics**
- Encoder-decoder architecture: encode the input, decode the output
- The context vector: compressing the entire input into a fixed vector
- Teacher forcing: training with ground-truth previous tokens
- Beam search: approximate decoding
- The bottleneck problem: a single vector cannot represent arbitrary-length inputs
- Exposure bias: the mismatch between training (teacher forcing) and inference (autoregressive)

**Derivation Targets**
- Derive the encoder-decoder probability model: $P(y | x) = \prod_t P(y_t | y_{<t}, c)$
- Show that the fixed-size context vector creates an information bottleneck
- Derive beam search and analyze its relationship to exact search
- Prove that the bottleneck limits performance on long sequences: information-theoretic argument
- Analyze exposure bias mathematically: error accumulation during autoregressive generation

**Skill Focus:** Understanding the encoder-decoder framework; identifying the precise mathematical limitations that motivate attention.

**Why this week matters:** The seq2seq bottleneck problem is the direct motivation for attention. Without understanding why a fixed context vector fails, the invention of attention seems arbitrary. With this understanding, attention is the obvious solution.

---

## Week 6 — Attention: Content-Based Information Routing

**Topics**
- Attention as a solution to the bottleneck: look at all encoder states, not just the last
- The attention mechanism: query, key, value
- Additive attention (Bahdanau) vs multiplicative attention (Luong)
- Attention weights as a soft alignment
- Attention as differentiable memory access
- Computational cost of attention: $O(T_{\text{enc}} \cdot T_{\text{dec}})$
- Attention visualizations and interpretability

**Derivation Targets**
- Derive Bahdanau attention: $\alpha_{t,s} = \text{softmax}(a(h_t^{\text{dec}}, h_s^{\text{enc}}))$, $c_t = \sum_s \alpha_{t,s} h_s^{\text{enc}}$
- Derive Luong (dot-product) attention and show it is computationally cheaper
- Show that attention removes the path-length bottleneck: direct connections from output to all input positions
- Prove that attention weights sum to 1 (softmax normalization) and analyze what this implies
- Analyze the gradient flow through attention: show direct paths from loss to all encoder states

**Skill Focus:** Understanding attention as a mathematical operation (weighted sum based on content similarity), not just an architectural component.

**Why this week matters:** Attention is the most important architectural innovation since backpropagation. It solves the bottleneck problem, enables parallel computation, and provides the foundation for transformers. This week must make the mathematics crystal clear.

---

## Week 7 — Self-Attention and the Transformer Architecture

**Topics**
- Self-attention: attention where query, key, and value all come from the same sequence
- Scaled dot-product attention: $\text{Attention}(Q, K, V) = \text{softmax}(QK^T / \sqrt{d_k})V$
- Why scaling by $\sqrt{d_k}$: controlling softmax saturation
- Multi-head attention: parallel attention with different projections
- The transformer block: self-attention + feedforward + normalization + residuals
- Positional encoding: injecting order information
- The full transformer: encoder-decoder stack

**Derivation Targets**
- Derive scaled dot-product attention from scratch and explain each component
- Show why scaling by $\sqrt{d_k}$ is necessary: without it, dot products grow with dimension, pushing softmax into saturation
- Derive multi-head attention and show it allows attending to different types of information simultaneously
- Analyze the computational complexity: $O(T^2 d)$ for self-attention on sequences of length $T$
- Show that without positional encoding, the transformer is permutation equivariant (bag-of-tokens)

**Skill Focus:** Complete mathematical understanding of every component of the transformer; knowing why each piece is there.

**Why this week matters:** The transformer is the most important architecture in modern AI. It powers LLMs, vision transformers, protein folding models, and more. This week must produce complete understanding — not just "Q, K, V" but why each mathematical choice was made.

---

## Week 8 — Positional Encoding and the Problem of Order

**Topics**
- Why transformers need positional information: permutation equivariance
- Sinusoidal positional encoding: the original approach
- Learned positional embeddings
- Relative positional encoding: ALiBi, RoPE
- Rotary Position Embedding (RoPE) in detail
- How positional encoding affects attention patterns
- Length generalization: can the model handle longer sequences than seen in training?

**Derivation Targets**
- Derive sinusoidal positional encoding and show that relative positions can be computed as linear functions of absolute encodings
- Derive RoPE: show how rotation matrices encode relative position in the attention computation
- Prove that ALiBi biases attention toward local positions and analyze the decay function
- Show that learned positional embeddings cannot generalize beyond training length
- Analyze the extrapolation properties of different positional encoding schemes

**Skill Focus:** Understanding positional encoding as a deep mathematical problem, not just an implementation detail.

**Why this week matters:** Position is where order enters the transformer. The choice of positional encoding affects context length, generalization, and computational efficiency. With the rise of long-context models, this has become one of the most active areas of architectural research.

---

## Week 9 — Training Transformers: Objectives and Dynamics

**Topics**
- Autoregressive language modeling: predict the next token
- Masked language modeling: predict masked tokens (BERT-style)
- Causal masking: preventing the model from seeing the future
- The training dynamics of transformers: warmup, stability issues
- Pre-LayerNorm vs Post-LayerNorm and training stability
- Gradient flow in deep transformers
- Training efficiency: mixed precision, gradient checkpointing, parallelism

**Derivation Targets**
- Derive the causal attention mask and show it enforces autoregressive structure
- Derive the masked language modeling objective and compare to autoregressive modeling
- Analyze gradient flow through Pre-LN vs Post-LN transformers and show Pre-LN is more stable
- Derive the warmup schedule and its connection to adaptive optimizer behavior at initialization
- Show the memory and compute requirements as a function of sequence length, model dimension, and number of layers

**Skill Focus:** Understanding the interaction between transformer architecture and training dynamics; diagnosing training instabilities.

**Why this week matters:** Building a transformer is easy; training one stably at scale is hard. This week covers the practical and theoretical aspects of transformer training that determine whether a model succeeds or fails.

---

## Week 10 — Efficient Attention and Long-Context Methods

**Topics**
- The quadratic bottleneck: $O(T^2)$ attention is expensive for long sequences
- Sparse attention: local windows, strided patterns, block-sparse
- Linear attention: kernel-based reformulation
- Flash Attention: hardware-aware exact attention
- Sliding window attention and its theoretical properties
- State-space models (S4, Mamba): an alternative to attention
- Ring attention and context parallelism

**Derivation Targets**
- Derive the computational and memory cost of standard attention: $O(T^2 d)$ compute, $O(T^2)$ memory
- Derive linear attention and show the kernel trick: $\text{Attention} = \phi(Q)(\phi(K)^T V)$ costs $O(Td^2)$
- Analyze sparse attention patterns and their effective context length
- Derive the S4 state-space model and show its connection to linear RNNs with structured matrices
- Show how Flash Attention achieves exact attention with $O(T)$ memory via tiling

**Skill Focus:** Understanding the tradeoffs between different attention mechanisms; knowing when to use each.

**Why this week matters:** The quadratic cost of attention is the primary scaling bottleneck for long-context models. Every approach to long documents, long conversations, and extended reasoning requires addressing this bottleneck. This week surveys the solutions.

---

## Week 11 — Pretraining and Transfer Learning

**Topics**
- The pretraining paradigm: learn representations from large unlabeled data
- Why pretraining works: learning useful features for downstream tasks
- Pretraining objectives: language modeling, masked LM, contrastive learning
- Fine-tuning: adapting pretrained models to specific tasks
- Parameter-efficient fine-tuning: LoRA, adapters, prefix tuning
- Prompt-based learning: using the pretrained model without fine-tuning
- The relationship between pretraining data and downstream capabilities

**Derivation Targets**
- Show that next-token prediction on diverse text implicitly learns a wide range of tasks
- Derive LoRA: low-rank adaptation as $W' = W + BA$ where $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times d}$, $r \ll d$
- Analyze the parameter efficiency of LoRA: show that $r \ll d$ gives $O(rd)$ parameters instead of $O(d^2)$
- Show the connection between prompt tuning and attention-based conditioning
- Derive conditions under which fine-tuning outperforms prompting and vice versa

**Skill Focus:** Understanding pretraining as representation learning at scale; analyzing adaptation methods mathematically.

**Why this week matters:** Pretraining + adaptation is the dominant paradigm of modern AI. Understanding why pretrained representations transfer, and how to efficiently adapt them, is essential for anyone working with modern models.

---

## Week 12 — Transformer Variants and Architectural Innovations

**Topics**
- Encoder-only (BERT), decoder-only (GPT), encoder-decoder (T5) architectures
- When to use which architecture: understanding vs generation
- Mixture of Experts (MoE): sparse activation for scaling
- Gated attention and GLU variants
- Normalization variants: RMSNorm, DeepNorm
- Architecture search and scaling considerations
- The trend toward decoder-only: why GPT-style models dominate

**Derivation Targets**
- Compare the computational graphs of encoder-only, decoder-only, and encoder-decoder models
- Derive MoE routing: show how gating selects experts and analyze load balancing
- Analyze the parameter count vs activated parameter count in MoE models
- Derive RMSNorm and show it is a simplified LayerNorm without mean centering
- Show why decoder-only models are preferred for scaling: simpler, more flexible, autoregressive

**Skill Focus:** Understanding architectural choices as mathematical design decisions with specific tradeoffs.

**Why this week matters:** The transformer is not a single architecture — it is a family of architectures with different tradeoffs. Understanding these variants and why the field converged on specific choices (decoder-only, RMSNorm, GQA) prepares the student for modern LLM design.

---

## Week 13 — Attention as a Computational Primitive

**Topics**
- Attention beyond NLP: a general-purpose computational primitive
- Attention as soft dictionary lookup
- Attention as differentiable memory
- Attention as message passing on graphs
- Vision Transformers: attention over image patches
- Perceiver: attention for arbitrary input types
- Cross-attention: connecting different modalities or representations

**Derivation Targets**
- Show that attention implements a soft version of exact dictionary lookup
- Derive the connection between attention and kernel smoothing
- Show that graph attention networks are a special case of the general attention framework
- Derive how Vision Transformers reshape images into sequences of patches
- Analyze when attention is more powerful than convolution and vice versa

**Skill Focus:** Seeing attention as a fundamental computational operation, not tied to any specific domain.

**Why this week matters:** Attention has escaped NLP. It is now used in vision, audio, proteins, molecules, robotics, and mathematics. Understanding it as a general computational primitive — not "the NLP mechanism" — is essential for modern AI.

---

## Week 14 — Emergent Capabilities of Sequence Models

**Topics**
- In-context learning: learning from examples in the prompt
- Chain-of-thought reasoning: step-by-step inference
- Instruction following: alignment between pretraining and user intent
- Tool use: models that call external functions
- Emergent capabilities: what appears at scale
- Failures of sequence models: hallucination, reasoning errors, context limitations
- The gap between sequence prediction and genuine understanding

**Derivation Targets**
- Show that in-context learning can be viewed as implicit gradient descent (von Oswald et al.)
- Analyze the transformer's ability to implement simple algorithms in-context
- Show the connection between autoregressive sampling and Markov chain simulation
- Analyze hallucination as a consequence of the training objective (likelihood maximization does not guarantee factuality)
- Derive the theoretical limits of what a finite-context autoregressive model can compute

**Skill Focus:** Understanding the capabilities and limitations of sequence models from a mathematical perspective.

**Why this week matters:** Modern AI capabilities emerge from sequence models. Understanding what these capabilities are, where they come from, and where they fail is essential for anyone building or using these systems.

---

## Week 15 — Synthesis: The Sequence Modeling Worldview

**Purpose:** No new content. Consolidate the entire sequence modeling and attention framework.

**What to synthesize:**
$$\text{n-grams} \to \text{embeddings} \to \text{RNNs} \to \text{LSTMs} \to \text{attention} \to \text{transformers} \to \text{pretraining} \to \text{emergent capabilities}$$

**Capstone problems (select 2–3 for full reconstruction):**
- Derive the full transformer architecture from scratch: self-attention, multi-head attention, positional encoding, feedforward blocks, normalization, residuals
- Analyze the gradient flow through a 12-layer transformer and compare to a 12-layer LSTM
- Given a new sequence modeling task, design an architecture (choosing between RNN, transformer, state-space model) with mathematical justification
- Analyze the computational and memory requirements of training a transformer of given size on a given dataset

**Final message:** Sequence modeling evolved from counting n-grams to learning attention-based representations at scale. The transformer is not just an architecture — it is a general-purpose differentiable computation framework that happens to process sequences. Understanding it mathematically, not just procedurally, is the key to working with modern AI.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Sequences** | N-gram probability model; perplexity as evaluation |
| **Embeddings** | Skip-gram objective; PMI connection; subword tokenization |
| **RNNs** | BPTT; vanishing/exploding gradients via eigenvalue analysis |
| **Gating** | LSTM cell state as gradient highway; GRU simplification |
| **Seq2seq** | Encoder-decoder probability; bottleneck analysis |
| **Attention** | Bahdanau/Luong attention; gradient path analysis |
| **Transformers** | Scaled dot-product attention; multi-head; positional encoding; complexity |
| **Position** | Sinusoidal encoding; RoPE derivation; length generalization |
| **Efficiency** | Linear attention; Flash Attention; state-space models |
| **Pretraining** | Next-token prediction; LoRA derivation; transfer conditions |

---

## Problem Set Structure

**A. Architecture derivation** — Derive the forward pass and backpropagation for specific sequence architectures (RNN, LSTM, transformer).

**B. Complexity analysis** — Compute the FLOPs, memory, and parameter counts for given architectures and sequence lengths.

**C. Gradient analysis** — Analyze gradient flow through architectures; predict vanishing/exploding gradient behavior; compare architectures.

**D. Design problems** — Given a sequence modeling task with specific constraints (length, latency, memory), design and justify an architecture.

**E. Empirical analysis** — Implement and compare architectures on controlled tasks; verify theoretical predictions about gradient flow, context sensitivity, and scaling.

> If the problem sets only ask "use a pretrained transformer from HuggingFace," the course has failed. The student must be able to derive, analyze, and design sequence architectures from mathematical principles.

---

*Course 7 continues with Computer Vision as Structured Perception, where spatial structure meets deep learning.*

---
---