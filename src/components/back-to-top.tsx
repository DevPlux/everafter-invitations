"use client";

export function BackToTop() {
    const handleBackToTop = () => {
        const homeSection = document.getElementById("home");

        if (homeSection) {
            homeSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
        );
    };

    return (
        <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to the top of the invitation"
            className="mt-3 cursor-pointer text-gold transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
            Back to top <span aria-hidden="true">↑</span>
        </button>
    );
}