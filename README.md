# 🚀 RH Management Portal - Fullstack Application

Ce projet est une plateforme de gestion de candidats développée dans le cadre d'un test technique. Elle permet de gérer le pipeline de recrutement avec une interface moderne, sécurisée et performante.

## 🛠 Stack Technique

### Frontend

- Framework : Next.js 16 (App Router)
- Langage : TypeScript
- Gestion d'état & Cache : TanStack Query v5
- Formulaires : React Hook Form + Zod (Validation stricte)
- UI & Styling : Tailwind CSS + shadcn/ui + Lucide Icons
- Auth : Context API + Axios Interceptors (JWT)

### Backend

- Runtime : Node.js + Express
- Base de données : MongoDB + Mongoose
- Sécurité : Argon2 (Hachage), JWT (Authentification), CORS configuré
- Validation : Zod schemas

## 🏗 Architecture du Projet

```
.
├── .github/
│   └── workflows/
|         └──ci-cd.yaml
├── backend/                # API REST Express
│   ├── src/
│   │   ├── controllers/    # Logique de contrôle
│   │   ├── models/         # Schémas Mongoose
│   │   ├── middlewares/    # Auth, Validation, Error handling
│   │   └── routes/         # Définition des endpoints
│   └── tests/              # Tests unitaires et intégration (Jest)
│
├── frontend/               # Application Next.js
│   ├── src/
│   │   ├── app/            # Pages et Layouts
│   │   ├── components/     # Composants atomiques & UI
│   │   ├── hooks/          # Hooks personnalisés (Logic & API)
│   │   ├── providers/      # Context Providers (Auth, Query, Toast)
│   │   ├── services/       # Configuration Axios
|   |   └── tests/          # Tests
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation et Lancement

### Local

#### Prerequis

- Node.js (v18+)
- Une instance MongoDB (Locale ou Atlas)

1. Cloner le projet

```
git clone https://github.com/flavien-andrisoa-rakotondrabe/test-full-stack.git

cd test-full-stack
```

2. Configuration du Backend

```
cd backend
npm install

# Créer un fichier .env
# PORT=5000
# DATABASE_URI=mongodb://localhost:27017/rh-portal
# FRONTEND_URI=http://localhost:3000
# JWT_SECRET=secret_key
# NODE_ENV=production

npm run dev
```

3. Configuration du Frontend

```
cd ../frontend
npm install

# Créer un fichier .env
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NODE_ENV=production

npm run dev
```

L'application est maintenant accessible sur [http://localhost:3000](http://localhost:3000).

### Utilisant Docker

1. Cloner le projet

```
git clone https://github.com/flavien-andrisoa-rakotondrabe/test-full-stack.git

cd test-full-stack
```

2. Configurations

```
cd backend

# Créer un fichier .env
# PORT=5000
# DATABASE_URI=mongodb://mongodb:27017/rh-portal
# FRONTEND_URI=http://localhost:3000
# JWT_SECRET=secret_key
# NODE_ENV=production

cd ../frontend

# Créer un fichier .env
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NODE_ENV=production

```

L'application est maintenant accessible sur [http://localhost:3000](http://localhost:3000).

---

## 🔒 Fonctionnalités Clés

- Authentification Complète : Inscription avec critères de sécurité et connexion sécurisée par JWT.
- Gestion des Candidats : Ajout, consultation et validation des profils.
- Validation Robuste : Validation des données côté client (Zod) et côté serveur pour une intégrité totale.
- Gestion des Erreurs : Retours précis selon les codes HTTP (404 User not found, 401 Wrong password, etc.).
- UX Optimisée : États de chargement (Skeletons/Spinners) et notifications Toast pour chaque action.

---

## 🧪 Stratégie de Tests

Le projet suit une pyramide des tests rigoureuse :

- Unitaires (Backend) : Validation de la logique métier et des modèles avec Jest.
- Intégration (API) : Tests des endpoints REST avec Supertest.
- E2E (Frontend) : Simulation des parcours utilisateurs critiques (Login -> Création de candidat -> Validation) avec Playwright.

---

## 📝 Auteur

- Flavien RAKOTONDRABE / flavienrak - Développeur Fullstack
