import React, { useEffect, useState } from "react";
import {members, categories, getAllRecords} from '../config/Crud'
import { query, where, getDocs} from 'firebase/firestore';

import { Box, Flex, Skeleton, Separator,
    Button, Text, Inset, Card, ScrollArea,
    Callout, Avatar,DataList, AlertDialog, Badge, IconButton,
    Strong, Grid,
    Heading
 } from '@radix-ui/themes';
import { auth } from "../config/firebase-config";
import { logOut } from "../config/authFx";
import { ArchiveIcon, ExitIcon, LayersIcon, StopwatchIcon } from "@radix-ui/react-icons";



export default function Dashboard() {
    const [users, setUsers] = useState([]); // Initialize users state as an empty array
    const [initials, setInitials] = useState("HI");
    const borders = ["#d6ebfd30", "#d8f4f609"]
    const [tags, setTags] = useState([])

    let active = "tab1";

    function pickBorder(id){
        if(id === active){
            return borders[0]
        }
        return borders[1]
    }

    function handleTabSwitch(e){
        let prev = document.getElementById(active);
        let current = document.getElementById(e)
        prev.style.borderColor = borders[1]
        current.style.borderColor = borders[0]
        
        active = e;
    }

    useEffect(() => {
        async function run(){
            const sql = query(members, where("userId", "==", auth?.currentUser?.uid));

            try {
                const raw = await getDocs(sql);
                if (raw.size > 0) {
                    const data = raw.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    
                    // setUsers(data);
                    setInitials(extractFirstLetters(data[0].name));
                }

                const set = await getAllRecords(categories);
                setTags(set)
                console.table(tags)
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

    const displayTags = tags.map((tag) => (
        <Flex direction="column" width="140px" style={{ borderRadius:"2px", border:`0px solid ${borders[1]}`}}>
                    <img
                        src={tag.imageUrl}
                        alt="Bold typography"
                        style={{
                        display: 'block',
                        objectFit: 'cover',
                        width: '100%',
                        height: "110px",
                        backgroundColor: 'black',
                        margin:"0",
                        borderTopRightRadius:"2px", borderTopLeftRadius:"2px"
                        }}
                    />
                    <Flex width="140px" height="30px" gap="1" justify="center"
                    style={{background:`#ddeaf814`, paddingLeft:"5px",  marginTop:"0", 
                        borderBottomRightRadius:"2px", borderBottomLeftRadius:"2px"}} direction="column">
                        <Text as="label" size="2">
                            <Strong>{tag.tag}</Strong>
                        </Text>
                    </Flex>
        </Flex>
    ))
    

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
            {/* Sidebar */}
            <Flex gap="3" width="15vw" height="100vh" 
                style={{
                    display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"start",
                    padding:"0"
                }}
            >

                <Skeleton loading={false} height="9vh" width="13vw" 
                    style={{
                        marginTop:"10px",
                        padding:"0"
                    }}
                >
                    {/* App logo and name */}
                    <Flex direction="row" height="9vh" width="13vw" gap="2"
                        style={{
                        marginTop:"10px", alignItems:"center", 
                        padding:"0"
                        }}
                    >
                        <Avatar
                            // src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                            fallback={initials}
                            size="2"
                        />

                        <Text as="div" size="1">
                            <Strong>
                                UNB <br></br> Robotics
                            </Strong>
                        </Text>

                    </Flex>

                </Skeleton>


                <Flex direction="column" width="13vw" >
                    <Separator orientation="horizontal" size="4" />
                </Flex>

                <Skeleton loading={false} height="26vh" width="13vw" 
                    style={{
                        padding:"0"
                    }}
                >
                    {/* Content nav bar */}
                    <Flex  direction="column" height="26vh" width="13vw" gap="3">
                        <Flex id="tab1" direction="row" height="8vh" align="center" gap="2" 
                            style={{background:"#d8f4f609", paddingLeft:"12px", 
                                border:`1px solid  ${pickBorder("tab1")}`, borderRadius:"6px", cursor:"pointer"}}
                            onClick={()=>handleTabSwitch("tab1")}
                        >
                            <ArchiveIcon />
                            <Text size="2" as="p">Inventory</Text>
                        </Flex>
                        
                        <Flex id="tab2" direction="row" height="8vh" align="center" gap="2" 
                            style={{background:"#d8f4f609", paddingLeft:"12px", 
                                border:`1px solid  ${pickBorder("tab2")}`, borderRadius:"6px", cursor:"pointer"}}
                            onClick={()=>handleTabSwitch("tab2")}
                        >
                            <LayersIcon />
                            <Text size="2" as="p">Borrowed</Text>
                        </Flex>
                        
                        <Flex id="tab3" direction="row" height="8vh" align="center" gap="2" 
                            style={{background:"#d8f4f609", paddingLeft:"12px", 
                                border:`1px solid  ${pickBorder("tab3")}`, borderRadius:"6px", cursor:"pointer"}}
                            onClick={()=>handleTabSwitch("tab3")}
                        >
                            <StopwatchIcon />
                            <Text size="2" as="p">History</Text>
                        </Flex>

                        

                    </Flex>

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

            {/* Main section */}
            <Flex gap="3" direction="column" width="85vw" height="100vh" 
                style={{
                    alignItems:"center", justifyContent:"center",
                    padding:"0"
                }}
            >
                {/* Top section */}
                <Flex gap="3" direction="row" width="83vw" height="6vh" 
                    style={{
                        alignItems:"center", justifyContent:"center",
                        padding:"0"
                    }}
                >

                    {/* 1st section */}
                    <Skeleton loading={isLoading} height="5vh" width="10vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>

                    {/* Search bar */}
                    <Skeleton loading={isLoading} height="5vh" width="68vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>

                    {/* Log out button */}
                    <Skeleton loading={isLoading} height="5vh" width="4vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button variant="soft" color="gray" size="1" >
                                    <ExitIcon style={{width:"9px", color:"red"}}/>
                                </Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="290px" size="1" style={{paddingTop:"15px"}}>
                                <AlertDialog.Title size="2">Log Out</AlertDialog.Title>
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

                {/* Content section */}
                <Flex gap="3" direction="column" width="83vw" height="88vh" 
                    style={{
                        alignItems:"center", justifyContent:"center",
                        padding:"0"
                    }}
                >

                    {/* Filters */}
                    <Skeleton loading={isLoading} height="7vh" width="83vw" 
                        style={{
                            padding:"0"
                        }}
                    >

                    </Skeleton>

                    {/* Content display */}
                    <Skeleton loading={false} height="83vh" width="83vw" 
                        style={{
                            padding:"0"
                        }}
                    >
                    <ScrollArea type="always" scrollbars="vertical" style={{ height:"83vh", width:"83vw"}}>
                        <Grid columns="3" gap="4" width="60vw" style={{paddingTop:"10px", paddingLeft:"0px", marginLeft:"25vh"}}>
                        {displayTags}
                        </Grid>
                    </ScrollArea>

                    </Skeleton>

                </Flex>


            </Flex>
        </Box> 
    )
}


function extractFirstLetters(text) {
  // Split the text into an array of words
  const words = text.split(' ');

  // Extract and combine the first letters of the first two words
  return words[0][0] + words[1][0];
}