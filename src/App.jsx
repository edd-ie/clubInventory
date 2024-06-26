import { useEffect, useState } from 'react'
import './App.css'

import {auth} from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import Auth from './components/Auth';
import { getRecord, members } from './config/Crud';
import { logOut } from './config/authFx';
import Dashboard from './components/Dashboard';

function App() {
  const [logged, setLogged] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLogged(true);

        let user = getRecord(members, "userId", auth?.currentUser?.uid);

          setData(user);
          
        
      } else {
        setLogged(false);
      }
    });

    // Cleanup function to prevent memory leaks
    return () => unsubscribe();
  }, []);

  console.table(data)

  return (
    <>
      {logged?
        <>
          {/* <button onClick={()=>{logOut(); setLogged(false)}}>loggout</button> */}
          <Dashboard/>
        </>
        :
        <Auth setLogged={setLogged}/>
      }
    </>
  )
}

export default App
