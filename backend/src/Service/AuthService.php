<?php

namespace App\Service;

use App\Dto\Auth\RegisterDto;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthService
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {}

    public function register(RegisterDto $dto): User
    {
        // Vérifier si l'email existe déjà
        $email = mb_strtolower(trim($dto->email));

        $existingUser = $this->userRepository->findOneBy([
            'email' => $email,
        ]);

        if ($existingUser) {
            throw new ConflictHttpException('Cette adresse email est déjà utilisée.');
        }

        // Créer l'utilisateur
        $user = new User();

        $user->setFirstname(trim($dto->firstname));
        $user->setLastname(trim($dto->lastname));
        $user->setEmail($email);
        $user->setJob(trim($dto->job));

        $birthDate = \DateTime::createFromFormat(
            '!Y-m-d',
            $dto->birthDate
        );

        if (!$birthDate) {
            throw new \InvalidArgumentException('Date de naissance invalide.');
        }

        $user->setBirthDate($birthDate);

        // Hasher le mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $dto->password
        );

        $user->setPassword($hashedPassword);

        // Enregistrer dans MySQL
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}