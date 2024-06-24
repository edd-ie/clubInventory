import {React, useState} from 'react';
import {auth, googleAuth} from "../config/firebase-config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import Login from './Login';
import SignUp from './SignUp'

import { logIn } from '../config/authFx';




export default function Auth() {
    const [hasAccount, setHasAccount] = useState(true)


    return (
        <>
            {hasAccount ? <Login setHasAccount={setHasAccount}/> : <SignUp setHasAccount={setHasAccount}/>}
        </>
    )
}


{/* <Avatar size="2" radius="full" fallback="T" color="indigo" />
                            <Box>
                            <Text as="div" size="4" weight="bold">
                                Teodros Girmay
                            </Text>
                            <Text as="div" size="4" color="gray">
                                Engineering
                            </Text>
                            </Box> */}