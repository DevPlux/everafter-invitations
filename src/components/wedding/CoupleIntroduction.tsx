import { weddingData } from "@/data/wedding";

export default function CoupleIntroduction() {
    const { couple, story } = weddingData;

    return (
        <section
            id="couple"
            className="scroll-mt-8 bg-[#fffdf9] px-4 py-24 sm:py-32"
        >
            <div className="mx-auto max-w-6xl">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#9b7b52]">
                        Bride & Groom
                    </p>

                    <h2 className="mt-5 font-serif text-4xl text-[#3f493d] sm:text-6xl">
                        Together is a beautiful place to be
                    </h2>

                    <div className="mx-auto my-7 h-px w-24 bg-[#b69b72]/60" />

                    <p className="text-base leading-8 text-stone-600 sm:text-lg">
                        {story.introduction}
                    </p>
                </header>

                <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-8">
                    <PartnerCard
                        initials={couple.partnerOne.firstName.slice(0, 1)}
                        firstName={couple.partnerOne.firstName}
                        fullName={couple.partnerOne.fullName}
                        role="The Groom"
                        description={story.partnerOneDescription}
                    />

                    <div
                        aria-hidden="true"
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#b69b72]/40 bg-[#f7f1e8] font-serif text-3xl italic text-[#a08158] shadow-sm md:h-24 md:w-24"
                    >
                        &
                    </div>

                    <PartnerCard
                        initials={couple.partnerTwo.firstName.slice(0, 1)}
                        firstName={couple.partnerTwo.firstName}
                        fullName={couple.partnerTwo.fullName}
                        role="The Bride"
                        description={story.partnerTwoDescription}
                    />
                </div>
            </div>
        </section>
    );
}

type PartnerCardProps = {
    initials: string;
    firstName: string;
    fullName: string;
    role: string;
    description: string;
};

function PartnerCard({
                         initials,
                         firstName,
                         fullName,
                         role,
                         description,
                     }: PartnerCardProps) {
    return (
        <article className="group text-center">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-[#d9c8ad]/50 bg-gradient-to-br from-[#eee2d3] via-[#f8f2e9] to-[#ddd0bd] shadow-xl">
                <div className="absolute inset-4 rounded-t-[9rem] rounded-b-[1.4rem] border border-white/70" />

                <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-8xl text-[#8c7454]/45 transition duration-500 group-hover:scale-105">
            {initials}
          </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3f493d]/55 to-transparent px-6 pb-7 pt-20">
                    <p className="font-serif text-3xl text-white">{firstName}</p>
                </div>
            </div>

            <p className="mt-7 text-xs font-medium uppercase tracking-[0.3em] text-[#9b7b52]">
                {role}
            </p>

            <h3 className="mt-3 font-serif text-3xl text-[#3f493d]">
                {fullName}
            </h3>

            <p className="mx-auto mt-4 max-w-sm leading-7 text-stone-600">
                {description}
            </p>
        </article>
    );
}