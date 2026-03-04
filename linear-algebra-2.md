# Linear Algebra II: Spectral Theory, Canonical Forms, and Deep Structure

**15-Week Rigorous Proof-Based Sequence — Semester 2**

> **Course philosophy:** The deepest problems in linear algebra are classification problems — which transformations are genuinely different, and which are the same up to the right change of viewpoint? This semester answers that question completely for finite-dimensional operators.

**Primary text:** Axler, *Linear Algebra Done Right* (Ch. 5–10) | **Depth reference:** Hoffman & Kunze, *Linear Algebra* | **Applications:** Strang, *Introduction to Linear Algebra*

**Assumed background:** Vector spaces, bases, dimension, Rank–Nullity, linear maps and their matrices, similarity, eigenvalues/eigenvectors, diagonalization, inner products, Gram–Schmidt, orthogonal projection.

---

## Semester Goal

Push from finite-dimensional fluency into the complete theory of operators: minimal polynomials, canonical forms, bilinear and quadratic forms, spectral theory, and SVD. The conceptual spine is:

$$\text{invariant subspaces} \to \text{polynomial structure of operators} \to \text{canonical forms} \to \text{geometry via inner products} \to \text{spectral decomposition} \to \text{classification}$$

---

## Week 1 — Review Through Structure, Not Computation

**Topics**

- Rank–Nullity revisited as a structural statement
- Change of basis and the invariance of intrinsic properties
- Diagonalization as a best-case basis choice
- Orthogonality and why orthonormal bases simplify everything
- What Semester 1 built; what Semester 2 will complete

**Conceptual goal:** Reframe everything from Semester 1 in terms of one master question:

> Given a linear operator $T : V \to V$, can we find a basis of $V$ in which $T$ takes the simplest possible form?

Diagonalization answers "yes" when enough eigenvectors exist. Semester 2 answers the general question.

**Proof Targets**

- Restate the diagonalization criterion cleanly: $T$ is diagonalizable iff $V$ is a direct sum of eigenspaces
- Show that trace and determinant are similarity invariants (quick proof)
- Recall that similar matrices have the same characteristic polynomial

**Proof Skill Focus:** Reactivating structural reasoning; commutative-diagram intuition; invariant vs representation.

**Why this week matters:** Students must enter Semester 2 with the right question in mind. Every week after this is a more refined answer to: *in what basis does $T$ look simplest?*

---

## Week 2 — Invariant Subspaces

**Topics**

- $T$-invariant subspaces: definition and examples
- Restriction of an operator to an invariant subspace
- Direct sum decompositions and block diagonal forms
- Quotient spaces (light introduction if not covered in Semester 1)
- Eigenspaces as the simplest invariant subspaces

**Proof Targets**

- Kernel and image of $T$ are $T$-invariant
- If $W$ is $T$-invariant, the restriction $T|_W : W \to W$ is a well-defined linear operator
- A direct sum decomposition $V = W_1 \oplus \cdots \oplus W_k$ into $T$-invariant subspaces gives $T$ a block diagonal matrix form
- Every operator over $\mathbb{C}$ has at least one non-trivial invariant subspace (dimension $\geq 2$ case; follows from existence of eigenvalues)

**Proof Skill Focus:** Working with restrictions; constructing block diagonal forms; connecting algebraic structure to matrix block structure.

**Why this week matters:** Invariant subspaces are the fundamental objects of operator theory. Every canonical form theorem in the rest of the course is a theorem about decomposing $V$ into a particularly nice collection of $T$-invariant pieces.

---

## Week 3 — The Minimal Polynomial

**Topics**

- Polynomials of an operator: $p(T)$ for $p \in F[x]$
- Annihilating polynomials
- Existence of a nonzero annihilating polynomial (finite-dimensional case)
- The minimal polynomial $m_T$: definition, uniqueness, and divisibility property
- Relation between minimal polynomial and characteristic polynomial

**Proof Targets**

- The minimal polynomial exists and is unique (monic polynomial of least degree annihilating $T$)
- Every annihilating polynomial is divisible by the minimal polynomial
- The minimal polynomial divides the characteristic polynomial
- Eigenvalues of $T$ are exactly the roots of the minimal polynomial

**Proof Skill Focus:** Polynomial arithmetic over an operator; ideal-theoretic reasoning without requiring a full ring theory background; relating roots to spectral properties.

**Why this week matters:** The minimal polynomial is the fingerprint of an operator — it encodes exactly which polynomial relations $T$ satisfies, nothing more and nothing less. Understanding it is prerequisite to both Cayley–Hamilton and Jordan form.

---

## Week 4 — Cayley–Hamilton Theorem

**Topics**

- Statement: every operator satisfies its own characteristic polynomial
- Proof via the structure of $p(T)$ for the characteristic polynomial $p$
- Consequences: computing inverse via polynomial identity; reducing high powers of matrices
- The Cayley–Hamilton bound on minimal polynomial degree

**Proof Targets**

- Prove Cayley–Hamilton (at least one clean proof: adjugate/matrix argument or module-theoretic sketch)
- Deduce that $\deg(m_T)$ divides $\deg(\chi_T) = \dim V$
- Use Cayley–Hamilton to express $T^{-1}$ as a polynomial in $T$ when $T$ is invertible
- Compute $A^n$ for large $n$ using the characteristic polynomial of $A$

**Proof Skill Focus:** Long algebraic proof with a clear structure; using a theorem as a computational tool; recognizing that $T$ satisfying a polynomial identity has strong structural consequences.

**Why this week matters:** Cayley–Hamilton is surprising — the operator annihilates an explicit polynomial you can write down before knowing anything deep about the operator. It justifies working with polynomial representations of operators throughout the rest of the course.

---

## Week 5 — Diagonalizability Revisited: The Minimal Polynomial Criterion

**Topics**

- Diagonalizability via minimal polynomial: $T$ is diagonalizable iff $m_T$ splits into distinct linear factors over $F$
- Revisiting algebraic vs geometric multiplicity
- Primary decomposition theorem (statement and conceptual proof)
- Projection operators associated to a diagonalization

**Main Theorem:** $T : V \to V$ is diagonalizable (over $F$) if and only if $m_T(x) = (x - \lambda_1)(x - \lambda_2)\cdots(x - \lambda_k)$ with distinct $\lambda_i \in F$.

**Proof Targets**

- Prove the minimal polynomial criterion for diagonalizability
- State and prove the primary decomposition: if $m_T = p_1 \cdots p_k$ with coprime factors, then $V = \ker p_1(T) \oplus \cdots \oplus \ker p_k(T)$
- Show each projection $E_i$ onto $\ker p_i(T)$ along the other summands is a polynomial in $T$

**Proof Skill Focus:** Moving between polynomial factorization and subspace decompositions; seeing that "diagonalizable" means the minimal polynomial is as simple as possible.

**Why this week matters:** This week closes the diagonalization story with complete structural understanding. The primary decomposition is the algebraic engine behind Jordan form — once you understand this, Jordan is just one step further.

---

## Week 6 — Triangularization

**Topics**

- Upper triangular form
- Existence of triangularization over algebraically closed fields (and over $\mathbb{R}$ when all eigenvalues are real)
- Reading eigenvalues off a triangular matrix
- Nilpotent operators and their structure

**Main Theorem:** Every operator on a finite-dimensional complex vector space can be represented by an upper triangular matrix with eigenvalues on the diagonal.

**Proof Targets**

- Prove triangularization exists over $\mathbb{C}$ (inductive argument via invariant subspaces and eigenvalue existence)
- Prove the diagonal entries of any triangular form are the eigenvalues (with multiplicity)
- Show nilpotent operators are triangularizable with zeros on the diagonal
- Prove $N^{\dim V} = 0$ for any nilpotent $N$

**Proof Skill Focus:** Inductive constructions; invariant subspace induction; understanding that triangular form is a stepping stone to Jordan form.

**Why this week matters:** Triangularization is a universal normal form over $\mathbb{C}$. It proves that eigenvalues always exist in the complex case and shows exactly where Jordan form will improve upon it.

---

## Week 7 — Generalized Eigenvectors and Jordan Structure (Conceptual)

**Topics**

- Limitations of diagonalization: the defective case
- Generalized eigenvectors: $v$ such that $(T - \lambda I)^k v = 0$ for some $k$
- Jordan chains and cyclic structure
- Jordan blocks as the simplest non-diagonalizable operator
- Intuition for why Jordan form is the correct "next best" after diagonalization

**Proof Targets**

- Generalized eigenspaces $G(\lambda, T) = \ker(T - \lambda I)^{\dim V}$ are $T$-invariant
- $V = \bigoplus_\lambda G(\lambda, T)$ over all distinct eigenvalues (over $\mathbb{C}$) — the generalized primary decomposition
- A Jordan block $J_k(\lambda)$ of size $k$ has a unique eigenvalue $\lambda$, and its minimal polynomial is $(x - \lambda)^k$

**Proof Skill Focus:** Understanding chains of vectors under repeated application of $(T - \lambda I)$; distinguishing ordinary from generalized eigenvectors; reading structure from nilpotent shift operators.

**Why this week matters:** Most students find Jordan form impenetrable when taught algorithmically. Teaching the generalized eigenspace decomposition first makes the form feel inevitable rather than mysterious.

---

## Week 8 — Jordan Canonical Form

**Topics**

- Existence and uniqueness of Jordan canonical form (over algebraically closed field)
- Decomposition into Jordan blocks
- Reading the minimal polynomial and characteristic polynomial from Jordan form
- Jordan form of nilpotent operators
- Computing Jordan form in explicit examples

**Main Theorem:** Every operator on a finite-dimensional complex vector space has a Jordan canonical form, unique up to reordering of blocks. The Jordan form is the unique "simplest" matrix representation up to similarity.

**Proof Targets**

- Prove the nilpotent case: a nilpotent operator decomposes into Jordan blocks of the form $J_k(0)$ (cyclic decomposition for nilpotent operators)
- Assemble the full Jordan form from the generalized primary decomposition plus the nilpotent Jordan theorem
- Prove uniqueness: the Jordan block sizes for each eigenvalue $\lambda$ are determined by $\dim \ker(T - \lambda I)^j$ for each $j$
- Read $m_T$ and $\chi_T$ directly from the Jordan blocks

**Proof Skill Focus:** Layered inductive construction; extracting invariants from rank sequences; seeing theorem existence and uniqueness as separate arguments.

**Why this week matters:** Jordan form is the complete solution to the operator classification problem over $\mathbb{C}$. Every operator is classified up to similarity by its Jordan structure. This is the capstone of the algebraic half of the course.

---

## Week 9 — Bilinear Forms and Quadratic Forms

**Topics**

- Bilinear forms: definition and examples
- Symmetric bilinear forms
- Matrix representation of a bilinear form under a basis
- Quadratic forms associated to symmetric bilinear forms
- Congruence of matrices (distinct from similarity)

**Proof Targets**

- Every symmetric bilinear form has a symmetric matrix representation
- Under change of basis, the matrix of a bilinear form transforms by congruence: $A \mapsto P^T A P$
- Every quadratic form over $\mathbb{R}$ can be diagonalized (existence of an orthogonal diagonalizing basis — preview of Spectral Theorem)
- Prove that a symmetric bilinear form is determined by its associated quadratic form

**Proof Skill Focus:** Distinguishing similarity ($P^{-1}AP$) from congruence ($P^TAP$); understanding that different equivalence relations capture different geometric notions.

**Why this week matters:** Bilinear forms are the algebraic structure behind inner products, optimization landscapes (Hessians), and energy functionals. The classification of quadratic forms is a new type of problem — not "which operator?" but "which pairing?"

---

## Week 10 — Classification of Real Symmetric Forms: Sylvester's Law

**Topics**

- Congruence over $\mathbb{R}$
- Positive definite, negative definite, semidefinite, and indefinite forms
- Sylvester's Law of Inertia: the signature $(n_+, n_-, n_0)$ is a complete congruence invariant
- Positive definite forms as inner products

**Main Theorem (Sylvester's Law of Inertia):** Any two real diagonal forms congruent to a given symmetric bilinear form have the same number of positive, negative, and zero diagonal entries. The signature $(n_+, n_-)$ completely classifies real symmetric bilinear forms up to congruence.

**Proof Targets**

- Prove Sylvester's Law of Inertia
- Characterize positive definiteness via determinants (Sylvester's criterion)
- Prove that a symmetric bilinear form is an inner product iff it is positive definite
- Classify $2 \times 2$ and $3 \times 3$ symmetric forms by signature

**Proof Skill Focus:** Invariant-based classification proofs; distinguishing "exists a diagonalization" from "what the diagonalization reveals."

**Why this week matters:** Sylvester's Law is a clean classification theorem for an entire type of algebraic structure. It shows that two symmetric forms are "the same" iff they agree on what they do to lengths and orientations — a deeply geometric fact with a purely algebraic proof.

---

## Week 11 — Spectral Theorem: Real and Complex Cases

**Topics**

- Self-adjoint operators (real symmetric / complex Hermitian)
- Skew-adjoint and normal operators
- Spectral Theorem: real self-adjoint operators are orthogonally diagonalizable
- Complex Spectral Theorem: normal operators are unitarily diagonalizable
- Orthonormal bases of eigenvectors for symmetric/Hermitian matrices

**Main Theorem (Real):** If $T : V \to V$ is self-adjoint on a real inner product space, then $V$ has an orthonormal basis of eigenvectors of $T$, all eigenvalues are real, and eigenvectors for distinct eigenvalues are orthogonal.

**Main Theorem (Complex):** $T$ is normal ($TT^* = T^*T$) iff $V$ has an orthonormal basis of eigenvectors of $T$.

**Proof Targets**

- Prove all eigenvalues of a self-adjoint operator are real
- Prove eigenvectors of a self-adjoint operator for distinct eigenvalues are orthogonal
- Prove the real Spectral Theorem by induction on dimension using invariant subspace + orthogonal complement
- State and prove the complex Spectral Theorem for normal operators
- Orthogonal vs unitary diagonalization: $A = Q \Lambda Q^T$ vs $A = U \Lambda U^*$

**Proof Skill Focus:** Inductive proof using orthogonal decomposition; connecting adjoint structure to eigenvalue reality; reading a theorem as a "best basis" existence result.

**Why this week matters:** The Spectral Theorem is one of the crown jewels of linear algebra. It shows that symmetry (self-adjoint structure) forces the simplest possible canonical form — full orthogonal diagonalization. This is the foundation of PCA, quantum mechanics, and the theory of symmetric differential operators.

---

## Week 12 — Singular Value Decomposition

**Topics**

- Motivation: what does an arbitrary (non-square, non-symmetric) matrix do geometrically?
- $A^T A$ and $AA^T$ as positive semidefinite self-adjoint operators
- Singular values: $\sigma_i = \sqrt{\lambda_i(A^T A)}$
- SVD: $A = U \Sigma V^T$ where $U, V$ are orthogonal and $\Sigma$ is diagonal with singular values
- Geometric interpretation: SVD decomposes any linear map into rotation, stretching, rotation
- Best rank-$r$ approximation theorem (Eckart–Young)

**Proof Targets**

- Prove $A^T A$ is positive semidefinite for any real matrix $A$
- Prove the right singular vectors (columns of $V$) are eigenvectors of $A^T A$; left singular vectors (columns of $U$) are eigenvectors of $AA^T$
- Prove existence of SVD from the Spectral Theorem applied to $A^T A$
- State and prove (or give careful argument for) the Eckart–Young theorem: among all rank-$r$ matrices, $A_r = U_r \Sigma_r V_r^T$ minimizes $\| A - B \|_F$

**Proof Skill Focus:** Applying spectral theory to build a new decomposition; geometric reading of matrix factorizations; connecting the abstract (Spectral Theorem) to the concrete (matrix factorization algorithm).

**Why this week matters:** SVD is the most important matrix decomposition in modern applied mathematics. It is the foundation of PCA, dimensionality reduction, recommender systems, image compression, and numerical linear algebra. Every student who continues in mathematics, data science, or engineering will use it.

---

## Week 13 — Least Squares and the Pseudoinverse

**Topics**

- Revisit orthogonal projection: $\hat{x} = \arg\min_x \|Ax - b\|$
- Normal equations: $A^T A \hat{x} = A^T b$
- Geometric meaning: $A\hat{x}$ is the projection of $b$ onto $\operatorname{col}(A)$
- Pseudoinverse $A^+$ and the minimum-norm least squares solution
- SVD formula for the pseudoinverse: $A^+ = V \Sigma^+ U^T$

**Proof Targets**

- Prove the least squares solution via the projection theorem: $b - A\hat{x} \perp \operatorname{col}(A)$
- Derive the normal equations and prove existence and uniqueness conditions
- Define $A^+$ precisely and prove $A A^+ A = A$, $A^+ A A^+ = A^+$, and the two Hermitian conditions (Moore–Penrose axioms)
- Prove $A^+ = V \Sigma^+ U^T$ where $\Sigma^+$ inverts nonzero singular values

**Proof Skill Focus:** Geometric proof via orthogonal decomposition; operator-level definition rather than formula-first; connecting SVD theory to optimization.

**Why this week matters:** Least squares is the most important application of linear algebra in science and engineering. Treating it rigorously through the pseudoinverse reveals the deep geometric content: the pseudoinverse finds the best possible solution when a system is overdetermined or underdetermined.

---

## Week 14 — Adjoints, Duality, and Operator Symmetry

**Topics**

- Adjoint operators: $\langle Tv, w \rangle = \langle v, T^* w \rangle$
- Existence and uniqueness of the adjoint
- Matrix of the adjoint: $[T^*] = [T]^*$ (conjugate transpose in orthonormal basis)
- Self-adjoint, skew-adjoint, normal, unitary/orthogonal operators
- Dual spaces revisited: adjoint as the coordinate-free transpose
- Connection to Semester 1 duality: the adjoint is the natural generalization of the dual map to inner product spaces

**Proof Targets**

- Prove existence and uniqueness of the adjoint (via Riesz representation / direct construction)
- Prove $(S \circ T)^* = T^* \circ S^*$ and $(T^*)^* = T$
- Prove $\ker T^* = (\operatorname{im} T)^\perp$ and $\operatorname{im} T^* = (\ker T)^\perp$
- Characterize unitary operators: $T^* T = I \Leftrightarrow T$ is an isometry
- Show that in an orthonormal basis, $[T^*] = \overline{[T]}^T$

**Proof Skill Focus:** Coordinate-free definition then coordinate verification; the four fundamental subspaces revisited through the adjoint; understanding symmetry as a condition on an operator, not a matrix.

**Why this week matters:** The adjoint is the correct generalization of symmetry to arbitrary inner product spaces. It unifies transpose (real), conjugate transpose (complex), and the dual map (abstract) into one concept, and it is the right language for spectral theory, quantum mechanics, and functional analysis.

---

## Week 15 — Synthesis, Capstone Proofs, and Transition to Advanced Mathematics

**Purpose:** Consolidate the full operator classification program and show where it leads.

**What to synthesize:** The complete answer to the master question:

> In what basis does a linear operator $T : V \to V$ take the simplest form?

| Setting | Best Form | Tool |
|---|---|---|
| $F$ algebraically closed | Jordan canonical form | Generalized eigenspaces |
| $\mathbb{R}$, self-adjoint | Orthogonal diagonal | Spectral Theorem |
| $\mathbb{C}$, normal | Unitary diagonal | Complex Spectral Theorem |
| Any $A : \mathbb{R}^m \to \mathbb{R}^n$ | $U \Sigma V^T$ | Singular Value Decomposition |
| Real symmetric bilinear form | Diagonal with $\pm 1, 0$ | Sylvester's Law |

**Capstone proofs (select 2–3 for full reconstruction):**

- Jordan form: nilpotent case
- Real Spectral Theorem
- Sylvester's Law of Inertia
- SVD from Spectral Theorem applied to $A^T A$

**Transition lecture — where this course leads:**

| Field | Linear algebra content used |
|---|---|
| **Real Analysis / Functional Analysis** | Operators on Hilbert spaces; spectral theory in infinite dimensions |
| **Differential Equations** | Jordan form for matrix exponentials; eigenfunction expansions |
| **Optimization** | Positive definiteness; SVD; least squares; Hessian analysis |
| **Machine Learning** | PCA via SVD; kernel methods via inner products; spectral graph theory |
| **Quantum Mechanics** | Self-adjoint operators; spectral decomposition; unitary evolution |
| **Abstract Algebra** | Module theory as the algebraic home of Jordan form |

**Final message:** The question was always classification. The answer is: operators are classified by their invariant subspace structure, and the right basis makes that structure visible.

---

## Required Theorem Spine

### Polynomial Structure Block

| Theorem | Status |
|---|---|
| Minimal polynomial exists and is unique | Must prove |
| Every annihilating polynomial is divisible by $m_T$ | Must prove |
| Cayley–Hamilton | Must prove |
| Diagonalizability via minimal polynomial | Must prove |
| Primary decomposition theorem | Must prove |

### Canonical Forms Block

| Theorem | Status |
|---|---|
| Triangularization over $\mathbb{C}$ | Must prove |
| Generalized eigenspace decomposition | Must prove |
| Jordan canonical form (existence + uniqueness) | Must prove (nilpotent case; full case with proof sketch) |
| Sylvester's Law of Inertia | Must prove |

### Spectral and Geometric Block

| Theorem | Status |
|---|---|
| Real Spectral Theorem | Must prove |
| Complex Spectral Theorem (normal operators) | Must prove |
| SVD existence | Must prove |
| Eckart–Young best approximation | Must state; proof as enrichment |
| Pseudoinverse via SVD | Must prove |
| Adjoint existence and uniqueness | Must prove |

---

## Problem Set Structure

**A. Definition and construction** — Compute minimal polynomials; identify invariant subspaces; find generalized eigenvectors.

**B. Structural theorem problems** — Prove a given operator is/is not diagonalizable using the minimal polynomial criterion; classify a bilinear form by its signature; find the SVD of a given matrix.

**C. Canonical form problems** — Find Jordan form and Jordan basis for explicit operators; verify Cayley–Hamilton for specific examples; diagonalize self-adjoint operators orthogonally.

**D. Counterexamples** — Real matrix with no real eigenvalues (triangularizable but not diagonalizable over $\mathbb{R}$); two matrices with same characteristic polynomial but different Jordan forms; indefinite form that is neither positive nor negative semidefinite.

**E. Synthesis problems** — Connect SVD to the Spectral Theorem; explain why the pseudoinverse gives the minimum-norm least squares solution; interpret Jordan form in terms of the minimal polynomial.

> Counterexamples are not optional. Students who cannot produce them do not understand the hypotheses.

---

## Assessment Structure

### Midterm (≈ Week 8)

Covers: minimal polynomial; Cayley–Hamilton; diagonalizability criterion; primary decomposition; triangularization; Jordan form (nilpotent case and full statement).

- 2 major theorem proofs
- 2 Jordan form / canonical form computation problems with justification
- 1 counterexample problem
- 1 synthesis problem connecting minimal polynomial to operator structure

### Final Exam

Emphasis on: spectral theory; bilinear forms; SVD; pseudoinverse; adjoint; full operator classification.

- 3 major proof problems (at least one from spectral block)
- 2 "state precisely and apply" problems
- 2 counterexample / diagnosis problems
- 1 synthesis question connecting two or more major blocks

---

## Exit Competencies

By the end of this semester, students should be able to:

- Compute and use the minimal polynomial of an operator
- State and prove Cayley–Hamilton
- Find the Jordan canonical form of an operator and explain uniqueness
- Classify a real symmetric bilinear form by its signature
- Prove the real Spectral Theorem
- Compute the SVD of a matrix and use it to find the pseudoinverse
- Define the adjoint and prove its basic properties
- Explain why Jordan form, Spectral Theorem, and SVD are all answers to the same underlying question
- Read a graduate functional analysis or algebra text without significant difficulty at the linear algebra level

---

> **The unifying principle of the course:**
> Linear algebra is the art of choosing the right basis to reveal structure.
> Every canonical form theorem is a theorem about which basis is "right" for a given type of operator.
