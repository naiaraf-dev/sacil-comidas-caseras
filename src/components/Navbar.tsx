import { useEffect, useState, useRef } from "react";
import logo from "/img/logo-sacil1.png";

const categories = [
    { id: "viandas", label: "Viandas" },
    { id: "empanadas", label: "Empanadas" },
    { id: "pizza", label: "Pizza" },
    { id: "tartas", label: "Tartas" },
    { id: "pan", label: "Pan" },
    { id: "pasteleria", label: "Pastelería" },
    { id: "vegano", label: "Vegano" },
];

export default function Navbar() {
    const [shrink, setShrink] = useState(false);
    const [active, setActive] = useState("viandas");

    const navRef = useRef<HTMLDivElement | null>(null);

    /* shrink header */
    useEffect(() => {
        const onScroll = () => setShrink(window.scrollY > 80);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* detectar sección activa con scroll */
    useEffect(() => {
        const handleScroll = () => {
            // Punto de referencia: centro superior de la pantalla visible
            const scrollPosition = window.scrollY + 200; // Ajustado para tu navbar
            
            let currentSection = categories[0].id;
            
            // Recorrer todas las secciones
            for (const cat of categories) {
                const section = document.getElementById(cat.id);
                if (!section) continue;
                
                const sectionTop = section.offsetTop;
                
                // Si el scroll pasó el inicio de esta sección, es la activa
                if (scrollPosition >= sectionTop) {
                    currentSection = cat.id;
                }
            }
            
            setActive(currentSection);
        };

        // Ejecutar inmediatamente y en cada scroll
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* AUTO SCROLL HORIZONTAL SOLO EN MOBILE */
    useEffect(() => {
        if (window.innerWidth >= 768) return; 

        const nav = navRef.current;
        if (!nav) return;

        const activeBtn = nav.querySelector<HTMLButtonElement>(
            `[data-cat="${active}"]`
        );

        if (activeBtn) {
            activeBtn.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [active]);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setActive(id);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-lightbg shadow-lg flex flex-col">
            {/* TOP BAR */}
            <div
                className={`w-full max-w-[900px] mx-auto px-4 transition-all duration-300 ${
                    shrink ? "py-2" : "py-4"
                }`}
            >
                <div className="flex items-center gap-4 justify-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className={`rounded-full transition-all duration-300 ${
                            shrink ? "w-12 h-12" : "w-20 h-20"
                        }`}
                    />

                    <div className="flex flex-col leading-tight">
                        <h1
                            className={`font-bold text-primary transition-all duration-300 ${
                                shrink ? "text-lg" : "text-2xl"
                            }`}
                        >
                            Sacil Comidas Caseras
                        </h1>

                        {/* <span
                        className={`text-xs text-dark/70 transition-all duration-300 ${
                            shrink ? "mt-0" : "mt-1"
                        }`}
                        >
                        Envíos según zona
                        </span> */}
                    </div>
                </div>
            </div>

            {/* CATEGORÍAS */}
            <div className="relative w-full max-w-[900px] mx-auto overflow-hidden">
                <nav
                ref={navRef}
                id="cats-scroll"
                className="
                    flex
                    overflow-x-auto
                    bg-lightbg
                    whitespace-nowrap
                    justify-start
                    md:justify-center
                    px-4
                "
                >
                    {categories.map(cat => {
                        const isActive = active === cat.id;

                        return (
                            <button
                                key={cat.id}
                                data-cat={cat.id}
                                onClick={() => handleScroll(cat.id)}
                                className={`group relative px-4 py-3 text-lg ${
                                    isActive ? "text-primary" : "text-dark"
                                }`}
                            >
                                {cat.label}

                                {isActive && (
                                    <span className="absolute left-0 bottom-0 h-[5px] w-full bg-primary" />
                                )}

                                {!isActive && (
                                    <span className="absolute left-0 bottom-0 h-[4px] w-full bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}