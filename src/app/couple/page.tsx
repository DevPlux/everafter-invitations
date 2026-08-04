import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { verifyCoupleSession } from "@/lib/auth/session";

export default async function CoupleLoginPage() {
    const authenticated = await verifyCoupleSession();

    if (authenticated) {
        redirect("/couple/generate");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50 px-4 py-12">
            <LoginForm />
        </main>
    );
}