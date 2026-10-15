<?php

namespace App\Controller\Api;

use App\Dto\Transaction\CreateTransactionDto;
use App\Dto\Transaction\UpdateTransactionDto;
use App\Dto\Transaction\UpdateTransactionStatusDto;
use App\Entity\Transaction;
use App\Entity\User;
use App\Enum\TransactionType;
use App\Service\TransactionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route(
    '/api/transactions',
    name: 'api_transaction_',
    requirements: ['id' => '\d+']
)]
final class TransactionController extends AbstractController
{
    public function __construct(
        private readonly TransactionService $transactionService,
    ) {}

    // ========================================
    // GET ALL
    // ========================================

    #[Route('', name: 'index', methods: ['GET'], format: 'json')]
    public function index(
        #[CurrentUser] ?User $user,
        ?int $year = null,
        ?int $month = null,
        ?string $type = null
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // Les filtres seront récupérés depuis Request.
        // Pour le moment, récupération de toutes les transactions.
        $transactions = $this->transactionService->getAll($user);

        return $this->json([
            'message' => 'Liste des transactions.',
            'data' => array_map(
                fn (Transaction $transaction) => $this->formatTransaction($transaction),
                $transactions
            ),
        ]);
    }

    // ========================================
    // CREATE
    // ========================================

    #[Route('', name: 'create', methods: ['POST'], format: 'json')]
    public function create(
        #[MapRequestPayload] CreateTransactionDto $dto,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $transaction = $this->transactionService->create($dto, $user);

        return $this->json([
            'message' => 'Transaction créée avec succès.',
            'data' => $this->formatTransaction($transaction),
        ], JsonResponse::HTTP_CREATED);
    }

    // ========================================
    // GET ONE
    // ========================================

    #[Route('/{id}', name: 'show', methods: ['GET'], format: 'json')]
    public function show(
        int $id,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $transaction = $this->transactionService->getOne($id, $user);

        return $this->json([
            'data' => $this->formatTransaction($transaction),
        ]);
    }

    // ========================================
    // UPDATE
    // ========================================

    #[Route('/{id}', name: 'update', methods: ['PATCH'], format: 'json')]
    public function update(
        int $id,
        #[MapRequestPayload] UpdateTransactionDto $dto,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $transaction = $this->transactionService->update(
            $id,
            $dto,
            $user
        );

        return $this->json([
            'message' => 'Transaction modifiée avec succès.',
            'data' => $this->formatTransaction($transaction),
        ]);
    }

    // ========================================
    // UPDATE STATUS
    // ========================================

    #[Route(
        '/{id}/status',
        name: 'update_status',
        methods: ['PATCH'],
        format: 'json'
    )]
    public function updateStatus(
        int $id,
        #[MapRequestPayload] UpdateTransactionStatusDto $dto,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $transaction = $this->transactionService->updateStatus(
            $id,
            $dto->status,
            $user
        );

        return $this->json([
            'message' => 'Statut de la transaction modifié avec succès.',
            'data' => $this->formatTransaction($transaction),
        ]);
    }

    // ========================================
    // DELETE
    // ========================================

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(
        int $id,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $this->transactionService->delete($id, $user);

        return $this->json(null, JsonResponse::HTTP_NO_CONTENT);
    }

    // ========================================
    // FORMAT RESPONSE
    // ========================================

    private function formatTransaction(Transaction $transaction): array
    {
        return [
            'id' => $transaction->getId(),
            'label' => $transaction->getLabel(),
            'amount' => $transaction->getAmount(),
            'type' => $transaction->getType()?->value,
            'status' => $transaction->getStatus()->value,
            'categoryId' => $transaction->getCategory()?->getId(),
            'categoryName' => $transaction->getCategory()?->getName(),
            'plannedDate' => $transaction->getPlannedDate()?->format('Y-m-d'),
            'completedAt' => $transaction->getCompletedAt()?->format('Y-m-d H:i:s'),
            'cancelledAt' => $transaction->getCancelledAt()?->format('Y-m-d H:i:s'),
            'description' => $transaction->getDescription(),
            'createdAt' => $transaction->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updatedAt' => $transaction->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ];
    }
}