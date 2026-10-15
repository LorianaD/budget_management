<?php

namespace App\Dto\Category;

use App\Enum\TransactionType;
use Symfony\Component\Validator\Constraints as Assert;

final class CreateCategoryDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(max: 255)]
        public readonly ?string $name = null,

        #[Assert\NotBlank]
        #[Assert\Length(max: 100)]
        public readonly ?string $code = null,

        #[Assert\NotNull]
        public readonly ?TransactionType $type = null,

        #[Assert\Positive]
        public readonly ?int $parentId = null,
    ) {}
}
