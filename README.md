# Login & Signup Project

## Description

Ce projet est une application simple de gestion d'utilisateurs qui permet aux utilisateurs de :
- Créer un compte (Signup)
- Se connecter à leur compte (Login)

L'application est construite avec **TypeScript**, **Node.js**, **Express.js** et utilise **MongoDB** comme base de données. Les données sont stockées et gérées à l'aide de **JSON** dans MongoDB. 

Une interface utilisateur simple en **HTML** et **CSS** permet aux utilisateurs de s'inscrire et de se connecter.

## Fonctionnalités

- **Signup** : Permet aux utilisateurs de créer un compte avec un nom d'utilisateur, une adresse e-mail et un mot de passe.
- **Login** : Permet aux utilisateurs de se connecter avec leur e-mail et mot de passe.
- **Gestion sécurisée des mots de passe** : Les mots de passe sont hachés avant d'être stockés dans la base de données à l'aide de **bcrypt**.
- **Pages de confirmation** : Affichage de pages HTML pour confirmer la création du compte ou la connexion réussie.

## Technologies Utilisées

- **Backend** :
  - [Node.js](https://nodejs.org)
  - [Express.js](https://expressjs.com)
  - [TypeScript](https://www.typescriptlang.org)
  - [MongoDB](https://www.mongodb.com)
  - [Mongoose](https://mongoosejs.com)

- **Frontend** :
  - HTML
  - CSS

- **Autres** :
  - bcrypt (pour le hachage des mots de passe)
  - Postman ou cURL pour les tests d'API

## Installation

### Prérequis
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com)

### Étapes d'installation

1. Clonez le dépôt GitHub :
   ```bash
   git clone https://github.com/McAchoox94/simple-login-signup-express-mongo-ts.git

2. Accédez au répertoire du projet :
   ```bash
   cd login-signup-project
   
3. Installez les dépendances :
   ```bash
   npm install

4. Compilez le projet TypeScript :
   ```bash
   tsc

5. Lancez l'application :
   ```bash
   node dist/index.js

L'application est maintenant accessible sur http://localhost:3000.

### Utilisation 

- Signup : Accédez à http://localhost:3000, remplissez le formulaire d'inscription, et soumettez.
- Login : Si vous avez déjà un compte, remplissez le formulaire de connexion.

### API

Signup

- URL : /auth/signup
- Méthode : POST
- Body :
   ```bash
   {
  "username": "your-username",
  "email": "your-email",
  "password": "your-password"
   }

Login

- URL : /auth/login
- Méthode : POST
- Body :
  ```bash
  {
  "email": "your-email",
  "password": "your-password"
  }

### Structure du Projet

   ```bash
 login-signup-project/
 ├── src/
 │   ├── models/
 │   │   └── user.model.ts       # Modèle de l'utilisateur
 │   ├── routes/
 │   │   └── auth.routes.ts      # Routes pour le login et signup
 │   └── index.ts                # Point d'entrée du serveur Express
 ├── public/
 │   ├── index.html              # Formulaire de login et signup
 │   └── success.html            # Page de succès
 ├── dist/                       # Fichiers compilés TypeScript
 ├── package.json                # Dépendances du projet
 └── tsconfig.json               # Configuration TypeScript

```

### Améliorations Futures

- Ajouter une gestion des tokens JWT pour une authentification sécurisée.
- Améliorer la validation des formulaires (ex: mots de passe complexes).
- Ajouter des tests unitaires pour garantir la fiabilité du code.

### Auteur

ACHRAF BOUJJOU - IT SUPERVISOR - UHA 4.0





