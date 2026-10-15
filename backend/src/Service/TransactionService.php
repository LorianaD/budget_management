<?php

namespace App\Service;

use App\Dto\Transaction\CreateTransactionDto;
use App\Dto\Transaction\UpdateTransactionDto;
use App\Entity\Category;
use App\Entity\Transaction;
use App\Entity\User;
use App\Enum\TransactionStatus;
use App\Enum\TransactionType;
use App\Repository\CategoryRepository;
use App\Repository\TransactionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class TransactionService
{
    public function __construct(
        private readonly TransactionRepository $transactionRepository,
        private readonly CategoryRepository $categoryRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
    }

    // ========================================
    // CREATE TRANSACTION
    // ========================================

    /**
     * Create a transaction for the authenticated user.
     */
    public function create(
        CreateTransactionDto $dto,
        User $user
    ): Transaction {
        $category = $this->getCategory(
            $dto->categoryId,
            $user,
            $dto->type
        );

        $transaction = new Transaction();

        $transaction
            ->setLabel($dto->label)
            ->setAmount($dto->amount)
            ->setType($dto->type)
            ->setCategory($category)
            ->setUser($user)
            ->setPlannedDate($dto->plannedDate)
            ->setDescription($dto->description);

        $this->entityManager->persist($transaction);
        $this->entityManager->flush();

        return $transaction;
    }

    // ========================================
    // GET ALL TRANSACTIONS
    // ========================================

    /**
     * Get all transactions belonging to the user.
     *
     * @return Transaction[]
     */
    public function getAll(User $user): array
    {
        return $this->transactionRepository
            ->findAllByUser($user);
    }

    // ========================================
    // GET ONE TRANSACTION
    // ========================================

    /**
     * Get a transaction belonging to the user.
     */
    public function getOne(
        int $id,
        User $user
    ): Transaction {
        $transaction = $this->transactionRepository
            ->findOneByIdAndUser($id, $user);

        if (!$transaction) {
            throw new NotFoundHttpException(
                'Transaction introuvable.'
            );
        }

        return $transaction;
    }

    // ========================================
    // GET TRANSACTIONS BY PERIOD
    // ========================================

    /**
     * Get transactions for a specific month and year.
     *
     * @return Transaction[]
     */
    public function getByPeriod(
        User $user,
        int $year,
        int $month
    ): array {
        return $this->transactionRepository
            ->findByUserAndPeriod($user, $year, $month);
    }

    // ========================================
    // GET TRANSACTIONS BY TYPE
    // ========================================

    /**
     * Get transactions filtered by income or expense type.
     *
     * @return Transaction[]
     */
    public function getByType(
        User $user,
        TransactionType $type
    ): array {
        return $this->transactionRepository
            ->findByUserAndType($user, $type);
    }

    // ========================================
    // UPDATE TRANSACTION
    // ========================================

    /**
     * Update a transaction belonging to the user.
     */
    public function update(
        int $id,
        UpdateTransactionDto $dto,
        User $user
    ): Transaction {
        $transaction = $this->getOne($id, $user);

        if ($dto->label !== null) {
            $transaction->setLabel($dto->label);
        }

        if ($dto->amount !== null) {
            $transaction->setAmount($dto->amount);
        }

        // Validate category compatibility when type or category changes
        if ($dto->type !== null || $dto->categoryId !== null) {
            $type = $dto->type ?? $transaction->getType();

            $categoryId = $dto->categoryId
                ?? $transaction->getCategory()->getId();

            $category = $this->getCategory(
                $categoryId,
                $user,
                $type
            );

            $transaction
                ->setType($type)
                ->setCategory($category);
        }

        if ($dto->plannedDate !== null) {
            $transaction->setPlannedDate($dto->plannedDate);
        }

        if ($dto->description !== null) {
            $transaction->setDescription($dto->description);
        }

        $this->entityManager->flush();

        return $transaction;
    }


    // ========================================
    // UPDATE TRANSACTION STATUS
    // ========================================

    /**
     * Update the status of a transaction.
     */
    public function updateStatus(
        int $id,
        TransactionStatus $status,
        User $user
    ): Transaction {
        $transaction = $this->getOne($id, $user);

        $now = new \DateTimeImmutable();

        switch ($status) {
            case TransactionStatus::PLANNED:
                $transaction
                    ->setCompletedAt(null)
                    ->setCancelledAt(null);
                break;

            case TransactionStatus::COMPLETED:
                $transaction
                    ->setCompletedAt($now)
                    ->setCancelledAt(null);
                break;

            case TransactionStatus::CANCELLED:
                $transaction
                    ->setCancelledAt($now)
                    ->setCompletedAt(null);
                break;
        }

        $transaction->setStatus($status);

        $this->entityManager->flush();

        return $transaction;
    }


    // ========================================
    // DELETE TRANSACTION
    // ========================================

    /**
     * Delete a transaction belonging to the user.
     */
    public function delete(
        int $id,
        User $user
    ): void {
        $transaction = $this->getOne($id, $user);

        $this->entityManager->remove($transaction);
        $this->entityManager->flush();
    }

    // ========================================
    // PRIVATE METHODS
    // ========================================

    /**
     * Get an available category and validate its transaction type.
     */
    private function getCategory(
        int $categoryId,
        User $user,
        TransactionType $type
    ): Category {
        $category = $this->categoryRepository
            ->findOneAvailableByIdAndUser($categoryId, $user);

        if (!$category) {
            throw new NotFoundHttpException(
                'Catégorie introuvable.'
            );
        }

        if ($category->getType() !== $type) {
            throw new BadRequestHttpException(
                'Le type de la catégorie ne correspond pas au type de la transaction.'
            );
        }

        return $category;
    }
}