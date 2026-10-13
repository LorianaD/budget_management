<?php

namespace App\Entity;

use App\Repository\BudgetAllocationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BudgetAllocationRepository::class)]
#[ORM\Table(name: 'budget_allocation')]
#[ORM\UniqueConstraint(
    name: 'UNIQ_BUDGET_ALLOCATION_CATEGORY',
    columns: ['budget_id', 'category_id']
)]
class BudgetAllocation
{
    // ========================================
    // PROPERTIES
    // ========================================

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(
        type: Types::DECIMAL,
        precision: 12,
        scale: 2
    )]
    #[Assert\NotNull]
    #[Assert\PositiveOrZero]
    private ?string $plannedAmount = null;

    // ========================================
    // RELATIONSHIPS
    // ========================================

    #[ORM\ManyToOne(inversedBy: 'budgetAllocations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull]
    private ?Budget $budget = null;

    #[ORM\ManyToOne(inversedBy: 'budgetAllocations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull]
    private ?Category $category = null;

    // ========================================
    // GETTERS & SETTERS
    // ========================================

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlannedAmount(): ?string
    {
        return $this->plannedAmount;
    }

    public function setPlannedAmount(string $plannedAmount): static
    {
        $this->plannedAmount = $plannedAmount;

        return $this;
    }

    // ========================================
    // BUDGET
    // ========================================

    public function getBudget(): ?Budget
    {
        return $this->budget;
    }

    public function setBudget(?Budget $budget): static
    {
        $this->budget = $budget;

        return $this;
    }

    // ========================================
    // CATEGORY
    // ========================================

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }
}