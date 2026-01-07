import type { Product } from "../types";
import { useState } from "react";

type Props = {
    product: Product;
    onClose: () => void;
    onAdd: (p: Product, note: string) => void;
};

export default function ProductModal({ product, onClose, onAdd }: Props) {
    const [note, setNote] = useState("");

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-full max-w-lg p-5 relative">

            {/* CERRAR */}
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-dark"
            >
            ✕
            </button>

            {/* TÍTULO */}
            <h2 className="text-xl font-bold text-dark mb-4">
            {product.name}
            </h2>

            {/* CUERPO */}
            <div className="flex gap-4">
            {/* IMAGEN */}
            <img
                src={product.image ?? "/images/placeholder.png"}
                alt={product.name}
                className="w-32 h-32 rounded-md object-cover"
            />

            {/* INFO */}
            <div className="flex flex-col flex-1">
                <span className="text-primary font-bold text-lg">
                ${product.price.toLocaleString()}
                </span>

                {product.description && (
                <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                </p>
                )}

                {/* OBSERVACIONES */}
                <textarea
                placeholder="Observaciones (sin cebolla, más cocido, etc.)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="
                    mt-3 w-full border rounded-md p-2 text-sm
                    focus:outline-none focus:ring-1 focus:ring-primary
                "
                rows={3}
                />
            </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end mt-4">
            <button
                onClick={() => onAdd(product, note)}
                className="bg-primary text-white px-5 py-2 rounded-md hover:bg-secondary transition"
            >
                Añadir
            </button>
            </div>
        </div>
        </div>
    );
}
