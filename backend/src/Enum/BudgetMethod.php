<?php

namespace App\Enum;

enum BudgetMethod: string
{
    case CUSTOM = 'custom';
    case FIFTY_THIRTY_TWENTY = '50_30_20';
    case ZERO_BASED = 'zero_based';
    case ENVELOPE = 'envelope';
}
