import { weddingData } from "@/data/wedding";

export function EventSchedule() {
    return (
        <section className="relative overflow-hidden bg-[#e3e8e3] px-6 py-24 sm:py-32">
            <div className="absolute -right-32 -top-32 size-80 rounded-full border border-gold/20" />
            <div className="absolute -bottom-40 -left-32 size-96 rounded-full border border-sage/10" />
            <div className="relative mx-auto max-w-6xl">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">The celebration</p>
                    <h2 className="mt-5 font-serif text-5xl text-sage sm:text-7xl">Order of the day</h2>
                    <p className="mt-5 text-sm uppercase tracking-[0.2em] text-sage/55">
                        {weddingData.wedding.day} · {weddingData.wedding.displayDate}
                    </p>
                </header>

                <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-sage/10 bg-sage/10 shadow-[0_25px_80px_rgba(39,52,46,0.1)] md:grid-cols-2">
                    {weddingData.schedule.map((event, index) => (
                        <article key={event.time} className="group bg-paper p-8 transition hover:bg-[#faf6ef] sm:p-10">
                            <div className="flex gap-6">
                                <div className="font-serif text-2xl text-gold">{String(index + 1).padStart(2, "0")}</div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{event.time}</p>
                                    <h3 className="mt-3 font-serif text-3xl text-sage">{event.title}</h3>
                                    <p className="mt-3 leading-7 text-sage/65">{event.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="font-serif text-3xl text-sage">{weddingData.venue.name}</p>
                    <p className="mt-2 text-sm text-sage/60">{weddingData.venue.address}</p>
                    <a href={weddingData.venue.mapUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border border-sage bg-sage px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-sage/90">
                        View location
                    </a>
                </div>
            </div>
        </section>
    );
}