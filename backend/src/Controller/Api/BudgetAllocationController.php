<?php

namespace App\Controller\Api;

use App\Dto\BudgetAllocation\CreateBudgetAllocationDto;
use App\Dto\BudgetAllocation\UpdateBudgetAllocationDto;
use App\Entity\User;
use App\Service\BudgetAllocationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/budget/{budgetId}/allocation', name: 'app_budget_allocation_', requirements: ['budgetId' => '\d+'])]
final class BudgetAllocationController extends AbstractController
{
    public function __construct(
        private readonly BudgetAllocationService $budgetAllocationService,
    ) {}

    #[Route('', name: 'index', methods: "GET")]
    public function index(int $budgetId, #[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budgetAllocations = $this->budgetAllocationService->getAllBudgetAllocation(
            $budgetId,
            $user
        );

        return $this->json([
            'message' => 'Liste des allocations budgétaires.',
            'data' => array_map(
                static fn ($budgetAllocations) => [
                    'id' => $budgetAllocations->getId(),
                    'categoryId' => $budgetAllocations->getCategory()?->getId(),
                    'plannedAmount' => $budgetAllocations->getPlannedAmount(),
                ],
                $budgetAllocations
            ),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'], format: 'json')]
    public function create(int $budgetId, #[MapRequestPayload] CreateBudgetAllocationDto $dto, #[CurrentUser] ?User $user): JsonResponse 
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budgetAllocation = $this->budgetAllocationService->create(
            $budgetId, 
            $dto, 
            $user
        );

        return $this->json([
            'message' => 'Allocation budgétaire créée avec succès.',
            'data' => [
                'id' => $budgetAllocation->getId(),
                'categoryId' => $budgetAllocation->getCategory()?->getId(),
                'plannedAmount' => $budgetAllocation->getPlannedAmount(),
            ],
        ], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'], format: 'json')]
    public function show(int $budgetId, int $id, #[CurrentUser] ?User $user): JsonResponse 
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budgetAllocation = $this->budgetAllocationService->getOneBudgetAllocation($budgetId, $id, $user);

        return $this->json([
            'data' => [
                'id' => $budgetAllocation->getId(),
                'categoryId' => $budgetAllocation->getCategory()?->getId(),
                'plannedAmount' => $budgetAllocation->getPlannedAmount(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'update', methods: ['PATCH'], format: 'json')]
    public function update(int $budgetId, int $id, #[MapRequestPayload] UpdateBudgetAllocationDto $dto, #[CurrentUser] ?User $user) : JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budgetAllocation = $this->budgetAllocationService->update($budgetId, $id, $dto, $user);

        return $this->json([
            'message' => 'Allocation budgétaire modifiée avec succès.',
            'data' => [
                'id' => $budgetAllocation->getId(),
                'categoryId' => $budgetAllocation->getCategory()?->getId(),
                'plannedAmount' => $budgetAllocation->getPlannedAmount(),
            ],
        ]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], format: 'json')]
    public function delete(int $budgetId, int $id, #[CurrentUser] ?User $user): JsonResponse 
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $this->budgetAllocationService->delete($budgetId, $id, $user);

        return $this->json(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
