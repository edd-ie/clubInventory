import { auth } from './firebase-config';
import { members, addRecord } from './Crud';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';

export async function signUp(email, password, table, data) {

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        if (auth?.currentUser?.getIdToken) {
            data.userId = auth?.currentUser?.uid;
            return await addRecord(table, data, 1, auth?.currentUser?.uid);
        }
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function logIn(email, password) {

    try {

        auth?.currentUser
        await signInWithEmailAndPassword(auth, email, password);

        console.log(auth?.currentUser?.email);
    }
    catch (error) {
        console.error(error.message);
    }
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