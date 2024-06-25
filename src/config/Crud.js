import { auth, database, storage } from './firebase-config'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { where } from 'firebase/firestore';

//Tables
export const members = collection(database, 'members')
export const categories = collection(database, 'categories')
export const inventory = collection(database, 'inventory')
export const purchase = collection(database, 'purchase')
export const funding = collection(database, 'funding')
export const borrow = collection(database, 'borrow')



//CRUD actions
export async function getRecords(table, choice = 0, field = "") {
    //Read data from database
    try {
        let raw;

        if (choice === 0) {
            raw = await getDocs(table)
        }
        else if (choice === 1) {
            const q = database.query(table, where("userId", "==", field));
            raw = await getDocs(q);
        }

        const data = raw.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        console.table(data);

        return data;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function addRecord(table, data, choice, field) {
    try {
        const docRef = await addDoc(table, data);
        console.log("Document written with ID: ", docRef.id);

        return getRecords(table, choice, field);
    }
    catch (error) {
        console.error("Error adding document: ", error.message);
    }
}

export async function deleteRecord(table, id) {
    try {
        // Add code to delete record from database
        const record = doc(database, table, id);
        await deleteDoc(record);
    }
    catch (error) {
        console.error("Error deleting document: ", error.message);
    }
}

export async function updateRecord(table, id, newData = { column: "data" }) {
    try {
        // Add code to delete record from database
        const record = doc(database, table, id);
        await updateDoc(record, newData);

        return getRecords(table);
    }
    catch (error) {
        console.error("Error deleting document: ", error.message);
    }
}

export async function getMedia() {
    try {
        // Add code to get media from storage
    }
    catch (error) {
        console.error("Error getting media: ", error.message);
    }
}