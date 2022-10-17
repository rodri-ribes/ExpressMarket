// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBX0TP1nFEUxUrKiV9NtBG1NDZd41jak4k",
    authDomain: "ecommerce-angular-337b7.firebaseapp.com",
    projectId: "ecommerce-angular-337b7",
    storageBucket: "ecommerce-angular-337b7.appspot.com",
    messagingSenderId: "981972021813",
    appId: "1:981972021813:web:f0d09cf3ac5f23cf36777c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

export async function uploadFile(file: any): Promise<string[]> {
    let name = v4();
    const storageRef = ref(storage, name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef);

    return [name, url];
}

export async function deleteFile(name) {
    const storageRef = ref(storage, name)
    await deleteObject(storageRef)
}