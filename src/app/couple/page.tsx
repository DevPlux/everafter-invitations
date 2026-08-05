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
            {/* Background image */}
            <Image
                src="/images/wedding_bg.svg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />

            {/* Login form */}
            <div className="relative z-10 flex w-full justify-center">
                <LoginForm />
            </div>
        </main>
    );
}