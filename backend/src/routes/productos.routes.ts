import { Router } from "express";
import { prisma } from "../db/prisma";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar multer para memoria (no disco)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB máximo
    }
});

const router = Router();

// GET /productos - Solo productos ACTIVOS para usuarios normales
router.get("/", async (_req, res) => {
    try {
        const productos = await prisma.product.findMany({
            where: {
                active: true  // Solo mostrar productos activos
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// GET /productos/admin - TODOS los productos (para el panel de admin)
router.get("/admin", async (_req, res) => {
    try {
        const productos = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// GET /productos/:id - Un producto específico
router.get("/:id", async (req, res) => {
    try {
        const producto = await prisma.product.findUnique({
            where: { id: Number(req.params.id) }
        });
        
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        res.json(producto);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

// POST /productos - Crear nuevo producto CON IMAGEN
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        let imageUrl = "";

        // Si hay imagen, subirla a Cloudinary
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "sacil-productos",
                resource_type: "auto"
            });
            
            imageUrl = result.secure_url;
        }

        const nuevo = await prisma.product.create({
            data: { 
                name, 
                price: Number(price), 
                description, 
                image: imageUrl,
                category,
                active: true  // Por defecto activo
            },
        });

        res.status(201).json(nuevo);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
});

// PUT /productos/:id - Actualizar producto CON POSIBLE NUEVA IMAGEN
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, price, description, category, active, currentImage } = req.body;
        let imageUrl = currentImage || ""; // Mantener imagen actual por defecto

        // Si hay nueva imagen, subirla
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            
            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "sacil-productos",
                resource_type: "auto"
            });
            
            imageUrl = result.secure_url;
        }

        const actualizado = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                price: Number(price),
                description,
                image: imageUrl,
                category,
                active: active === "true" || active === true
            }
        });
        
        res.json(actualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

// PATCH /productos/:id/toggle - Activar/Desactivar producto
router.patch("/:id/toggle", async (req, res) => {
    try {
        const producto = await prisma.product.findUnique({
            where: { id: Number(req.params.id) }
        });
        
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const actualizado = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: { active: !producto.active }
        });
        
        res.json(actualizado);
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error al cambiar estado" });
    }
});

export default router;