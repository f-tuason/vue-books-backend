import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKzBQ7M5swyszSTff81637vkx2iZp0gE4",
  authDomain: "my-web-app-868a4.firebaseapp.com",
  projectId: "my-web-app-868a4",
  storageBucket: "my-web-app-868a4.appspot.com",
  messagingSenderId: "638728251568",
  appId: "1:638728251568:web:d4f7a1c13bc8cffb88f375"
}

export const login = async (email, password) => {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    let user = await signInWithEmailAndPassword(auth, email, password)
    return JSON.stringify(user)
  } catch (err) {
    throw new Error('Login failed')
  }
}

export const register = async (email, password) => {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    let user = await createUserWithEmailAndPassword(auth, email, password)
    return JSON.stringify(user)
  } catch (err) {
    throw new Error('Register failed')
  }
}

export const addBook = async (title, author) => {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const colRef = collection(db, 'books')
    await addDoc(colRef, {
      title, author, createdAt: serverTimestamp()
    })
    return 'Added book'
  } catch(err) {
    throw new Error('Add record failed')
  }
}

export const deleteBook = async (id) => {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const docRef = doc(db, 'books', id)
    await deleteDoc(docRef)
    return `record with ${id} deleted`
  } catch(err) {
    return new Error('Error deleting record')
  }
}

