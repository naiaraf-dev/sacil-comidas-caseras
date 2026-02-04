import express from "express";
import productosRouter from "./routes/productos.routes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: [
        "http://localhost:5173",
        // después agregamos acá el dominio de Vercel
        ],
    })
);

// servir imágenes
app.use("/img", express.static("public/img"));

// rutas
app.use("/productos", productosRouter);

// puerto dinámico (OBLIGATORIO en prod)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});