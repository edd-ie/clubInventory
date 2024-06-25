import { auth } from './firebase-config';
import { members, addRecord, getRecord } from './Crud';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';

export async function signUp(data, password) {

    try {
        await createUserWithEmailAndPassword(auth, data.email, password);

        if (auth?.currentUser?.getIdToken) {
            data.userId = auth?.currentUser?.uid;
            await addRecord(members, data);
            return true;
        }
    }
    catch (error) {
        alert(error.message);
        return false;
    }
}

export async function logIn(email, password) {

    try {
        await signInWithEmailAndPassword(auth, email, password);

        if (auth?.currentUser?.getIdToken) {
            return true
        }
    }
    catch (error) {
        alert(error.message);
    }
    return false;
}

export async function googleSignIn() {

    try {
        await signInWithPopup(auth, googleAuth);

        console.log(auth?.currentUser?.email);
    }
    catch (error) {
        console.error(error.message);
    }
}

export function logOut() {
    try {
        signOut(auth);
    }
    catch (error) {
        console.error(error.message);
    }
}