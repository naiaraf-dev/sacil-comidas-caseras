import { useState, useEffect } from "react";
import type { Product } from "../types";

export type CartItem = {
    product: Product;
    quantity: number;
    note?: string;
};

const STORAGE_KEY = "sacil_cart_v2";

export function useCart() {
    const [items, setItems] = useState<CartItem[]>(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        try {
        return JSON.parse(raw) as CartItem[];
        } catch {
        console.error("Carrito corrupto, reseteando…");
        return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function add(product: Product, qty = 1, note?: string) {
        setItems(prev => {
        const existing = prev.find(
            i => i.product.id === product.id && i.note === note
        );

        if (existing) {
            return prev.map(i =>
            i === existing
                ? { ...i, quantity: i.quantity + qty }
                : i
            );
        }

        return [...prev, { product, quantity: qty, note }];
        });
    }

    function remove(productId: number, note?: string) {
        setItems(prev =>
        prev.filter(
            i => !(i.product.id === productId && i.note === note)
        )
        );
    }

    function updateQty(productId: number, qty: number, note?: string) {
        setItems(prev =>
        prev
            .map(i =>
            i.product.id === productId && i.note === note
                ? { ...i, quantity: Math.max(0, qty) }
                : i
            )
            .filter(i => i.quantity > 0)
        );
    }

    function clear() {
        setItems([]);
    }

    function total() {
        return items.reduce(
        (s, it) => s + it.product.price * it.quantity,
        0
        );
    }

    return { items, add, remove, updateQty, clear, total };
}
