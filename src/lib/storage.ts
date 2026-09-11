import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const fileRef = ref(storage, `uploads/${fileName}`);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}
