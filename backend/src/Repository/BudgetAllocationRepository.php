<?php

namespace App\Repository;

use App\Entity\BudgetAllocation;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BudgetAllocation>
 */
final class BudgetAllocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BudgetAllocation::class);
    }

    // ========================================
    // GET ALL BY BUDGET AND USER
    // ========================================

    /**
     * @return BudgetAllocation[]
     */
    public function findAllByBudgetAndUser(
        int $budgetId,
        User $user
    ): array {
        return $this->createQueryBuilder('ba')
            ->innerJoin('ba.budget', 'b')
            ->addSelect('b')
            ->innerJoin('ba.category', 'c')
            ->addSelect('c')
            ->where('b.id = :budgetId')
            ->andWhere('b.user = :user')
            ->setParameter('budgetId', $budgetId)
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    // ========================================
    // GET ONE BY BUDGET, ID AND USER
    // ========================================

    public function findOneByBudgetAndIdAndUser(
        int $budgetId,
        int $id,
        User $user
    ): ?BudgetAllocation {
        return $this->createQueryBuilder('ba')
            ->innerJoin('ba.budget', 'b')
            ->addSelect('b')
            ->innerJoin('ba.category', 'c')
            ->addSelect('c')
            ->where('ba.id = :id')
            ->andWhere('b.id = :budgetId')
            ->andWhere('b.user = :user')
            ->setParameter('id', $id)
            ->setParameter('budgetId', $budgetId)
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // ========================================
    // GET ONE BY BUDGET AND CATEGORY
    // ========================================

    public function findOneByBudgetAndCategory(
        int $budgetId,
        int $categoryId
    ): ?BudgetAllocation {
        return $this->createQueryBuilder('ba')
            ->where('IDENTITY(ba.budget) = :budgetId')
            ->andWhere('IDENTITY(ba.category) = :categoryId')
            ->setParameter('budgetId', $budgetId)
            ->setParameter('categoryId', $categoryId)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
