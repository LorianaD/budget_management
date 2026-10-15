<?php

namespace App\Controller\Api;

use App\Dto\Category\CreateCategoryDto;
use App\Dto\Category\UpdateCategoryDto;
use App\Entity\Category;
use App\Entity\User;
use App\Service\CategoryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route(
    '/api/categories',
    name: 'api_category_',
    requirements: ['id' => '\d+']
)]
final class CategoryController extends AbstractController
{
    public function __construct(
        private readonly CategoryService $categoryService,
    ) {}

    // ========================================
    // GET ALL
    // ========================================

    #[Route('', name: 'index', methods: ['GET'], format: 'json')]
    public function index(
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $categories = $this->categoryService->getAllCategory($user);

        return $this->json([
            'message' => 'Liste des catégories.',
            'data' => array_map(
                fn (Category $category) => $this->formatCategory($category),
                $categories
            ),
        ]);
    }

    // ========================================
    // CREATE
    // ========================================

    #[Route('', name: 'create', methods: ['POST'], format: 'json')]
    public function create(
        #[MapRequestPayload] CreateCategoryDto $dto,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $category = $this->categoryService->create($dto, $user);

        return $this->json([
            'message' => 'Catégorie créée avec succès.',
            'data' => $this->formatCategory($category),
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

        $category = $this->categoryService->getOneCategory($id, $user);

        return $this->json([
            'data' => $this->formatCategory($category),
        ]);
    }

    // ========================================
    // UPDATE
    // ========================================

    #[Route('/{id}', name: 'update', methods: ['PATCH'], format: 'json')]
    public function update(
        int $id,
        #[MapRequestPayload] UpdateCategoryDto $dto,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $category = $this->categoryService->update($id, $dto, $user);

        return $this->json([
            'message' => 'Catégorie modifiée avec succès.',
            'data' => $this->formatCategory($category),
        ]);
    }

    // ========================================
    // DELETE
    // ========================================

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], format: 'json')]
    public function delete(
        int $id,
        #[CurrentUser] ?User $user
    ): JsonResponse {
        if (!$user) {
            return $this->json([
                'message' => 'Utilisateur non authentifié.',
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $this->categoryService->delete($id, $user);

        return $this->json(null, JsonResponse::HTTP_NO_CONTENT);
    }

    // ========================================
    // FORMAT RESPONSE
    // ========================================

    private function formatCategory(Category $category): array
    {
        return [
            'id' => $category->getId(),
            'name' => $category->getName(),
            'code' => $category->getCode(),
            'type' => $category->getType()?->value,
            'isSystem' => $category->isSystem(),
            'parentId' => $category->getParent()?->getId(),
        ];
    }
}