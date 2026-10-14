<?php

namespace App\Service;

use App\Dto\Budget\CreateBudgetDto;
use App\Dto\Budget\UpdateBudgetDto;
use App\Entity\Budget;
use App\Entity\User;
use App\Repository\BudgetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class BudgetService
{
    public function __construct(
        private readonly BudgetRepository $budgetRepository,
        private readonly EntityManagerInterface $em,
    ) {}

    public function create(CreateBudgetDto $dto, User $user): Budget
    {
        $existingBudget = $this->budgetRepository->findOneByUserAndPeriod(
            $user,
            $dto->year,
            $dto->month
        );

        if ($existingBudget !== null) {
            throw new ConflictHttpException(
                'Un budget existe déjà pour cette période.'
            );
        }

        $budget = new Budget();

        $budget
            ->setMonth($dto->month)
            ->setYear($dto->year)
            ->setMethod($dto->method)
            ->setUser($user);

        $this->em->persist($budget);
        $this->em->flush();

        return $budget;
    }

    /**
     * @return Budget[]
     */
    public function getAllBudget(User $user): array
    {
        return $this->budgetRepository->findAllBudgetByUser($user);
    }

    public function getOneBudget(int $id, User $user): Budget
    {
        $budget = $this->budgetRepository->findOneByIdAndUser(
            $id,
            $user
        );

        if ($budget === null) {
            throw new NotFoundHttpException(
                'Budget introuvable.'
            );
        }

        return $budget;
    }

    public function update(int $id, UpdateBudgetDto $dto, User $user): Budget
    {
        $budget = $this->getOneBudget($id, $user);

        $month = $dto->month ?? $budget->getMonth();
        $year = $dto->year ?? $budget->getYear();

        if (
            $month !== $budget->getMonth() ||
            $year !== $budget->getYear()
        ) {
            $existingBudget = $this->budgetRepository->findOneByUserAndPeriod(
                $user,
                $year,
                $month
            );

            if ($existingBudget !== null && $existingBudget->getId() !== $id) {
                throw new ConflictHttpException(
                    'Un budget existe déjà pour cette période.'
                );
            }
        }

        if ($dto->month !== null) {
            $budget->setMonth($dto->month);
        }

        if ($dto->year !== null) {
            $budget->setYear($dto->year);
        }

        if ($dto->method !== null) {
            $budget->setMethod($dto->method);
        }

        $this->em->flush();

        return $budget;
    }

    public function delete(int $id, User $user): void
    {
        $budget = $this->getOneBudget($id, $user);

        $this->em->remove($budget);
        $this->em->flush();
    }
}