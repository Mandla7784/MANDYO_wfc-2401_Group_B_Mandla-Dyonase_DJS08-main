import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnDpR9Zs5wS6jwN9h2Vz8yM5ZV2Hg9D4A",
  authDomain: "wfc-2401-group-b.firebaseapp.com",
  projectId: "wfc-2401-group-b",
  storageBucket: "wfc-2401-group-b.appspot.com",
  messagingSenderId: "108668040",
  appId: "1:108668040:web:5b7b7a9a7a5b7b9b9a5b9d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapShot = await getDocs(VansCollectionRef);
  const vans = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapShot = await getDoc(docRef);

  return {
    ...snapShot.data(),
    id: snapShot.id,
  };
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function LoginUser(creds) {
  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  if (!res.ok) {
    throw {
      message: "Failed to login",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.user;
}
