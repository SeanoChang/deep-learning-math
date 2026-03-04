# Course 10: Generative Modeling
**15-Week Rigorous Sequence — Learning to Generate**

> **Course philosophy:** Generative modeling is not one technique — it is the study of learning probability distributions over complex, high-dimensional data. Every generative family — autoregressive models, VAEs, GANs, normalizing flows, diffusion models — represents a different mathematical approach to the same fundamental problem: how do you represent, learn, sample from, and evaluate a distribution over data? This course builds from the shared mathematical foundation through each family, always comparing their assumptions, tradeoffs, and capabilities.

**Primary text:** Research papers (curated reading list) | **Supplement:** Murphy, *Probabilistic Machine Learning: Advanced Topics* | **Reference:** Prince, *Understanding Deep Learning* (generative chapters)

---

## Course Goal

Build a unified understanding of generative modeling: what it means to learn a distribution, how different model families approach this, and what tradeoffs they make. The conceptual spine is:

$$\text{density estimation} \to \text{autoregressive} \to \text{latent variables (VAE)} \to \text{adversarial (GAN)} \to \text{flows} \to \text{diffusion} \to \text{energy-based} \to \text{evaluation}$$

---

## Week 1 — The Generative Modeling Problem

**Topics**
- What is a generative model: learning $p(x)$ or a mechanism to sample from it
- Density estimation vs sampling vs both
- Explicit vs implicit density models
- Maximum likelihood as the canonical training objective
- KL divergence: $\min_\theta \text{KL}(p_{\text{data}} \| p_\theta) = \max_\theta \mathbb{E}_{p_{\text{data}}}[\log p_\theta(x)]$
- Taxonomy of generative models: autoregressive, latent variable, adversarial, flow-based, score-based
- Evaluation challenges: how do you know a generative model is good?

**Derivation Targets**
- Show that minimizing forward KL divergence is equivalent to maximum likelihood
- Show that minimizing reverse KL gives mode-seeking behavior: $\min_\theta \text{KL}(p_\theta \| p_{\text{data}})$ concentrates on modes
- Derive the fundamental tradeoff: models that can compute exact likelihoods (flows, AR) vs those that can only sample (GANs)
- Analyze the challenges of evaluating generative models: likelihood vs sample quality vs diversity
- Show that high likelihood does not imply good samples and vice versa

**Skill Focus:** Understanding generative modeling as a well-defined mathematical problem with multiple solution families; knowing what each family can and cannot do.

**Why this week matters:** Without this unified view, each generative model family seems like a separate invention. This week establishes the shared mathematical problem and the fundamental tradeoffs that differentiate the approaches.

---

## Week 2 — Autoregressive Models: Generation as Sequential Prediction

**Topics**
- Autoregressive decomposition: $p(x) = \prod_t p(x_t | x_{<t})$
- Neural autoregressive models: PixelRNN, PixelCNN, WaveNet
- Masked convolutions and masked self-attention for autoregressive structure
- Causal structure: enforcing the autoregressive property
- Training: teacher forcing with cross-entropy
- Sampling: sequential, slow, but exact
- LLMs as autoregressive generative models

**Derivation Targets**
- Derive the autoregressive likelihood and show it gives exact log-likelihood computation
- Show that masked convolutions enforce the autoregressive property
- Derive WaveNet's dilated causal convolutions and compute the receptive field
- Analyze the sequential sampling bottleneck: $O(T)$ sequential steps
- Compare autoregressive models to other families: exact likelihood but sequential generation

**Skill Focus:** Understanding autoregressive models as the simplest complete generative family; analyzing their strengths (exact likelihood) and weaknesses (slow sampling).

**Why this week matters:** Autoregressive models are the most successful generative family: LLMs for text, WaveNet for audio. Understanding them as density estimators using the chain rule of probability connects language modeling to the broader generative modeling framework.

---

## Week 3 — Variational Autoencoders: Latent Variables and the ELBO

**Topics**
- Latent variable models: $p(x) = \int p(x|z) p(z) dz$
- The intractability of the marginal likelihood
- Variational inference: approximate the posterior $p(z|x)$ with $q_\phi(z|x)$
- The Evidence Lower Bound: $\log p(x) \geq \mathbb{E}_{q}[\log p(x|z)] - \text{KL}(q(z|x) \| p(z))$
- The VAE: encoder $q_\phi(z|x)$, decoder $p_\theta(x|z)$, trained jointly
- The reparameterization trick: $z = \mu + \sigma \odot \epsilon$, $\epsilon \sim \mathcal{N}(0, I)$
- Posterior collapse and mitigation strategies

**Derivation Targets**
- Derive the ELBO from Jensen's inequality
- Show that $\log p(x) = \text{ELBO} + \text{KL}(q(z|x) \| p(z|x))$: the gap is the posterior approximation error
- Derive the reparameterization trick and show it enables gradient computation through sampling
- Derive the VAE loss: reconstruction + KL terms
- Analyze posterior collapse: show that when the decoder is powerful, the model can ignore the latent variable

**Skill Focus:** Deriving the VAE from first principles; understanding the ELBO as the key quantity in variational generative modeling.

**Why this week matters:** VAEs introduced the idea of learning latent representations and generating data simultaneously, using variational inference. The ELBO is the most important equation in variational methods, and the reparameterization trick is the key technical innovation.

---

## Week 4 — Advanced VAEs and Hierarchical Latent Models

**Topics**
- Beta-VAE: controlling the latent-reconstruction tradeoff
- VQ-VAE: discrete latent codes via vector quantization
- Hierarchical VAEs: multiple levels of latent variables
- NVAE: very deep hierarchical VAEs with good generation quality
- Disentangled representations: learning independent factors of variation
- The information preference problem in VAEs
- Connecting VAEs to information theory: rate-distortion theory

**Derivation Targets**
- Derive the beta-VAE objective and show how $\beta > 1$ encourages disentanglement
- Derive VQ-VAE: straight-through estimator for discrete codes
- Derive the hierarchical VAE ELBO with multiple latent levels
- Show the rate-distortion connection: the VAE trades off reconstruction (distortion) and compression (rate)
- Analyze the information preference: why powerful decoders lead to posterior collapse

**Skill Focus:** Extending the basic VAE framework; understanding disentanglement and hierarchy in latent variable models.

**Why this week matters:** VQ-VAE is the tokenizer behind modern image generation (DALL-E, Stable Diffusion). Hierarchical VAEs achieve competitive generation quality. Understanding these extensions is essential for modern generative systems.

---

## Week 5 — Generative Adversarial Networks: Learning Through Competition

**Topics**
- The GAN framework: generator $G$ vs discriminator $D$
- The minimax objective: $\min_G \max_D \mathbb{E}[\log D(x)] + \mathbb{E}[\log(1 - D(G(z)))]$
- Nash equilibria and GAN training dynamics
- Mode collapse: the generator producing limited diversity
- Training instability and practical tricks
- Wasserstein GAN: using optimal transport distance
- Spectral normalization: stabilizing the discriminator

**Derivation Targets**
- Derive the optimal discriminator: $D^*(x) = \frac{p_{\text{data}}(x)}{p_{\text{data}}(x) + p_G(x)}$
- Show that with optimal discriminator, the generator minimizes the Jensen-Shannon divergence
- Derive the Wasserstein distance and show it is a smoother metric than JS divergence
- Derive the WGAN objective via the Kantorovich-Rubinstein duality
- Analyze mode collapse: show that the generator can fool the discriminator by covering only a few modes

**Skill Focus:** Understanding GANs as a game-theoretic approach to generation; analyzing training dynamics and failure modes.

**Why this week matters:** GANs introduced adversarial training, which is a fundamentally different approach to generation. Understanding the game theory, the training dynamics, and the failure modes is essential — and adversarial objectives appear beyond GANs in many modern systems.

---

## Week 6 — Normalizing Flows: Exact Density via Invertible Transforms

**Topics**
- Normalizing flows: transform a simple distribution into a complex one via invertible maps
- Change of variables: $p(x) = p(z) |\det J_{f^{-1}}(x)|$ where $x = f(z)$
- Designing invertible architectures: coupling layers, autoregressive flows
- RealNVP, Glow, and neural spline flows
- Exact likelihood computation: the key advantage
- Computational cost: the Jacobian determinant bottleneck
- Continuous normalizing flows: neural ODEs

**Derivation Targets**
- Derive the change of variables formula for normalizing flows
- Derive coupling layers (RealNVP) and show the Jacobian is triangular: $O(d)$ determinant computation
- Derive autoregressive flows and show they have tractable Jacobians
- Derive continuous normalizing flows via the instantaneous change of variables formula
- Compare flows to VAEs: flows give exact likelihood but require invertible architectures

**Skill Focus:** Understanding normalizing flows as exact density models via invertible transformations; computing Jacobian determinants efficiently.

**Why this week matters:** Normalizing flows provide the cleanest mathematical framework for generative modeling: exact likelihood, exact sampling, and exact latent inference. Understanding them gives insight into what architectural constraints are needed for tractable density estimation.

---

## Week 7 — Score-Based Models and Denoising Score Matching

**Topics**
- The score function: $\nabla_x \log p(x)$
- Score matching: learning the score without knowing the normalization constant
- Denoising score matching: learn the score of the noised data
- The connection to denoising autoencoders
- Noise conditional score networks (NCSN)
- Langevin dynamics for sampling: $x_{t+1} = x_t + \eta \nabla_x \log p(x_t) + \sqrt{2\eta} \epsilon_t$
- Annealed Langevin dynamics: progressive denoising

**Derivation Targets**
- Derive the score matching objective: $\mathbb{E}_{p_{\text{data}}}[\|\nabla_x \log p_\theta(x) - \nabla_x \log p_{\text{data}}(x)\|^2]$
- Show that denoising score matching is equivalent to score matching: $\mathbb{E}[\|s_\theta(x + \sigma\epsilon) - (-\epsilon/\sigma)\|^2]$
- Derive Langevin dynamics and show it samples from $p(x)$ as step size → 0
- Show the connection between denoising score matching and denoising autoencoders
- Analyze why multiple noise levels are necessary: low noise gives poor coverage, high noise gives poor accuracy

**Skill Focus:** Understanding score-based generative modeling as an alternative to likelihood-based methods; connecting scores to sampling.

**Why this week matters:** Score matching is the mathematical foundation of diffusion models. Understanding it — especially the connection between denoising, score estimation, and Langevin sampling — is prerequisite to understanding modern diffusion models.

---

## Week 8 — Diffusion Models: The Denoising Framework

**Topics**
- Denoising Diffusion Probabilistic Models (DDPM): the forward and reverse processes
- Forward process: gradually add noise until data becomes pure noise
- Reverse process: learn to denoise step by step
- The diffusion model training objective: simplified denoising loss
- Noise schedules: linear, cosine, learned
- The connection to score matching: diffusion = iterative Langevin with learned score
- DDIM: deterministic sampling from diffusion models

**Derivation Targets**
- Derive the forward process: $q(x_t | x_0) = \mathcal{N}(\sqrt{\bar{\alpha}_t} x_0, (1-\bar{\alpha}_t)I)$
- Derive the reverse process and show it requires estimating $\nabla_{x_t} \log q(x_t)$
- Derive the simplified training objective: $L_{\text{simple}} = \mathbb{E}[\|\epsilon - \epsilon_\theta(x_t, t)\|^2]$
- Show the equivalence between predicting noise $\epsilon$ and predicting the score $\nabla_x \log p(x_t)$
- Derive DDIM and show it gives the same marginals as DDPM but with deterministic reverse process

**Skill Focus:** Deriving diffusion models from first principles; understanding the connections between diffusion, score matching, and denoising.

**Why this week matters:** Diffusion models are the state of the art for image generation and increasingly for audio, video, and 3D. Understanding their derivation — not just their recipe — is essential for working at the frontier of generative AI.

---

## Week 9 — Conditional Generation and Guidance

**Topics**
- Conditional generation: $p(x | c)$ where $c$ is text, class, image, etc.
- Classifier guidance: using a classifier's gradient to steer generation
- Classifier-free guidance: training with and without conditioning, interpolating at inference
- Text-to-image: DALL-E, Stable Diffusion, Imagen
- The latent diffusion approach: diffusion in a learned latent space
- ControlNet: adding structural control to diffusion models
- Inpainting, super-resolution, and editing as conditional generation

**Derivation Targets**
- Derive classifier guidance: $\nabla_x \log p(x|c) = \nabla_x \log p(x) + \nabla_x \log p(c|x)$
- Derive classifier-free guidance: $\tilde{\epsilon} = (1+w)\epsilon_\theta(x_t, c) - w\epsilon_\theta(x_t)$ and show it amplifies the conditioning signal
- Derive the latent diffusion model: encode $x \to z$, run diffusion in $z$-space, decode $z \to x$
- Analyze the quality-diversity tradeoff controlled by guidance scale
- Show how ControlNet adds spatial conditioning without retraining the base model

**Skill Focus:** Understanding conditional generation as a principled extension of unconditional generation; analyzing guidance as Bayesian conditioning.

**Why this week matters:** Text-to-image generation is one of the most impactful applications of generative modeling. Understanding how conditioning works — especially classifier-free guidance — is essential for anyone working with modern generative systems.

---

## Week 10 — Energy-Based Models: The Unifying Framework

**Topics**
- Energy-based models: $p(x) = \frac{\exp(-E_\theta(x))}{Z(\theta)}$
- The partition function problem: $Z(\theta) = \int \exp(-E_\theta(x)) dx$ is intractable
- Contrastive divergence and persistent contrastive divergence
- Score matching as training without the partition function
- Noise contrastive estimation (NCE)
- EBMs as a unifying view: flows, diffusion, and GANs as special cases
- Hopfield networks and modern Hopfield networks (connection to attention)

**Derivation Targets**
- Show that GANs, VAEs, flows, and diffusion models can all be viewed as special cases of the EBM framework
- Derive contrastive divergence: approximate the gradient of the log-partition function with short MCMC runs
- Derive noise contrastive estimation and show it avoids computing the partition function
- Show the connection between modern Hopfield networks and the attention mechanism
- Analyze why EBMs are theoretically appealing (flexible) but practically challenging (training is hard)

**Skill Focus:** Seeing the energy-based framework as a unifying perspective on generative modeling; understanding the partition function as the central computational challenge.

**Why this week matters:** The energy-based view unifies most generative model families under a single mathematical framework. Understanding it provides deep insight into why different approaches exist (they avoid the partition function in different ways) and what new approaches might be possible.

---

## Week 11 — Evaluation of Generative Models

**Topics**
- Why evaluation is hard: no single metric captures generation quality
- Likelihood-based evaluation: log-likelihood, bits per dimension
- Sample-based evaluation: FID, IS, Precision-Recall
- Frechet Inception Distance (FID): comparing feature distributions
- Inception Score (IS): quality + diversity via a classifier
- Human evaluation: preference ratings, Turing tests
- Memorization vs generalization: detecting training set copying
- Mode coverage and diversity metrics

**Derivation Targets**
- Derive FID: $\text{FID} = \|\mu_r - \mu_g\|^2 + \text{Tr}(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2})$
- Show that FID assumes Gaussian feature distributions: analyze when this assumption fails
- Derive Inception Score and show it measures both quality (low entropy per image) and diversity (high entropy across images)
- Analyze Precision and Recall for generative models: precision = quality, recall = coverage
- Show that likelihood and sample quality can diverge: construct examples of high-likelihood/low-quality and low-likelihood/high-quality models

**Skill Focus:** Critically evaluating generative models; knowing what each metric measures and what it misses.

**Why this week matters:** Bad evaluation leads to wrong conclusions. Many generative modeling results are driven by metric gaming or inappropriate evaluation. This week develops the critical skills to evaluate generative models honestly.

---

## Week 12 — Audio and Music Generation

**Topics**
- Audio as a generative domain: waveforms, spectrograms, tokens
- WaveNet: autoregressive audio generation
- Audio tokenization: VQ-VAE for audio (EnCodec, SoundStream)
- Text-to-speech: modern neural TTS
- Music generation: MusicLM, MusicGen
- Audio diffusion models
- The unique challenges of audio: temporal coherence, long-range structure

**Derivation Targets**
- Derive the WaveNet architecture and its dilated causal convolution structure
- Analyze the audio tokenization pipeline: encoder → VQ → decoder
- Derive how text conditioning is integrated into audio generation models
- Compare autoregressive vs diffusion approaches for audio: tradeoffs in quality and speed
- Analyze the sampling rate bottleneck: why generating 24kHz audio requires efficiency innovations

**Skill Focus:** Understanding generative modeling beyond images; seeing how domain-specific structure shapes architecture choices.

**Why this week matters:** Audio generation demonstrates that the generative modeling framework extends far beyond images. The domain-specific challenges (long sequences, temporal coherence, perceptual quality) drive novel architectural and objective choices.

---

## Week 13 — Video Generation and Temporal Coherence

**Topics**
- Video generation: the spatial + temporal challenge
- Video diffusion models: extending image diffusion to video
- Temporal consistency: maintaining coherence across frames
- Video prediction vs unconditional video generation
- Text-to-video generation
- Computational challenges: video is much more expensive than images
- Evaluation of video generation: FVD, temporal consistency metrics

**Derivation Targets**
- Analyze the computational scaling of video diffusion: $O(T \cdot H \cdot W)$ spatial-temporal attention
- Derive temporal attention mechanisms for video and compare to 3D convolution
- Analyze the frame interpolation approach: generate keyframes, then fill in
- Derive the Frechet Video Distance as an extension of FID
- Compare video generation approaches: autoregressive token prediction vs diffusion

**Skill Focus:** Understanding the unique challenges of temporal generation; analyzing computational tradeoffs in video.

**Why this week matters:** Video generation is the next frontier of generative modeling. Understanding the temporal coherence challenge — and the computational cost of addressing it — prepares the student for cutting-edge research.

---

## Week 14 — Generative Models for Science and Structured Data

**Topics**
- Molecular generation: graphs, SMILES, 3D coordinates
- Protein structure generation: backbone, side chains, sequence
- Materials design and drug discovery
- Generative models for code: Codex, AlphaCode
- Scientific simulation: learning to generate physical trajectories
- Equivariant generative models: respecting symmetries
- The promise and challenges of generative AI for science

**Derivation Targets**
- Derive equivariant neural networks and show why they matter for molecular generation
- Analyze how symmetry constraints reduce the search space in generative modeling
- Derive graph-based generative models and their autoregressive or diffusion-based training
- Show how protein structure generation uses SE(3)-equivariant architectures
- Analyze the evaluation challenges in scientific generation: validity, novelty, diversity, synthesizability

**Skill Focus:** Applying generative modeling principles to structured scientific data; understanding how domain symmetries constrain and improve generation.

**Why this week matters:** Generative AI for science may be the highest-impact application of generative modeling. Understanding how to adapt generative frameworks to structured scientific data — with domain constraints and symmetries — is essential for this frontier.

---

## Week 15 — Synthesis: The Generative Modeling Worldview

**Purpose:** No new content. Consolidate the entire generative modeling framework.

**What to synthesize:**
$$\text{density estimation} \to \text{autoregressive} \to \text{VAE} \to \text{GAN} \to \text{flows} \to \text{score matching} \to \text{diffusion} \to \text{EBM} \to \text{evaluation}$$

**Capstone problems (select 2-3 for full reconstruction):**
- Derive two different generative model families from scratch and compare their tradeoffs: likelihood computation, sampling speed, sample quality, training stability
- Design a generative system for a specific domain (images, audio, molecules): choose the model family and justify mathematically
- Critically evaluate a generative model using multiple metrics; identify where each metric gives misleading results
- Derive the connections between diffusion, score matching, and denoising: show they are three views of the same mathematical object

**Final message:** Generative modeling is the study of learning probability distributions over complex data. Every model family represents a different mathematical tradeoff between tractable likelihood, efficient sampling, training stability, and sample quality. The field is converging on diffusion/score-based methods for continuous data and autoregressive methods for discrete data — but understanding the full landscape is essential for knowing when each approach is appropriate.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Foundations** | Forward KL = MLE; reverse KL = mode-seeking; density vs sampling |
| **Autoregressive** | Chain rule decomposition; exact likelihood; sequential sampling cost |
| **VAE** | ELBO derivation; reparameterization trick; posterior collapse |
| **GAN** | Optimal discriminator; JS divergence minimization; Wasserstein distance |
| **Flows** | Change of variables; coupling layers; continuous normalizing flows |
| **Score** | Score matching; denoising score matching equivalence; Langevin dynamics |
| **Diffusion** | Forward/reverse process; simplified loss; DDIM; noise schedule |
| **Guidance** | Classifier guidance; classifier-free guidance; latent diffusion |
| **EBM** | Partition function; contrastive divergence; NCE |
| **Evaluation** | FID derivation; IS; Precision-Recall; likelihood-quality divergence |

---

## Problem Set Structure

**A. Model derivation** — Derive a generative model family from first principles: specify the model, derive the training objective, analyze the sampling procedure.

**B. Comparison problems** — Given two generative model families, compare them on specific axes: likelihood computation, sampling speed, training stability, sample quality.

**C. Design problems** — Design a generative system for a specific domain and data type; justify the model family, architecture, and training procedure.

**D. Evaluation problems** — Evaluate a generative model using multiple metrics; identify and analyze discrepancies between metrics.

**E. Connection problems** — Show mathematical connections between model families (diffusion ↔ score matching, VAE ↔ EM, GAN ↔ divergence minimization, all ↔ EBM).

> If the problem sets only ask "generate images with a pretrained diffusion model," the course has failed. The student must derive, compare, and evaluate generative models from mathematical foundations.

---

*Course 11 continues with Multimodal and Foundation-Model Thinking, where domain boundaries dissolve.*


---
---