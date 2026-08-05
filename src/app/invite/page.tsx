import InvitationCover from "./InvitationCover";
import { verifyInvitationToken } from "@/lib/invitations/signing";

type InvitePageProps = {
    searchParams: Promise<{
        t?: string;
    }>;
};

export default async function InvitePage({
                                             searchParams,
                                         }: InvitePageProps) {
    const { t } = await searchParams;
    const invitation = t ? verifyInvitationToken(t) : null;

    if (!invitation) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#252b25] px-4 py-12">
                <section className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center text-white shadow-2xl backdrop-blur sm:p-12">
                    <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#d7b98c]">
                        EverAfter Invitations
                    </p>

                    <div className="mx-auto my-8 h-px w-20 bg-[#d7b98c]/60" />

                    <h1 className="font-serif text-4xl sm:text-5xl">
                        Invalid invitation
                    </h1>

                    <p className="mt-5 leading-7 text-stone-300">
                        This invitation link is missing, invalid, or has been modified.
                        Please request the original personalized link from the couple.
                    </p>
                </section>
            </main>
        );
    }

    return <InvitationCover guestName={invitation.guestName} />;
}