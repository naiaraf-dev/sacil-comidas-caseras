# Sacil Comidas Caseras

Aplicación web para un emprendimiento de comidas caseras.  
El proyecto cuenta con un **frontend moderno** para mostrar el menú por categorías y un **backend** con conexión a base de datos.

Es un proyecto personal desarrollado para el emprendimiento de comidas caseras de mi mamá, que me dio la posibilidad de practicar desarrollo frontend y backend en un caso real.

---

## Estructura del proyecto

El repositorio está organizado como un **monorepo**, con frontend y backend en el mismo proyecto:

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

## Tecnologías utilizadas

### Frontend
- React
- Vite
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Prisma ORM
- PostgreSQL / Prisma Postgres
- Variables de entorno con `.env`

---

## Requisitos previos

Para ejecutar el proyecto necesitás tener instalado:

- Node.js (v18 o superior recomendado)
- npm
- Una base de datos compatible con Prisma (PostgreSQL / Prisma)

---

## Instalación y ejecución

### Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/SacilComidasCaseras.git
cd SacilComidasCaseras
```
