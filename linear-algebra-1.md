# Linear Algebra I: Finite-Dimensional Theory

**15-Week Rigorous Proof-Based Sequence — Semester 1**

> **Course philosophy:** A linear transformation is the real object. A matrix is only its coordinate representation. The course must constantly move between abstract, coordinate, computational, and structural views — students who only know coordinates do not know linear algebra.

**Primary text:** Axler, *Linear Algebra Done Right* | **Supplement:** Hoffman & Kunze, *Linear Algebra* | **Reference:** Friedberg, Insel & Spence

---

## Semester Goal

Build the finite-dimensional core carefully enough that the student can write proofs, reason abstractly about vector spaces, and understand matrices as representations of linear maps. The conceptual spine is:

$$\text{systems} \to \text{subspaces} \to \text{basis/dimension} \to \text{coordinates} \to \text{linear maps} \to \text{matrices} \to \text{eigenstructure} \to \text{orthogonal simplification}$$

---

## Week 1 — Systems of Linear Equations and Why Linearity Matters

**Topics**

- Linear equations and systems
- Gaussian elimination; row echelon form and RREF
- Existence and uniqueness of solutions
- Homogeneous vs nonhomogeneous systems
- Pivots and free variables

**Proof Targets**

- Why elementary row operations preserve solution sets
- Why RREF is unique
- Characterize consistency in terms of pivots

**Proof Skill Focus:** Precise algebraic reasoning; distinguishing algorithm from theorem.

**Why this week matters:** Solving a system is not the final subject — it is the entry point into structure. Students see the first repeated pattern: equations encode structure, and elimination reveals hidden dependence.

---

## Week 2 — Vectors, Linear Combinations, Span, and Subspaces

**Topics**

- Vectors in $\mathbb{R}^n$; linear combinations; span
- Subspaces: definition and examples
- Column space of a matrix as a subspace
- Null space as a subspace (first encounter)

**Proof Targets**

- Prove a subset is a subspace iff it is closed under addition and scalar multiplication
- Show solution sets of homogeneous systems are subspaces
- Show spans are subspaces

**Proof Skill Focus:** Writing subspace proofs cleanly; constructing examples and nonexamples.

**Why this week matters:** The first abstract step — students stop treating vectors as arrows only and begin treating them as elements of algebraic structure.

---

## Week 3 — Linear Independence, Basis, and Dimension

**Topics**

- Linear independence and dependence relations
- Basis: minimal generating set = maximal independent set
- Dimension
- Coordinates relative to a basis

**Proof Targets**

- Every finite spanning set contains a basis
- Every linearly independent set can be extended to a basis
- Any two bases of a finite-dimensional vector space have the same number of elements

**Proof Skill Focus:** Minimality/maximality proofs; exchange arguments; dimension counting.

**Why this week matters:** The first major structure theorem of the subject. The equivalence "minimal spanning = maximal independent" is central to everything that follows.

---

## Week 4 — Rank, Nullity, and the Structure of Linear Systems

**Topics**

- Null space and column space (formal treatment)
- Rank and nullity
- Free variables and solution set dimension
- Rank–Nullity Theorem: $\dim(\ker T) + \dim(\operatorname{im} T) = \dim(V)$

**Proof Targets**

- Null space and image are subspaces
- Rank–Nullity Theorem
- Interpret consistency and uniqueness via rank

**Proof Skill Focus:** Constructing bases adapted to kernel/image; translating algebraic computation into dimension statements.

**Why this week matters:** Rank–Nullity is the linear algebra analog of FTC in importance. It explains the internal bookkeeping of every linear map — what gets collapsed (kernel) and what gets produced (image) must account for the full dimension.

---

## Week 5 — Abstract Vector Spaces

**Topics**

- General vector spaces over a field $F$
- Canonical examples: $P_n(F)$, $M_{m \times n}(F)$, $F^\infty$, function spaces
- Subspaces in abstract settings
- Spans and bases in nontrivial examples

**Proof Targets**

- Verify vector space axioms in nontrivial examples
- Prove subspace characterizations in abstract spaces
- Construct bases in $P_n$, $M_{m \times n}$, etc.

**Proof Skill Focus:** Axiom-based thinking; comfort reasoning outside geometric intuition.

**Why this week matters:** Without this week, the course stays computational. With it, it becomes mathematics. Students must detach from $\mathbb{R}^n$ as the only vector space.

---

## Week 6 — Linear Transformations as the Primary Objects

**Topics**

- Definition of linear transformation; kernel and image
- Injective / surjective / bijective linear maps
- Isomorphisms between vector spaces
- First examples: zero map, identity, differentiation, projection

**Proof Targets**

- Kernel and image are subspaces
- Characterize injectivity by trivial kernel
- In equal finite dimensions: injective $\Leftrightarrow$ surjective $\Leftrightarrow$ bijective

**Proof Skill Focus:** Function-level reasoning; proof via dimension; distinguishing map from matrix.

**Why this week matters:** Linear maps are the true morphisms of linear algebra. This week explicitly declares that maps come first, matrices come after.

---

## Week 7 — Matrices as Representations of Linear Maps

**Topics**

- Matrix of a linear map relative to chosen bases
- Coordinate vectors
- Matrix multiplication as function composition
- Introduction to change of basis

**Proof Targets**

- Every linear map between finite-dimensional spaces has a unique matrix representation relative to given bases
- Matrix multiplication corresponds to composition
- The matrix depends on the chosen bases — changing bases changes the matrix

**Proof Skill Focus:** Moving between abstract and coordinate descriptions; reading matrices conceptually, not just computationally.

**Why this week matters:** This unifies the abstract and computational halves of the course. Students see that the same matrix can represent many different linear maps depending on the choice of basis.

---

## Week 8 — Isomorphism, Coordinates, and Change of Basis

**Topics**

- Coordinate isomorphism $V \cong F^n$
- Change-of-basis matrices
- Similarity: same operator in different coordinate systems
- Equivalence vs similarity of matrices

**Proof Targets**

- The coordinate map is an isomorphism
- Derive the change-of-basis formula
- Similar matrices represent the same operator in different bases; similarity is an equivalence relation

**Proof Skill Focus:** Commutative-diagram style reasoning; understanding invariants vs representations.

**Why this week matters:** "Basis dependence" becomes mathematically precise. Similarity is the first serious equivalence relation on matrices — and students see that the right question is not "what is the matrix?" but "what is the operator up to similarity?"

---

## Week 9 — Determinants: Meaning Before Formulas

**Topics**

- Determinant as alternating multilinear form (conceptual approach)
- Effect of elementary row operations on the determinant
- Determinant and invertibility
- Multiplicativity: $\det(AB) = \det(A)\det(B)$
- Geometric interpretation as signed volume scaling

**Proof Targets**

- Determinant changes under row operations as expected
- $A$ is invertible iff $\det A \neq 0$
- $\det(AB) = \det(A)\det(B)$

**Proof Skill Focus:** Functional characterization before formula; structural use of the determinant rather than cofactor expansion recipes.

**Why this week matters:** Determinants are over-taught computationally and under-taught conceptually. This week corrects that. The determinant detects invertibility, measures scaling, and behaves multiplicatively — these are the facts that matter.

---

## Week 10 — Eigenvalues and Eigenvectors

**Topics**

- Eigenvalues and eigenvectors: definition
- Characteristic polynomial
- Eigenspaces as subspaces
- Computing eigenvalues and eigenvectors in examples

**Proof Targets**

- Eigenspaces are subspaces
- Eigenvectors corresponding to distinct eigenvalues are linearly independent
- Eigenvalues are roots of the characteristic polynomial

**Proof Skill Focus:** Combining algebraic and structural reasoning; reading the internal geometry of an operator through its invariant directions.

**Why this week matters:** Eigenvectors are the directions preserved by a transformation. This is the beginning of the internal structure theory — the question of what a linear operator really *does* to its space.

---

## Week 11 — Diagonalization and When It Is Possible

**Topics**

- Diagonalizable operators and matrices
- Algebraic vs geometric multiplicity
- Basis of eigenvectors as the diagonalization condition
- Sufficient conditions and failure cases

**Main Theorem:** A matrix is diagonalizable iff there exists a basis of eigenvectors, iff the minimal polynomial has no repeated roots.

**Proof Targets**

- Prove the diagonalization criterion (eigenbasis iff diagonalizable)
- Prove distinct eigenvalues is sufficient
- Analyze failure: $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ is not diagonalizable

**Proof Skill Focus:** Characterizing existence of special bases; distinguishing "has eigenvalues" from "is diagonalizable."

**Why this week matters:** The first serious example of choosing a basis to simplify structure. Failure of diagonalization points directly toward Jordan form in Semester 2.

---

## Week 12 — Dual Spaces and Linear Functionals

**Topics**

- Dual space $V^*$ and linear functionals
- Dual basis
- Transpose as the coordinate form of the dual map
- Double dual and natural isomorphism $V \cong V^{**}$

**Proof Targets**

- Dual basis exists and is unique
- $\dim V^* = \dim V$
- The natural map $V \to V^{**}$ is an isomorphism (finite-dimensional case)

**Proof Skill Focus:** Abstract algebraic construction; understanding that linear algebra has a hidden symmetry at the level of functions on spaces.

**Why this week matters:** Duality deepens the student's understanding beyond matrices. It previews the adjoint construction in Semester 2 and prepares for functional analysis.

---

## Week 13 — Inner Products and Orthogonality

**Topics**

- Inner products: real and complex cases
- Norm induced by inner product
- Orthogonality and orthogonal complements
- Cauchy–Schwarz and triangle inequality

**Proof Targets**

- Cauchy–Schwarz inequality
- Triangle inequality from inner product
- Basic properties of orthogonal complements: $W \cap W^\perp = \{0\}$, $\dim W + \dim W^\perp = \dim V$

**Proof Skill Focus:** Elegant inequality proofs; extracting geometry from algebraic structure.

**Why this week matters:** This moves from pure linear structure to geometry inside vector spaces. It sets up projection, least squares, and the full spectral theory of Semester 2.

---

## Week 14 — Orthonormal Bases, Gram–Schmidt, and Projections

**Topics**

- Orthonormal sets and bases
- Gram–Schmidt process
- Orthogonal projection onto a subspace
- Least squares: geometric preview

**Main Theorem:** Every finite-dimensional inner product space has an orthonormal basis.

**Proof Targets**

- Gram–Schmidt produces an orthonormal basis from any linearly independent set
- Orthogonal projection theorem: unique decomposition $v = w + w^\perp$
- Derive least squares normal equations geometrically

**Proof Skill Focus:** Constructive existence proofs; using orthogonality to simplify coordinates.

**Why this week matters:** One of the most useful "special basis" constructions in the subject. Orthonormal bases are the right tool whenever geometry inside the space matters.

---

## Week 15 — Synthesis and Transition to Linear Algebra II

**Purpose:** No new content. Consolidate the entire finite-dimensional skeleton.

**What to synthesize:**

$$\text{systems} \to \text{subspaces} \to \text{basis/dimension} \to \text{coordinates} \to \text{matrices} \to \text{eigenstructure} \to \text{orthogonal simplification}$$

**Capstone proofs (select 2–3 for full reconstruction):**

- Rank–Nullity Theorem
- Any two bases of a finite-dimensional space have the same size
- Eigenvectors for distinct eigenvalues are linearly independent
- Gram–Schmidt and orthogonal projection theorem

**Final message:** Linear algebra is the art of choosing the right basis to reveal structure.

---

## Required Theorem Spine

| Domain | Theorems |
|---|---|
| **Subspaces** | Subspace tests; span is a subspace; intersection of subspaces is a subspace |
| **Bases** | Every spanning set contains a basis; every independent set extends to a basis; any two bases have same cardinality |
| **Maps** | Rank–Nullity; injective $\Leftrightarrow$ surjective in equal finite dimensions |
| **Matrices** | Matrix of a composition is the product; similar matrices represent the same operator |
| **Eigentheory** | Distinct-eigenvalue eigenvectors are independent; diagonalization criterion |
| **Inner products** | Cauchy–Schwarz; Gram–Schmidt; orthogonal projection theorem |

---

## Problem Set Structure

**A. Definition proofs** — Show a set is/is not a subspace; a map is/is not linear; a set is independent/dependent.

**B. Structural theorem problems** — Prove dimension statements; construct bases with desired properties; prove map equivalences via kernel/image.

**C. Coordinate translation** — Find a matrix relative to nonstandard bases; change basis and compare representations.

**D. Counterexamples** — Find a non-diagonalizable linear map; show converse of a theorem fails; construct subspaces with nontrivial intersection patterns.

**E. Interpretation problems** — Explain what rank means geometrically/algebraically; explain what similarity preserves; explain what orthogonal projection is really doing.

> If homework is only matrix arithmetic, the course is failed by design.

---

*Semester 2 continues with spectral theory, canonical forms, bilinear forms, SVD, and the full operator classification program.*
