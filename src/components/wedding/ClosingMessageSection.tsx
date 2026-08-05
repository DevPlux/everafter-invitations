import { weddingData } from "@/data/wedding";

export default function ClosingMessageSection() {
    const { couple, message } = weddingData;

    return (
        <section className="bg-[#faf7f2] px-6 py-24 text-center text-white">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-700">
                A note from us
            </p>

            <blockquote className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl text-green-900">
                “{message.closing}”
            </blockquote>

            <p className="mt-8 text-sm text-green-900/70">
                With love, {couple.partnerOne.firstName} &amp;{" "}
                {couple.partnerTwo.firstName}
            </p>
        </section>
    );
}