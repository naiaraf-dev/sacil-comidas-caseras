type Props = {
    itemCount: number;
    total: number;
    onOpen: () => void;
};

export default function CartButton({ itemCount, total, onOpen }: Props) {
    return (
        <div
            onClick={onOpen}
            className="
                fixed bottom-4 left-1/2 -translate-x-1/2
                bg-primary text-white w-[75%] max-w-sm
                rounded-2xl shadow-lg px-4 py-2
                flex justify-between items-center
                cursor-pointer z-50
                transition-all
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
