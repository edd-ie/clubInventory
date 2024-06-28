import React, { useEffect, useState } from "react";
import {members} from '../config/Crud'
import { query, where, getDocs} from 'firebase/firestore';

import { Box, Flex, Skeleton, Separator,
    Button, Text, Heading, Card, TextField,
    Callout, Avatar,DataList, AlertDialog, Badge, IconButton
 } from '@radix-ui/themes';
import { auth } from "../config/firebase-config";
import { logOut } from "../config/authFx";


export default function Dashboard() {
    const [users, setUsers] = useState([]); // Initialize users state as an empty array

    useEffect(() => {
        async function run(){
            const sql = query(members, where("userId", "==", auth?.currentUser?.uid));

            try {
                const raw = await getDocs(sql);
                if (raw.size > 0) {
                    const data = raw.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    
                    // setUsers(data);
                }
            } catch (error) {
                console.error("Error getting documents:", error);
                alert("Error getting documents");
                return null; // Or throw an error
            }
        }

        run()
        
    }, []); // Empty dependency array to run only once on component mount

    const profile = users.map((user) => (
        <div key={user.userId}> // Use user.userId for unique keys
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        </div>
    ));

    console.table("data\n"+users);

    // Optionally, display a loading indicator while fetching data:
    const isLoading = users.length === 0; // Check if users array is empty

    function handleExit(){
        logOut();
    }

    // const [open, setOpen] = useState(false


            // {isLoading && <p>Loading users...</p>}
            // {profile}

    return(
        <Box minWidth="100vw" minHeight="100vh" overflow="hidden"
            style={{
            display:"flex", flexDirection:"row",
            alignItems:"center", justifyContent:"center",
            padding:"0"
            }}
        >
            <Flex gap="3" width="15vw" height="100vh" 
                style={{
                    display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"start",
                    padding:"0"
                }}
            >

                <Skeleton loading={isLoading} height="9vh" width="13vw" 
                    style={{
                        marginTop:"10px",
                        padding:"0"
                    }}
                >

                </Skeleton>


                <Flex direction="column" width="13vw" >
                    <Separator orientation="horizontal" size="4" />
                </Flex>

                <Skeleton loading={isLoading} height="30vh" width="13vw" 
                    style={{
                        padding:"0"
                    }}
                >

                </Skeleton>


                <Flex direction="column" width="13vw" >
                    <Separator orientation="horizontal" size="4" />
                </Flex>

                <Skeleton loading={isLoading} height="23vh" width="13vw" 
                    style={{
                        padding:"0"
                    }}
                >

                </Skeleton>
                
                
                <Skeleton loading={isLoading} height="21vh" width="13vw" 
                    style={{
                        padding:"0"
                    }}
                >

                </Skeleton>

            </Flex>


            <Flex gap="3" direction="column" width="85vw" height="100vh" 
                style={{
                    alignItems:"center", justifyContent:"center",
                    padding:"0"
                }}
            >

                <Flex gap="3" direction="row" width="83vw" height="6vh" 
                    style={{
                        alignItems:"center", justifyContent:"center",
                        padding:"0"
                    }}
                >

                    <Skeleton loading={isLoading} height="5vh" width="10vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>

                    <Skeleton loading={isLoading} height="5vh" width="68vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>
                    
                    <Skeleton loading={isLoading} height="5vh" width="4vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button variant="outline" color="red" size="1" width="4vw">Logout</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="300px" size="1">
                                <AlertDialog.Title size="2">Revoke access</AlertDialog.Title>
                                <AlertDialog.Description size="1">
                                Are you sure? The current session will be terminated.
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel size="1">
                                    <Button variant="soft" color="gray" size="1">
                                    Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action size="1">
                                    <Button variant="solid" color="red" size="1" onClick={handleExit}>
                                    Exit
                                    </Button>
                                </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>

                    </Skeleton>


                </Flex>

                <Flex gap="3" direction="column" width="83vw" height="88vh" 
                    style={{
                        alignItems:"center", justifyContent:"center",
                        padding:"0"
                    }}
                >
                    <Skeleton loading={isLoading} height="7vh" width="83vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>

                    <Skeleton loading={isLoading} height="83vh" width="83vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>

                </Flex>


            </Flex>
        </Box> 
    )
}