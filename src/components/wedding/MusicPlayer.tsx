"use client";

import { useEffect, useRef, useState } from "react";

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = 0.45;

        const startMusic = () => {
            void audio.play().catch(() => {
                // Audible autoplay can be blocked until the visitor interacts.
            });
        };

        const startAfterInteraction = (event: Event) => {
            const target = event.target;

            // Let the music button handle its own click without firing twice.
            if (target instanceof Element && target.closest("[data-music-toggle]")) {
                return;
            }

            startMusic();
            removeInteractionListeners();
        };

        const removeInteractionListeners = () => {
            document.removeEventListener("pointerdown", startAfterInteraction);
            document.removeEventListener("keydown", startAfterInteraction);
        };

        // This succeeds only when the browser's autoplay policy allows sound.
        startMusic();

        // Otherwise, begin on the visitor's first interaction anywhere on the page.
        document.addEventListener("pointerdown", startAfterInteraction);
        document.addEventListener("keydown", startAfterInteraction);

        return removeInteractionListeners;
    }, []);

    const toggleMusic = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        try {
            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch (error) {
            console.error("Background music could not be played.", error);
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/audio/wedding-music.mp3"
                loop
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <button
                type="button"
                data-music-toggle
                onClick={toggleMusic}
                aria-label={isPlaying ? "Pause background music" : "Play background music"}
                aria-pressed={isPlaying}
                title={isPlaying ? "Pause music" : "Play music"}
                className="fixed bottom-5 right-5 z-50 grid size-14 cursor-pointer place-items-center rounded-full border border-white/30 bg-[#24322c]/90 text-[#efd4a9] shadow-[0_10px_35px_rgba(0,0,0,0.3)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#34473e] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efd4a9]/40"
            >
                {isPlaying ? (
                    <span className="flex items-center gap-1" aria-hidden="true">
            <span className="h-5 w-1.5 rounded-full bg-current" />
            <span className="h-5 w-1.5 rounded-full bg-current" />
          </span>
                ) : (
                    <span
                        aria-hidden="true"
                        className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-current"
                    />
                )}

                {isPlaying && (
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-[#efd4a9]/40"
                    />
                )}
            </button>
        </>
    );
}