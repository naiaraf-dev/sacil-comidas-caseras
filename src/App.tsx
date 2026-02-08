import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import type { Product } from "./types";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import { useCart } from "./hooks/useCart";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";
import CartButton from "./components/CartButton";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSkeleton from "./components/LoadingSkeleton";
import SobreSacil from "./components/SobreSacil";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const cart = useCart();
  const [showCart, setShowCart] = useState(false);

  // FORZAR SCROLL AL TOP AL CARGAR LA PÁGINA
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // CARGAR PRODUCTOS DEL BACKEND
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/productos`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filtrar productos según categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // Agrupar productos por categoría
  const productsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  const categories = [
    { id: "viandas", label: "Viandas" },
    { id: "empanadas", label: "Empanadas" },
    { id: "pizza", label: "Pizza" },
    { id: "tartas", label: "Tartas" },
    { id: "pan", label: "Pan" },
    { id: "pasteleria", label: "Pastelería" },
    { id: "vegano", label: "Vegano" },
  ];

  function handleCheckout() {
    const items = cart.items;

    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const lines = ["Hola! Quiero hacer un pedido:", ""];

    items.forEach((it) => {
      if (it.product.price === 0) {
        lines.push(`• ${it.product.name} x${it.quantity} - Precio a consultar`);
      } else {
        lines.push(
          `• ${it.product.name} x${it.quantity} - $${(
            it.product.price * it.quantity
          ).toLocaleString()}`
        );
      }

      if (it.note) {
        lines.push(`  ↳ Observación: ${it.note}`);
      }
    });

    const total = cart.total();

    lines.push("", `Total: $${total.toLocaleString()}`);
    lines.push("", "¿Podrían confirmar disponibilidad y horario de entrega?");

    const msg = encodeURIComponent(lines.join("\n"));
    const phoneNumber = "5491133049107";

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, "_blank");
  }

  const items = cart.items;

  const onInc = (id: number, note?: string) => {
    const it = items.find((i) => i.product.id === id && i.note === note);
    if (it) {
      cart.add(it.product, 1, note);
    }
  };

  const onDec = (id: number, note?: string) => {
    const it = items.find((i) => i.product.id === id && i.note === note);
    if (it) {
      cart.updateQty(id, it.quantity - 1, note);
    }
  };

  const onRemove = (id: number, note?: string) => {
    cart.remove(id, note);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Navbar 
          onCategoryChange={setSelectedCategory} 
          selectedCategory={selectedCategory}
        />

        <Routes>
          <Route
            path="/"
            element={
              <main className="pt-28 md:pt-32 container mx-auto p-4">
                {/* PRODUCTOS */}
                <section className="mb-12">
                  <div className="max-w-7xl mx-auto px-4">
                    
                    {/* FILTROS DE CATEGORÍAS (MOBILE Y DESKTOP) */}
                    <div className="mb-8">
                      {/* MOBILE - Scroll horizontal sin barra */}
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

                    {/* BOTÓN VER TODOS (solo cuando hay categoría seleccionada) */}
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
                      <LoadingSkeleton />
                    ) : selectedCategory ? (
                      // Mostrar solo la categoría seleccionada
                      <>
                        <h3 className="text-2xl font-bold text-primary mb-6">
                          {categories.find((c) => c.id === selectedCategory)?.label}
                        </h3>
                        <ProductList
                          products={filteredProducts}
                          onProductClick={setSelectedProduct}
                        />
                      </>
                    ) : (
                      // Mostrar todas las categorías
                      <div className="space-y-16">
                        {categories.map((cat) => {
                          const categoryProducts = productsByCategory(cat.id);
                          if (categoryProducts.length === 0) return null;

                          return (
                            <div key={cat.id} id={cat.id}>
                              <h3 className="text-2xl font-bold text-primary mb-6">
                                {cat.label}
                              </h3>
                              <ProductList
                                products={categoryProducts}
                                onProductClick={setSelectedProduct}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </section>
              </main>
            }
          />
          <Route path="/sobre-sacil" element={<SobreSacil />} />
        </Routes>

        <CartButton
          itemCount={cart.items.length}
          total={cart.total()}
          onOpen={() => setShowCart(true)}
        />

        <ScrollToTop />

        {showCart && (
          <CartDrawer
            items={items}
            onClose={() => setShowCart(false)}
            onInc={onInc}
            onDec={onDec}
            onRemove={onRemove}
            total={cart.total()}
            onCheckout={() => {
              setShowCart(false);
              handleCheckout();
            }}
          />
        )}

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={(product, note) => {
              cart.add(product, 1, note);
              setSelectedProduct(null);
            }}
          />
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App;