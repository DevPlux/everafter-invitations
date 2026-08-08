import type admin from "firebase-admin";
import type { FirestoreTimestamp } from "../firebase/admin";

export type InvitationFirestoreDoc = {
  guestName: string;
  token: string;
  createdAt?: FirestoreTimestamp | null;
  openedAt?: FirestoreTimestamp | null;
  acceptedAt?: FirestoreTimestamp | null;
};
