import { NextResponse } from "next/server";
import { verifyInvitationToken } from "@/lib/invitations/signing";
import { acceptIfNeeded, getInvitationByToken } from "@/lib/invitations/repository";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = body?.token;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const invitation = verifyInvitationToken(token);

    if (!invitation) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    try {
      await acceptIfNeeded(token);
    } catch (err) {
      console.error("Failed to accept invitation:", err);
      return NextResponse.json({ error: "Failed to record RSVP" }, { status: 500 });
    }

    const doc = await getInvitationByToken(token);

    return NextResponse.json({ success: true, invitation: doc });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
