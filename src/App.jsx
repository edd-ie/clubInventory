import { uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react'
import './App.css'
import { Flex, Text, Button } from '@radix-ui/themes';

import {auth, database, storage } from './config/firebase-config';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';

import Auth from './components/Auth';
import { ref } from 'firebase/storage';

function App() {
  const [logged, setLogged] = useState(false)
  
  const table1 = collection(database, 'tableName')

  useEffect(()=>{

    if(auth?.currentUser?.getIdToken){
      setLogged(true)
    }
    console.log("\nNot logged\n");
  },[])

  // useEffect(()=>{
  //   getRecords(table1);
  // }, [])

  

  const[fileUpload, setFileUpload] = useState(null);
  // use input type="file"
  // onChange((e)=>setFileUpload(e.target.files[0]))
  // button onClick(()=>uploadMedia())
  async function uploadMedia(folderName=`Categories/${fileUpload.name}`){
    // Add code to upload file to storage
    if(fileUpload){
      try{
        const storageRef = ref(storage, folderName);
        await uploadBytes(storageRef, fileUpload);
        setFileUpload(null);
      }
      catch(error){
        console.error("Error uploading file: ", error.message);
      }
    }
  }

  return (
    <>
      {logged?
        <p>hi</p>
        :
        <Auth/>
      }
    </>
  )
}

export default App
