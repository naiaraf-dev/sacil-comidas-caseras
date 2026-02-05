export default function LoadingSkeleton() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                        key={n}
                        className="bg-white rounded-xl p-5 flex gap-5 animate-pulse"
                    >
                        {/* IMAGEN SKELETON */}
                        <div className="w-32 h-32 rounded-lg bg-gray-200 flex-shrink-0" />

                        {/* CONTENIDO SKELETON */}
                        <div className="flex flex-col flex-1 gap-2">
                            {/* Título */}
                            <div className="h-5 bg-gray-300 rounded w-3/4" />
                            
                            {/* Descripción línea 1 */}
                            <div className="h-4 bg-gray-200 rounded w-full mt-2" />
                            
                            {/* Descripción línea 2 */}
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                            
                            {/* Precio */}
                            <div className="h-6 bg-gray-200 rounded w-1/3 mt-auto" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}