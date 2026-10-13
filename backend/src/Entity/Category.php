<?php

namespace App\Entity;

use App\Enum\TransactionType;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Category
{
    // ========================================
    // PROPERTIES
    // ========================================

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    private ?string $code = null;

    #[ORM\Column(type: 'string', length: 20, enumType: TransactionType::class)]
    #[Assert\NotNull]
    private ?TransactionType $type = null;

    #[ORM\Column]
    private bool $isSystem = false;

    // ========================================
    // DATES
    // ========================================

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $deletedAt = null;

    // ========================================
    // RELATIONSHIPS
    // ========================================

    #[ORM\ManyToOne(inversedBy: 'categories')]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'children')]
    private ?self $parent = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'parent')]
    private Collection $children;

    /**
     * @var Collection<int, Transaction>
     */
    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Transaction::class)]
    private Collection $transactions;

    /**
     * @var Collection<int, BudgetAllocation>
     */
    #[ORM\OneToMany(targetEntity: BudgetAllocation::class, mappedBy: 'category')]
    private Collection $budgetAllocations;

    // ========================================
    // CONSTRUCTOR
    // ========================================

    public function __construct()
    {
        $this->children = new ArrayCollection();
        $this->transactions = new ArrayCollection();
        $this->budgetAllocations = new ArrayCollection();
    }

    // ========================================
    // GETTERS & SETTERS
    // ========================================

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getType(): ?TransactionType
    {
        return $this->type;
    }

    public function setType(TransactionType $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function isSystem(): bool
    {
        return $this->isSystem;
    }

    public function setIsSystem(bool $isSystem): static
    {
        $this->isSystem = $isSystem;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeImmutable $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    // ========================================
    // USER RELATIONSHIP
    // ========================================

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    // ========================================
    // CATEGORY HIERARCHY
    // ========================================

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): static
    {
        $current = $parent;

        while ($current !== null) {
            if ($current === $this) {
                throw new \InvalidArgumentException(
                    'A category cannot be its own ancestor.'
                );
            }

            $current = $current->getParent();
        }

        $this->parent = $parent;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function addChild(self $child): static
    {
        if (!$this->children->contains($child)) {
            $child->setParent($this);
            $this->children->add($child);
        }

        return $this;
    }

    public function removeChild(self $child): static
    {
        if ($this->children->removeElement($child)) {
            if ($child->getParent() === $this) {
                $child->setParent(null);
            }
        }

        return $this;
    }

    // ========================================
    // TRANSACTIONS
    // ========================================

    /**
     * @return Collection<int, Transaction>
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): static
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions->add($transaction);
            $transaction->setCategory($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): static
    {
        if ($this->transactions->removeElement($transaction)) {
            if ($transaction->getCategory() === $this) {
                $transaction->setCategory(null);
            }
        }

        return $this;
    }

    // ========================================
    // BUDGETS ALLOCATION
    // ========================================

    /**
     * @return Collection<int, BudgetAllocation>
     */
    public function getBudgetAllocations(): Collection
    {
        return $this->budgetAllocations;
    }

    public function addBudgetAllocation(BudgetAllocation $budgetAllocation): static
    {
        if (!$this->budgetAllocations->contains($budgetAllocation)) {
            $this->budgetAllocations->add($budgetAllocation);
            $budgetAllocation->setCategory($this);
        }

        return $this;
    }

    public function removeBudgetAllocation(BudgetAllocation $budgetAllocation): static
    {
        if ($this->budgetAllocations->removeElement($budgetAllocation)) {
            // set the owning side to null (unless already changed)
            if ($budgetAllocation->getCategory() === $this) {
                $budgetAllocation->setCategory(null);
            }
        }

        return $this;
    }

    // ========================================
    // LIFECYCLE CALLBACKS
    // ========================================

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $now = new \DateTimeImmutable();

        $this->createdAt = $now;
        $this->updatedAt = $now;
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }
}