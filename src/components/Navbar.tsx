import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/img/logo-sacil1.png";

type NavbarProps = {
    onCategoryChange?: (category: string | null) => void;
    selectedCategory?: string | null;
};

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

export default function Navbar({ onCategoryChange, selectedCategory }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(true);
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin/productos");

    const handleCategoryClick = (categoryId: string | null) => {
        if (onCategoryChange) {
            onCategoryChange(categoryId);
        }
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleMenuClick = () => {
        if (location.pathname === "/") {
            setIsMenuDropdownOpen(!isMenuDropdownOpen);
        } else {
            setIsMenuOpen(false);
            if (onCategoryChange) onCategoryChange(null);
        }
    };

    return (
        <>
        <header className="fixed top-0 left-0 w-full z-50 bg-lightbg shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
            <div className="flex items-center justify-between">
                
                {/* LOGO + NOMBRE */}
                <Link to="/" className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Logo Sacil"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <h1 className="font-bold text-primary text-base sm:text-lg md:text-xl">
                    Sacil Comidas Caseras
                </h1>
                </Link>

                {/* NAVEGACIÓN DESKTOP */}
                <nav className="hidden md:flex items-center gap-7 flex-shrink-0">
                <Link
                    to="/"
                    className={`text-base font-semibold transition-colors ${
                    location.pathname === "/"
                        ? "text-primary"
                        : "text-dark hover:text-primary"
                    }`}
                >
                    Menú
                </Link>
                <Link
                    to="/sobre-sacil"
                    className={`text-base font-semibold transition-colors ${
                    location.pathname === "/sobre-sacil"
                        ? "text-primary"
                        : "text-dark hover:text-primary"
                    }`}
                >
                    Sobre Sacil
                </Link>

                {isAdminRoute && (
                <button
                    onClick={() => {
                    localStorage.removeItem("adminAuth");
                    window.location.href = "/admin";
                    }}
                    className="border-2 border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                    Cerrar sesión
                </button>
                )}
                </nav>

                {/* MENÚ HAMBURGUESA MOBILE */}
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Menú"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 text-primary"
                >
                    {isMenuOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                    )}
                </svg>
                </button>
            </div>
            </div>
        </header>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-lightbg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex flex-col h-full">
            {/* HEADER DEL MENÚ */}
            <div className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: '#E5E7EB' }}
            >
                <h2 className="text-2xl font-bold text-primary">Navegación</h2>
                <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-primary"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>

            {/* CONTENIDO SCROLLEABLE */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* MENÚ PRINCIPAL CON DROPDOWN */}
                <div className="mb-2">
                {location.pathname === "/" ? (
                    // Si estamos en la home, mostrar como dropdown
                    <button
                    onClick={handleMenuClick}
                    className={`w-full flex items-center justify-between text-lg font-semibold transition-colors py-3 px-4 rounded-lg relative ${
                        location.pathname === "/" ? "bg-primary/5" : ""
                    }`}
                    style={{
                        color: location.pathname === "/" ? '#E07A3D' : '#6B7280'
                    }}
                    >
                    {location.pathname === "/" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />
                    )}
                    <span>Menú</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-5 transition-transform ${
                        isMenuDropdownOpen ? "rotate-180" : ""
                        }`}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                    </button>
                ) : (
                    // Si estamos en otra página, mostrar como link normal
                    <Link
                    to="/"
                    onClick={() => {
                        setIsMenuOpen(false);
                        if (onCategoryChange) onCategoryChange(null);
                    }}
                    className={`block text-lg font-semibold transition-colors py-3 px-4 rounded-lg relative ${
                        location.pathname === "/" ? "bg-primary/5" : ""
                    }`}
                    style={{
                        color: location.pathname === "/" ? '#E07A3D' : '#6B7280'
                    }}
                    >
                    {location.pathname === "/" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />
                    )}
                    Menú
                    </Link>
                )}

                {/* CATEGORÍAS DROPDOWN - CON LÍNEA VERTICAL */}
                {location.pathname === "/" && (
                    <div
                    className={`overflow-hidden transition-all duration-300 ${
                        isMenuDropdownOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                    >
                    <div 
                        className="relative ml-4 pl-3 border-l-2"
                        style={{ borderColor: '#D1D5DB' }}
                    >
                        {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        
                        return (
                            <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`block w-full text-left py-3 px-3 rounded-lg transition-all ${
                                isActive ? "bg-primary/5 font-semibold" : ""
                            }`}
                            style={{ 
                                color: isActive ? '#E07A3D' : '#6B7280',
                            }}
                            >
                            {cat.label}
                            </button>
                        );
                        })}
                    </div>
                    </div>
                )}
                </div>

                {/* SOBRE SACIL */}
                <div className="mb-2">
                <Link
                    to="/sobre-sacil"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-semibold transition-colors py-3 px-4 rounded-lg relative ${
                    location.pathname === "/sobre-sacil" ? "bg-primary/5" : ""
                    }`}
                    style={{
                        color: location.pathname === "/sobre-sacil" ? '#E07A3D' : '#6B7280'
                    }}
                >
                    {location.pathname === "/sobre-sacil" && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />
                    )}
                    Sobre Sacil
                </Link>
                </div>
            </div>

            {isAdminRoute && (
            <div className="px-6 pb-4">
                <button
                onClick={() => {
                    setIsMenuOpen(false);
                    localStorage.removeItem("adminAuth");
                    window.location.href = "/admin";
                }}
                className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                Cerrar sesión
                </button>
            </div>
            )}

            {/* FOOTER DEL MENÚ - CONTACTO */}
            <div className="p-6 border-t bg-lightbg"
                style={{ borderColor: '#E5E7EB' }}
            >
                <h3 className="text-sm font-semibold uppercase mb-3"
                    style={{ color: '#9CA3AF' }}
                >
                Redes sociales
                </h3>
                <a
                href="https://www.instagram.com/sacilcomidascaseras"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors"
                style={{ color: '#6B7280' }}
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span className="font-medium">Instagram</span>
                </a>

            </div>
            </div>
        </div>

        {/* OVERLAY */}
        {isMenuOpen && (
            <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
            />
        )}
        </>
    );
}