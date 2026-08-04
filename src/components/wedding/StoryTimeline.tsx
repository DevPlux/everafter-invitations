import { weddingData } from "@/data/wedding";

export function StoryTimeline() {
    return (
        <section id="story" className="overflow-hidden bg-paper px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">
                        A journey of two hearts
                    </p>
                    <h2 className="mt-5 font-serif text-5xl text-sage sm:text-7xl">Our story</h2>
                    <p className="mx-auto mt-6 max-w-2xl leading-8 text-sage/70">
                        {weddingData.story.introduction}
                    </p>
                </header>

                <div className="relative mt-16 sm:mt-20">
                    <div className="absolute bottom-0 left-5 top-0 w-px bg-gold/30 md:left-1/2" />
                    <div className="space-y-12 md:space-y-0">
                        {weddingData.story.milestones.map((milestone, index) => (
                            <article
                                key={milestone.year}
                                className={`relative pl-16 md:grid md:grid-cols-2 md:pl-0 ${index > 0 ? "md:-mt-4" : ""}`}
                            >
                                <div className="absolute left-[0.82rem] top-7 z-10 size-4 rounded-full border-4 border-paper bg-gold shadow-[0_0_0_1px_rgba(176,139,87,0.45)] md:left-1/2 md:-translate-x-1/2" />
                                <div className={`${index % 2 === 0 ? "md:col-start-1 md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"}`}>
                                    <div className="rounded-[2rem] border border-sage/10 bg-[#f7f3ec] p-7 shadow-[0_18px_55px_rgba(39,52,46,0.06)] sm:p-9">
                                        <p className="font-serif text-4xl text-gold">{milestone.year}</p>
                                        <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-sage/45">
                                            {milestone.eyebrow}
                                        </p>
                                        <h3 className="mt-2 font-serif text-3xl text-sage">{milestone.title}</h3>
                                        <p className="mt-4 leading-7 text-sage/70">{milestone.description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}