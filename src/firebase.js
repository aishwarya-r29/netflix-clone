import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import App from "./App";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyBNLibW6N27zXHRG98MHA5oYdBNvYrShzc",
  authDomain: "netflix-clone-e0a24.firebaseapp.com",
  projectId: "netflix-clone-e0a24",
  storageBucket: "netflix-clone-e0a24.firebasestorage.app",
  messagingSenderId: "506889152772",
  appId: "1:506889152772:web:19393625bcfb79116cc851"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};