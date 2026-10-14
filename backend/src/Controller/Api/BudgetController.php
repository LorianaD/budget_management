<?php

namespace App\Controller\Api;

use App\Dto\Budget\CreateBudgetDto;
use App\Dto\Budget\UpdateBudgetDto;
use App\Entity\User;
use App\Service\BudgetService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/budget', name: 'api_budget_')]
final class BudgetController extends AbstractController
{
    public function __construct(
        private readonly BudgetService $budgetService,
    ) {}

    #[Route('', name: 'index', methods: ['GET'])]
    public function index(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budgets = $this->budgetService->getAllBudget($user);

        return $this->json([
            'message' => 'Liste des budgets prévisionnels',
            'data' => array_map(
                static fn ($budget) => [
                    'id' => $budget->getId(),
                    'month' => $budget->getMonth(),
                    'year' => $budget->getYear(),
                    'method' => $budget->getMethod()?->value,
                ],
                $budgets
            ),
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'], format: 'json')]
    public function create(#[MapRequestPayload] CreateBudgetDto $dto, #[CurrentUser] ?User $user): JsonResponse 
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budget = $this->budgetService->create($dto, $user);

        return $this->json([
            'message' => 'Budget créé avec succès.',
            'data' => [
                'id' => $budget->getId(),
                'month' => $budget->getMonth(),
                'year' => $budget->getYear(),
                'method' => $budget->getMethod()?->value,
            ],
        ], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'], format: 'json')]
    public function show(int $id, #[CurrentUser] ?User $user): JsonResponse 
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budget = $this->budgetService->getOneBudget($id, $user);

        return $this->json([
            'data' => [
                'id' => $budget->getId(),
                'month' => $budget->getMonth(),
                'year' => $budget->getYear(),
                'method' => $budget->getMethod()?->value,
            ],
        ]);
    }

    #[Route('/{id}', name: 'update', methods: ['PATCH'], format: 'json')]
    public function update(int $id, #[MapRequestPayload] UpdateBudgetDto $dto, #[CurrentUser] ?User $user) : JsonResponse
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $budget = $this->budgetService->update($id, $dto, $user);

        return $this->json([
            'message' => 'Budget modifié avec succès.',
            'data' => [
                'id' => $budget->getId(),
                'month' => $budget->getMonth(),
                'year' => $budget->getYear(),
                'method' => $budget->getMethod()?->value,
            ],
        ]);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], format: 'json')]
    public function delete(int $id, #[CurrentUser] ?User $user): JsonResponse 
    {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $this->budgetService->delete($id, $user);

        return $this->json(null, JsonResponse::HTTP_NO_CONTENT);
    }
}