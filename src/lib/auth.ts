import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

export async function loginAdmin(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  await signOut(auth);
}

export function watchAdminAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
