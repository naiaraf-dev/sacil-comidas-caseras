export default function SobreSacil() {
    return (
        <div className="bg-[#F5F5F5] pt-20 flex min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">

                    <div className="flex flex-col md:flex-row gap-10 items-center text-dark">
                        
                        {/* Imagen */}
                        <div className="md:w-1/2">
                            <img
                                src="/img/sacil_about.jpeg"
                                alt="Sobre nosotros"
                                className="rounded-xl w-full object-cover"
                            />
                        </div>

                        {/* Texto */}
                        <div className="md:w-1/2 flex items-center">
                            <div className="space-y-5 text-left leading-relaxed max-w-md">
                                <p className="text-lg">
                                    En <span className="font-semibold text-primary">Sacil Comidas Caseras</span>, 
                                    preparo cada plato con dedicación y amor, como si fuera para mi propia familia.
                                </p>

                                <p>
                                    Me especializo en comida casera de calidad, elaborada con ingredientes frescos 
                                    y recetas tradicionales que me han acompañado por generaciones.
                                </p>

                                <p>
                                    Ya sea que busques viandas para toda la semana, empanadas para compartir, 
                                    o un plato especial para el día, vas a encontrar opciones pensadas con cuidado y sabor casero.
                                </p>

                                <p className="font-semibold text-primary text-center">
                                    ¡Gracias por confiar en mí para llevar sabor casero a tu mesa! 🧡
                                </p>

                                {/* Divider centrado */}
                                <div className="pt-6 flex justify-center">
                                    <div className="w-full h-[2px] bg-primary rounded-full" />
                                </div>

                                {/* Redes sociales */}
                                <div className="pt-4 flex items-center gap-3 text-sm text-gray-600">
                                    <span className="uppercase tracking-wide">
                                        Redes sociales:
                                    </span>

                                    <a
                                        href="https://www.instagram.com/sacilcomidascaseras"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:opacity-80 transition-opacity"
                                        aria-label="Instagram Sacil Comidas Caseras"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z" />
                                            <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                                            <circle cx="17.5" cy="6.5" r="1.25" />
                                        </svg>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
