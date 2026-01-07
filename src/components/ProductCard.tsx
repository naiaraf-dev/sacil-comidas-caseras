import type { Product } from "../types";

type Props = {
    product: Product;
    onClick: () => void;
};

export default function ProductCard({ product, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className="
                bg-white rounded-xl p-5 flex gap-5
                border border-transparent
                hover:border-primary hover:shadow-lg
                transition cursor-pointer
            "
        >
            {/* IMAGEN */}
            <img
                src={product.image ?? "/images/placeholder.png"}
                alt={product.name}
                className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
            />

            {/* CONTENIDO */}
            <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-dark leading-tight">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto pt-3 text-lg text-primary font-bold">
                    ${product.price.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

