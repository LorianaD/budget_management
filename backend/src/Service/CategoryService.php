<?php

namespace App\Service;

use App\Dto\Category\CreateCategoryDto;
use App\Dto\Category\UpdateCategoryDto;
use App\Entity\Category;
use App\Entity\User;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class CategoryService
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly EntityManagerInterface $em,
    ) {}

    // ========================================
    // CREATE
    // ========================================

    public function create(
        CreateCategoryDto $dto,
        User $user
    ): Category {
        $existingCategory = $this->categoryRepository
            ->findOneByCodeAndUser($dto->code, $user);

        if ($existingCategory !== null) {
            throw new ConflictHttpException(
                'Une catégorie avec ce code existe déjà.'
            );
        }

        $category = new Category();

        $category
            ->setName($dto->name)
            ->setCode($dto->code)
            ->setType($dto->type)
            ->setIsSystem(false)
            ->setUser($user);

        if ($dto->parentId !== null) {
            $parent = $this->getOneCategory($dto->parentId, $user);

            $this->validateParent($parent, $dto->type);

            $category->setParent($parent);
        }

        $this->em->persist($category);
        $this->em->flush();

        return $category;
    }

    // ========================================
    // GET ALL
    // ========================================

    /**
     * @return Category[]
     */
    public function getAllCategory(User $user): array
    {
        return $this->categoryRepository
            ->findAllAvailableByUser($user);
    }

    // ========================================
    // GET ONE
    // ========================================

    public function getOneCategory(
        int $id,
        User $user
    ): Category {
        $category = $this->categoryRepository
            ->findOneAvailableByIdAndUser($id, $user);

        if ($category === null) {
            throw new NotFoundHttpException(
                'Catégorie introuvable.'
            );
        }

        return $category;
    }

    // ========================================
    // GET ONE PERSONAL
    // ========================================

    private function getOnePersonalCategory(
        int $id,
        User $user
    ): Category {
        $category = $this->categoryRepository
            ->findOnePersonalByIdAndUser($id, $user);

        if ($category === null) {
            throw new NotFoundHttpException(
                'Catégorie personnelle introuvable.'
            );
        }

        return $category;
    }

    // ========================================
    // UPDATE
    // ========================================

    public function update(
        int $id,
        UpdateCategoryDto $dto,
        User $user
    ): Category {
        $category = $this->getOnePersonalCategory($id, $user);

        if ($dto->code !== null && $dto->code !== $category->getCode()) {
            $existingCategory = $this->categoryRepository
                ->findOneByCodeAndUser($dto->code, $user, $id);

            if ($existingCategory !== null) {
                throw new ConflictHttpException(
                    'Une catégorie avec ce code existe déjà.'
                );
            }

            $category->setCode($dto->code);
        }

        if ($dto->name !== null) {
            $category->setName($dto->name);
        }

        if ($dto->parentId !== null) {
            $parent = $this->getOneCategory($dto->parentId, $user);

            if ($parent->getId() === $category->getId()) {
                throw new BadRequestHttpException(
                    'Une catégorie ne peut pas être son propre parent.'
                );
            }

            $this->validateParent($parent, $category->getType());

            $this->validateParentHierarchy($category, $parent);

            $category->setParent($parent);
        }

        $this->em->flush();

        return $category;
    }

    // ========================================
    // DELETE (SOFT DELETE)
    // ========================================

    public function delete(
        int $id,
        User $user
    ): void {
        $category = $this->getOnePersonalCategory($id, $user);

        // Empêcher de supprimer une catégorie ayant
        // des sous-catégories encore actives.
        foreach ($category->getChildren() as $child) {
            if ($child->getDeletedAt() === null) {
                throw new ConflictHttpException(
                    'Impossible de supprimer une catégorie contenant des sous-catégories actives.'
                );
            }
        }

        $category->setDeletedAt(new \DateTimeImmutable());

        $this->em->flush();
    }

    // ========================================
    // VALIDATE PARENT
    // ========================================

    private function validateParent(
        Category $parent,
        \App\Enum\TransactionType $type
    ): void {
        if ($parent->getType() !== $type) {
            throw new BadRequestHttpException(
                'La catégorie parente doit avoir le même type.'
            );
        }
    }

    // ========================================
    // VALIDATE PARENT HIERARCHY
    // ========================================

    private function validateParentHierarchy(
        Category $category,
        Category $parent
    ): void {
        $current = $parent;

        while ($current !== null) {
            if ($current->getId() === $category->getId()) {
                throw new BadRequestHttpException(
                    'Une catégorie ne peut pas être déplacée sous une de ses sous-catégories.'
                );
            }

            $current = $current->getParent();
        }
    }
}
