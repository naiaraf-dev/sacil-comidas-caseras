import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

// GET /productos
router.get("/", async (_req, res) => {
    const productos = await prisma.product.findMany();
    res.json(productos);
});

// POST /productos
router.post("/", async (req, res) => {
    const { name, price, description, image, category } = req.body;

    const nuevo = await prisma.product.create({
        data: { name, price, description, image, category },
    });

    res.json(nuevo);
});

export default router;
