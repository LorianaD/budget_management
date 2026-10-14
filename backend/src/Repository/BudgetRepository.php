<?php

namespace App\Repository;

use App\Entity\Budget;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Budget>
 */
class BudgetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Budget::class);
    }

    /**
    * @return Budget[]
    */
    public function findAllBudgetByUser(User $user): array
    {
        return $this->createQueryBuilder('b')
            ->leftJoin('b.budgetAllocations', 'ba')
            ->addSelect('ba')
            ->where('b.user = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    public function findBudgetsByUserAndYear(User $user, int $year): array
    {
        return $this->createQueryBuilder('b')
            ->where('b.user = :user')
            ->andWhere('b.year = :year')
            ->setParameter('user', $user)
            ->setParameter('year', $year)
            ->getQuery()
            ->getResult();
    }

    public function findOneByUserAndPeriod(User $user, int $year, int $month): ?Budget
    {
        return $this->createQueryBuilder('b')
            ->where('b.user = :user')
            ->andWhere('b.year = :year')
            ->andWhere('b.month = :month')
            ->setParameter('user', $user)
            ->setParameter('year', $year)
            ->setParameter('month', $month)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneByIdAndUser(int $id, User $user): ?Budget
    {
        return $this->createQueryBuilder('b')
            ->leftJoin('b.budgetAllocations', 'ba')
            ->addSelect('ba')
            ->where('b.id = :id')
            ->andWhere('b.user = :user')
            ->setParameter('id', $id)
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
