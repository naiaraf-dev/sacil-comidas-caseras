import { useState, useEffect } from "react";

type Props = {
    itemCount: number;
    total: number;
    onOpen: () => void;
};

export default function CartButton({ itemCount, total, onOpen }: Props) {
    const [bottomPosition, setBottomPosition] = useState(16);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Distancia desde el top del footer hasta el bottom de la ventana
                const footerTopFromBottom = windowHeight - footerRect.top;
                
                if (footerTopFromBottom > 0) {
                    // El footer está visible, mantener el botón 16px arriba del footer
                    setBottomPosition(footerTopFromBottom + 16);
                } else {
                    // Footer no visible, posición normal
                    setBottomPosition(16);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            onClick={onOpen}
            style={{ bottom: `${bottomPosition}px` }}
            className="
                fixed left-1/2 -translate-x-1/2
                bg-primary text-white w-[75%] max-w-sm
                rounded-2xl shadow-lg px-4 py-2
                flex justify-between items-center
                cursor-pointer z-40
                transition-all duration-300
            "
        >
            {/* IZQUIERDA: cantidad + total */}
            <div>
                <div className="text-xs opacity-90">
                    {itemCount} producto{itemCount !== 1 ? "s" : ""}
                </div>

                <div className="text-xl font-bold">
                    ${total.toLocaleString()}
                </div>
            </div>

            <div className="flex items-center gap-1 text-base font-semibold">
                <span className="text-xl">🛒</span>
                Ver pedido
            </div>
        </div>
    );
}