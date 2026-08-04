import WeddingCountdown from "./WeddingCountdown";
import { weddingData } from "@/data/wedding";

type WeddingHeroProps = {
    guestName: string;
};

export default function WeddingHero({ guestName }: WeddingHeroProps) {
    const { couple, wedding, venue, message } = weddingData;

    return (
        <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#f7f1e8] px-4 py-20">
            {/* Background decoration */}
            <div
                aria-hidden="true"
                className="absolute -left-36 top-8 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -right-36 bottom-8 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute inset-4 rounded-[2rem] border border-[#b69b72]/25 sm:inset-8"
            />

            <div
                aria-hidden="true"
                className="absolute inset-7 rounded-[1.5rem] border border-[#b69b72]/15 sm:inset-12"
            />

            <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8c7454] sm:text-sm">
                    Welcome to our wedding
                </p>

                <p className="mt-7 font-serif text-lg italic text-stone-600 sm:text-xl">
                    Dear {guestName},
                </p>

                <h1 className="mt-7 font-serif text-5xl leading-tight text-[#3f493d] sm:text-7xl lg:text-8xl">
                    {couple.partnerOne.firstName}

                    <span className="mx-3 inline-block italic text-[#a08158] sm:mx-5">
            &
          </span>

                    {couple.partnerTwo.firstName}
                </h1>

                <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
                    {message.introduction}
                </p>

                <div className="mx-auto mt-9 flex max-w-2xl items-center justify-center gap-4">
                    <span className="h-px flex-1 bg-[#b69b72]/50" />

                    <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7454]">
                            {wedding.day}
                        </p>

                        <p className="mt-2 font-serif text-xl text-[#3f493d] sm:text-2xl">
                            {wedding.displayDate}
                        </p>

                        <p className="mt-1 text-sm text-stone-500">{wedding.time}</p>
                    </div>

                    <span className="h-px flex-1 bg-[#b69b72]/50" />
                </div>

                <WeddingCountdown weddingDate={wedding.dateTime} />

                <div className="mt-10">
                    <p className="font-serif text-xl text-[#3f493d]">{venue.name}</p>

                    <p className="mt-2 text-sm text-stone-500">{venue.address}</p>
                </div>

                <a
                    href="#couple"
                    className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full border border-[#8c7454] bg-[#3f493d] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#566052] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8c7454]/30"
                >
                    Discover our story
                </a>

                <div
                    aria-hidden="true"
                    className="mx-auto mt-8 h-14 w-px bg-gradient-to-b from-[#a08158] to-transparent"
                />
            </div>
        </section>
    );
}