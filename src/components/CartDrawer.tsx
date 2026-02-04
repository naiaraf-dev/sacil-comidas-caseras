import type { CartItem } from "../hooks/useCart";

type Props = {
    items: CartItem[];
    onClose: () => void;
    onInc: (id: number, note?: string) => void;
    onDec: (id: number, note?: string) => void;
    onRemove: (id: number, note?: string) => void;
    total: number;
    onCheckout: () => void;
};

export default function CartDrawer({ items, onClose, onInc, onDec, onRemove, total, onCheckout }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-end z-50">

            {/* CONTENEDOR DEL DRAWER */}
            <div className="bg-lightbg w-full sm:w-[450px] rounded-t-3xl shadow-2xl p-6 h-[60vh] flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Pedido</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 text-3xl leading-none hover:text-primary"
                    >
                        ×
                    </button>
                </div>

                {/* ZONA SCROLLEABLE */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-gray-500">Tu carrito está vacío</p>
                    ) : (
                        <ul className="space-y-4 border-t border-gray-300 pt-4">
                            {items.map(it => (
                                <li
                                    key={`${it.product.id}-${it.note ?? "no-note"}`}
                                    className="flex items-center gap-3 pb-4 border-b border-gray-200"
                                >
                                    <img
                                    src={it.product.image}
                                    className="w-16 h-16 rounded object-cover"
                                    />

                                    <div className="flex-1">
                                        <div className="font-medium">{it.product.name}</div>

                                        {it.note && (
                                            <div className="text-xs text-gray-500">
                                            Obs: {it.note}
                                            </div>
                                        )}

                                        <div className="text-sm text-dark font-bold">
                                        {it.product.price === 0
                                            ? "Precio a consultar"
                                            : `$${it.product.price.toLocaleString()}`}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onDec(it.product.id, it.note)}
                                            className="px-3 py-1 border rounded"
                                        >
                                            -
                                        </button>

                                        <span>{it.quantity}</span>

                                        <button
                                            onClick={() => onInc(it.product.id, it.note)}
                                            className="px-3 py-1 border rounded"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() => onRemove(it.product.id, it.note)}
                                            className="text-red-500 ml-2 text-xl"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* FOOTER FIJO */}
                {items.length > 0 && (
                    <div className="mt-6">
                        <div className="flex justify-between text-lg font-bold mb-4">
                            <span>{items.length} productos</span>
                            <span>${total.toLocaleString()}</span>
                        </div>

                        <div className="mb-4 p-3 rounded-xl bg-primary/5 text-sm text-dark">
                            <p className="font-medium flex items-center gap-1">
                                🚚 Envíos según zona
                            </p>
                            <p className="text-dark/80 leading-snug">
                                El costo de envío se coordina por WhatsApp al confirmar el pedido.
                            </p>
                        </div>

                        <button
                            onClick={onCheckout}
                            className="bg-primary text-white px-6 py-3 rounded-full w-full text-lg font-semibold shadow-md"
                        >
                            Finalizar pedido
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
