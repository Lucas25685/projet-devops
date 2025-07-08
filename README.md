# 🎟 Ticketing App

## 🚀 Lancer le projet

### 1. Configuration
Copiez le fichier `.env.example` en `.env` et adaptez si besoin.

### 2. Lancer avec Docker

```bash
docker-compose up --build
```

Accès :
- Formulaire : http://localhost:3000/
- Liste des tickets : http://localhost:3000/tickets (avec auth HTTP Basic)

### 3. Seed de la base

```bash
docker exec -it <container_app> node fixtures/seed.js
```

### 4. Tests

```bash
npm run test:unit
npm run test:e2e
```

## 🔐 Authentification HTTP Basic
Envoyez les identifiants définis dans `.env` :
- `ADMIN_USER`
- `ADMIN_PASSWORD`

## BDD
Lancer la bdd avec
```bash
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mariadb:latest
```
