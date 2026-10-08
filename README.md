# Kanishka Software Pvt Ltd - Internship Assessment Monorepo

This repository contains full solutions for both the **React Developer Intern** and **Node.js Developer Intern** take-home assessment tasks.

---

## 📁 Repository Structure

```
.
├── README.md                          # Monorepo Overview & Defending Guide
├── react-mini-ecommerce/              # Front-End Mini E-Commerce React Application
│   ├── public/
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   ├── context/                   # Context API + useReducer Cart State
│   │   ├── data/                      # Local dummy JSON dataset (16 items)
│   │   ├── pages/                     # Route pages (Home, ProductDetails, Cart, NotFound)
│   │   └── styles/                    # Global styles & design system
│   ├── package.json
│   ├── vite.config.js
│   └── README.md                      # Detailed React Project Guide
└── node-task-manager-api/             # Back-End Task Management REST API
    ├── prisma/                        # Database Schema, Migrations & Seeders
    ├── src/
    │   ├── config/                    # DB connection & Environment config
    │   ├── controllers/               # Auth & Task controller logic
    │   ├── middleware/                # JWT Auth & Role-based Authorization
    │   ├── routes/                    # API Route definitions
    │   └── server.js                  # Express App entrypoint
    ├── task-manager-api.postman_collection.json # Complete Postman Test Suite
    ├── package.json
    ├── .env.example
    └── README.md                      # Detailed Node.js API Project Guide
```

---

## 🚀 Projects Included

### 1. 🛍️ React Mini E-Commerce App (`/react-mini-ecommerce`)
- **Tech Stack:** React 18, Vite, React Router DOM v6, Context API + `useReducer`, `localStorage`, Pure CSS / Modern UI.
- **Key Features:**
  - Product Listing with live multi-filter search (Name + Category).
  - Detailed Product View (`/product/:id`) with rating, stock, description, and add-to-cart action.
  - Full Shopping Cart management (`/cart`) with quantity updates, line-item removal, total counts, total pricing, and persistent `localStorage` sync.
  - Complete empty, loading, error, and 404 handling states.

### 2. ⚡ Node.js Task Management REST API (`/node-task-manager-api`)
- **Tech Stack:** Node.js, Express.js, Prisma ORM (SQLite / PostgreSQL support), JWT Authentication, bcrypt, dotenv.
- **Key Features:**
  - Complete User Auth (`POST /api/auth/register`, `POST /api/auth/login`).
  - Role-Based Access Control (RBAC): `user` vs `admin`.
  - Task CRUD APIs: Regular users manage their own tasks; Admins view/edit all tasks and exclusively control status transitions via `PATCH /api/tasks/:id/status`.
  - Migrations, automated seeding script with pre-configured Admin & User credentials, and full Postman collection.

---

## 💻 Quick Start Instructions

### Prerequisites
- **Node.js:** v18.x or higher
- **npm:** v9.x or higher

### Running the React Application
```bash
cd react-mini-ecommerce
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running the Node.js REST API
```bash
cd node-task-manager-api
npm install
npm run db:setup
npm run dev
```
The API server will run at [http://localhost:5000](http://localhost:5000).

---

## 🔑 Test Credentials (Task Management API)

| Role | Email | Password | Allowed Actions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@kanishka.com` | `Admin123!` | Access all tasks, create/edit tasks, update status |
| **User** | `john@example.com` | `User123!` | Create tasks, view/edit own tasks only |
| **User** | `jane@example.com` | `User123!` | Create tasks, view/edit own tasks only |

---

## 📚 Technical Interview Defense Guide & Assessment Summary

Please refer to the root document below or individual project READMEs for complete code breakdowns, design trade-offs, edge cases handled, and interview defense questions.
