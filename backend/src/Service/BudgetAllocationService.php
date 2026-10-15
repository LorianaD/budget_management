<?php

namespace App\Service;

use App\Dto\BudgetAllocation\CreateBudgetAllocationDto;
use App\Dto\BudgetAllocation\UpdateBudgetAllocationDto;
use App\Entity\BudgetAllocation;
use App\Entity\User;
use App\Repository\BudgetAllocationRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class BudgetAllocationService
{
    public function __construct(
        private readonly BudgetAllocationRepository $budgetAllocationRepository,
        private readonly CategoryRepository $categoryRepository,
        private readonly BudgetService $budgetService,
        private readonly EntityManagerInterface $em,
    ) {}

    // ========================================
    // CREATE
    // ========================================

    public function create(
        int $budgetId,
        CreateBudgetAllocationDto $dto,
        User $user
    ): BudgetAllocation {
        $budget = $this->budgetService->getOneBudget($budgetId, $user);

        $category = $this->categoryRepository
            ->findOneAvailableForBudgetAllocation(
                $dto->categoryId,
                $user
            );

        if ($category === null) {
            throw new NotFoundHttpException(
                'Catégorie introuvable ou indisponible pour ce budget.'
            );
        }

        // TODO : Vérifier que la catégorie est accessible à l'utilisateur
        // et qu'elle correspond à une catégorie de dépense.

        $existingAllocation = $this->budgetAllocationRepository
            ->findOneByBudgetAndCategory(
                $budgetId,
                $dto->categoryId
            );

        if ($existingAllocation !== null) {
            throw new ConflictHttpException(
                'Une allocation existe déjà pour cette catégorie.'
            );
        }

        $budgetAllocation = new BudgetAllocation();

        $budgetAllocation
            ->setBudget($budget)
            ->setCategory($category)
            ->setPlannedAmount($dto->plannedAmount);

        $this->em->persist($budgetAllocation);
        $this->em->flush();

        return $budgetAllocation;
    }

    // ========================================
    // GET ALL
    // ========================================

    /**
     * @return BudgetAllocation[]
     */
    public function getAllBudgetAllocation(
        int $budgetId,
        User $user
    ): array {
        $this->budgetService->getOneBudget($budgetId, $user);

        return $this->budgetAllocationRepository
            ->findAllByBudgetAndUser($budgetId, $user);
    }

    // ========================================
    // GET ONE
    // ========================================

    public function getOneBudgetAllocation(
        int $budgetId,
        int $id,
        User $user
    ): BudgetAllocation {
        $budgetAllocation = $this->budgetAllocationRepository
            ->findOneByBudgetAndIdAndUser(
                $budgetId,
                $id,
                $user
            );

        if ($budgetAllocation === null) {
            throw new NotFoundHttpException(
                'Allocation budgétaire introuvable.'
            );
        }

        return $budgetAllocation;
    }

    // ========================================
    // UPDATE
    // ========================================

    public function update(
        int $budgetId,
        int $id,
        UpdateBudgetAllocationDto $dto,
        User $user
    ): BudgetAllocation {
        $budgetAllocation = $this->getOneBudgetAllocation(
            $budgetId,
            $id,
            $user
        );

        if ($dto->plannedAmount !== null) {
            $budgetAllocation->setPlannedAmount($dto->plannedAmount);
        }

        $this->em->flush();

        return $budgetAllocation;
    }

    // ========================================
    // DELETE
    // ========================================

    public function delete(
        int $budgetId,
        int $id,
        User $user
    ): void {
        $budgetAllocation = $this->getOneBudgetAllocation(
            $budgetId,
            $id,
            $user
        );

        $this->em->remove($budgetAllocation);
        $this->em->flush();
    }
}