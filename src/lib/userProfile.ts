import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// ─── Types ────────────────────────────────────────────────────────
export type UserType = 'farmer' | 'investor' | 'partner';

export type UserProfile = {
  uid: string;
  fullName: string;
  userType: UserType;
  location: string;
  phoneNumber: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// ─── Read ─────────────────────────────────────────────────────────
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// ─── Write ────────────────────────────────────────────────────────
export async function createUserProfile(
  uid: string,
  data: {
    fullName: string;
    userType: UserType;
    location: string;
    phoneNumber: string;
    approvalStatus: 'pending' | 'approved' | 'rejected';
  }
): Promise<void> {
  await setDoc(doc(db, 'users', uid), {
    uid,
    fullName: data.fullName,
    userType: data.userType,
    location: data.location,
    phoneNumber: data.phoneNumber,
    approvalStatus: data.approvalStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
