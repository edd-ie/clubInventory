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

  async function getRecords(table){
      //Read data from database
      try{
        const data = await getDocs(table);
        console.log(data.docs.map(doc => ({...doc.data(), id: doc.id})));
      }
      catch(error){
        console.error(error.message);
      }
    }

  async function addRecord(table, data){
    try{
      const docRef = await addDoc(table, data);
      console.log("Document written with ID: ", docRef.id);

      getRecords(table1);
    }
    catch(error){
      console.error("Error adding document: ", error.message);
    }
  }

  async function deleteRecord(table, id){
    try{
      // Add code to delete record from database
      const record = doc(database, table, id);
      await deleteDoc(record);
    }
    catch(error){
      console.error("Error deleting document: ", error.message);
    }
  }

  async function updateRecord(table, id, newData={column:"data"}){
    try{
      // Add code to delete record from database
      const record = doc(database, table, id);
      await updateDoc(record, newData);
    }
    catch(error){
      console.error("Error deleting document: ", error.message);
    }
  }

  async function getMedia(){
    try{
      // Add code to get media from storage
    }
    catch(error){
      console.error("Error getting media: ", error.message);
    }
  }

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
        hi
        :
        <Auth/>
      }
    </>
  )
}

export default App
