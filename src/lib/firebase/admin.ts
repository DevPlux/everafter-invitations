import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";

import {
  FieldValue,
  getFirestore as createFirestore,
  type Firestore,
  type Timestamp,
} from "firebase-admin/firestore";

let adminApp: App | null = null;
let firestoreInstance: Firestore | null = null;

export const isAdminEnabled = Boolean(
  process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
);

function initAdminIfNeeded(): App | null {
  if (!isAdminEnabled) {
    return null;
  }

  if (adminApp) {
    return adminApp;
  }

  if (getApps().length > 0) {
    adminApp = getApp();
  } else {
    const projectId = process.env.FIREBASE_PROJECT_ID as string;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string;
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY as string).replace(
      /\\n/g,
      "\n",
    );

    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  firestoreInstance = createFirestore(adminApp);

  return adminApp;
}

export function ensureAdmin(): App {
  if (!isAdminEnabled) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.",
    );
  }

  const app = initAdminIfNeeded();

  if (!app) {
    throw new Error("Firebase Admin could not be initialized.");
  }

  return app;
}

export function getFirestore(): Firestore {
  const app = initAdminIfNeeded();

  if (!app) {
    throw new Error(
      "Firebase Firestore is not configured. Check the Firebase environment variables.",
    );
  }

  if (!firestoreInstance) {
    firestoreInstance = createFirestore(app);
  }

  return firestoreInstance;
}

export function getFieldValue(): typeof FieldValue {
  if (!isAdminEnabled) {
    throw new Error("Firebase Admin is not configured.");
  }

  return FieldValue;
}

export type FirestoreTimestamp = Timestamp;

export default adminApp;
