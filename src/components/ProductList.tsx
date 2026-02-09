import ProductCard from "./ProductCard";
import type { Product } from "../types";

type Props = {
    products: Product[];
    onProductClick: (product: Product) => void;
};

export default function ProductList({ products, onProductClick }: Props) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(p => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onClick={() => onProductClick(p)}
                    />
                ))}
            </div>
        </div>
    );
}