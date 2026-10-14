<?php

namespace App\Dto\User;

use Symfony\Component\Validator\Constraints as Assert;

final class UpdateUserDto
{
    #[Assert\NotBlank(allowNull: true)]
    #[Assert\Length(max: 255)]
    public ?string $firstname = null;

    #[Assert\NotBlank(allowNull: true)]
    #[Assert\Length(max: 255)]
    public ?string $lastname = null;

    #[Assert\NotBlank(allowNull: true)]
    #[Assert\Length(max: 255)]
    public ?string $job = null;

    #[Assert\Email]
    public ?string $email = null;

    #[Assert\Date]
    public ?string $birthDate = null;
}