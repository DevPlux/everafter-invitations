import type { InvitationFirestoreDoc } from "./types";

export type InvitationStatus = "Pending" | "Opened" | "Accepted";

export function getInvitationStatus(doc: InvitationFirestoreDoc): InvitationStatus {
  if (doc.acceptedAt != null) {
    return "Accepted";
  }

  if (doc.openedAt != null) {
    return "Opened";
  }

  return "Pending";
}
