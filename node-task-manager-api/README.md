# Task Management REST API (PostgreSQL + Express + Prisma)

A secure, production-grade Task Management RESTful API built with **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, and **JWT Authentication** featuring fine-grained **Role-Based Access Control (RBAC)**.

---

## 🚀 Project Overview & Key Features

- **Database & ORM:** PostgreSQL database schema managed via Prisma ORM migrations and seeder scripts.
- **JWT Authentication:** Secure registration and login using bcrypt password hashing (cost factor 10) and JSON Web Tokens (JWT).
- **Role-Based Access Control (RBAC):**
  - **Regular User (`role: user`):** Create tasks, view own tasks, update title/description of own tasks.
  - **Admin User (`role: admin`):** View all tasks across all users, create/edit tasks, and exclusively update task status (`Pending`, `In Progress`, `Testing`, `Completed`).
- **Middleware & Security:** Centralized error handling middleware, JWT verification middleware, and router-level role protection (`requireRole('admin')`).
- **Postman Collection:** Complete Postman test collection (`task-manager-api.postman_collection.json`) with Bearer token authentication scripts.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma ORM
- **Security:** `jsonwebtoken` (JWT), `bcryptjs`, `cors`
- **Configuration:** `dotenv`

---

## 📂 Project Structure

```
node-task-manager-api/
├── prisma/
│   ├── schema.prisma                  # PostgreSQL Prisma schema & data models
│   └── seed.js                        # Seeder script (Admin, Regular Users, Tasks)
├── src/
│   ├── config/
│   │   ├── db.js                      # PrismaClient singleton initialization
│   │   └── env.js                     # Environment variables configuration
│   ├── controllers/
│   │   ├── auth.controller.js         # Register & Login endpoint handlers
│   │   └── task.controller.js         # Task CRUD & RBAC controller handlers
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT Bearer token authentication
│   │   ├── error.middleware.js        # Global error handling middleware
│   │   └── role.middleware.js         # Role-based access control middleware
│   ├── routes/
│   │   ├── auth.routes.js             # Authentication route endpoints
│   │   ├── task.routes.js             # Task management route endpoints
│   │   └── index.js                   # Route aggregator module
│   └── server.js                      # Express application entrypoint
├── task-manager-api.postman_collection.json # Complete Postman test suite
├── .env.example                       # Sample environment variables
├── package.json                       # Dependencies & CLI scripts
├── .gitignore                         # Excluded files list
└── README.md                          # Project documentation
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of `node-task-manager-api` by copying `.env.example`:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL Connection String
# Format: postgresql://<user>:<password>@<host>:<port>/<database>?schema=public
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskmanager?schema=public"

# JWT Auth Config
JWT_SECRET="your_super_secret_jwt_key_kanishka_software_2026"
JWT_EXPIRES_IN="24h"
```

> **Note:** `.env` is ignored by git to protect secrets. Do not commit `.env`.

---

## 🐘 PostgreSQL Database Setup, Migrations & Seeding

1. **Start your local PostgreSQL server** (or Docker container).
2. **Create Database:**
   ```sql
   CREATE DATABASE taskmanager;
   ```
3. **Run Prisma Migrations & Seeders:**
   ```bash
   npm run db:setup
   ```
   *This executes `npx prisma migrate dev --name init` followed by `node prisma/seed.js`.*

---

## 🏃 How to Run the API Server

- **Development Mode (with hot-reloading via Nodemon):**
  ```bash
  npm run dev
  ```
- **Production Mode:**
  ```bash
  npm start
  ```
- **Healthcheck URL:** `GET http://localhost:5000/health`

---

## 🔑 Test User Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@kanishka.com` | `Admin123!` | Access all tasks, create/edit tasks, update task status |
| **User 1** | `john@example.com` | `User123!` | Create tasks, view & edit own tasks only |
| **User 2** | `jane@example.com` | `User123!` | Create tasks, view & edit own tasks only |

---

## 📑 API Endpoints Reference

| Method | Route | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `POST` | `/api/tasks` | Authenticated | Create a new task |
| `GET` | `/api/tasks` | Authenticated | View tasks (User: own tasks; Admin: all tasks) |
| `GET` | `/api/tasks/:id` | Authenticated | View specific task by ID |
| `PUT` | `/api/tasks/:id` | Authenticated | Update task title and description |
| `PATCH`| `/api/tasks/:id/status` | **Admin Only** | Update task status (`Pending`, `In Progress`, `Testing`, `Completed`) |

---

## 🧠 Security & Architectural Decisions

1. **PostgreSQL + Prisma Migration System:** Ensures strict SQL schema enforcement, transaction support, and repeatable migration histories (`prisma/migrations`).
2. **Admin-Only Status Endpoint:** Enforced via `requireRole('admin')` at the route middleware layer to ensure API security.
3. **Password Security:** Passwords are hashed with `bcryptjs` (salt rounds = 10) before storage and excluded from API responses.
