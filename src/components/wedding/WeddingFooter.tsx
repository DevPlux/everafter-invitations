import { weddingData } from "@/data/wedding";
import { BackToTop } from "@/components/back-to-top";

export default function WeddingFooter() {
    const { couple, wedding } = weddingData;

    return (
        <footer className="bg-[#24322c] px-6 py-8 text-center text-xs uppercase tracking-[0.24em] text-white/45">
            <p>
                {couple.partnerOne.firstName} &amp;{" "}
                {couple.partnerTwo.firstName} · {wedding.displayDate}
            </p>

            <BackToTop />

            <div className="mx-auto my-5 h-px w-24 bg-white/10" />

            <p className="text-[0.6rem] tracking-[0.18em] text-white/40">
                Developed by{" "}
                <a
                    href="https://www.devplux.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold transition-colors hover:text-white"
                >
                    DevPlux IT Solutions
                </a>
            </p>

            <a
                href="https://www.devplux.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[0.6rem] normal-case tracking-wider text-white/35 transition-colors hover:text-white/80"
            >
                www.devplux.com
            </a>
        </footer>
    );
}