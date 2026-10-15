<?php

namespace App\Dto\Category;

use Symfony\Component\Validator\Constraints as Assert;

final class UpdateCategoryDto
{
    public function __construct(
        #[Assert\NotBlank(allowNull: true)]
        #[Assert\Length(max: 255)]
        public readonly ?string $name = null,

        #[Assert\NotBlank(allowNull: true)]
        #[Assert\Length(max: 100)]
        public readonly ?string $code = null,

        #[Assert\Positive]
        public readonly ?int $parentId = null,
    ) {}
}
