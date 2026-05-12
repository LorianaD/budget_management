<?php

namespace App\Service;

use App\Entity\SavingGoal;
use Doctrine\ORM\EntityManagerInterface;

class SavingGoalService
{
    public function __construct(
        private EntityManagerInterface $em
    ) {}

    public function addMoney(SavingGoal $savingGoal, string $amount): SavingGoal
    {
        $newAmount = $savingGoal->getCurrentAmount() + $amount;

        $savingGoal->setCurrentAmount($newAmount);

        $this->em->flush();

        return $savingGoal;
    }
}