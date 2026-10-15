<?php

namespace App\Repository;

use App\Entity\Category;
use App\Entity\User;
use App\Enum\TransactionType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 */
final class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    // ========================================
    // GET ALL AVAILABLE CATEGORIES
    // ========================================

    /**
     * @return Category[]
     */
    public function findAllAvailableByUser(User $user): array
    {
        return $this->createQueryBuilder('c')
            ->where('c.deletedAt IS NULL')
            ->andWhere(
                '(c.isSystem = true OR c.user = :user)'
            )
            ->setParameter('user', $user)
            ->orderBy('c.type', 'ASC')
            ->addOrderBy('c.name', 'ASC')
            ->getQuery()
            ->getResult();
    }

    // ========================================
    // GET ONE AVAILABLE CATEGORY
    // ========================================

    public function findOneAvailableByIdAndUser(
        int $id,
        User $user
    ): ?Category {
        return $this->createQueryBuilder('c')
            ->where('c.id = :id')
            ->andWhere('c.deletedAt IS NULL')
            ->andWhere(
                '(c.isSystem = true OR c.user = :user)'
            )
            ->setParameter('id', $id)
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // ========================================
    // GET ONE PERSONAL CATEGORY
    // ========================================

    public function findOnePersonalByIdAndUser(
        int $id,
        User $user
    ): ?Category {
        return $this->createQueryBuilder('c')
            ->where('c.id = :id')
            ->andWhere('c.user = :user')
            ->andWhere('c.isSystem = false')
            ->andWhere('c.deletedAt IS NULL')
            ->setParameter('id', $id)
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult();
    }

    // ========================================
    // CHECK DUPLICATE CODE
    // ========================================

    public function findOneByCodeAndUser(
        string $code,
        User $user,
        ?int $excludeId = null
    ): ?Category {
        $qb = $this->createQueryBuilder('c')
            ->where('c.code = :code')
            ->andWhere('c.deletedAt IS NULL')
            ->andWhere(
                '(c.isSystem = true OR c.user = :user)'
            )
            ->setParameter('code', $code)
            ->setParameter('user', $user);

        if ($excludeId !== null) {
            $qb->andWhere('c.id != :excludeId')
                ->setParameter('excludeId', $excludeId);
        }

        return $qb->getQuery()->getOneOrNullResult();
    }

    // ========================================
    // FIND AVAILABLE FOR BUDGET ALLOCATION
    // ========================================

    public function findOneAvailableForBudgetAllocation(
        int $categoryId,
        User $user
    ): ?Category {
        return $this->createQueryBuilder('c')
            ->where('c.id = :categoryId')
            ->andWhere('c.deletedAt IS NULL')
            ->andWhere('c.type = :type')
            ->andWhere(
                '(c.isSystem = true OR c.user = :user)'
            )
            ->setParameter('categoryId', $categoryId)
            ->setParameter('type', TransactionType::EXPENSE)
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult();
    }
}