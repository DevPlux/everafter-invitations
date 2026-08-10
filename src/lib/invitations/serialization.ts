import type { InvitationFirestoreDoc } from "./types";
import type { FirestoreTimestamp } from "../firebase/admin";

export type SerializedInvitation = {
  token: string;
  guestName: string;
  createdAt: string | null;
  openedAt: string | null;
  acceptedAt: string | null;
};

export function serializeTimestamp(value: FirestoreTimestamp | null | undefined): string | null {
  if (!value) {
    return null;
  }

  return value.toDate().toISOString();
}

export function serializeInvitation(invitation: InvitationFirestoreDoc): SerializedInvitation {
  return {
    token: invitation.token,
    guestName: invitation.guestName,
    createdAt: serializeTimestamp(invitation.createdAt ?? null),
    openedAt: serializeTimestamp(invitation.openedAt ?? null),
    acceptedAt: serializeTimestamp(invitation.acceptedAt ?? null),
  };
}

export function serializeInvitations(invitations: InvitationFirestoreDoc[]): SerializedInvitation[] {
  return invitations.map(serializeInvitation);
}
