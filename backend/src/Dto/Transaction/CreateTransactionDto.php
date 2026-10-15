<?php

namespace App\Dto\Transaction;

use App\Enum\TransactionType;
use Symfony\Component\Validator\Constraints as Assert;

final class CreateTransactionDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(max: 255)]
        public readonly string $label,

        #[Assert\NotBlank]
        #[Assert\Regex(
            pattern: '/^\d{1,10}(\.\d{1,2})?$/',
            message: 'Le montant doit être un nombre positif avec deux décimales maximum.'
        )]
        #[Assert\Positive]
        public readonly string $amount,

        #[Assert\NotNull]
        public readonly TransactionType $type,

        #[Assert\Positive]
        public readonly int $categoryId,

        public readonly ?\DateTimeImmutable $plannedDate = null,

        public readonly ?string $description = null,
    ) {
    }
}