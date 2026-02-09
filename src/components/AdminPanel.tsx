import { useState, useEffect } from "react";
import type { Product } from "../types";

type ProductFormData = {
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
};

export default function AdminPanel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        price: 0,
        category: "viandas",
        image: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const categories = [
        { id: "viandas", label: "Viandas" },
        { id: "empanadas", label: "Empanadas" },
        { id: "pizza", label: "Pizza" },
        { id: "tartas", label: "Tartas" },
        { id: "pan", label: "Pan" },
        { id: "pasteleria", label: "Pastelería" },
        { id: "vegetariano", label: "Vegetariano" },
        { id: "vegano", label: "Vegano" },
        { id: "saludable", label: "Saludable" },
    ];

    // CARGAR PRODUCTOS (incluyendo inactivos)
    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/productos/admin`);
        const data = await res.json();
        setProducts(data);
        } catch (err) {
        console.error("Error cargando productos:", err);
        } finally {
        setLoading(false);
        }
    }

    // ABRIR MODAL PARA NUEVO PRODUCTO
    function handleNewProduct() {
        setEditingProduct(null);
        setFormData({
        name: "",
        description: "",
        price: 0,
        category: "viandas",
        image: "",
        });
        setImageFile(null);
        setImagePreview("");
        setShowModal(true);
    }

    // ABRIR MODAL PARA EDITAR PRODUCTO
    function handleEditProduct(product: Product) {
        setEditingProduct(product);
        setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        category: product.category,
        image: product.image || "",
        });
        setImageFile(null);
        setImagePreview(product.image || "");
        setShowModal(true);
    }

    // MANEJAR CAMBIO DE IMAGEN
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        }
    }

    // GUARDAR PRODUCTO (crear o editar) - ACTUALIZADO PARA CLOUDINARY
    async function handleSaveProduct(e: React.FormEvent) {
        e.preventDefault();

        try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price.toString());
        formDataToSend.append("category", formData.category);

        if (imageFile) {
            // Si hay nueva imagen, subirla
            formDataToSend.append("image", imageFile);
        } else if (editingProduct && editingProduct.image) {
            // Si estamos editando y NO hay nueva imagen, mantener la actual
            formDataToSend.append("currentImage", editingProduct.image);
        }

        if (editingProduct) {
            // Al editar, también enviar el estado active
            formDataToSend.append("active", editingProduct.active ? "true" : "false");
        }

        let url = `${API_URL}/productos`;
        let method = "POST";

        if (editingProduct) {
            url = `${API_URL}/productos/${editingProduct.id}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            body: formDataToSend,
        });

        if (res.ok) {
            setShowModal(false);
            loadProducts();
        } else {
            alert("Error al guardar el producto");
        }
        } catch (err) {
        console.error("Error guardando producto:", err);
        alert("Error al guardar el producto");
        }
    }

    // ACTIVAR/DESACTIVAR PRODUCTO
    async function handleToggleActive(product: Product) {
        try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/productos/${product.id}/toggle`, {
            method: "PATCH"
        });

        if (res.ok) {
            loadProducts();
        } else {
            alert("Error al cambiar estado del producto");
        }
        } catch (err) {
        console.error("Error:", err);
        alert("Error al cambiar estado del producto");
        }
    }

    // Filtrar productos según categoría
    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    // Agrupar productos por categoría
    const productsByCategory = (category: string) => {
        return products.filter((p) => p.category === category);
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] pt-16">
        {/* HEADER */}
        <div className="bg-white shadow-md mb-6 mt-3">
            <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                <h1 className="text-3xl font-bold text-primary">Panel de Administración</h1>
                <p className="text-gray-600 mt-1">Gestión de productos</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                    onClick={handleNewProduct}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nuevo Producto
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* CONTENIDO */}
        <main className="container mx-auto p-4">
            <section className="mb-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* FILTROS DE CATEGORÍAS */}
                <div className="mb-8">
                {/* MOBILE - Scroll horizontal */}
                <div className="md:hidden overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 pb-2">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 border-2 border-primary rounded-full font-semibold whitespace-nowrap transition-colors ${
                            isActive
                                ? "bg-primary text-white"
                                : "bg-white text-primary hover:bg-primary hover:text-white"
                            }`}
                        >
                            {cat.label}
                        </button>
                        );
                    })}
                    </div>
                </div>

                {/* DESKTOP - Grid centrado */}
                <div className="hidden md:flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                        <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-6 py-3 border-2 border-primary rounded-full font-semibold transition-colors ${
                            isActive
                            ? "bg-primary text-white"
                            : "bg-white text-primary hover:bg-primary hover:text-white"
                        }`}
                        >
                        {cat.label}
                        </button>
                    );
                    })}
                </div>
                </div>

                {/* BOTÓN VER TODOS */}
                {selectedCategory && (
                <div className="mb-6">
                    <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    Ver todos los productos
                    </button>
                </div>
                )}

                {/* LISTA DE PRODUCTOS */}
                {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
                ) : selectedCategory ? (
                <>
                    <h3 className="text-2xl font-bold text-primary mb-6">
                    {categories.find((c) => c.id === selectedCategory)?.label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductAdminCard
                        key={product.id}
                        product={product}
                        onEdit={handleEditProduct}
                        onToggleActive={handleToggleActive}
                        />
                    ))}
                    </div>
                </>
                ) : (
                <div className="space-y-16">
                    {categories.map((cat) => {
                    const categoryProducts = productsByCategory(cat.id);
                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={cat.id}>
                        <h3 className="text-2xl font-bold text-primary mb-6">{cat.label}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryProducts.map((product) => (
                            <ProductAdminCard
                                key={product.id}
                                product={product}
                                onEdit={handleEditProduct}
                                onToggleActive={handleToggleActive}
                            />
                            ))}
                        </div>
                        </div>
                    );
                    })}
                </div>
                )}
            </div>
            </section>
        </main>

        {/* MODAL DE PRODUCTO */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">
                    {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                </h2>
                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-primary text-2xl"
                >
                    ✕
                </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-6">
                {/* NOMBRE */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                    Nombre del producto *
                    </label>
                    <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    />
                </div>

                {/* DESCRIPCIÓN */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                    Descripción
                    </label>
                    <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    rows={3}
                    />
                </div>

                {/* PRECIO */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                    Precio ($) *
                    </label>
                    <input
                    type="text"
                    inputMode="numeric"
                    value={formData.price === 0 ? "" : formData.price}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFormData({ ...formData, price: value === '' ? 0 : Number(value) });
                    }}
                    placeholder="Ingrese 0 para 'Precio a consultar'"
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                {/* CATEGORÍA */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                    Categoría *
                    </label>
                    <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.label}
                        </option>
                    ))}
                    </select>
                </div>

                {/* IMAGEN */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                    Imagen del producto
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {imagePreview && (
                    <div className="mt-4">
                        <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                        />
                    </div>
                    )}
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-4">
                    <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm"
                    >
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors shadow-md"
                    >
                    Guardar
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
}

// COMPONENTE CARD DE PRODUCTO PARA ADMIN
type ProductAdminCardProps = {
    product: Product;
    onEdit: (product: Product) => void;
    onToggleActive: (product: Product) => void;
};

function ProductAdminCard({ product, onEdit, onToggleActive }: ProductAdminCardProps) {
    const isActive = product.active !== false;

    return (
        <div
        className={`bg-white rounded-xl p-5 flex gap-5 border border-transparent transition ${
            !isActive ? "opacity-50 bg-gray-100" : ""
        }`}
        >
        {/* IMAGEN */}
        <img
            src={product.image ?? "/img/placeholder.png"}
            alt={product.name}
            className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
        />

        {/* CONTENIDO */}
        <div className="flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-dark leading-tight">
            {product.name}
            {!isActive && (
                <span className="ml-2 text-xs bg-gray-500 text-white px-2 py-1 rounded">
                INACTIVO
                </span>
            )}
            </h3>

            {product.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {product.description}
            </p>
            )}

            <div className="mt-auto pt-3">
            <div className="text-lg text-primary font-bold mb-3">
                {product.price === 0
                ? "Precio a consultar"
                : `$${product.price.toLocaleString()}`}
            </div>

            {/* BOTONES */}
            <div className="flex gap-2">
                <button
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                </svg>
                Editar
                </button>
                <button
                onClick={() => onToggleActive(product)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                >
                {isActive ? "Desactivar" : "Activar"}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}