import Image from "next/image";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";
import { verifyCoupleSession } from "@/lib/auth/session";

export default async function CoupleLoginPage() {
    const authenticated = await verifyCoupleSession();

    if (authenticated) {
        redirect("/couple/generate");
    }

    return (
        <main className="relative flex bg-gradient-to-br from-stone-50 via-white to-rose-50 min-h-dvh items-center justify-center overflow-hidden px-5 py-12">
            {/* Mobile image — visible below 768px */}
            <Image
                src="/images/wedding_hero_mobile.svg"
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 100vw, 0px"
                className="object-cover object-center md:hidden"
            />

            {/* Desktop image — visible from 768px upward */}
            <Image
                src="/images/wedding_bg.svg"
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 100vw, 0px"
                className="hidden object-cover object-center md:block"
            />

            {/* Login form */}
            <div className="relative z-10 flex w-full justify-center">
                <LoginForm />
            </div>
        </main>
    );
}