import logo from "/img/logo-sacil1.png";

export default function Footer() {
    return (
        <footer className="relative mt-16 bg-lightbg shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.15)]">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                
                {/* IZQUIERDA */}
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Logo Sacil"
                        className="w-8 h-8 rounded-full"
                    />

                    <div className="text-sm text-dark">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-primary">
                                Sacil Comidas Caseras
                            </p>
                            <a
                                href="https://www.instagram.com/sacilcomidascaseras"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-primary transition-colors hidden sm:inline"
                                aria-label="Instagram de Sacil"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-gray-500">
                            © 2025 · Todos los derechos reservados
                        </p>
                    </div>
                </div>

                {/* DERECHA */}
                <div className="absolute bottom-3 right-4 flex items-center gap-2 text-sm sm:text-sm text-gray-500">
                    <span className="hidden sm:inline">Hecho por</span>

                    <a
                        href="https://github.com/naiaraf-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        title="GitHub naiaraf-dev"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                        >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.435.375.81 1.11.81 2.235 0 1.61-.015 2.91-.015 3.305 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>

                        <span className="text-xs sm:text-sm">naiaraf-dev</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
