<?php

namespace App\Dto\Budget;

use App\Enum\BudgetMethod;
use Symfony\Component\Validator\Constraints as Assert;

final class CreateBudgetDto
{
    public function __construct(
        #[Assert\NotNull]
        #[Assert\Range(min: 1, max: 12)]
        public readonly ?int $month = null,

        #[Assert\NotNull]
        #[Assert\Range(min: 2000, max: 2100)]
        public readonly ?int $year = null,

        #[Assert\NotNull]
        public readonly ?BudgetMethod $method = null,
    ) {}
}