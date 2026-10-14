<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/budget/allocation', name: 'app_budget_allocation_')]
final class BudgetAllocationController extends AbstractController
{
    #[Route('', name: 'index', methods: "GET")]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/BudgetAllocationController.php',
        ]);
    }
}
