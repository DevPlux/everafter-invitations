import { getFirestore, getFieldValue, isAdminEnabled } from "../firebase/admin";
import type { InvitationFirestoreDoc } from "./types";
import { getInvitationStatus } from "./status";

const COLLECTION = "invitations";

export async function createInvitationIfNotExists(token: string, guestName: string) {
  if (!isAdminEnabled) {
    console.warn("Firestore disabled - skipping createInvitationIfNotExists");
    return;
  }

  const firestore = getFirestore();
  const FieldValue = getFieldValue();

  const docRef = firestore.collection(COLLECTION).doc(token);

  await firestore.runTransaction(async (tx: any) => {
    const snap = await tx.get(docRef);

    if (!snap.exists) {
      tx.set(docRef, {
        guestName,
        token,
        createdAt: FieldValue.serverTimestamp(),
        openedAt: null,
        acceptedAt: null,
      } as Partial<InvitationFirestoreDoc>);
    }
  });
}

export async function markOpenedIfNeeded(token: string) {
  if (!isAdminEnabled) {
    console.warn("Firestore disabled - skipping markOpenedIfNeeded");
    return;
  }

  const firestore = getFirestore();
  const FieldValue = getFieldValue();

  const docRef = firestore.collection(COLLECTION).doc(token);

  await firestore.runTransaction(async (tx: any) => {
    const snap = await tx.get(docRef);

    if (!snap.exists) return;

    const data = snap.data() as InvitationFirestoreDoc | undefined;

    if (!data) return;

    if (data.openedAt == null) {
      tx.update(docRef, { openedAt: FieldValue.serverTimestamp() });
    }
  });
}

export async function acceptIfNeeded(token: string) {
  if (!isAdminEnabled) {
    console.warn("Firestore disabled - skipping acceptIfNeeded");
    return;
  }

  const firestore = getFirestore();
  const FieldValue = getFieldValue();

  const docRef = firestore.collection(COLLECTION).doc(token);

  await firestore.runTransaction(async (tx: any) => {
    const snap = await tx.get(docRef);

    if (!snap.exists) {
      throw new Error("Invitation not found");
    }

    const data = snap.data() as InvitationFirestoreDoc | undefined;

    if (!data) return;

    if (data.acceptedAt == null) {
      tx.update(docRef, { acceptedAt: FieldValue.serverTimestamp() });
    }
  });
}

export async function getInvitationByToken(token: string) {
  if (!isAdminEnabled) {
    console.warn("Firestore disabled - getInvitationByToken returning null");
    return null;
  }

  const firestore = getFirestore();
  const docRef = firestore.collection(COLLECTION).doc(token);
  const snap = await docRef.get();
  if (!snap.exists) return null;
  return snap.data() as InvitationFirestoreDoc;
}

export async function listInvitations(opts?: { search?: string; filter?: string; limit?: number; }) {
  if (!isAdminEnabled) {
    console.warn("Firestore disabled - listInvitations returning empty list");
    return [] as InvitationFirestoreDoc[];
  }

  const firestore = getFirestore();

  const col = firestore.collection(COLLECTION).orderBy("createdAt", "desc");

  const snap = await col.get();

  const items: InvitationFirestoreDoc[] = [];

  snap.forEach((d: any) => {
    const data = d.data() as InvitationFirestoreDoc;
    items.push(data);
  });

  let filtered = items;

  if (opts?.search) {
    const q = opts.search.toLowerCase();
    filtered = filtered.filter((i) => i.guestName.toLowerCase().includes(q));
  }

  if (opts?.filter) {
    filtered = filtered.filter((i) => getInvitationStatus(i) === opts.filter);
  }

  return filtered.slice(0, opts?.limit ?? 1000);
}

export async function getStats() {
  if (!isAdminEnabled) {
    console.warn("Firestore disabled - getStats returning zeros");
    return {
      total: 0,
      opened: 0,
      accepted: 0,
      pending: 0,
      openRate: 0,
      acceptanceRate: 0,
    };
  }

  const firestore = getFirestore();

  const snap = await firestore.collection(COLLECTION).get();

  const total = snap.size;
  let opened = 0;
  let accepted = 0;

  snap.forEach((d: any) => {
    const data = d.data() as InvitationFirestoreDoc;
    const status = getInvitationStatus(data);
    if (status === "Opened") opened++;
    if (status === "Accepted") accepted++;
  });

  const pending = total - opened - accepted;

  const openRate = total === 0 ? 0 : Math.round((opened / total) * 10000) / 100;
  const acceptanceRate = total === 0 ? 0 : Math.round((accepted / total) * 10000) / 100;

  return {
    total,
    opened,
    accepted,
    pending,
    openRate,
    acceptanceRate,
  };
}
