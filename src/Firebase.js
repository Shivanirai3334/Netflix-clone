
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBGteHJfRjfdMJZ5nEHMkdXUD5Q-dftlAI",
  authDomain: "netflix-clone-c7513.firebaseapp.com",
  projectId: "netflix-clone-c7513",
  storageBucket: "netflix-clone-c7513.firebasestorage.app",
  messagingSenderId: "792206273068",
  appId: "1:792206273068:web:f640fbd6b0754b4b653f89",
  measurementId: "G-WFKLX14Q6K"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup =  async(name, email, password)=>{
try{
  const res = await createUserWithEmailAndPassword(auth,email,password );
  const user = res.user;
  await addDoc(collection(db,"user"),{
    uid: user.uid,
    name,
    authProvider:"local",
    email,
  });

}catch(error){
console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login = async(email,password)=>{
try{
await signInWithEmailAndPassword(auth, email, password);
}catch(error){
  console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout = ()=>{
  signOut(auth);
}

export{auth,db,login,signup,logout};