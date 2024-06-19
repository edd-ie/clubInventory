import React from 'react';
import {auth, googleAuth} from "../config/firebase-config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

import { logIn } from '../config/authFx';
import { Box, Flex, Skeleton, 
    Button, Text, Heading, Card, TextField,
    Avatar, Link
 } from '@radix-ui/themes';



export default function Auth() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    return (
        <>
        <Box style={{
            display:"flex",
            alignItems:"center", justifyContent:"center",
            width: "100%", height: "100%"
            }} >
            <Flex gap="3" direction="column">
                <Box width="285px">
                    <Card size="2">
                        <Flex gap="2" align="start" justify="center" direction="column">
                            <Skeleton loading={false} width="100px" height="30px">
                                <Heading as="h2">
                                    Sign in
                                </Heading>
                            </Skeleton>

                            <Skeleton loading={false} style={{marginTop:"20px"}} width="50px" height="12px">
                                <Text as="paragraph" size="1" style={{marginTop:"15px", fontSize:"11px"}}>
                                    Email
                                </Text>
                            </Skeleton>

                            <Skeleton loading={false} width="250px" height="20px">
                                <TextField.Root type="email" placeholder="Enter your email address" 
                                    size="1" style={{width:"250px", fontSize:"10px"}}/>
                            </Skeleton>

                            <Flex style={{marginTop:"20px"}} gap="9" width="250px">
                                <Skeleton loading={false} width="90px" height="12px">
                                    <Text as="paragraph" size="1" style={{fontSize:"10px"}}>
                                        Password
                                    </Text>
                                </Skeleton>

                                <Skeleton loading={false} width="95px" height="12px">
                                    <Link href="#" size="1" style={{fontSize:"9px", 
                                        marginLeft:"70px"
                                    }} >Forgot password?</Link>
                                </Skeleton>
                            </Flex>
                            <Skeleton loading={false} width="250px" height="20px">
                                <TextField.Root placeholder="Enter your password" 
                                    size="1" style={{width:"250px", fontSize:"10px"}}>
                                        
                                    </TextField.Root>
                            </Skeleton>

                            <Flex gap="2" width="250px" justify="end" style={{marginTop:"15px"}} >
                                <Skeleton loading={false} width="50px" height="18px">
                                    <Button size="1"  variant="outline" 
                                    style={{width:"120px", height:"22px", fontSize:"10px"}}
                                >
                                        Create an account
                                    </Button>
                                </Skeleton>

                                <Skeleton loading={false} width="50px" height="18px">
                                    <Button size="1" variant="solid"
                                        style={{width:"60px", height:"22px", fontSize:"10px"}}
                                    >
                                        Sign in
                                    </Button>
                                </Skeleton>
                            </Flex>
                        </Flex>
                    </Card>
                </Box>
            </Flex>
        </Box>
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