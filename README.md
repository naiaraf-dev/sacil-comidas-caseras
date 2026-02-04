# Sacil Comidas Caseras

Web application developed for a homemade food business.  
The project features a **modern frontend** to display the menu by categories and a **backend API** connected to a database to manage products.

This is a **personal project** built for my mom’s homemade food business, which allowed me to practice **frontend and backend development in a real-world scenario**.  
The main goals were to work with **React + Tailwind CSS** and to integrate a **database-driven backend** to dynamically fetch menu items.

🔗 Live demo: https://sacilcomidascaseras.com

---

## Features

- Responsive UI (mobile-first)
- Product listing by category
- Product detail modal
- Shopping cart with quantity control and notes
- WhatsApp checkout integration
- Dynamic data fetched from backend API
- Smooth scrolling navigation with active section detection

---

## Project structure

The repository is organized as a **monorepo**, containing both frontend and backend in a single project:

```
SacilComidasCaseras/
├── Backend/ # Backend (Node.js + Prisma)
│ ├── src/
│ │ ├── .env.example
│ │ └── .env # NO versionado
│ └── node_modules/
│
├── public/ # Imágenes y recursos estáticos
├── src/ # Frontend (React + Vite)
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.ts
├── .gitignore
├── .gitattributes
└── README.md
```

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Prisma ORM
- PostgreSQL / Prisma Postgres
- Environment variables with `.env`

---
## Getting started (Run locally)

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- A Prisma-compatible database (PostgreSQL / Prisma Postgres)

---
## Installation and local setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/naiaraf-dev/sacil-comidas-caseras.git
cd SacilComidasCaseras
```

---

### 2️⃣ Backend setup

Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```

Create the environment variables file:
```bash
cp .env.example .env
```
Edit the .env file and configure the DATABASE_URL according to your database.

Run Prisma migrations and seed the database:
```bash
npx prisma migrate reset
```
This command will:
- Drop and recreate the database
- Apply all migrations
- Automatically run the Prisma seed

Start the backend server:
```bash
npm run dev
```

The backend will run by default on:
```bash
http://localhost:3000
```
(or the port configured in your environment variables).

---

### 3️⃣ Frontend setup

Go back to the project root:
```bash
cd ..
```

Install frontend dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at:
```bash
http://localhost:5173
```

---

## Notes

- The .env file is not versioned for security reasons.

- The database is used only for development purposes.

- Menu images and static assets are located in the public/ folder.
