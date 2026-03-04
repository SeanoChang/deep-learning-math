# Course 11: Multimodal and Foundation-Model Thinking
**15-Week Rigorous Sequence — Where Domain Boundaries Dissolve**

> **Course philosophy:** Modern AI is converging. Language models process images. Vision models understand text. A single architecture (the transformer) handles language, vision, audio, code, proteins, and more. This convergence is not accidental — it reflects deep mathematical principles about representation learning, scaling, and the composability of attention-based architectures. This course studies the convergence: what makes foundation models work, what scaling changes, and how multimodal understanding emerges.

**Primary text:** Research papers (curated) | **Supplement:** Bommasani et al., *On the Opportunities and Risks of Foundation Models* | **Reference:** Course materials from Stanford CS324 and related courses

---

## Course Goal

Build a rigorous understanding of foundation models and multimodal AI: why scaling works, how representations align across modalities, what pretraining + adaptation enables, and where the current frontier lies. The conceptual spine is:

$$\text{pretraining at scale} \to \text{representation alignment} \to \text{multimodal models} \to \text{in-context learning} \to \text{agents} \to \text{scaling laws} \to \text{emerging capabilities}$$

---

## Week 1 — The Foundation Model Paradigm

**Topics**
- What is a foundation model: large-scale pretrained model adapted to many tasks
- The paradigm shift: from task-specific to general-purpose
- Pretraining: self-supervised learning on massive data
- Adaptation: fine-tuning, prompting, in-context learning
- Emergence: capabilities that appear at scale
- The economic and scientific implications: amortizing training cost across tasks
- Risks: homogenization, single points of failure, bias amplification

**Derivation Targets**
- Analyze the compute-data-parameter relationship in modern training: the Chinchilla scaling law revisited
- Derive the expected benefit of scale: show that larger models have lower per-task adaptation cost
- Formalize emergence: define it as nonlinear improvement in downstream metrics as a function of scale
- Analyze the homogenization risk mathematically: show that if many systems share a foundation model, correlated failures affect all
- Derive the training cost of a transformer as a function of model size, data size, and sequence length

**Skill Focus:** Understanding foundation models as a paradigm, not just large models; analyzing the mathematical and economic logic behind the approach.

**Why this week matters:** Foundation models are the dominant paradigm of modern AI. Understanding why — not just that — they work is essential for anyone building, using, or reasoning about AI systems.

---

## Week 2 — Contrastive Learning and Representation Alignment

**Topics**
- Contrastive learning: learning representations by comparing positives and negatives
- CLIP: aligning vision and language representations
- The InfoNCE objective revisited: contrastive loss as mutual information bound
- Shared embedding spaces: how different modalities can inhabit the same space
- Hard negatives and batch size effects
- The temperature parameter and its effect on representation quality
- Beyond pairs: multi-positive and multi-negative objectives

**Derivation Targets**
- Derive the CLIP objective: symmetric cross-entropy over (image, text) similarity matrix
- Show that contrastive learning optimizes a lower bound on mutual information between views
- Analyze the role of batch size: larger batches provide harder negatives
- Derive the temperature-scaled softmax and show how temperature controls the hardness of the contrastive task
- Show that aligned embedding spaces enable zero-shot transfer: classify by comparing to text embeddings

**Skill Focus:** Understanding contrastive learning as the mathematical foundation of multimodal alignment; analyzing representation spaces.

**Why this week matters:** CLIP and contrastive learning are the bridge between vision and language. Understanding the mathematics — especially the InfoNCE objective and representation alignment — is essential for all multimodal systems.

---

## Week 3 — Vision-Language Models: From CLIP to Multimodal LLMs

**Topics**
- Vision encoders for multimodal models: ViT, SigLIP
- Connecting vision to language: projection layers, cross-attention, interleaved tokens
- Multimodal LLMs: LLaVA, GPT-4V, Gemini architecture patterns
- Visual instruction tuning: teaching models to follow visual instructions
- Visual question answering, image captioning, visual reasoning
- Hallucination in multimodal models: seeing things that aren't there
- Grounding: connecting language to specific visual regions

**Derivation Targets**
- Derive the architecture of a typical multimodal LLM: vision encoder → projector → language model
- Analyze the information bottleneck at the vision-language interface: how many visual tokens are needed?
- Derive the visual instruction tuning objective and compare to text-only instruction tuning
- Analyze multimodal hallucination: show it arises from language model priors overriding visual evidence
- Derive grounding as attention between language tokens and visual regions

**Skill Focus:** Understanding the architectural choices in multimodal models; analyzing the information flow between modalities.

**Why this week matters:** Multimodal LLMs are the cutting edge of AI. Understanding how vision and language are connected — architecturally and mathematically — is essential for working with these systems.

---

## Week 4 — Text-to-Image and Image-to-Text Generation

**Topics**
- Text-to-image generation: DALL-E, Stable Diffusion, Midjourney principles
- The two-stage approach: text encoder + diffusion model
- Latent diffusion: generation in a compressed latent space
- Cross-attention for text conditioning
- Image captioning: from images to text descriptions
- Image-text consistency: measuring alignment between generated images and text
- Compositional generation: handling complex prompts

**Derivation Targets**
- Derive the latent diffusion pipeline: encode → diffuse → denoise → decode
- Derive cross-attention conditioning: show how text embeddings guide the diffusion process
- Analyze compositional generalization: why models struggle with "a red cube on a blue sphere"
- Derive CLIP score as an evaluation metric for text-image alignment
- Analyze the latent space: what structure does the VQ-VAE / VAE encoder learn?

**Skill Focus:** Understanding text-to-image generation as conditional generative modeling with cross-modal conditioning.

**Why this week matters:** Text-to-image generation is one of the most visible applications of modern AI. Understanding the full pipeline — text encoding, cross-attention conditioning, latent diffusion — provides insight into how multiple modalities interact in a generative system.

---

## Week 5 — In-Context Learning: Learning Without Gradient Updates

**Topics**
- In-context learning (ICL): adapting behavior based on examples in the prompt
- ICL as implicit Bayesian inference
- ICL as implicit gradient descent (von Oswald et al.)
- What makes ICL work: induction heads and attention patterns
- Few-shot, one-shot, zero-shot performance
- Limitations of ICL: context length, sensitivity to example order
- Task vectors and the geometry of in-context learning

**Derivation Targets**
- Derive the implicit Bayesian interpretation: show that ICL approximates posterior predictive inference
- Derive the implicit gradient descent interpretation: show that transformers can implement gradient steps in their forward pass
- Analyze induction heads: show they copy patterns from context to predict
- Derive the sensitivity of ICL to prompt format: show that small changes in phrasing can significantly change outputs
- Analyze the computational cost of ICL: inference-time compute scales with context length

**Skill Focus:** Understanding ICL as a distinct learning mechanism; analyzing what transformers compute when they learn in-context.

**Why this week matters:** ICL is the most surprising capability of foundation models: they adapt to new tasks without any parameter updates, purely from examples in the prompt. Understanding the mechanisms is essential for effective use and for understanding the limits of this approach.

---

## Week 6 — Retrieval-Augmented Systems at Scale

**Topics**
- Retrieval as a modular extension of foundation models
- Dense retrieval: learned embeddings for semantic search
- Sparse retrieval: BM25 and lexical matching
- Hybrid retrieval: combining dense and sparse
- Vector databases and approximate nearest neighbor search
- RAG architectures: retrieve-then-generate, retrieve-and-read
- Long-context models vs retrieval: tradeoffs
- Evaluation: faithfulness, attribution, hallucination reduction

**Derivation Targets**
- Derive BM25 from probabilistic relevance modeling
- Derive HNSW (Hierarchical Navigable Small World) graphs for ANN search and analyze its complexity
- Compare long-context models vs RAG: analyze compute/memory tradeoffs as a function of corpus size
- Derive the attribution problem formally: can generated claims be traced to retrieved sources?
- Analyze the faithfulness-creativity tradeoff: retrieval grounds but also constrains

**Skill Focus:** Understanding retrieval as a principled component of AI systems, not just "looking things up."

**Why this week matters:** RAG is how foundation models access external knowledge. Understanding the mathematical foundations of retrieval — embedding spaces, ANN search, relevance modeling — is essential for building grounded AI systems.

---

## Week 7 — Tool Use and Agents

**Topics**
- LLMs as agents: using models to take actions in the world
- Tool use: calling APIs, executing code, searching the web
- The agent loop: observe → think → act → observe
- Planning with LLMs: chain-of-thought, tree-of-thought, graph-based planning
- ReAct: reasoning and acting interleaved
- Code generation as a tool-use capability
- Memory systems: short-term (context) vs long-term (retrieval)

**Derivation Targets**
- Formalize the agent loop as a POMDP (partially observable MDP)
- Analyze the planning capabilities of transformers: what depth of planning can be achieved in $L$ layers?
- Derive the computational advantage of tool use: show that a model + calculator is more compute-efficient than a model alone for arithmetic
- Analyze error propagation in multi-step agent actions: show how errors compound with sequence length
- Derive the memory tradeoff: context window (expensive, limited) vs retrieval (cheaper, scalable but lossy)

**Skill Focus:** Understanding LLM agents as sequential decision-making systems; analyzing the capabilities and limitations of tool-augmented models.

**Why this week matters:** LLM agents are the next evolution of foundation models: from passive question-answering to active tool use and world interaction. Understanding the agent framework — and its connection to RL and planning — is essential for the future of AI.

---

## Week 8 — Scaling Laws and Compute-Optimal Training

**Topics**
- Neural scaling laws: loss as a power law in N, D, C
- The Kaplan et al. scaling laws: original findings
- Chinchilla scaling: compute-optimal training
- Scaling laws for downstream tasks: transfer and emergent capabilities
- Breaking scaling laws: when they hold and when they don't
- Data quality vs data quantity: the data-centric view
- Training efficiency: how to get more from less compute

**Derivation Targets**
- Derive the parametric scaling law: $L(N, D) = a N^{-\alpha} + b D^{-\beta} + L_\infty$
- Derive the compute-optimal allocation: given compute budget $C$, how to split between $N$ and $D$
- Analyze the implications: show that current models may be significantly undertrained or oversized
- Derive the effective compute of data repetition: show diminishing returns of repeated data
- Analyze when scaling laws break: task-specific saturation, data quality bottlenecks

**Skill Focus:** Reading and interpreting scaling laws; making compute allocation decisions based on scaling predictions.

**Why this week matters:** Scaling laws are the most practically important empirical result in modern AI. They guide training decisions worth billions of dollars. Understanding them — and their limitations — is essential for anyone involved in building or evaluating large models.

---

## Week 9 — Efficient Inference and Deployment

**Topics**
- The inference cost problem: serving large models is expensive
- Quantization: reducing precision (FP16, INT8, INT4)
- Knowledge distillation: training smaller models to mimic larger ones
- Pruning and sparse models
- Speculative decoding: drafting with small model, verifying with large model
- KV-cache optimization: reducing memory for autoregressive generation
- Mixture of Experts at inference: activating only relevant experts
- Serving infrastructure: batching, routing, load balancing

**Derivation Targets**
- Derive the memory requirements for serving a transformer: parameters + KV cache
- Analyze quantization error: show that INT8 introduces bounded noise and analyze its effect on output quality
- Derive knowledge distillation and show the student learns from soft labels (dark knowledge)
- Derive speculative decoding and show it produces the same distribution as the large model alone
- Analyze the latency-throughput tradeoff in batched inference

**Skill Focus:** Understanding the engineering and mathematical principles of efficient model deployment.

**Why this week matters:** A model that cannot be served efficiently is useless in practice. Understanding quantization, distillation, and speculative decoding — and their mathematical properties — is essential for deploying AI systems.

---

## Week 10 — Multimodal Generation: Beyond Text and Images

**Topics**
- Audio generation: speech, music, sound effects
- Video generation: temporal coherence in visual generation
- 3D generation: NeRF, Gaussian splatting, 3D diffusion
- Code generation: structured output with executable semantics
- Multimodal generation: models that produce text + images + audio
- Cross-modal generation: translate between modalities
- The unified generation framework: any-to-any modeling

**Derivation Targets**
- Analyze the common framework: all generation is conditional density estimation $p(x_{\text{out}} | x_{\text{in}})$
- Derive the tokenization challenge for different modalities: text tokens vs image tokens vs audio tokens
- Analyze the computational scaling across modalities: video >> images >> text in generation cost
- Derive how different modalities share representation space in unified models
- Compare modality-specific architectures vs unified architectures: tradeoffs in quality and flexibility

**Skill Focus:** Seeing generation across modalities as instances of the same mathematical framework; understanding modality-specific challenges.

**Why this week matters:** AI is moving toward models that understand and generate across all modalities. Understanding the common mathematical framework — and the modality-specific challenges — prepares the student for the multimodal future.

---

## Week 11 — Data: Curation, Quality, and Synthetic Data

**Topics**
- Data as the foundation: models are only as good as their data
- Web-scale data collection: Common Crawl, LAION, The Pile
- Data curation: filtering, deduplication, quality scoring
- Data mixing: balancing domains and languages
- Synthetic data: using models to generate training data
- Data contamination: when test data leaks into training
- The legal and ethical landscape of training data

**Derivation Targets**
- Analyze the effect of data quality on scaling laws: show that data quality multiplies the effective dataset size
- Derive deduplication methods and their effect on memorization
- Analyze the self-improvement paradox: can a model improve by training on its own outputs?
- Derive conditions under which synthetic data helps vs hurts: model collapse from recursive generation
- Quantify data contamination: derive detection methods and their power

**Skill Focus:** Understanding data as a critical variable in foundation model performance, not just something to collect more of.

**Why this week matters:** "Garbage in, garbage out" scales with model size. Understanding data curation, quality, and the synthetic data tradeoff is essential for building foundation models and for interpreting their capabilities.

---

## Week 12 — Safety, Alignment, and Human Oversight

**Topics**
- The alignment problem: ensuring models do what we want
- RLHF and DPO revisited: alignment as optimization
- Constitutional AI: rule-based alignment
- Red-teaming: finding failure modes
- Jailbreaks: adversarial attacks on aligned models
- Interpretability: understanding what models compute
- Governance: who decides what models should do?

**Derivation Targets**
- Derive the RLHF objective and analyze the KL constraint's role in preventing reward hacking
- Analyze jailbreaks as adversarial optimization against the alignment objective
- Derive the constitutional AI framework and show how it automates alignment evaluation
- Analyze the interpretability challenge: show that understanding what a neural network computes is at least as hard as the problems it solves
- Derive the goodhart problem formally: when optimizing a proxy reward leads to unintended behavior

**Skill Focus:** Understanding alignment as a mathematical and philosophical problem; analyzing the robustness of alignment techniques.

**Why this week matters:** Powerful AI systems that are not aligned with human values are dangerous. Understanding the mathematics of alignment — and its fundamental limitations — is essential for responsible AI development.

---

## Week 13 — Reasoning and Planning with Foundation Models

**Topics**
- Reasoning capabilities of LLMs: what can they do and what can't they?
- Chain-of-thought and its effect on computational depth
- Tree-of-thought: systematic exploration of reasoning paths
- Self-consistency: sampling multiple reasoning paths and voting
- Formal reasoning: LLMs + theorem provers, LLMs + code execution
- Planning: using LLMs for multi-step task decomposition
- The role of search in LLM reasoning: MCTS, beam search, best-of-N

**Derivation Targets**
- Analyze the computational depth of chain-of-thought: show it allows $O(T)$ serial computation steps vs $O(L)$ for direct answers
- Derive self-consistency as majority voting over reasoning samples
- Analyze Monte Carlo Tree Search for LLM reasoning: how tree search improves over greedy generation
- Derive the best-of-N sampling approach and show its compute scaling
- Analyze the difference between System 1 (direct) and System 2 (deliberative) reasoning in LLMs

**Skill Focus:** Understanding reasoning as a computational problem; analyzing when and how LLMs can reason effectively.

**Why this week matters:** Reasoning is the frontier of LLM capabilities. Understanding the mathematical and computational basis of LLM reasoning — and its limits — is essential for pushing the boundary of what AI systems can do.

---

## Week 14 — The Current Frontier and Open Problems

**Topics**
- State of the art: what current foundation models can and cannot do
- Open problems in representation learning: what makes good representations?
- Open problems in scaling: is there a ceiling?
- Open problems in reasoning: can LLMs learn to reason genuinely?
- Open problems in alignment: can we align models we don't understand?
- The compute frontier: training cost trends
- Predictions and speculations: where is the field going?

**Derivation Targets**
- Analyze current model capabilities against formal benchmarks: identify systematic failure modes
- Derive the compute trend: show that training compute has doubled every ~6 months
- Analyze the alignment robustness question: show that current alignment techniques are brittle
- Formalize open problems as precise mathematical questions
- Derive the diminishing returns hypothesis and analyze evidence for and against

**Skill Focus:** Understanding the current state of the field; formulating open problems precisely.

**Why this week matters:** The field is moving fast. Understanding where we are, what is not yet solved, and what the most important open problems are prepares the student for research and for making informed decisions about AI systems.

---

## Week 15 — Synthesis: The Foundation Model Worldview

**Purpose:** No new content. Consolidate the entire multimodal/foundation-model framework.

**What to synthesize:**
$$\text{pretraining} \to \text{alignment} \to \text{multimodal} \to \text{ICL} \to \text{retrieval} \to \text{agents} \to \text{scaling} \to \text{safety}$$

**Capstone problems (select 2-3 for full reconstruction):**
- Design a complete foundation model system for a specific application: specify pretraining data, architecture, alignment strategy, deployment plan, and safety measures with mathematical justification
- Analyze the scaling behavior of a specific capability: derive predictions from scaling laws and identify where they might fail
- Critically evaluate a claim about LLM capabilities: design experiments to test the claim and analyze potential confounders
- Derive the full RLHF pipeline and analyze its failure modes; propose improvements with mathematical justification

**Final message:** Foundation models represent a paradigm shift: from task-specific models to general-purpose systems adapted to many tasks. Understanding them requires understanding representation learning, scaling, alignment, and evaluation — the full stack of modern AI.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Contrastive** | CLIP objective; InfoNCE as MI bound; temperature effects |
| **Multimodal** | Vision-language architecture; cross-attention conditioning; grounding |
| **ICL** | Implicit Bayesian inference; implicit gradient descent; induction heads |
| **Retrieval** | Dense retrieval; BM25; ANN search; RAG probability |
| **Agents** | POMDP formulation; tool use advantage; error propagation |
| **Scaling** | Power law fits; compute-optimal allocation; breaking conditions |
| **Efficiency** | Quantization error; distillation; speculative decoding |
| **Alignment** | RLHF/DPO; Goodhart's law; jailbreak as adversarial optimization |
| **Reasoning** | CoT computational depth; MCTS for LLMs; self-consistency |

---

## Problem Set Structure

**A. System design** — Design a complete foundation model application: specify architecture, pretraining, adaptation, and deployment with mathematical justification.

**B. Scaling analysis** — Analyze scaling behavior of specific capabilities; derive predictions; identify failure modes.

**C. Capability evaluation** — Design rigorous experiments to test LLM capabilities; control for confounders; analyze results critically.

**D. Alignment analysis** — Analyze alignment techniques; identify failure modes; propose improvements.

**E. Multimodal analysis** — Analyze cross-modal representation spaces; evaluate multimodal generation quality; design cross-modal systems.

> If the problem sets only ask "prompt GPT and describe what happens," the course has failed. The student must analyze foundation models with the same mathematical rigor applied to any other AI system.

---

*Course 12 continues with Theory, Robustness, and Limits — where "AI" becomes a serious field, not just model training.*

---
---