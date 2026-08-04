import CoupleIntroduction  from "./CoupleIntroduction";
import { EventSchedule } from "./EventSchedule";
import { StoryTimeline } from "./StoryTimeline";
import WeddingCountdown  from "./WeddingCountdown";
import { weddingData } from "@/data/wedding";

export function WeddingWebsite({ guestName }: { guestName?: string }) {
    const { couple, wedding, venue, message, dressCode, contacts } = weddingData;

    return (
        <main>
            <section id="home" className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#dde4de] px-6 py-24 text-center">
                <div className="absolute inset-5 rounded-[2rem] border border-gold/25 sm:inset-10" />
                <div className="absolute -left-32 top-10 size-96 rounded-full bg-[#efd7ce]/35 blur-3xl" />
                <div className="absolute -right-32 bottom-10 size-96 rounded-full bg-[#bdcbbb]/45 blur-3xl" />
                <div className="relative max-w-5xl">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">We are getting married</p>
                    {guestName && <p className="mt-7 font-serif text-2xl italic text-sage/70">Dear {guestName},</p>}
                    <h1 className="mt-5 font-serif text-7xl leading-[0.9] text-sage sm:text-9xl">
                        {couple.partnerOne.firstName} <span className="text-gold">&amp;</span> {couple.partnerTwo.firstName}
                    </h1>
                    <p className="mx-auto mt-7 max-w-2xl leading-8 text-sage/70">{message.introduction}</p>
                    <p className="mt-8 font-serif text-3xl text-sage">{wedding.displayDate}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-sage/55">{wedding.time} · {venue.address}</p>
                    <WeddingCountdown weddingDate={wedding.dateTime} />
                    <a href="#couple" className="mt-9 inline-flex rounded-full border border-sage bg-sage px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-sage/90">Meet the couple</a>
                </div>
            </section>

            <CoupleIntroduction />
            <StoryTimeline />
            <EventSchedule />

            <section id="venue" className="bg-paper px-6 py-24 sm:py-32">
                <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-sage text-white shadow-[0_30px_90px_rgba(39,52,46,0.16)] md:grid-cols-2">
                    <div className="min-h-80 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,.2),transparent_25%),linear-gradient(135deg,#87988d,#43584d)] p-10 sm:p-14">
                        <div className="flex h-full items-end rounded-[1.8rem] border border-white/20 p-8"><p className="font-serif text-5xl">Colombo<br />Sri Lanka</p></div>
                    </div>
                    <div className="p-10 sm:p-14">
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/55">The venue</p>
                        <h2 className="mt-5 font-serif text-5xl">{venue.name}</h2>
                        <p className="mt-4 text-white/70">{venue.address}</p>
                        <p className="mt-8 leading-8 text-white/75">An elegant garden ceremony followed by dinner, speeches, and dancing in the grand ballroom.</p>
                        <a href={venue.mapUrl} target="_blank" rel="noreferrer" className="mt-9 inline-flex rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sage">Open in Google Maps</a>
                    </div>
                </div>
            </section>

            <section id="gallery" className="bg-[#f0ebe3] px-6 py-24 sm:py-32">
                <header className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Moments we treasure</p><h2 className="mt-5 font-serif text-5xl text-sage sm:text-7xl">Our gallery</h2><p className="mt-6 leading-8 text-sage/65">Photo spaces are ready for the couple&apos;s engagement and pre-wedding photographs.</p></header>
                <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
                    {["from-[#c9ada3] to-[#eee0d6]", "from-[#718579] to-[#dbe2da]", "from-[#b99b72] to-[#eadfce]", "from-[#aeb8aa] to-[#e7ddd0]", "from-[#d7bab1] to-[#f4e8df]", "from-[#6e7f73] to-[#c9d4cc]"].map((tone, index) => (
                        <div key={tone} className={`relative min-h-52 overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${tone} ${index === 0 || index === 5 ? "md:row-span-2 md:min-h-[27rem]" : ""}`}><span className="absolute inset-0 grid place-items-center font-serif text-5xl text-white/45">{index + 1}</span><span className="absolute bottom-5 left-5 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/75">Our moment</span></div>
                    ))}
                </div>
            </section>

            <section id="dress-code" className="bg-paper px-6 py-24 text-center sm:py-32">
                <div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">What to wear</p><h2 className="mt-5 font-serif text-5xl text-sage sm:text-7xl">{dressCode.title}</h2><p className="mt-7 leading-8 text-sage/70">{dressCode.description}</p><div className="mt-10 flex justify-center gap-4">{dressCode.colours.map((colour) => <span key={colour} className="size-12 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: colour }} />)}</div></div>
            </section>

            <section id="contact" className="bg-[#e3e8e3] px-6 py-24 text-center sm:py-32">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">Need a little help?</p><h2 className="mt-5 font-serif text-5xl text-sage sm:text-7xl">Contact us</h2><p className="mx-auto mt-6 max-w-xl leading-8 text-sage/65">For questions about the day, travel, or the venue, please contact either of us.</p>
                <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">{contacts.map((contact) => <a key={contact.phone} href={`tel:${contact.phone}`} className="rounded-[2rem] border border-sage/10 bg-paper p-8 transition hover:-translate-y-1"><p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{contact.role}</p><p className="mt-3 font-serif text-3xl text-sage">{contact.name}</p><p className="mt-3 text-sm text-sage/60">{contact.displayPhone}</p></a>)}</div>
            </section>

            <section className="bg-sage px-6 py-24 text-center text-white"><p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">A note from us</p><blockquote className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">“{message.closing}”</blockquote><p className="mt-8 text-sm text-white/65">With love, {couple.partnerOne.firstName} &amp; {couple.partnerTwo.firstName}</p></section>
            <footer className="bg-[#24322c] px-6 py-8 text-center text-xs uppercase tracking-[0.24em] text-white/45"><p>{couple.partnerOne.firstName} &amp; {couple.partnerTwo.firstName} · {wedding.displayDate}</p><a href="#home" className="mt-3 inline-block text-gold">Back to top ↑</a></footer>
        </main>
    );
}