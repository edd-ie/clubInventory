export async function signUP() {

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        console.log(auth?.currentUser?.email);
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function logIn() {

    try {
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