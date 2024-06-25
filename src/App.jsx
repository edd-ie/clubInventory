import { useEffect, useState } from 'react'
import './App.css'

import {auth} from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import Auth from './components/Auth';
import { getRecord, members } from './config/Crud';
import { logOut } from './config/authFx';

function App() {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState({})
  const [data, setData] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLogged(true);

        if (logged) {
          let data = getRecord(members, "userId", auth?.currentUser?.uid);

          setData(data);
          for(const key in data) {
            console.log(key, data[key]);
          }
        }
        
      } else {
        setLogged(false);
      }
    });

    unsubscribe();

    // Cleanup function to prevent memory leaks
    // return () => unsubscribe();
  }, []);


  return (
    <>
      {logged?
        <button onClick={()=>{logOut(); setLogged(false)}}>loggout</button>
        :
        <Auth setLogged={setLogged}/>
      }
    </>
  )
}

export default App
