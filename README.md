# Budget Manager

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Symfony](https://img.shields.io/badge/Symfony-000000?style=for-the-badge&logo=symfony)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql)

Application web de gestion budgétaire moderne permettant de suivre ses finances, organiser ses objectifs d’épargne et améliorer sa gestion financière au quotidien.

---

## Aperçu du projet

Budget Manager est une application full-stack permettant de centraliser la gestion financière personnelle.

L’objectif du projet est double :
- proposer un outil de gestion budgétaire moderne et accessible ;
- mettre en pratique une architecture professionnelle React + API Symfony.

Le projet inclut :
- une API REST sécurisée ;
- une interface utilisateur dynamique ;
- une organisation backend basée sur les Services ;
- une gestion des entités avec Doctrine ORM.

---

## Fonctionnalités

### Authentification
- Inscription
- Connexion
- Sécurisation JWT
- Gestion des utilisateurs

### Gestion financière
- Création de catégories
- Gestion des revenus
- Gestion des dépenses
- Gestion des budgets mensuels
- Objectifs d’épargne

### Tableau de bord
- Résumé des finances
- Suivi des dépenses
- Visualisation des budgets
- Statistiques financières

### Contenu public
- Conseils budgétaires
- Méthode 50 / 30 / 20
- Informations sur les aides et dispositifs de solidarité

---

## Stack technique

### Frontend
- React
- React Router
- Axios / Fetch API
- CSS

### Backend
- Symfony 7.4
- PHP 8.3+
- API REST
- Doctrine ORM
- JWT Authentication

### Base de données
- MySQL

### Outils
- Git / GitHub
- Composer
- npm
- Symfony CLI
- DBeaver

---

## Technologies utilisées

| Frontend | Backend | Base de données |
|----------|----------|----------------|
| React | Symfony 7.4 | MySQL |
| React Router | API REST | Doctrine ORM |
| CSS | JWT Authentication |  |
| Axios | PHP 8.3+ |  |

---

## Architecture du projet

```bash
budget_manager/
│
├── backend/
│   ├── src/
│   │   ├── Controller/
│   │   │   └── Api/
│   │   ├── Entity/
│   │   ├── Repository/
│   │   ├── Service/
│   │   ├── Security/
│   │   └── DTO/
│   │
│   └── migrations/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── layouts/
│   │   └── router/
│
└── README.md
````

---

## Organisation backend

Le backend suit une architecture organisée autour :

* des Controllers pour les endpoints API ;
* des Services pour la logique métier ;
* des Repositories pour l’accès aux données ;
* des DTO pour la gestion des échanges de données ;
* de Doctrine ORM pour la gestion des relations entre les entités.

---

## Entités principales

### User

Gestion des comptes utilisateurs.

### Category

Catégories financières :

* alimentation
* transport
* logement
* loisirs
* etc.

### Expense

Gestion des dépenses.

### Income

Gestion des revenus.

### Budget

Budgets mensuels et prévisionnels.

### SavingGoal

Objectifs d’épargne.

---

## Routes API principales

| Méthode | Route             | Description                       |
| ------- | ----------------- | --------------------------------- |
| POST    | /api/register     | Inscription utilisateur           |
| POST    | /api/login        | Connexion utilisateur             |
| GET     | /api/categories   | Récupérer les catégories          |
| POST    | /api/categories   | Créer une catégorie               |
| GET     | /api/expenses     | Récupérer les dépenses            |
| POST    | /api/expenses     | Créer une dépense                 |
| GET     | /api/budgets      | Récupérer les budgets             |
| POST    | /api/budgets      | Créer un budget                   |
| GET     | /api/saving-goals | Récupérer les objectifs d’épargne |

---

# Installation

## Backend Symfony

```bash
cd backend

composer install
```

Copier le fichier `.env.example` vers `.env.local`

```bash
cp .env.example .env.local
```

Configurer la connexion MySQL dans `.env.local`

```env
DATABASE_URL=""
```

Créer la base de données :

```bash
symfony console doctrine:database:create
```

Lancer les migrations :

```bash
symfony console doctrine:migrations:migrate
```

Démarrer le serveur :

```bash
symfony serve
```

---

## Frontend React

```bash
cd frontend

npm install
npm run dev
```

---

## Sécurité

* Authentification JWT
* Routes API protégées
* Validation des données
* Hashage sécurisé des mots de passe
* Gestion des permissions utilisateurs

---

## Captures d’écran

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Gestion des dépenses

![Expenses](./screenshots/expenses.png)

### Objectifs d’épargne

![Saving Goals](./screenshots/saving-goals.png)

---

## Objectifs pédagogiques

Ce projet me permet de travailler :

* l’architecture API REST ;
* la séparation Frontend / Backend ;
* Symfony et Doctrine ORM ;
* React et les composants réutilisables ;
* l’organisation des Services ;
* la sécurisation d’une API ;
* la gestion d’une base de données relationnelle ;
* la structuration d’une application full-stack moderne.

---

## Roadmap

* [ ] Dashboard avancé
* [ ] Graphiques financiers
* [ ] Export PDF
* [ ] Notifications budgétaires
* [ ] Gestion multi-comptes
* [ ] Thème clair / sombre
* [ ] IA d’accompagnement budgétaire
* [ ] Recommandations financières personnalisées

---

## Autrice

**Loriana Diano**
Développeuse Web & Web Mobile

* Portfolio : [https://loriana.dianoholding.com](https://loriana.dianoholding.com)
* LinkedIn : [https://www.linkedin.com/in/loriana-diano-33187ba8/](https://www.linkedin.com/in/loriana-diano-33187ba8/)