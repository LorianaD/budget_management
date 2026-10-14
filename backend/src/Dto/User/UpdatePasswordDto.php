<?php

namespace App\Dto\User;

use Symfony\Component\Validator\Constraints as Assert;

final class UpdatePasswordDto
{
    #[Assert\NotBlank]
    public string $currentPassword = '';

    #[Assert\NotBlank]
    #[Assert\Length(min: 12, max: 4096)]
    public string $newPassword = '';

    #[Assert\NotBlank]
    #[Assert\EqualTo(
        propertyPath: 'newPassword',
        message: 'Les nouveaux mots de passe ne correspondent pas.'
    )]
    public string $confirmPassword = '';
}