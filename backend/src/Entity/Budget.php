<?php

namespace App\Entity;

use App\Enum\BudgetMethod;
use App\Repository\BudgetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BudgetRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ORM\Table(name: 'budget')]
#[ORM\UniqueConstraint(
    name: 'UNIQ_BUDGET_USER_PERIOD',
    columns: ['user_id', 'year', 'month']
)]
class Budget
{
    // ========================================
    // PROPERTIES
    // ========================================

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Assert\Range(min: 1, max: 12)]
    private ?int $month = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Assert\Range(min: 2000, max: 2100)]
    private ?int $year = null;

    #[ORM\Column(
        type: 'string',
        length: 30,
        enumType: BudgetMethod::class
    )]
    #[Assert\NotNull]
    private ?BudgetMethod $method = null;

    // ========================================
    // DATES
    // ========================================

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    // ========================================
    // RELATIONSHIPS
    // ========================================

    #[ORM\ManyToOne(inversedBy: 'budgets')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull]
    private ?User $user = null;

    /**
     * @var Collection<int, BudgetAllocation>
     */
    #[ORM\OneToMany(targetEntity: BudgetAllocation::class, mappedBy: 'budget')]
    private Collection $budgetAllocations;

    // ========================================
    // CONSTRUCTOR
    // ========================================

    public function __construct()
    {
        $this->budgetAllocations = new ArrayCollection();
    }

    // ========================================
    // GETTERS & SETTERS
    // ========================================

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMonth(): ?int
    {
        return $this->month;
    }

    public function setMonth(int $month): static
    {
        $this->month = $month;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getMethod(): ?BudgetMethod
    {
        return $this->method;
    }

    public function setMethod(BudgetMethod $method): static
    {
        $this->method = $method;

        return $this;
    }

    // ========================================
    // DATES
    // ========================================

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    // ========================================
    // USER
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
    // ALLOCATIONS
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
            $budgetAllocation->setBudget($this);
        }

        return $this;
    }

    public function removeBudgetAllocation(BudgetAllocation $budgetAllocation): static
    {
        if ($this->budgetAllocations->removeElement($budgetAllocation)) {
            if ($budgetAllocation->getBudget() === $this) {
                $budgetAllocation->setBudget(null);
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