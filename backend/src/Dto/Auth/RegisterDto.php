<?php

namespace App\Dto\Auth;

use Symfony\Component\Validator\Constraints as Assert;

final class RegisterDto
{
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    public ?string $firstname = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    public ?string $lastname = null;

    #[Assert\NotBlank]
    #[Assert\Date]
    public ?string $birthDate = null;

    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    public ?string $job = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[Assert\Length(max: 180)]
    public ?string $email = null;

    #[Assert\NotBlank]
    #[Assert\Length(min: 12, max: 4096)]
    public ?string $password = null;
}