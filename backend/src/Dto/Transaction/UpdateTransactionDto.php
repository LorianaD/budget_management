<?php

namespace App\Dto\Transaction;

use App\Enum\TransactionType;
use Symfony\Component\Validator\Constraints as Assert;

final class UpdateTransactionDto
{
    public function __construct(
        #[Assert\Length(min: 1, max: 255)]
        public readonly ?string $label = null,

        #[Assert\Regex(
            pattern: '/^\d{1,10}(\.\d{1,2})?$/',
            message: 'Le montant doit être un nombre positif avec deux décimales maximum.'
        )]
        #[Assert\Positive]
        public readonly ?string $amount = null,

        public readonly ?TransactionType $type = null,

        #[Assert\Positive]
        public readonly ?int $categoryId = null,

        public readonly ?\DateTimeImmutable $plannedDate = null,

        public readonly ?string $description = null,
    ) {
    }
}