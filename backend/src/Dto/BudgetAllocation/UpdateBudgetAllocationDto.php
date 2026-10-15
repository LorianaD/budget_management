<?php

namespace App\Dto\BudgetAllocation;

use Symfony\Component\Validator\Constraints as Assert;

final class UpdateBudgetAllocationDto
{
    public function __construct(
        #[Assert\Regex(
            pattern: '/^\d{1,10}(\.\d{1,2})?$/',
            message: 'Le montant doit être un nombre positif avec au maximum deux décimales.'
        )]
        public readonly ?string $plannedAmount = null,
    ) {}
}