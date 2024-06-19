import React from 'react';
import {auth, googleAuth} from "../config/firebase-config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export default function Auth() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function signUP(){

        try{
            await createUserWithEmailAndPassword(auth, email, password);

            console.log(auth?.currentUser?.email);
        }
        catch(error){
            console.error(error.message);
        }
    }

    async function logIn(){

        try{
            await signInWithEmailAndPassword(auth, email, password);

            console.log(auth?.currentUser?.email);
        }
        catch(error){
            console.error(error.message);
        }
    }

    async function googleSignIn(){

        try{
            await signInWithPopup(auth, googleAuth);

            console.log(auth?.currentUser?.email);
        }
        catch(error){
            console.error(error.message);
        }
    }

    function logOut(){
        try{
            signOut(auth);
        }
        catch(error){
            console.error(error.message);
        }
    }


    return (
        <div>
            <input type="email" />
            <input type="password" />
        </div>
    )
}