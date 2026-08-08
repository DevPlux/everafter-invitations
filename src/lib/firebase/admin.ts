import admin from "firebase-admin";

// Safe lazy admin initialization.
let adminApp: typeof admin | null = null;
let _firestore: FirebaseFirestore.Firestore | null = null;
let _FieldValue: typeof admin.firestore.FieldValue | null = null;

export const isAdminEnabled = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
);

function initAdminIfNeeded() {
  if (!isAdminEnabled) return;

  // Reuse an already initialized Firebase Admin app.
  if (admin.apps.length > 0) {
    adminApp = admin;
    _firestore = admin.firestore();
    _FieldValue = admin.firestore.FieldValue;
    return;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID as string;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string;

  const privateKey = (
    process.env.FIREBASE_PRIVATE_KEY as string
  ).replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  adminApp = admin;
  _firestore = admin.firestore();
  _FieldValue = admin.firestore.FieldValue;
}

export function ensureAdmin() {
  if (!isAdminEnabled) {
    throw new Error(
      "Firebase admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }

  initAdminIfNeeded();

  return adminApp as typeof admin;
}

export function getFirestore() {
  initAdminIfNeeded();

  if (!_firestore) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  return _firestore;
}

export function getFieldValue() {
  initAdminIfNeeded();

  if (!_FieldValue) {
    throw new Error("Firebase FieldValue is not initialized.");
  }

  return _FieldValue;
}

export type FirestoreTimestamp = FirebaseFirestore.Timestamp;

export default adminApp;