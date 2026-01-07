import express from "express";
import productosRouter from "./routes/productos.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use("/img", express.static("public/img"));

// rutas
app.use("/productos", productosRouter);

// iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
