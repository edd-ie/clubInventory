import {React, useState} from 'react';
import {auth, googleAuth} from "../config/firebase-config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import Login from './Login';
import SignUp from './SignUp'




export default function Auth({setLogged}) {
    const [hasAccount, setHasAccount] = useState(true)

    return (
        <>
            {hasAccount ? <Login setHasAccount={setHasAccount} setUser={setLogged}/> : <SignUp setHasAccount={setHasAccount} setUser={setLogged}/>}
        </>
    )
}