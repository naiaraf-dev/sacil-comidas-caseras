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

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/naiaraf-dev/sacil-comidas-caseras.git
cd SacilComidasCaseras
```
---

### 2️⃣ Configuración del backend

Entrar a la carpeta del backend:
```bash
cd backend
```

Instalar dependencias:
```bash
npm install
```

Crear el archivo de variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo .env y configurar la variable DATABASE_URL según tu base de datos.

Ejecutar migraciones de Prisma (si corresponde):
```bash
npx prisma migrate dev
```

Iniciar el servidor backend:
```bash
npm run dev

El backend quedará corriendo por defecto en http://localhost:3000 (o el puerto configurado).
```

---

### 3️⃣ Configuración del frontend

Volver a la raíz del proyecto:
```bash
cd ..
```

Instalar dependencias del frontend:
```bash
npm install
```

Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en:
```bash
http://localhost:5173
```

---

## Notas

- El archivo .env no se versiona por razones de seguridad.

- La base de datos local (SQLite) se utiliza solo para desarrollo.

- Las imágenes del menú se encuentran en la carpeta public/.
