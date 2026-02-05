import { useState, useEffect } from "react";
import type { Product } from "./types";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import { useCart } from "./hooks/useCart";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";
import CartButton from "./components/CartButton";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/productos`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    }

    loadProducts();
  }, []);

  // helper por categoría
  function productsByCategory(category: string) {
    return products.filter(p => p.category === category);
  }

  function handleCheckout() {
    const items = cart.items;

    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const lines = ["Hola! Quiero hacer un pedido:", ""];

    items.forEach(it => {
      if (it.product.price === 0) {
        lines.push(
          `• ${it.product.name} x${it.quantity} - Precio a consultar`
        );
      } else {
        lines.push(
          `• ${it.product.name} x${it.quantity} - $${(it.product.price * it.quantity).toLocaleString()}`
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
    const it = items.find(
      i => i.product.id === id && i.note === note
    );
    if (it) {
      cart.add(it.product, 1, note);
    }
  };

  const onDec = (id: number, note?: string) => {
    const it = items.find(
      i => i.product.id === id && i.note === note
    );
    if (it) {
      cart.updateQty(id, it.quantity - 1, note);
    }
  };

  const onRemove = (id: number, note?: string) => {
    cart.remove(id, note);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <main className="pt-32 container mx-auto p-4">

        {/* VIANDAS */}
        <section id="viandas" className="scroll-mt-36 pt-20 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Viandas
            </h2>

            <ProductList
              products={productsByCategory("viandas")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>

        {/* EMPANADAS */}
        <section id="empanadas" className="scroll-mt-36 pt-12 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Empanadas
            </h2>

            <ProductList
              products={productsByCategory("empanadas")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>

        {/* PIZZA */}
        <section id="pizza" className="scroll-mt-36 pt-12 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Pizza
            </h2>

            <ProductList
              products={productsByCategory("pizza")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>

        <section
          id="tartas"
          className="scroll-mt-36 pt-12 mb-12"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Tartas
            </h2>

            <ProductList
              products={productsByCategory("tartas")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>

        {/* PAN */}
        <section id="pan" className="scroll-mt-36 pt-12 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Pan
            </h2>

            <ProductList
              products={productsByCategory("pan")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>

        {/* PASTELERÍA */}
        <section id="pasteleria" className="scroll-mt-36 pt-12 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Pastelería
            </h2>

            <ProductList
              products={productsByCategory("pasteleria")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>

        {/* VEGANO */}
        <section id="vegano" className="scroll-mt-36 pt-12 mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-6 pl-4">
              Vegano
            </h2>

            <ProductList
              products={productsByCategory("vegano")}
              onProductClick={setSelectedProduct}
            />
          </div>
        </section>
      </main>

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

      {/* MODAL PRODUCTO */}
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
  );
}

export default App;
