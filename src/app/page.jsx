"use client";
import {useAuth} from "./context/authentication";
import { createUserWithEmailAndPassword , signOut} from "firebase/auth";
import { auth } from "./lib/firebase"; // Adjust the import path as necessary
import { useEffect ,useState} from "react";
import { deleteUser } from "firebase/auth";


export default function HomePage() {
  const { user, logout ,loginWithGoogle ,loginWithEmail} = useAuth();
  const [mail,setmail]=useState({
    login:"",
    loginPassword:"",
    signup:"",
    signupPassword:""
  });
  useEffect(()=>{
    console.log("User state changed:", user?.email);
  })
async function signupWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    if(error.code=='auth/email-already-in-use'){
      alert("Email already in use");
    }else{ 
      console.error("Signup error:", error.message);
    }
  }
}

  return (
    <div className="text-black text-center">
      {user ? (
        <div>
          <p>Welcome, {user.email || user.displayName}</p>
          <button onClick={logout}>Logout</button>
          <br></br>
          <button onClick ={()=> deleteUser(auth.currentUser)}>
            Delete account
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
        <div className="border rounded-2xl flex-col flex justify-center items-center w-fit p-4 h-6/12 shadow-2xl">
          <button onClick={loginWithGoogle} className="bg-blue-400 text-gray-800 rounded-3xl w-full p-2 hover:bg-blue-500 cursor-pointer">Login with Google</button>
          <br />
          <form onSubmit={(e)=>{
            e.preventDefault();
            signupWithEmail(mail.signup, mail.signupPassword);
            setmail({
              login: "",
              loginPassword: "",
              signup: "",
              signupPassword: ""
            });
          }} className="mt-2 mb-2">
          <input type="email" className="border border-gray-500 rounded-2xl p-1 mr-2" placeholder="enter your email" value={mail.signup} onChange={(e) => setmail({...mail, signup: e.target.value})}></input>
          <input type="password" className="border border-gray-500 rounded-2xl p-1 mr-2" placeholder="enter your password" value={mail.signupPassword} onChange={(e) => setmail({...mail, signupPassword: e.target.value})}></input>
          <br></br>
          <button type="submit" className="mt-4 border text-white border-gray-600 rounded-3xl p-1  bg-black w-full">
            Sign Up with Email
          </button>
          </form>
          <br />
          <form onSubmit={(e)=>{
            e.preventDefault();
            loginWithEmail(mail.login, mail.loginPassword);
            setmail({
              login: "",
              loginPassword: "",
              signup: "",
              signupPassword: ""
            });
          }} className="mt-2 mb-2">
          <input type="email" className="border border-gray-500 rounded-2xl p-1 mr-2" placeholder="enter your email" value={mail.login} onChange={(e) => setmail({...mail, login: e.target.value})}></input>
          <input type="password" className="border border-gray-500 rounded-2xl p-1 mr-2" placeholder="enter your password" value={mail.loginPassword} onChange={(e) => setmail({...mail, loginPassword: e.target.value})}></input>
          <br></br>
          <button type="submit" className="mt-4 border text-white border-gray-600 rounded-3xl p-1  bg-black w-full">
            Login with Email
          </button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
}
