export default function Footer() {
    return (
        <footer className="relative mt-16 bg-lightbg shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            
            {/* IZQUIERDA */}
            <div className="flex items-center gap-3">
            <img
                src="/src/assets/logo-sacil1.png"
                alt="Logo Sacil"
                className="w-8 h-8 rounded-full"
            />

            <div className="text-sm text-dark">
                <p className="font-semibold text-primary">
                Sacil Comidas Caseras
                </p>
                <p className="text-gray-500">
                © 2025 · Todos los derechos reservados
                </p>
            </div>
            </div>

            {/* DERECHA */}
            <a
            href="https://github.com/TU_USUARIO"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-4 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
            title="Hecho por naiaraf-dev"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
            >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.333-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.435.375.81 1.11.81 2.235 0 1.61-.015 2.91-.015 3.305 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Hecho por naiaraf-dev</span>
            </a>
        </div>
        </footer>
    );
}
