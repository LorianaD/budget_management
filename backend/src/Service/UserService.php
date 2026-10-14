<?php

namespace App\Service;

use App\Dto\User\UpdatePasswordDto;
use App\Dto\User\UpdateUserDto;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {}

    public function getById(int $id): User
    {
        $user = $this->userRepository->findOneById($id);

        if (!$user) {
            throw new NotFoundHttpException(
                'Utilisateur introuvable.'
            );
        }

        return $user;
    }

    public function edit(User $user, UpdateUserDto $dto): User
    {
        if ($dto->firstname !== null) {
            $user->setFirstname($dto->firstname);
        }

        if ($dto->lastname !== null) {
            $user->setLastname($dto->lastname);
        }

        if ($dto->job !== null) {
            $user->setJob($dto->job);
        }

        if ($dto->birthDate !== null) {
            $user->setBirthDate(
                new \DateTimeImmutable($dto->birthDate)
            );
        }

        $this->entityManager->flush();

        return $user;
    }

    public function editPassword(User $user, UpdatePasswordDto $dto): void
    {
        if (!$this->passwordHasher->isPasswordValid($user, $dto->currentPassword)) {
            throw new BadRequestHttpException(
                'Le mot de passe actuel est incorrect.'
            );
        }

        if ($dto->newPassword !== $dto->confirmPassword) {
            throw new BadRequestHttpException(
                'Les nouveaux mots de passe ne correspondent pas.'
            );
        }

        if ($this->passwordHasher->isPasswordValid($user, $dto->newPassword)) {
            throw new BadRequestHttpException(
                'Le nouveau mot de passe doit être différent de l’ancien.'
            );
        }

        $user->setPassword(
            $this->passwordHasher->hashPassword(
                $user,
                $dto->newPassword
            )
        );

        $this->entityManager->flush();
    }
}