import { Router } from "express";

const router = Router();

// POST /auth/admin/login - Validar contraseña de admin
router.post("/admin/login", async (req, res) => {
    try {
        const { password } = req.body;
        
        // Contraseña desde variable de entorno (SEGURA)
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        
        // Verificar que exista la variable de entorno
        if (!ADMIN_PASSWORD) {
        return res.status(500).json({ 
            success: false, 
            message: "Error de configuración del servidor" 
        });
        }
        
        if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
        } else {
        res.status(401).json({ success: false, message: "Contraseña incorrecta" });
        }
    } catch (err) {
        console.error("Error en login admin:", err);
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

export default router;