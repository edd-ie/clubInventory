import {React, useState} from "react";
import { Box, Flex, Skeleton, 
    Button, Text, Heading, Card, TextField,
    Callout, Link
 } from '@radix-ui/themes';

 import { logIn } from "../config/authFx";



export default function Login({setHasAccount, setUser}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [miss, setMiss] = useState(false)
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    function handleLogin(event) {
        event.preventDefault();

        if(password ==='' || email ==='') {
            setMiss(true)
            return
        }
        setMiss(false)
        
        let result = logIn(email, password).then(
            ()=>{
                setUser(result)
            }
        )
    }

    return (
        <Box style={{
            display:"flex",
            alignItems:"center", justifyContent:"center",
            width: "100%", height: "100%"
            }} >
            
            {miss?
                <Callout.Root color="red" size="1"  
                style={{top: "10%", position:"absolute", left:"70%", height:"40px"}}>
                    <Callout.Icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877M1.827 7.5a5.673 5.673 0 1 1 11.346 0a5.673 5.673 0 0 1-11.346 0m6.423-3a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6z" clip-rule="evenodd"/></svg>
                    </Callout.Icon>
                    <Callout.Text style={{fontSize:"10px"}}>
                    Please fill in missing fields!
                    </Callout.Text>
                </Callout.Root>:null
            }

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
                                    size="1" style={{width:"250px", fontSize:"10px"}}
                                    value={email} required
                                    onChange={handleEmailChange}
                                    />
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
                                    size="1" style={{width:"250px", fontSize:"10px"}} type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    />
                            </Skeleton>

                            <Flex gap="2" width="250px" justify="end" style={{marginTop:"15px"}} >
                                <Skeleton loading={false} width="50px" height="18px">
                                    <Button size="1"  variant="outline" 
                                    style={{width:"120px", height:"22px", fontSize:"10px"}}
                                        onClick={() => {setHasAccount(false)}}
                                >
                                        Create an account
                                    </Button>
                                </Skeleton>

                                <Skeleton loading={false} width="50px" height="18px">
                                    <Button size="1" variant="solid"
                                        style={{width:"60px", height:"22px", fontSize:"10px"}}
                                        onClick={(e)=>handleLogin(e)}
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
    )
}