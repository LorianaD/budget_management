<?php

namespace App\Dto\Transaction;

use App\Enum\TransactionStatus;
use Symfony\Component\Validator\Constraints as Assert;

final class UpdateTransactionStatusDto
{
    public function __construct(
        #[Assert\NotNull]
        public readonly TransactionStatus $status,
    ) {
    }
}
