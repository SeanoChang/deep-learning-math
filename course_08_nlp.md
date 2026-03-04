# Course 8: NLP as Modeling Structure in Language
**15-Week Rigorous Sequence — From Tokens to Understanding**

> **Course philosophy:** Natural Language Processing is not "apply transformer to text." It is the study of structured prediction over symbolic, compositional, ambiguous inputs. Language has syntax, semantics, pragmatics, and discourse structure — and every NLP system implicitly or explicitly models some of these. This course builds from the statistical structure of language through modern LLMs, always asking: what about language makes this hard, and what mathematical structure does each approach exploit?

**Primary text:** Jurafsky & Martin, *Speech and Language Processing* (3rd ed.) | **Supplement:** Eisenstein, *Introduction to Natural Language Processing* | **Reference:** CS224N course materials

---

## Course Goal

Build a rigorous understanding of NLP as the study of language structure through statistical and neural methods. The student should understand tokenization, language modeling, sequence-to-sequence learning, pretraining, alignment, and evaluation — and know what mathematical problem each solves. The conceptual spine is:

$$\text{tokenization} \to \text{language modeling} \to \text{sequence tasks} \to \text{pretraining} \to \text{fine-tuning} \to \text{alignment} \to \text{retrieval} \to \text{evaluation}$$

---

## Week 1 — The Structure of Language as a Computational Problem

**Topics**
- What makes language hard for machines: ambiguity, compositionality, context-dependence
- Levels of linguistic analysis: morphology, syntax, semantics, pragmatics, discourse
- Language as a discrete, structured, compositional system
- The distributional hypothesis: meaning from co-occurrence
- Key NLP tasks: classification, tagging, parsing, generation, translation, question answering
- Evaluation paradigms: intrinsic vs extrinsic, automatic vs human

**Derivation Targets**
- Formalize ambiguity: show examples where the same surface form has multiple valid interpretations
- Define compositionality formally: the meaning of a whole is a function of the meaning of parts and their arrangement
- Show that word frequency follows Zipf's law and derive its implications for data sparsity
- Analyze the vocabulary growth problem: Heaps' law and why new words keep appearing
- Formalize the distributional hypothesis as a mathematical statement about co-occurrence statistics

**Skill Focus:** Understanding what makes NLP a distinct and challenging field; appreciating the structure that language provides.

**Why this week matters:** NLP is not just "deep learning on strings." Language has rich structure that both enables and constrains learning. Without understanding this structure, the student cannot evaluate whether a model is capturing meaningful patterns or superficial correlations.

---

## Week 2 — Tokenization: From Characters to Subwords

**Topics**
- The tokenization problem: how to segment text into model inputs
- Word-level tokenization and the out-of-vocabulary problem
- Character-level tokenization: no OOV but longer sequences
- Subword tokenization: BPE, WordPiece, Unigram (SentencePiece)
- How tokenization affects the statistical problem
- Tokenization for non-English languages: morphological challenges
- The vocabulary size tradeoff: smaller vocab = longer sequences, larger vocab = sparser statistics

**Derivation Targets**
- Derive the BPE algorithm and show it greedily maximizes compression
- Derive the Unigram tokenization model and show it selects the tokenization with highest likelihood
- Analyze how vocabulary size affects sequence length and model capacity requirements
- Show that tokenization changes the effective distribution: different tokenizations produce different language models
- Compute the compression ratio of BPE vs character-level for typical text

**Skill Focus:** Understanding tokenization as a fundamental modeling choice that affects everything downstream.

**Why this week matters:** Tokenization is the first thing a language model does and the last thing most practitioners think about. But it determines the statistical structure of the input, affects computational cost, and can introduce biases. This week makes it a first-class topic.

---

## Week 3 — Language Modeling: Density Estimation Over Sequences

**Topics**
- Language modeling as probability estimation: $P(w_1, w_2, \ldots, w_T)$
- Autoregressive decomposition: $P(w_1, \ldots, w_T) = \prod_t P(w_t | w_{<t})$
- Neural language models: from feedforward to recurrent to transformer
- Perplexity as evaluation
- Sampling from language models: temperature, top-k, top-p (nucleus)
- Language modeling as self-supervised learning
- The connection between language modeling and compression

**Derivation Targets**
- Derive the autoregressive decomposition from the chain rule of probability
- Show that perplexity is the exponential of cross-entropy: $\text{PPL} = \exp(H(p, q))$
- Derive the relationship between language modeling and compression: bits per character
- Analyze temperature scaling in softmax sampling: show low $T$ → greedy, high $T$ → uniform
- Derive top-p (nucleus) sampling and show it adapts to the shape of the distribution

**Skill Focus:** Understanding language modeling as a well-defined statistical problem; connecting it to information theory and compression.

**Why this week matters:** Language modeling is the foundation of modern NLP. Every LLM is a language model. Understanding it as density estimation — not just "predicting the next word" — provides the mathematical framework for everything that follows.

---

## Week 4 — Text Classification and Sequence Labeling

**Topics**
- Text classification: sentiment, topic, intent detection
- Bag-of-words and TF-IDF representations
- Recurrent and transformer-based classification
- Sequence labeling: POS tagging, NER, chunking
- The BIO tagging scheme
- CRFs for structured prediction: modeling label dependencies
- The Viterbi algorithm for CRF decoding

**Derivation Targets**
- Derive TF-IDF weighting and show why it balances term frequency with document frequency
- Derive the linear-chain CRF probability: $P(y|x) = \frac{1}{Z(x)} \exp(\sum_t \phi(y_t, y_{t-1}, x, t))$
- Derive the CRF partition function computation via the forward algorithm
- Show that CRFs model label dependencies while softmax classifiers treat each position independently
- Derive the Viterbi algorithm for finding the most likely label sequence

**Skill Focus:** Understanding structured prediction; knowing when independent classification suffices and when sequence structure in the output matters.

**Why this week matters:** Classification and labeling are the workhorses of applied NLP. Understanding the full spectrum — from bag-of-words to CRFs to transformer-based models — gives the student a principled basis for choosing the right approach.

---

## Week 5 — Machine Translation and Sequence-to-Sequence Learning

**Topics**
- Machine translation as the canonical sequence-to-sequence problem
- Statistical machine translation: phrase-based models (historical context)
- Neural machine translation: encoder-decoder with attention
- The transformer for translation: the original application
- Beam search for decoding
- BLEU score and its limitations
- Multilingual models: shared representations across languages

**Derivation Targets**
- Derive the encoder-decoder probability: $P(y|x) = \prod_t P(y_t | y_{<t}, x)$
- Derive BLEU score and analyze what it captures and misses
- Show that beam search with beam width $k$ has complexity $O(k \cdot T \cdot V)$ per step
- Derive how attention in translation creates soft alignment between source and target
- Analyze the multilingual representation space: how shared subword vocabularies enable cross-lingual transfer

**Skill Focus:** Understanding translation as a structured prediction problem; analyzing decoding algorithms and evaluation metrics.

**Why this week matters:** Machine translation drove the development of attention and transformers. Understanding the translation problem — alignment, reordering, ambiguity — provides insight into the design of the architectures that now power all of NLP.

---

## Week 6 — Pretraining Objectives: BERT, GPT, and T5

**Topics**
- The pretraining revolution: learning representations from unlabeled text at scale
- Autoregressive pretraining (GPT): predict the next token
- Masked language modeling (BERT): predict masked tokens
- Span corruption (T5): predict corrupted spans
- Encoder-only vs decoder-only vs encoder-decoder: which objective for which architecture
- What pretraining learns: syntax, semantics, world knowledge
- Probing pretrained models: what information is encoded where

**Derivation Targets**
- Derive the masked language modeling objective and its relationship to denoising autoencoders
- Compare the information available to autoregressive vs masked models: show that AR models see all preceding context while MLM sees bidirectional context with holes
- Analyze the percentage of tokens used for training in MLM (typically 15%) vs AR (100%)
- Derive the span corruption objective of T5 and show it is a generalization of MLM
- Show through probing that lower layers encode syntax while upper layers encode semantics

**Skill Focus:** Understanding pretraining objectives as mathematical choices with specific representational consequences.

**Why this week matters:** Pretraining objectives determine what representations the model learns. The choice between autoregressive and masked language modeling is the choice between generation and understanding — and understanding this choice is essential for working with modern LLMs.

---

## Week 7 — Fine-Tuning, Prompting, and In-Context Learning

**Topics**
- Fine-tuning: adapting pretrained models to downstream tasks
- Full fine-tuning vs parameter-efficient methods (LoRA, adapters, prefix tuning)
- Prompt engineering: extracting capabilities without gradient updates
- In-context learning: few-shot examples in the prompt
- Instruction tuning: training models to follow instructions
- The spectrum from fine-tuning to prompting: tradeoffs
- When to fine-tune, when to prompt, when to do both

**Derivation Targets**
- Derive LoRA: show that $W' = W + BA$ reduces trainable parameters from $d^2$ to $2rd$
- Analyze the representational capacity of LoRA: what subspace of weight changes can it express?
- Show that in-context learning can be viewed as implicit Bayesian inference over tasks
- Derive prefix tuning and show it is equivalent to adding virtual tokens to the input
- Analyze the compute and data tradeoffs: fine-tuning requires more compute per task but works with less data per example

**Skill Focus:** Understanding the adaptation spectrum; choosing the right adaptation method based on mathematical properties and practical constraints.

**Why this week matters:** The pretrain-then-adapt paradigm is the foundation of modern NLP practice. Understanding the mathematical tradeoffs between different adaptation methods is essential for efficient and effective use of LLMs.

---

## Week 8 — Alignment: From Language Models to Assistants

**Topics**
- The alignment problem: language models predict text, but users want helpful, harmless, honest responses
- Supervised fine-tuning (SFT): training on human demonstrations
- Reinforcement Learning from Human Feedback (RLHF)
- The reward model: learning human preferences
- PPO for language models: optimizing the reward while staying close to the base model
- DPO: Direct Preference Optimization without a reward model
- Constitutional AI and other alignment approaches

**Derivation Targets**
- Derive the RLHF objective: $\max_\pi \mathbb{E}_{x \sim D, y \sim \pi}[R(x, y)] - \beta \text{KL}(\pi \| \pi_{\text{ref}})$
- Show that the KL constraint prevents the model from collapsing to reward-hacking behavior
- Derive DPO: show that the optimal policy under RLHF has a closed form, and derive the loss that directly optimizes it
- Derive the Bradley-Terry model for preference learning: $P(y_1 \succ y_2) = \sigma(R(y_1) - R(y_2))$
- Analyze reward hacking: show examples where optimizing a learned reward produces undesirable behavior

**Skill Focus:** Understanding alignment as a mathematical problem: what objective are we optimizing, and what are the failure modes?

**Why this week matters:** Alignment is what turns a language model into a useful assistant. Understanding the mathematics of RLHF and DPO — including their failure modes — is essential for anyone working on or with modern LLMs.

---

## Week 9 — Retrieval-Augmented Generation (RAG)

**Topics**
- The knowledge problem: models have fixed knowledge from training data
- Retrieval-augmented generation: look up relevant information, then generate
- Dense retrieval: learned embeddings for document search
- The RAG pipeline: retrieve → rerank → generate
- Chunking strategies and their effect on retrieval quality
- Embedding models and similarity search
- Evaluation: faithfulness, relevance, hallucination detection

**Derivation Targets**
- Derive dense retrieval as maximum inner product search in embedding space
- Analyze approximate nearest neighbor search: LSH, HNSW, and their theoretical guarantees
- Derive the RAG probability: $P(y|x) = \sum_d P(d|x) P(y|x, d)$
- Show how chunk size affects the precision-recall tradeoff in retrieval
- Analyze the attribution problem: can you trace generated claims to retrieved sources?

**Skill Focus:** Understanding RAG as a principled extension of language models; analyzing retrieval quality and its effect on generation.

**Why this week matters:** RAG is the primary method for grounding LLMs in external knowledge. Understanding it mathematically — retrieval as approximate inference over a knowledge base — prevents the common mistake of treating it as simple concatenation.

---

## Week 10 — Information Extraction and Structured Prediction

**Topics**
- Named entity recognition: extracting structured information from text
- Relation extraction: identifying relationships between entities
- Event extraction: who did what to whom, when, where
- Question answering: extractive and generative approaches
- Span extraction as a structured prediction problem
- Joint extraction models: entity + relation
- Knowledge graph construction from text

**Derivation Targets**
- Derive extractive QA as span selection: $P(\text{start}=i, \text{end}=j | x, q)$
- Show the decomposition: $P(\text{start}=i, \text{end}=j) = P(\text{start}=i) \cdot P(\text{end}=j | \text{start}=i)$ and when the independence assumption is valid
- Derive joint entity-relation extraction losses
- Analyze the cascading error problem in pipeline systems vs end-to-end models
- Derive how pre-trained representations improve information extraction through fine-tuning

**Skill Focus:** Understanding NLP tasks as structured prediction problems; designing extraction systems.

**Why this week matters:** Information extraction is how NLP systems produce structured knowledge from unstructured text. Understanding it as structured prediction — with dependencies between outputs — prevents the mistake of treating each extraction as independent classification.

---

## Week 11 — Text Generation: Decoding, Control, and Quality

**Topics**
- Autoregressive generation: sampling from $P(w_t | w_{<t})$
- Decoding strategies: greedy, beam search, sampling, top-k, top-p
- The degeneration problem: repetitive, dull, or incoherent text
- Controlled generation: guiding outputs toward desired properties
- Classifier-free guidance for text generation
- Watermarking generated text
- Evaluation of generated text: automated metrics vs human evaluation

**Derivation Targets**
- Derive the maximum a posteriori decoding problem and show it is NP-hard for general sequence models
- Analyze why beam search produces degenerate text: the length bias and the probability-quality mismatch
- Derive nucleus sampling and show it adapts to the entropy of the distribution at each step
- Derive classifier-free guidance and show how it interpolates between conditional and unconditional generation
- Derive a watermarking scheme and analyze its detectability vs quality tradeoff

**Skill Focus:** Understanding text generation as a sampling and search problem; controlling and evaluating generation quality.

**Why this week matters:** Generation is what makes LLMs useful — but naive generation produces poor results. Understanding decoding as a mathematical problem (search in exponentially large spaces under imperfect distributions) is essential for producing high-quality outputs.

---

## Week 12 — Multilingual NLP and Cross-Lingual Transfer

**Topics**
- Multilingual models: shared representations across languages
- Cross-lingual transfer: train in one language, apply in another
- Shared subword vocabularies across languages
- Multilingual pretraining: mBERT, XLM-R
- Zero-shot cross-lingual transfer
- Language-specific vs language-universal representations
- Low-resource NLP: when data is scarce

**Derivation Targets**
- Analyze why shared vocabularies enable cross-lingual transfer: cognates, borrowed words, and shared subwords
- Show that multilingual models create aligned embedding spaces across languages
- Derive the zero-shot transfer setup and analyze when it works (typologically similar languages) and fails
- Analyze the curse of multilinguality: performance on each language degrades as more languages are added
- Derive the relationship between model capacity and number of supported languages

**Skill Focus:** Understanding multilingual NLP as a generalization problem across linguistic structures.

**Why this week matters:** Most of the world's languages are low-resource. Multilingual NLP is the only viable approach for serving diverse populations. Understanding when and why cross-lingual transfer works is essential for building inclusive NLP systems.

---

## Week 13 — Reasoning, Chain-of-Thought, and Model Capabilities

**Topics**
- What can language models reason about? Types of reasoning: arithmetic, logical, commonsense, analogical
- Chain-of-thought prompting: step-by-step reasoning
- Scratchpad and tool-augmented reasoning
- Limits of in-context reasoning: what can transformers not do?
- Compositional generalization: can models handle novel combinations?
- Theory of mind and common sense in LLMs
- Benchmarking reasoning: careful evaluation methodology

**Derivation Targets**
- Analyze what computations a transformer can perform in a fixed number of layers (circuit complexity arguments)
- Show that chain-of-thought effectively increases the compute available for a problem
- Derive the limitations of fixed-depth transformers for compositional tasks
- Analyze compositional generalization failures: memorization of patterns vs learning rules
- Critique reasoning benchmarks: show common methodological problems (data contamination, spurious correlations)

**Skill Focus:** Critically evaluating LLM capabilities; understanding the mathematical limits of transformer-based reasoning.

**Why this week matters:** "Can LLMs reason?" is one of the most important questions in modern AI. This week provides the mathematical framework to answer it precisely: what they can compute, what they approximate, and where they fail.

---

## Week 14 — Evaluation, Benchmarks, and Responsible NLP

**Topics**
- Evaluation methodology: what makes a good benchmark?
- Common benchmarks and their limitations: GLUE, SuperGLUE, MMLU, HumanEval
- Data contamination: when the test set is in the training data
- Human evaluation: inter-annotator agreement, evaluation protocols
- Bias in language models: gender, race, cultural biases
- Toxicity and safety: detecting and mitigating harmful outputs
- Responsible deployment: when and how to release models

**Derivation Targets**
- Derive inter-annotator agreement metrics: Cohen's kappa, Krippendorff's alpha
- Analyze data contamination: show how training data overlap inflates benchmark scores
- Derive fairness metrics for NLP: demographic parity, equalized odds applied to text classification
- Show how bias in training data propagates to model outputs: the embedding association test
- Analyze the tradeoff between model capability and safety: the alignment tax

**Skill Focus:** Rigorous evaluation methodology; understanding bias and safety as mathematical and social phenomena.

**Why this week matters:** NLP systems affect millions of people. Evaluating them honestly — including their biases and failure modes — is a moral and scientific responsibility. This week develops the skills for rigorous, responsible evaluation.

---

## Week 15 — Synthesis: The NLP Worldview

**Purpose:** No new content. Consolidate the entire NLP framework.

**What to synthesize:**
$$\text{tokens} \to \text{language models} \to \text{pretraining} \to \text{alignment} \to \text{retrieval} \to \text{generation} \to \text{reasoning} \to \text{evaluation}$$

**Capstone problems (select 2-3 for full reconstruction):**
- Design a complete NLP system for a given task: choose tokenization, pretraining, adaptation strategy, and evaluation methodology with mathematical justification
- Analyze the mathematical relationship between pretraining objective, model architecture, and downstream capabilities
- Derive the RLHF/DPO alignment pipeline and analyze its failure modes
- Critically evaluate a benchmark result: identify potential confounders, data contamination, and evaluation methodology issues

**Final message:** NLP is the study of modeling the structure of language — syntax, semantics, and pragmatics — through statistical and neural methods. Modern LLMs are language models trained at scale and aligned to human preferences. Understanding them requires understanding language modeling, optimization, alignment, and evaluation — not just prompting.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Tokenization** | BPE derivation; vocabulary size tradeoffs; tokenization effect on distributions |
| **Language modeling** | Autoregressive decomposition; perplexity; temperature/sampling analysis |
| **Structured prediction** | CRF probability; Viterbi algorithm; joint extraction losses |
| **Pretraining** | MLM vs AR objectives; probing representations; what pretraining learns |
| **Adaptation** | LoRA derivation; in-context learning as implicit inference; prompt tuning |
| **Alignment** | RLHF objective; DPO derivation; Bradley-Terry model; reward hacking |
| **RAG** | Dense retrieval; RAG probability; ANN search guarantees |
| **Generation** | Decoding NP-hardness; nucleus sampling; classifier-free guidance |
| **Evaluation** | Perplexity; BLEU; inter-annotator agreement; fairness metrics |

---

## Problem Set Structure

**A. Modeling problems** — Formalize an NLP task as a probabilistic or structured prediction problem; derive the appropriate loss function.

**B. Architecture analysis** — Compare architectures (encoder-only, decoder-only, encoder-decoder) for specific NLP tasks; justify choices mathematically.

**C. Pretraining and adaptation** — Design a pretraining + adaptation pipeline for a specific scenario; analyze tradeoffs between fine-tuning and prompting.

**D. Alignment analysis** — Derive alignment objectives; analyze failure modes; propose improvements.

**E. Evaluation problems** — Design rigorous evaluation protocols; identify and analyze potential confounders; critique existing benchmark results.

**F. Responsible NLP** — Analyze bias in models and training data; propose mitigation strategies; evaluate fairness tradeoffs.

> If the problem sets only ask "fine-tune BERT on a dataset and report F1," the course has failed. The student must understand the statistical structure of language, the mathematical basis of modern NLP methods, and how to evaluate them rigorously.

---

*Course 9 continues with Reinforcement Learning, where the agent changes its own data distribution through actions.*

---
---