import { NextResponse } from "next/server";
import { verifyCoupleSession } from "@/lib/auth/session";
import { getFirestore, isAdminEnabled } from "@/lib/firebase/admin";

export async function GET(request: Request) {
  const authenticated = await verifyCoupleSession();

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isAdminEnabled) {
    return NextResponse.json({ error: "Firestore not configured" }, { status: 501 });
  }

  const firestore = getFirestore();

  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("event: connected\n\n"));

      const collectionRef = firestore.collection("invitations");

      const unsubscribe = collectionRef.onSnapshot(
        (snapshot: any) => {
          try {
            const data = snapshot.docs.map((d: any) => {
              const raw = d.data();
              return {
                token: d.id,
                guestName: raw.guestName,
                createdAt: raw.createdAt ? raw.createdAt.toDate().toISOString() : null,
                openedAt: raw.openedAt ? raw.openedAt.toDate().toISOString() : null,
                acceptedAt: raw.acceptedAt ? raw.acceptedAt.toDate().toISOString() : null,
              };
            });

            const payload = JSON.stringify({ type: "invitations", data });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          } catch (err) {
            controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: (err as Error).message })}\n\n`));
          }
        },
        (err: any) => {
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: err?.message || String(err) })}\n\n`));
        },
      );

      // Close when client disconnects
      request.signal.addEventListener("abort", () => {
        try {
          unsubscribe();
        } catch {}
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
}
