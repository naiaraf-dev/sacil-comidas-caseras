import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/img/logo-sacil1.png";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/auth/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password })
        });
        
        const data = await res.json();
        
        if (data.success) {
            localStorage.setItem("adminAuth", "true");
            navigate("/admin/productos");
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
        } catch (err) {
        console.error("Error en login:", err);
        setError(true);
        setTimeout(() => setError(false), 3000);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center p-4" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            
            {/* LOGO */}
            <div className="flex flex-col items-center mb-8">
            <img
                src={logo}
                alt="Logo Sacil"
                className="w-24 h-24 rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold text-primary">
                Panel de Administración
            </h1>
            <p className="text-gray-600 text-sm mt-2">
                Sacil Comidas Caseras
            </p>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-dark mb-2">
                Contraseña
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary focus:border-transparent"
                }`}
                required
                disabled={loading}
                />
                {error && (
                <p className="text-red-500 text-sm mt-2">
                    Contraseña incorrecta
                </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Verificando..." : "Ingresar"}
            </button>
            </form>

            {/* VOLVER */}
            <div className="mt-6 text-center">
            <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
                ← Volver al menú
            </button>
            </div>
        </div>
        </div>
    );
}