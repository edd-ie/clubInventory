import { auth, database, storage } from './firebase-config'
import { query, where, getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { uploadBytes, ref } from 'firebase/storage';


//Tables
export const members = collection(database, 'members')
export const categories = collection(database, 'categories')
export const inventory = collection(database, 'inventory')
export const purchase = collection(database, 'purchase')
export const funding = collection(database, 'funding')
export const borrow = collection(database, 'borrow')


export async function getRecord(table, fieldName, value) {
    // Create a query with filtering
    const sql = query(table, where(fieldName, "==", value));

    try {
        const raw = await getDocs(sql);

        // Handle multiple documents
        if (raw.size === 1) {
            // Exactly one document found, access its data
            const doc = raw.docs[0];
            return { ...doc.data(), id: doc.id }; // Return data with ID
        }
        else if (raw.size > 1) {
            const data = raw.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            return data;
        } else {
            // Handle cases with zero or multiple documents (optional)
            return null; // Or return an empty object, handle in calling code
        }
    } catch (error) {
        console.error("Error getting documents:", error);
        alert("Error getting documents");
        return null; // Or throw an error
    }
}

//CRUD actions
export async function getAllRecords(table) {
    //Read data from database
    try {
        let raw = await getDocs(table);

        const data = raw.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        return data;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function addRecord(table, data) {
    try {
        await addDoc(table, data);
    }
    catch (error) {
        console.error("Error adding document: ", error.message);
        alert("Error adding document: ", error.message);
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

//const [fileUpload, setFileUpload] = useState(null);
// use input type="file"
// onChange((e)=>setFileUpload(e.target.files[0]))
// button onClick(()=>uploadMedia())
async function uploadMedia(folderName = `Categories/${fileUpload.name}`) {
    // Add code to upload file to storage
    if (fileUpload) {
        try {
            const storageRef = ref(storage, folderName);
            await uploadBytes(storageRef, fileUpload);
            setFileUpload(null);
        }
        catch (error) {
            console.error("Error uploading file: ", error.message);
        }
    }
}