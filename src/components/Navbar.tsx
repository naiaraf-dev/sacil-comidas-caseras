import { useEffect, useState, useRef } from "react";

type DayKey =
    | "lunes"
    | "martes"
    | "miercoles"
    | "jueves"
    | "viernes"
    | "sabado"
    | "domingo";

type ScheduleMap = Record<DayKey, { open: string; close: string }>;

const categories = [
    { id: "platos", label: "Platos" },
    { id: "empanadas", label: "Empanadas" },
    { id: "pizza", label: "Pizza" },
    { id: "tartas", label: "Tartas" },
    { id: "pan", label: "Pan" },
    { id: "pasteleria", label: "Pastelería" },
    { id: "vegano", label: "Vegano" },
    { id: "viandas", label: "Viandas" },
    { id: "envio", label: "Envío" },
];

// Horarios por día
const schedule: ScheduleMap = {
    lunes: { open: "09:00", close: "22:00" },
    martes: { open: "09:00", close: "22:00" },
    miercoles: { open: "09:00", close: "22:00" },
    jueves: { open: "09:00", close: "22:00" },
    viernes: { open: "09:00", close: "22:00" },
    sabado: { open: "09:00", close: "20:00" },
    domingo: { open: "10:00", close: "16:00" },
};

const days: DayKey[] = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
];

function isOpenNow() {
    const now = new Date();
    const today = days[now.getDay()];
    const { open, close } = schedule[today];

    const [h1, m1] = open.split(":").map(Number);
    const [h2, m2] = close.split(":").map(Number);

    const openTime = new Date();
    openTime.setHours(h1, m1, 0);

    const closeTime = new Date();
    closeTime.setHours(h2, m2, 0);

    return now >= openTime && now <= closeTime;
}

export default function Navbar() {
    const [shrink, setShrink] = useState(false);
    const [active, setActive] = useState("platos");
    const open = isOpenNow();

    const navRef = useRef<HTMLDivElement | null>(null);

    const today = days[new Date().getDay()];
    const todaySchedule = schedule[today];

    /* shrink header */
    useEffect(() => {
        const onScroll = () => setShrink(window.scrollY > 80);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* detectar sección activa */
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const rect = entry.boundingClientRect;

                // si la sección está cerca del top visible
                if (rect.top >= 0 && rect.top < 200) {
                setActive(entry.target.id);
                }
            });
            },
            {
            rootMargin: "-140px 0px -50% 0px",
            threshold: [0, 0.1, 0.25],
            }
        );

        categories.forEach(cat => {
            const el = document.getElementById(cat.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
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
                src="/src/assets/logo-sacil1.png"
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

                <div className="relative group cursor-pointer w-fit">
                <p className="text-sm text-dark">
                    Horarios{" "}
                    <span className="text-gray">
                    Hoy {todaySchedule.open} a {todaySchedule.close}
                    </span>
                </p>

                <span
                    className={`text-sm font-semibold ${
                    open ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {open ? "Abierto" : "Cerrado"}
                </span>

                <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-xl p-3 text-sm opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[999]">
                    {Object.entries(schedule).map(([day, hours]) => (
                    <div key={day} className="flex justify-between py-1">
                        <span className="capitalize">{day}</span>
                        <span className="text-gray-600">
                        {hours.open} - {hours.close}
                        </span>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* CATEGORÍAS */}
        <div className="relative w-full max-w-[900px] mx-auto overflow-hidden">
            <nav
            ref={navRef}
            id="cats-scroll"
            className="flex overflow-x-auto bg-lightbg px-10 whitespace-nowrap"
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
