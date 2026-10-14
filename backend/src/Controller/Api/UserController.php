<?php

namespace App\Controller\Api;

use App\Dto\User\UpdatePasswordDto;
use App\Dto\User\UpdateUserDto;
use App\Entity\User;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/user', name: 'app_user_')]
final class UserController extends AbstractController
{
    public function __construct(
        private readonly UserService $userService,
    ) {}

    #[Route('', name: 'profile', methods: ['GET'])]
    public function index(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(
                ['message' => 'Authentification requise.'],
                JsonResponse::HTTP_UNAUTHORIZED
            );
        }

        $user = $this->userService->getById($user->getId());

        return $this->json([
            'id' => $user->getId(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'email' => $user->getEmail(),
        ]);
    }

    #[Route('', name: 'edit', methods: 'PATCH')]
    public function edit(#[MapRequestPayload] UpdateUserDto $dto, #[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(
                ['message' => 'Authentification requise.'],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $this->userService->edit($user, $dto);

        return $this->json([
            'message' => 'Profil modifié avec succès.',
            'user' => [
                'id' => $user->getId(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'email' => $user->getEmail(),
            ],
        ]);
    }

    #[Route('/password', name: 'edit_password', methods: ['PATCH'])]
    public function editPassword(#[MapRequestPayload] UpdatePasswordDto $dto, #[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(
                ['message' => 'Authentification requise.'],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $this->userService->editPassword($user, $dto);

        return $this->json([
            'message' => 'Mot de passe modifié avec succès.',
        ]);
    }
}
