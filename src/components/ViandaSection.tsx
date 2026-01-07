export default function ViandasSection() {
    return (
        <section id="viandas" className="px-4 py-6 max-w-[900px] mx-auto">

            {/* TÍTULO */}
            <h2 className="text-2xl font-bold text-primary mb-3">
                Viandas Caseras
            </h2>

            {/* EXPLICACIÓN */}
            <p className="text-dark mb-4 leading-relaxed">
                Armá tu vianda eligiendo cualquier plato del menú. 
                Podés combinar proteínas, guarniciones y opciones saludables. 
                Las porciones están pensadas para un almuerzo o cena completos.
            </p>

            {/* BOTÓN IR A PLATOS */}
            <button
                onClick={() => {
                    const section = document.getElementById("platos");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="
                    bg-primary text-white px-5 py-3 rounded-xl 
                    font-semibold shadow-md hover:bg-primary/80
                    transition-all
                "
            >
                Ver Platos y Armar Mi Vianda
            </button>

        </section>
    );
}
