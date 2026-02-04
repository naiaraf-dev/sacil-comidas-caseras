import { useState, useEffect } from "react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [bottomPosition, setBottomPosition] = useState(16);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
            
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const footerTopFromBottom = windowHeight - footerRect.top;
                
                if (footerTopFromBottom > 0) {
                    setBottomPosition(footerTopFromBottom + 16);
                } else {
                    setBottomPosition(16);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{ bottom: `${bottomPosition}px` }}
                    className="
                        hidden md:flex
                        fixed right-4 
                        bg-primary text-white 
                        w-12 h-12 rounded-full 
                        shadow-lg 
                        items-center justify-center
                        hover:bg-secondary 
                        transition-all duration-300
                        z-40
                    "
                    aria-label="Volver arriba"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                    </svg>
                </button>
            )}
        </>
    );
}