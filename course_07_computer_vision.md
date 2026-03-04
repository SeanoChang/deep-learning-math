# Course 7: Computer Vision as Structured Perception
**15-Week Rigorous Sequence — Learning Over Spatial Structure**

> **Course philosophy:** Computer vision is not "CNNs plus ImageNet." It is the study of how to learn representations of spatial data by encoding the right inductive biases — locality, translation equivariance, hierarchical composition — into architecture design. The transition from hand-crafted features to learned features, and from CNNs to vision transformers, is driven by precise tradeoffs between inductive bias, data efficiency, and scalability. This course traces those tradeoffs rigorously.

**Primary text:** Prince, *Understanding Deep Learning* (vision chapters) | **Supplement:** Szeliski, *Computer Vision: Algorithms and Applications* | **Reference:** CS231n course materials

---

## Course Goal

Build a deep understanding of visual representation learning: why spatial structure requires special architectures, how convolution encodes locality and equivariance, what feature hierarchies look like, and how the field is evolving toward less-biased architectures (ViTs) with more data. The conceptual spine is:

$$\text{spatial structure} \to \text{convolution} \to \text{feature hierarchies} \to \text{modern CNNs} \to \text{detection/segmentation} \to \text{vision transformers} \to \text{self-supervised vision} \to \text{multimodal vision}$$

---

## Week 1 — Images as Structured Data

**Topics**
- Images as tensors: height × width × channels
- Spatial structure: nearby pixels are correlated, distant pixels less so
- The statistics of natural images: power spectra, edge distributions
- Classical feature engineering: edges, corners, SIFT, HOG
- Why hand-crafted features are limited
- The representation learning promise: learn features end-to-end

**Derivation Targets**
- Derive the Sobel edge detector as a discrete approximation to image gradients
- Show that natural image statistics have characteristic power-law spectra
- Derive HOG features and analyze what invariances they capture
- Show the parameter count required for a fully connected layer on a 224×224 image: why this motivates convolution
- Analyze the information bottleneck of fixed features vs learned features

**Skill Focus:** Understanding images as structured signals; appreciating what spatial structure gives you and what architectural choices it demands.

**Why this week matters:** Without understanding the structure of visual data, architectural choices seem arbitrary. This week establishes that images have locality, stationarity, and compositional structure — and that good architectures must exploit these properties.

---

## Week 2 — Convolution: Parameter Sharing Over Space

**Topics**
- Discrete convolution: definition and properties
- Convolution as parameter sharing: same weights applied at every position
- Translation equivariance: shift the input, shift the output
- Padding, stride, and dilation: controlling the output geometry
- 1×1 convolutions: channel mixing without spatial interaction
- Depthwise separable convolutions: factoring spatial and channel computation
- Receptive field: what each output neuron "sees"

**Derivation Targets**
- Derive the discrete 2D convolution operation and its matrix formulation
- Prove that convolution is translation equivariant: $T_a[f * g] = f * [T_a g]$
- Derive the output dimensions for given input size, kernel size, padding, stride, and dilation
- Compute the receptive field of a stack of convolutional layers as a function of depth, kernel size, and dilation
- Derive the parameter savings of convolution vs fully connected: from $O(n^2)$ to $O(k^2 c)$
- Derive depthwise separable convolution and show the parameter/compute reduction factor

**Skill Focus:** Understanding convolution as the natural operation for spatially structured data; computing receptive fields and output dimensions fluently.

**Why this week matters:** Convolution is the defining operation of CNNs. Understanding it mathematically — as parameter sharing that encodes translation equivariance — explains why CNNs work for vision and what assumptions they encode. This is the canonical example of inductive bias in architecture design.

---

## Week 3 — Building Blocks: Pooling, Normalization, and Nonlinearity

**Topics**
- Pooling: max pooling, average pooling, global average pooling
- Pooling as downsampling + approximate translation invariance
- Batch normalization in CNNs: normalizing per channel
- The interplay between convolution, normalization, activation, and pooling
- Standard block structure: Conv → BN → ReLU → Pool
- Feature map interpretation: each channel as a feature detector
- Strided convolution as an alternative to pooling

**Derivation Targets**
- Show that max pooling provides approximate local translation invariance
- Derive the output dimensions through a sequence of conv + pool layers
- Analyze batch normalization in the context of convolutional layers: normalize per channel across spatial locations and batch
- Compute the total parameter count and FLOPs for a sequence of convolutional blocks
- Show that strided convolution can replace pooling with learnable downsampling

**Skill Focus:** Designing CNN blocks by understanding the role of each component; computing dimensions and costs through complex architectures.

**Why this week matters:** Understanding the building blocks individually is necessary but not sufficient — understanding how they compose into effective architectures is the real skill. This week builds that compositional understanding.

---

## Week 4 — Landmark CNN Architectures: From LeNet to ResNet

**Topics**
- LeNet: the original CNN for digit recognition
- AlexNet: depth + GPUs + ReLU + dropout
- VGGNet: simplicity through small kernels stacked deep
- GoogLeNet/Inception: multi-scale processing
- ResNet: residual connections enable extreme depth
- The progression: deeper, wider, more efficient — and why each step was necessary
- Architecture as hypothesis: what each design assumes about the task

**Derivation Targets**
- Trace the forward pass through VGG-16: compute feature map dimensions, parameter counts, and FLOPs at each layer
- Derive why 3×3 convolutions stacked are more efficient than larger kernels: two 3×3 layers have the same receptive field as one 5×5 but fewer parameters
- Analyze the ResNet degradation experiment: why adding layers to a plain network hurts performance
- Derive the total parameter count and FLOPs for ResNet-50
- Show how residual connections solve the degradation problem: identity mapping at initialization

**Skill Focus:** Reading architectures as mathematical designs; understanding what problem each innovation solves.

**Why this week matters:** These architectures are not historical curiosities — they encode lessons about depth, width, receptive field, and training dynamics that remain relevant. Understanding why each innovation was needed prevents the student from treating architecture design as arbitrary.

---

## Week 5 — Modern Efficient Architectures: MobileNets, EfficientNets, and Beyond

**Topics**
- Mobile and edge deployment: constraints on parameters and FLOPs
- MobileNet: depthwise separable convolutions for efficiency
- MobileNetV2: inverted residuals and linear bottlenecks
- EfficientNet: compound scaling of depth, width, and resolution
- Neural Architecture Search (NAS): automated architecture design
- ConvNeXt: modernizing CNNs with transformer-era insights
- The efficiency frontier: accuracy vs compute tradeoffs

**Derivation Targets**
- Derive the FLOP reduction of depthwise separable convolution: factor of $\sim k^2$ over standard convolution
- Derive the compound scaling law for EfficientNet: how to jointly scale depth, width, and resolution
- Analyze the inverted residual block: why expand-depthwise-project is more efficient than the standard residual
- Compare the parameter-accuracy tradeoff curves of different architecture families
- Show how ConvNeXt adopts transformer design choices (larger kernels, fewer normalization layers, GELU) within a CNN framework

**Skill Focus:** Designing architectures under computational constraints; understanding the mathematical tradeoffs that drive efficient architecture design.

**Why this week matters:** Real-world vision systems often run on phones, embedded devices, or with strict latency requirements. Understanding how to achieve accuracy under computational constraints is as important as achieving maximum accuracy without constraints.

---

## Week 6 — Object Detection: From Classification to Localization

**Topics**
- The detection problem: classify and localize multiple objects
- Two-stage detectors: R-CNN, Fast R-CNN, Faster R-CNN
- Region proposal networks: learning where to look
- One-stage detectors: YOLO, SSD, RetinaNet
- Anchor boxes and anchor-free detection
- Non-maximum suppression (NMS)
- Focal loss: addressing class imbalance in detection
- Evaluation: mAP (mean Average Precision)

**Derivation Targets**
- Derive the multi-task loss for detection: classification + bounding box regression
- Derive IoU (Intersection over Union) and show why it is a better metric than pixel accuracy
- Derive focal loss and show how it downweights easy negatives: $\text{FL}(p_t) = -\alpha_t(1-p_t)^\gamma \log(p_t)$
- Analyze the computational cost of two-stage vs one-stage detectors
- Derive how anchor boxes define the space of possible detections

**Skill Focus:** Extending classification architectures to structured prediction (detection); understanding multi-task loss design.

**Why this week matters:** Detection is where vision meets spatial reasoning. It requires predicting structured outputs (boxes + labels), handling variable numbers of objects, and dealing with extreme class imbalance. These challenges appear in many other vision tasks and domains.

---

## Week 7 — Semantic and Instance Segmentation

**Topics**
- Semantic segmentation: classify every pixel
- Fully Convolutional Networks (FCN): adapting classification networks for dense prediction
- Encoder-decoder architectures: U-Net
- Skip connections for multi-scale feature fusion
- Dilated/atrous convolutions: expanding receptive field without downsampling
- Instance segmentation: Mask R-CNN
- Panoptic segmentation: unifying semantic and instance segmentation

**Derivation Targets**
- Derive how a classification CNN is converted to a fully convolutional network
- Analyze the resolution loss through downsampling and how upsampling recovers it
- Derive transposed convolution (deconvolution) as the gradient of convolution
- Show how skip connections in U-Net provide multi-scale information
- Compute the receptive field with dilated convolutions: $r = 1 + (k-1) \cdot d$ for dilation $d$

**Skill Focus:** Designing architectures for dense prediction; understanding multi-scale feature fusion as a mathematical operation.

**Why this week matters:** Segmentation requires per-pixel prediction, which introduces new architectural challenges: maintaining spatial resolution while building rich features. The encoder-decoder + skip connection pattern reappears throughout deep learning.

---

## Week 8 — Vision Transformers: Attention Over Image Patches

**Topics**
- Vision Transformer (ViT): treating images as sequences of patches
- Patch embedding: from image to sequence
- ViT architecture: standard transformer on patch sequences
- ViT vs CNN: inductive bias tradeoffs
- Data efficiency: ViTs need more data than CNNs (without pretraining)
- DeiT: data-efficient training of ViTs with distillation
- Hybrid architectures: combining convolution and attention

**Derivation Targets**
- Derive the patch embedding: reshape image into $N = (H/P) \times (W/P)$ patches, each of dimension $P^2 \times C$
- Compare the inductive biases: CNN (locality, translation equivariance) vs ViT (global attention, permutation equivariance over patches)
- Analyze the computational cost: ViT attention is $O(N^2 d)$ where $N$ is the number of patches
- Show that with sufficient data, ViTs match or exceed CNN performance: the inductive bias gap closes with scale
- Derive the knowledge distillation loss used in DeiT

**Skill Focus:** Understanding the tradeoff between architectural inductive bias and data requirements; analyzing when less bias is better.

**Why this week matters:** ViTs demonstrate a fundamental principle: with enough data, less inductive bias can be better than more. Understanding the CNN-vs-ViT tradeoff is understanding one of the central tensions in all of AI architecture design.

---

## Week 9 — Self-Supervised Learning for Vision

**Topics**
- Why self-supervised: eliminating the labeling bottleneck
- Contrastive learning: SimCLR, MoCo
- The InfoNCE loss: contrastive learning as mutual information maximization
- Non-contrastive methods: BYOL, SimSiam, DINO
- Masked image modeling: MAE, BEiT
- What self-supervised representations learn: probing analysis
- Comparison: contrastive vs generative vs masked self-supervision

**Derivation Targets**
- Derive the InfoNCE loss: $\mathcal{L} = -\log \frac{\exp(\text{sim}(z_i, z_j) / \tau)}{\sum_k \exp(\text{sim}(z_i, z_k) / \tau)}$
- Show that InfoNCE is a lower bound on mutual information between views
- Analyze the role of temperature $\tau$ in contrastive learning: low temperature → hard negatives
- Derive how BYOL avoids collapse without negative pairs (stop-gradient + momentum encoder)
- Show the connection between masked image modeling and denoising autoencoders

**Skill Focus:** Understanding self-supervised learning objectives mathematically; analyzing what representations they learn.

**Why this week matters:** Self-supervised learning is how modern vision models learn without labels. Understanding the different objectives — contrastive, non-contrastive, generative — and what representations they produce is essential for working with foundation models.

---

## Week 10 — Metric Learning and Visual Similarity

**Topics**
- Learning distance functions: when classification is not enough
- Siamese networks: shared-weight architectures for comparison
- Triplet loss: anchor, positive, negative
- Contrastive loss and its relationship to metric learning
- Hard negative mining: why it matters
- Embedding spaces: geometry of learned similarity
- Applications: face recognition, image retrieval, few-shot classification

**Derivation Targets**
- Derive the triplet loss: $\mathcal{L} = \max(0, d(a, p) - d(a, n) + \alpha)$
- Show that triplet loss enforces a margin in embedding space
- Analyze the embedding geometry: what constraints does the loss impose?
- Derive the connection between contrastive learning and metric learning
- Show why hard negative mining is necessary: random negatives provide weak gradients
- Analyze the curse of dimensionality in embedding spaces

**Skill Focus:** Designing loss functions for learning similarities; understanding embedding geometry.

**Why this week matters:** Many real-world vision tasks are not classification but similarity: face recognition, image search, visual recommendation. Metric learning provides the mathematical framework for these tasks and connects to the contrastive learning methods of self-supervised learning.

---

## Week 11 — 3D Vision: Depth, Geometry, and Neural Rendering

**Topics**
- 3D representations: point clouds, meshes, voxels, implicit functions
- Depth estimation: monocular and stereo
- Structure from Motion (SfM) and multi-view geometry
- Neural Radiance Fields (NeRF): implicit 3D representations
- Volume rendering: the NeRF rendering equation
- 3D Gaussian Splatting: explicit + differentiable 3D
- Differentiable rendering: gradients through the rendering pipeline

**Derivation Targets**
- Derive the volume rendering equation: $C(r) = \int T(t) \sigma(t) c(t) dt$ where $T(t) = \exp(-\int \sigma(s) ds)$
- Derive the discrete approximation used in NeRF
- Show how positional encoding (Fourier features) enables neural networks to represent high-frequency functions
- Derive the projection equations for pinhole cameras
- Analyze the computational cost of NeRF rendering and why it is expensive

**Skill Focus:** Understanding 3D vision as geometry + learning; deriving rendering equations and their differentiable approximations.

**Why this week matters:** Vision is ultimately about the 3D world. NeRF and differentiable rendering represent a fundamental advance: learning 3D representations from 2D images using gradient-based optimization. This connects vision to graphics, physics, and geometric learning.

---

## Week 12 — Video Understanding: Temporal Vision

**Topics**
- Video as temporal sequences of frames
- Temporal modeling: 3D convolutions, (2+1)D factorization
- Optical flow: motion as a visual feature
- Two-stream networks: appearance + motion
- Video transformers: spatiotemporal attention
- Action recognition, temporal localization, video generation
- Computational challenges: video is expensive

**Derivation Targets**
- Derive 3D convolution and its computational cost relative to 2D
- Derive the (2+1)D factorization and show it reduces parameters while maintaining expressivity
- Derive optical flow from the brightness constancy assumption
- Analyze the computational cost of spatiotemporal attention: $O((T \cdot N)^2 d)$
- Show how factored attention (spatial then temporal) reduces cost to $O(T \cdot N^2 d + N \cdot T^2 d)$

**Skill Focus:** Extending spatial vision methods to spatiotemporal data; understanding the computational tradeoffs unique to video.

**Why this week matters:** Video is the richest visual medium and the most computationally demanding. Understanding how to process temporal visual data efficiently is essential for real-world applications: autonomous driving, video surveillance, content understanding.

---

## Week 13 — Robustness and Adversarial Examples in Vision

**Topics**
- Adversarial examples: imperceptible perturbations that fool networks
- FGSM, PGD, and other attack methods
- $\ell_p$ threat models: $\ell_\infty$, $\ell_2$, $\ell_0$
- Adversarial training: training against worst-case perturbations
- Certified robustness: provable guarantees
- Distribution shift in vision: domain adaptation, domain generalization
- The gap between benchmark robustness and real-world robustness

**Derivation Targets**
- Derive FGSM: $x_{\text{adv}} = x + \epsilon \cdot \text{sign}(\nabla_x L)$
- Derive PGD as projected gradient ascent on the adversarial objective
- Show that adversarial training solves a minimax problem: $\min_\theta \max_{\delta \in \Delta} L(f_\theta(x + \delta), y)$
- Derive randomized smoothing for certified robustness: if $f$ classifies most noise perturbations correctly, the smoothed classifier is certifiably robust
- Analyze why adversarial robustness and standard accuracy are often in tension

**Skill Focus:** Understanding adversarial vulnerability as a mathematical phenomenon; analyzing robustness guarantees rigorously.

**Why this week matters:** Adversarial examples reveal that neural networks perceive images very differently from humans. Understanding this failure mode — and the mathematics of robustness — is essential for deploying vision systems in safety-critical applications.

---

## Week 14 — Vision Foundation Models and the Future of CV

**Topics**
- Foundation models for vision: CLIP, DINO, SAM
- CLIP: connecting vision and language through contrastive learning
- Zero-shot visual recognition via language
- Segment Anything Model (SAM): promptable segmentation
- Vision-language models: from classification to conversation about images
- The shift from task-specific to general-purpose vision
- Open problems in computer vision

**Derivation Targets**
- Derive the CLIP objective: contrastive loss over (image, text) pairs
- Show how CLIP enables zero-shot classification: compare image embedding to text embeddings of class names
- Analyze the scaling behavior of vision-language models
- Derive the prompt-based architecture of SAM and its relationship to attention
- Compare the data efficiency of CLIP pretraining to ImageNet pretraining

**Skill Focus:** Understanding the paradigm shift from task-specific vision to general-purpose visual understanding; analyzing vision-language models mathematically.

**Why this week matters:** Vision is converging with language in modern foundation models. CLIP and its successors represent a fundamental change in how vision systems are built and used. Understanding this transition — and its mathematical basis — prepares the student for multimodal AI in Course 11.

---

## Week 15 — Synthesis: The Computer Vision Worldview

**Purpose:** No new content. Consolidate the entire computer vision framework.

**What to synthesize:**
$$\text{spatial structure} \to \text{convolution} \to \text{CNNs} \to \text{detection/segmentation} \to \text{ViTs} \to \text{self-supervised} \to \text{3D/video} \to \text{foundation models}$$

**Capstone problems (select 2-3 for full reconstruction):**
- Design a complete vision system for a given task: choose architecture (CNN vs ViT), training strategy (supervised vs self-supervised), and justify each choice mathematically
- Derive the forward pass, parameter count, and FLOPs for a modern vision architecture
- Analyze the inductive bias tradeoff between CNNs and ViTs for a specific data regime (small data vs large data)
- Design a robust vision system: analyze adversarial vulnerability and propose mathematically grounded defenses

**Final message:** Computer vision is the study of learning over spatial structure. The evolution from hand-crafted features to CNNs to vision transformers is a progression from strong inductive bias with little data to weak inductive bias with much data. Understanding this tradeoff is understanding a central tension in all of AI.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **Convolution** | Translation equivariance proof; parameter savings; receptive field computation |
| **Architectures** | VGG parameter analysis; ResNet degradation fix; EfficientNet scaling |
| **Detection** | Multi-task loss; IoU; focal loss; anchor-based detection |
| **Segmentation** | FCN conversion; transposed convolution; U-Net skip connections |
| **ViT** | Patch embedding; CNN vs ViT inductive bias; computational complexity |
| **Self-supervised** | InfoNCE derivation; BYOL collapse avoidance; MAE objective |
| **Metric learning** | Triplet loss; embedding geometry; hard negative analysis |
| **3D vision** | Volume rendering equation; NeRF discretization; camera projection |
| **Robustness** | FGSM/PGD; adversarial training minimax; certified robustness |

---

## Problem Set Structure

**A. Architecture analysis** — Compute parameter counts, FLOPs, receptive fields, and output dimensions for given architectures.

**B. Design problems** — Design a vision architecture for a specific task and computational budget; justify each choice.

**C. Inductive bias analysis** — Compare architectures in terms of their inductive biases; predict performance in different data regimes.

**D. Loss function design** — Derive and analyze loss functions for detection, segmentation, metric learning, and self-supervised learning.

**E. Robustness analysis** — Generate adversarial examples; analyze vulnerability; design and evaluate defenses.

> If the problem sets only ask "train ResNet on CIFAR-10 and report accuracy," the course has failed. The student must understand what the architecture computes, what inductive biases it encodes, and why it works.

---

*Course 8 continues with NLP as Modeling Structure in Language, where the statistical structure of language meets deep learning.*

---
---