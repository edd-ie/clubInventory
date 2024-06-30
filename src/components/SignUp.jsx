import {React, useState} from 'react';
import { signUp } from '../config/authFx';

import { Box, Flex, Skeleton, 
    Button, Text, Heading, Card, TextField,
    Callout, Select
 } from '@radix-ui/themes';
import { auth } from '../config/firebase-config';

export default function SignUp({setHasAccount, setUser}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [value, setValue] = useState('Software')

    const [match, setMatch] = useState(true)
    const [miss, setMiss] = useState(false)
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    const data = {
        userId: '',
        name: name,
        email: email,
        merit: 20,
        specialization: value,
        admin:false
    };

    function handleSignUP(event) {
        event.preventDefault();

        let nameCheck = name.split(" ")

        setMatch(true);
        setMiss(false);

        if(password ==='' || email ==='' || name ===''|| confirmPassword ==='') {
            setMiss(true)
            return
        }
        
        if(password !== confirmPassword) {
            setMatch(false)
            return
        }

        if(nameCheck.length < 2) {
            alert("Please enter your first and last name")
            setMiss(true)
            return
        }

        if(!email.includes("@")) {
            alert("Please enter a valid email address")
            setMiss(true)
            return
        }

        if(password.length < 8) {
            alert("Please enter a password with at least 8 characters")
            setMiss(true)
            return
        }
        console.table(data);

        let result = signUp(data, password);
        console.log(result);
        setUser(result);
    }
    

    return(
        <Box style={{
            display:"flex",
            alignItems:"center", justifyContent:"center",
            width: "100%", height: "100%"
            }} >
            


            <Flex gap="3" direction="column">

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

                {match?null:
                    <Callout.Root color="red" size="1"  
                    style={{top: "10%", position:"absolute", left:"70%", height:"40px"}}>
                        <Callout.Icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877M1.827 7.5a5.673 5.673 0 1 1 11.346 0a5.673 5.673 0 0 1-11.346 0m6.423-3a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0M6 6h1.5a.5.5 0 0 1 .5.5V10h1v1H6v-1h1V7H6z" clip-rule="evenodd"/></svg>
                        </Callout.Icon>
                        <Callout.Text style={{fontSize:"10px"}}>
                        Passwords do not match!
                        </Callout.Text>
                    </Callout.Root>
                }



                <Box width="285px">
                    <Card size="2">
                        <Flex gap="2" align="start" justify="center" direction="column">
                            <Skeleton loading={false} width="95px" height="25px" >
                                <Heading as="h3" style={{fontSize:"21px"}}>
                                    Create an Account
                                </Heading>
                            </Skeleton>

                            <Skeleton loading={false} style={{marginTop:"10px"}} width="50px" height="12px">
                                <Text as="paragraph" size="1" style={{marginTop:"15px", fontSize:"11px"}}>
                                    Full Name
                                </Text>
                            </Skeleton>

                            <Skeleton loading={false} width="250px" height="20px">
                                <TextField.Root placeholder="Enter your name" 
                                    size="1" style={{width:"250px", fontSize:"10px"}}
                                    value={name}
                                    onChange={handleNameChange}
                                    />
                            </Skeleton>


                            <Skeleton loading={false} style={{marginTop:"10px"}} width="50px" height="12px">
                                <Text as="paragraph" size="1" style={{marginTop:"15px", fontSize:"11px"}}>
                                    Email 
                                    <Text size="1" style={{marginTop:"15px", fontSize:"10px", color:"gray"}}>
                                        {'\t'}(preferably UNB email)
                                    </Text>
                                    
                                </Text>
                            </Skeleton>

                            <Skeleton loading={false} width="250px" height="20px">
                                <TextField.Root type="email" placeholder="Enter your email address" 
                                    size="1" style={{width:"250px", fontSize:"10px"}}
                                    value={email}
                                    onChange={handleEmailChange}
                                    />
                            </Skeleton>

                            <Flex style={{marginTop:"10px"}} gap="9" width="250px">
                                <Skeleton loading={false} width="100px" height="12px">
                                    <Text as="paragraph" size="1" style={{fontSize:"10px"}}>
                                        Specialization
                                    </Text>
                                </Skeleton>
                            </Flex>
                            <Skeleton loading={false} width="250px" height="10px">
                                <Select.Root value={value} size="1" height="10px" width="250px" onValueChange={setValue}>
                                    <Select.Trigger variant="soft" />
                                    <Select.Content>
                                        <Select.Group style={{fontSize:"12px"}}>
                                        <Select.Item value="Software" style={{fontSize:"12px"}}>Software</Select.Item>
                                        <Select.Item value="Mechanical" style={{fontSize:"12px"}}>Mechanical</Select.Item>
                                        <Select.Item value="Electrical" style={{fontSize:"12px"}}>Electrical</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                            </Skeleton>

                            <Flex style={{marginTop:"10px"}} gap="9" width="250px">
                                <Skeleton loading={false} width="90px" height="12px">
                                    <Text as="paragraph" size="1" style={{fontSize:"10px"}}
                                        placeholder="Enter password"
                                    >
                                        Password
                                    </Text>
                                </Skeleton>
                            </Flex>
                            <Skeleton loading={false} width="250px" height="20px">
                                <TextField.Root placeholder="Enter your password" 
                                    size="1" style={{width:"250px", fontSize:"10px"}}
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    />
                            </Skeleton>


                            <Flex style={{marginTop:"10px"}} gap="9" width="250px">
                                <Skeleton loading={false} width="100px" height="12px">
                                    <Text as="paragraph" size="1" style={{fontSize:"10px"}}>
                                        Confirm password
                                    </Text>
                                </Skeleton>
                            </Flex>
                            <Skeleton loading={false} width="250px" height="20px">
                                <TextField.Root placeholder="Enter your password" 
                                    size="1" style={{width:"250px", fontSize:"10px"}}
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    >
                                        
                                    </TextField.Root>
                            </Skeleton>

                            <Flex gap="2" width="250px" justify="end" style={{marginTop:"15px"}} >
                                <Skeleton loading={false} width="50px" height="18px">
                                    <Button size="1"  variant="outline" 
                                    style={{width:"120px", height:"22px", fontSize:"10px"}}
                                    onClick={() => {setHasAccount(true)}}
                                >
                                        Login to Account
                                    </Button>
                                </Skeleton>

                                <Skeleton loading={false} width="50px" height="18px">
                                    <Button size="1" variant="solid"
                                        style={{width:"60px", height:"22px", fontSize:"10px"}}
                                        onClick={(e)=>handleSignUP(e)}
                                    >
                                        Sign Up
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