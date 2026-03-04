# Course 9: Reinforcement Learning as Sequential Decision-Making
**15-Week Rigorous Sequence — Learning to Act Under Uncertainty**

> **Course philosophy:** Reinforcement learning is structurally different from supervised learning. The agent changes its own data distribution through its actions. Data is non-iid, reward is delayed and sparse, and the optimization landscape is shaped by the interplay of exploration, exploitation, and credit assignment. This course builds RL from Markov Decision Processes through modern deep RL and its connection to LLM alignment, always emphasizing what makes RL fundamentally harder than supervised learning.

**Primary text:** Sutton & Barto, *Reinforcement Learning: An Introduction* (2nd ed.) | **Supplement:** Bertsekas, *Dynamic Programming and Optimal Control* | **Reference:** Szepesvari, *Algorithms for Reinforcement Learning*

---

## Course Goal

Build the mathematical framework for sequential decision-making under uncertainty: MDPs, value functions, policy optimization, and the deep RL extensions that make these ideas work at scale. The conceptual spine is:

$$\text{MDPs} \to \text{Bellman equations} \to \text{DP} \to \text{model-free methods} \to \text{policy gradient} \to \text{actor-critic} \to \text{deep RL} \to \text{offline RL / RLHF}$$

---

## Week 1 — The Sequential Decision Problem

**Topics**
- What makes RL different from supervised learning: non-iid data, delayed reward, exploration
- The agent-environment interface
- Markov Decision Processes: states, actions, transitions, rewards
- Finite vs infinite horizon; discounting
- Policies: deterministic and stochastic
- The objective: maximize expected cumulative (discounted) reward

**Derivation Targets**
- Formally define an MDP: $(S, A, P, R, \gamma)$
- Derive the expected return for a policy: $J(\pi) = \mathbb{E}_\pi[\sum_{t=0}^\infty \gamma^t r_t]$
- Show that the Markov property enables recursive computation
- Prove that there exists an optimal deterministic policy for finite MDPs
- Contrast the RL objective with the supervised learning objective: show where iid breaks down

**Skill Focus:** Formalizing decision-making problems as MDPs; understanding the structural differences from supervised learning.

**Why this week matters:** RL is fundamentally about sequential decisions where actions affect future observations. Without the MDP framework, the student cannot think precisely about exploration, credit assignment, or the difference between RL and supervised learning.

---

## Week 2 — Value Functions and the Bellman Equations

**Topics**
- State-value function: $V^\pi(s) = \mathbb{E}_\pi[\sum_{t=0}^\infty \gamma^t r_t | s_0 = s]$
- Action-value function: $Q^\pi(s, a) = \mathbb{E}_\pi[\sum_{t=0}^\infty \gamma^t r_t | s_0 = s, a_0 = a]$
- Bellman expectation equations for $V^\pi$ and $Q^\pi$
- Bellman optimality equations for $V^*$ and $Q^*$
- The relationship between $V$ and $Q$: $V^\pi(s) = \sum_a \pi(a|s) Q^\pi(s, a)$
- Optimal policy from optimal value function: $\pi^*(s) = \arg\max_a Q^*(s, a)$

**Derivation Targets**
- Derive the Bellman expectation equation: $V^\pi(s) = \sum_a \pi(a|s) \sum_{s'} P(s'|s,a)[R(s,a,s') + \gamma V^\pi(s')]$
- Derive the Bellman optimality equation: $V^*(s) = \max_a \sum_{s'} P(s'|s,a)[R(s,a,s') + \gamma V^*(s')]$
- Show that the Bellman operator is a contraction mapping in the sup-norm
- Prove that the fixed point of the Bellman optimality operator is the optimal value function
- Derive the Q-version of all Bellman equations

**Skill Focus:** Deriving and manipulating Bellman equations fluently; understanding value functions as the fundamental objects of RL.

**Why this week matters:** The Bellman equations are the foundation of all RL algorithms. Every method — from tabular DP to deep Q-learning to policy gradient — is either solving or approximating Bellman equations. Fluency here is non-negotiable.

---

## Week 3 — Dynamic Programming: Planning with a Known Model

**Topics**
- Policy evaluation: computing $V^\pi$ given $\pi$ and the model
- Policy iteration: evaluate, then improve, then repeat
- Value iteration: directly compute $V^*$
- Convergence guarantees: contraction mapping theorem
- The curse of dimensionality in DP
- Linear programming formulation of MDPs
- When the model is known vs unknown

**Derivation Targets**
- Derive iterative policy evaluation as repeated Bellman backup
- Prove policy iteration converges in at most $|A|^{|S|}$ steps
- Derive value iteration and prove it converges at rate $\gamma^k$
- Show the LP formulation: $\min \sum_s V(s)$ subject to Bellman constraints
- Analyze the computational complexity: $O(|S|^2 |A|)$ per iteration

**Skill Focus:** Understanding DP as the exact solution method for MDPs; knowing its strengths (optimal, convergent) and weaknesses (requires model, scales poorly).

**Why this week matters:** DP provides the gold standard for RL: if you know the model and the state space is small, DP gives the optimal policy. All model-free methods are approximations of DP. Understanding the exact method is prerequisite to understanding the approximations.

---

## Week 4 — Monte Carlo Methods: Learning from Experience

**Topics**
- Model-free learning: no access to transition probabilities
- Monte Carlo estimation of value functions
- First-visit vs every-visit MC
- MC control: learning policies from episodes
- Exploring starts vs epsilon-greedy exploration
- Off-policy MC: importance sampling
- High variance of MC estimates

**Derivation Targets**
- Derive the MC value estimate as the sample mean of returns
- Prove that first-visit MC is an unbiased estimator of $V^\pi(s)$
- Derive importance sampling for off-policy evaluation: $\hat{V}^\pi(s) = \frac{1}{n}\sum_{i} \prod_t \frac{\pi(a_t|s_t)}{\mu(a_t|s_t)} G_i$
- Show that importance sampling can have very high variance
- Analyze the bias-variance tradeoff between MC and TD methods (preview)

**Skill Focus:** Understanding model-free learning from complete episodes; analyzing the variance of MC estimates.

**Why this week matters:** MC methods are the simplest model-free approach. They introduce the fundamental ideas of learning from experience, exploration, and off-policy correction that pervade all of RL. Their high variance motivates temporal-difference methods.

---

## Week 5 — Temporal-Difference Learning: Bootstrapping

**Topics**
- TD(0): update toward $r + \gamma V(s')$ instead of waiting for episode end
- The TD error: $\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)$
- TD vs MC: bias-variance tradeoff
- SARSA: on-policy TD control
- Q-learning: off-policy TD control
- Convergence of Q-learning to $Q^*$ (tabular case)
- TD($\lambda$): blending MC and TD via eligibility traces

**Derivation Targets**
- Derive the TD(0) update rule and show it is a stochastic approximation of the Bellman equation
- Prove Q-learning convergence (sketch): conditions on learning rate, stochastic approximation theory
- Derive SARSA and compare: on-policy (SARSA) vs off-policy (Q-learning)
- Derive TD($\lambda$) and show it interpolates between TD(0) ($\lambda = 0$) and MC ($\lambda = 1$)
- Analyze the bias-variance tradeoff: TD introduces bias (bootstrapping) but reduces variance

**Skill Focus:** Understanding bootstrapping as the key idea of TD learning; analyzing the bias-variance-computation tradeoff across MC, TD, and their blends.

**Why this week matters:** TD learning is the computational workhorse of RL. Q-learning in particular is the foundation of DQN and all deep Q-learning methods. Understanding the bias-variance tradeoff between MC and TD is essential for all subsequent methods.

---

## Week 6 — Function Approximation in RL

**Topics**
- Why tabular methods fail: large or continuous state spaces
- Linear function approximation for value functions
- The deadly triad: function approximation + bootstrapping + off-policy → divergence
- Convergence guarantees for linear TD with on-policy data
- Experience replay: breaking temporal correlations
- Target networks: stabilizing bootstrapping
- Feature design for RL

**Derivation Targets**
- Derive semi-gradient TD: $w \leftarrow w + \alpha \delta_t \nabla_w V(s_t; w)$ and show why it is a semi-gradient (not full gradient)
- Show Baird's counterexample: linear function approximation + off-policy + bootstrapping diverges
- Prove convergence of linear TD(0) with on-policy sampling (sketch)
- Derive experience replay and show it makes data approximately iid
- Analyze target networks: show they reduce the moving target problem at the cost of stale targets

**Skill Focus:** Understanding when function approximation in RL is stable and when it diverges; knowing the deadly triad.

**Why this week matters:** All practical RL uses function approximation. But combining function approximation with RL is fundamentally more dangerous than in supervised learning — the deadly triad can cause divergence. This week explains why and provides the tools to manage it.

---

## Week 7 — Deep Q-Networks and Value-Based Deep RL

**Topics**
- DQN: deep neural networks for Q-function approximation
- The DQN algorithm: experience replay + target network + epsilon-greedy
- Double DQN: addressing overestimation bias
- Dueling DQN: separating state value and advantage
- Prioritized experience replay
- Rainbow: combining DQN improvements
- Distributional RL: modeling the distribution of returns

**Derivation Targets**
- Derive the DQN loss: $L = \mathbb{E}[(r + \gamma \max_{a'} Q_{\text{target}}(s', a') - Q(s, a))^2]$
- Derive the overestimation bias of Q-learning and show how Double DQN fixes it
- Derive the dueling architecture: $Q(s, a) = V(s) + A(s, a) - \frac{1}{|A|}\sum_{a'} A(s, a')$
- Derive prioritized replay: sampling proportional to TD error
- Analyze distributional RL: model $Z(s, a)$ where $Q(s, a) = \mathbb{E}[Z(s, a)]$

**Skill Focus:** Understanding DQN as a practical marriage of deep learning and Q-learning; analyzing its failure modes and improvements.

**Why this week matters:** DQN was the breakthrough that launched deep RL. Understanding its design — and why each component (replay, target network, etc.) is necessary — provides the template for all deep RL systems.

---

## Week 8 — Policy Gradient Methods

**Topics**
- The policy gradient idea: parameterize the policy directly and optimize
- The policy gradient theorem: $\nabla_\theta J(\theta) = \mathbb{E}_\pi[\nabla_\theta \log \pi_\theta(a|s) Q^\pi(s, a)]$
- REINFORCE: Monte Carlo policy gradient
- Baselines for variance reduction: subtracting a value function
- The score function estimator and its relationship to likelihood ratio methods
- Natural policy gradient: incorporating the Fisher information

**Derivation Targets**
- Derive the policy gradient theorem from first principles
- Show that REINFORCE is unbiased but has high variance
- Prove that subtracting a state-dependent baseline does not change the expected gradient: $\mathbb{E}[\nabla \log \pi(a|s) b(s)] = 0$
- Derive the variance reduction from using a baseline
- Derive the natural policy gradient and show it uses the Fisher information to correct for parameterization effects

**Skill Focus:** Deriving policy gradients rigorously; understanding variance reduction as essential for practical policy gradient methods.

**Why this week matters:** Policy gradient methods are the foundation of modern deep RL and RLHF. Understanding the policy gradient theorem — and the variance problem that plagues it — is essential for everything from robotics to language model alignment.

---

## Week 9 — Actor-Critic Methods

**Topics**
- Actor-critic: combining policy gradient (actor) with value function (critic)
- Advantage function: $A^\pi(s, a) = Q^\pi(s, a) - V^\pi(s)$
- A2C: synchronous advantage actor-critic
- A3C: asynchronous parallel training
- Generalized Advantage Estimation (GAE): blending TD and MC for advantage estimation
- The actor-critic as a variance-reduced policy gradient

**Derivation Targets**
- Derive the advantage actor-critic update: actor uses $\nabla \log \pi(a|s) A(s, a)$, critic minimizes TD error
- Derive GAE: $\hat{A}_t^{\text{GAE}} = \sum_{l=0}^\infty (\gamma \lambda)^l \delta_{t+l}$ and show it interpolates between TD ($\lambda = 0$) and MC ($\lambda = 1$)
- Show that using the advantage instead of Q reduces variance without changing the expected gradient
- Analyze the bias-variance tradeoff in GAE as a function of $\lambda$
- Derive A3C's asynchronous updates and analyze when they approximate synchronous updates

**Skill Focus:** Understanding actor-critic as the natural combination of value-based and policy-based methods; tuning the bias-variance tradeoff via GAE.

**Why this week matters:** Actor-critic methods are the backbone of modern policy optimization. PPO, SAC, and RLHF all use actor-critic architectures. Understanding the advantage function and GAE is essential for practical deep RL.

---

## Week 10 — Proximal Policy Optimization (PPO) and Trust Regions

**Topics**
- The trust region idea: don't change the policy too much per update
- TRPO: constrained optimization with KL divergence constraint
- PPO: clipped surrogate objective as a simpler alternative
- The PPO clip: $L^{\text{CLIP}} = \min(r_t A_t, \text{clip}(r_t, 1-\epsilon, 1+\epsilon) A_t)$
- Why PPO works: bounding the policy change prevents catastrophic updates
- PPO in practice: hyperparameters, implementation details
- PPO for RLHF: the connection to language model alignment

**Derivation Targets**
- Derive the TRPO objective: maximize $\mathbb{E}_{s, a \sim \pi_{\text{old}}}[\frac{\pi_\theta(a|s)}{\pi_{\text{old}}(a|s)} A^{\pi_{\text{old}}}(s, a)]$ subject to $\text{KL}(\pi_{\text{old}} \| \pi_\theta) \leq \delta$
- Show that TRPO guarantees monotonic policy improvement (under the KL constraint)
- Derive the PPO clipped objective and show it approximates the TRPO constraint
- Analyze when the clip activates: show it prevents large probability ratio changes
- Derive the full PPO-RLHF pipeline: reward model + PPO + KL penalty from reference policy

**Skill Focus:** Understanding trust region methods as principled policy optimization; connecting PPO to RLHF.

**Why this week matters:** PPO is the most widely used deep RL algorithm and the optimizer behind RLHF. Understanding its mathematical basis — trust regions and clipped objectives — is essential for anyone working on language model alignment or practical RL.

---

## Week 11 — Model-Based RL: Learning the World

**Topics**
- Model-based vs model-free: learning the dynamics vs learning values/policies directly
- Learning a dynamics model: $\hat{P}(s'|s, a)$
- Planning with a learned model: MPC, tree search
- Dyna: integrating model-based and model-free learning
- World models: learning compressed representations of dynamics
- MBPO: model-based policy optimization
- When model-based methods help: sample efficiency vs model error

**Derivation Targets**
- Derive the sample complexity advantage of model-based RL: show it can be exponentially more sample-efficient
- Analyze model error propagation: show that errors compound over the planning horizon
- Derive Dyna-Q and show it interleaves real experience with simulated experience
- Derive MPC (Model Predictive Control) and its connection to planning
- Analyze the bias-variance tradeoff: model-based methods have lower variance but introduce model bias

**Skill Focus:** Understanding the model-based / model-free tradeoff; analyzing when learned models help and when they hurt.

**Why this week matters:** Model-based RL offers much better sample efficiency but introduces model error. Understanding this tradeoff is essential for robotics, game playing, and any domain where real-world data is expensive.

---

## Week 12 — Exploration: The Fundamental RL Challenge

**Topics**
- Exploration vs exploitation: the multi-armed bandit problem
- UCB (Upper Confidence Bound): optimism in the face of uncertainty
- Thompson sampling: Bayesian exploration
- Exploration in MDPs: count-based methods, curiosity, information gain
- Intrinsic motivation: novelty, surprise, prediction error
- Hard exploration problems: sparse rewards, deceptive rewards
- The connection between exploration and information theory

**Derivation Targets**
- Derive UCB and prove its regret bound: $O(\sqrt{KT \log T})$ for $K$ arms and $T$ rounds
- Derive Thompson sampling and show it naturally balances exploration and exploitation
- Derive count-based exploration bonuses: $r_t^+ = \beta / \sqrt{N(s, a)}$ and their connection to UCB
- Analyze the limitations of epsilon-greedy exploration: show it explores inefficiently in large spaces
- Derive the information gain objective for exploration and connect to Bayesian experimental design

**Skill Focus:** Understanding exploration as a fundamental problem with precise mathematical formulations and solutions.

**Why this week matters:** Exploration is what makes RL hard. Without good exploration, the agent gets stuck in local optima. Understanding exploration — from bandits to MDPs — is essential for any RL application where reward is sparse or deceptive.

---

## Week 13 — Offline RL and Imitation Learning

**Topics**
- Offline RL: learning from a fixed dataset without further interaction
- The distribution shift problem in offline RL
- Conservative Q-Learning (CQL): penalizing out-of-distribution actions
- Implicit Q-Learning (IQL): avoiding OOD action evaluation
- Imitation learning: learning from demonstrations
- Behavioral cloning: supervised learning from expert actions
- DAgger: dataset aggregation to handle distribution shift
- Inverse RL: recovering the reward function from demonstrations

**Derivation Targets**
- Derive the distribution shift problem: show that offline RL evaluates actions not in the data, leading to extrapolation error
- Derive CQL: show it adds a penalty that lower-bounds the true Q-function
- Derive behavioral cloning and analyze its failure: error compounds as $O(T^2)$ with horizon $T$
- Derive DAgger and show it reduces compounding error to $O(T)$
- Derive maximum entropy IRL and show it finds a reward function consistent with expert behavior

**Skill Focus:** Understanding offline RL and imitation learning as practical alternatives to online RL; analyzing distribution shift rigorously.

**Why this week matters:** Online RL requires interaction with the environment, which is expensive or dangerous in many applications (healthcare, autonomous driving, language models). Offline RL and imitation learning provide alternatives, but with their own mathematical challenges.

---

## Week 14 — Multi-Agent RL and Game Theory Connections

**Topics**
- Multi-agent settings: cooperative, competitive, mixed
- Nash equilibria and their computation
- Self-play: learning by playing against yourself
- Multi-agent training challenges: non-stationarity, credit assignment
- Emergent communication and cooperation
- Connections to game theory: minimax, correlated equilibria
- Applications: games, auctions, traffic, multi-robot systems

**Derivation Targets**
- Derive the minimax theorem for two-player zero-sum games
- Show that self-play in two-player zero-sum games converges to Nash equilibrium (under conditions)
- Analyze the non-stationarity problem: each agent's environment changes as other agents learn
- Derive independent Q-learning for multi-agent settings and analyze its limitations
- Show the connection between RLHF and two-player games: the model vs the reward model

**Skill Focus:** Understanding multi-agent settings as game-theoretic problems; analyzing convergence and stability.

**Why this week matters:** Many real-world problems are multi-agent: markets, traffic, multi-robot systems, and even LLM alignment (model vs reward model). Understanding the game-theoretic foundations of multi-agent RL prepares the student for these applications.

---

## Week 15 — Synthesis: The Reinforcement Learning Worldview

**Purpose:** No new content. Consolidate the entire RL framework.

**What to synthesize:**
$$\text{MDPs} \to \text{Bellman} \to \text{DP} \to \text{MC/TD} \to \text{function approx} \to \text{policy gradient} \to \text{actor-critic} \to \text{PPO} \to \text{model-based} \to \text{offline RL}$$

**Capstone problems (select 2-3 for full reconstruction):**
- Derive Q-learning from the Bellman optimality equation and prove convergence (tabular case)
- Derive the full PPO algorithm: policy gradient theorem → advantage estimation → trust region → clipped objective
- Design an RL system for a given problem: choose model-free vs model-based, on-policy vs off-policy, and justify mathematically
- Analyze the connection between offline RL, imitation learning, and RLHF for language models

**Final message:** Reinforcement learning is the mathematics of sequential decision-making under uncertainty. It is fundamentally harder than supervised learning because the agent changes its own data distribution through its actions. Understanding this — and the tools to handle it (Bellman equations, policy gradients, trust regions, exploration) — is essential for any AI system that acts in the world.

---

## Required Derivation Spine

| Domain | Key Results |
|---|---|
| **MDPs** | Existence of optimal deterministic policy; Bellman equations |
| **DP** | Policy iteration convergence; value iteration contraction |
| **MC** | Unbiased estimation; importance sampling; high variance |
| **TD** | Q-learning convergence; bias-variance tradeoff; TD(lambda) |
| **Function approx** | Deadly triad; semi-gradient TD; experience replay |
| **DQN** | Overestimation bias; Double DQN fix; distributional RL |
| **Policy gradient** | Policy gradient theorem; baseline variance reduction |
| **Actor-critic** | Advantage function; GAE; bias-variance via lambda |
| **PPO** | TRPO monotonic improvement; PPO clipping; RLHF pipeline |
| **Offline RL** | Distribution shift; CQL; behavioral cloning error compounding |

---

## Problem Set Structure

**A. MDP formulation** — Given a problem, formulate it as an MDP: define states, actions, transitions, rewards, and discount factor.

**B. Bellman derivation** — Derive Bellman equations for specific MDPs; solve small MDPs by hand using DP.

**C. Algorithm analysis** — Derive RL algorithms (Q-learning, policy gradient, actor-critic); analyze convergence, bias, and variance.

**D. Design problems** — Given a problem domain, design a complete RL system: choose algorithm family, architecture, exploration strategy, and justify each choice.

**E. Failure analysis** — Identify and diagnose RL failure modes: deadly triad divergence, reward hacking, poor exploration, distribution shift in offline RL.

**F. Connection problems** — Show connections between RL and other areas: RLHF and NLP, model-based RL and planning, multi-agent RL and game theory.

> If the problem sets only ask "train DQN on Atari and report score," the course has failed. The student must derive, analyze, and critique RL algorithms from mathematical principles.

---

*Course 10 continues with Generative Modeling, where the goal shifts from prediction to generation.*

---
---