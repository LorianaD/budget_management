<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Validator\Exception\ValidationFailedException;

final class ApiExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => 'onKernelException',
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $request = $event->getRequest();

        // Uniquement pour les routes API
        if (!str_starts_with($request->getPathInfo(), '/api/')) {
            return;
        }

        $exception = $event->getThrowable();
        $previous = $exception->getPrevious();

        // Gestion des erreurs de validation des DTO
        if (
            $exception instanceof UnprocessableEntityHttpException
            && $previous instanceof ValidationFailedException
        ) {
            $errors = [];

            foreach ($previous->getViolations() as $violation) {
                $field = $violation->getPropertyPath();

                $errors[$field][] = $violation->getMessage();
            }

            $event->setResponse(new JsonResponse([
                'message' => 'Erreur de validation.',
                'errors' => $errors,
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));

            return;
        }

        // Conserver le code HTTP des exceptions Symfony
        $statusCode = $exception instanceof HttpExceptionInterface
            ? $exception->getStatusCode()
            : JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

        // Ne pas exposer les détails des erreurs internes
        $message = $exception instanceof HttpExceptionInterface
            ? $exception->getMessage()
            : 'Une erreur interne est survenue.';

        $response = new JsonResponse(
            ['message' => $message],
            $statusCode
        );

        if ($exception instanceof HttpExceptionInterface) {
            $response->headers->add($exception->getHeaders());
        }

        $event->setResponse($response);
    }
}