import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/router'
interface Props {}

const Login = () => {
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const router = useRouter()
   /**
    * 
    * useEffect(() => {
        console.log(email);
      }, [email]);
      
      useEffect(() => {
        console.log(password);
      }, [password]); */ 

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        //console.log(email)
      };
      
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        //console.log(password)
      };

    const HandleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const data = await signIn('credentials' , {
                redirect : false,
                email,
                password,
                callbackUrl : '/'
            });
            if(data && data.ok){router.push('/')}
            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
        
        try {
            
        } catch (error) {
            console.log(error)
        }


    }
  return <Container>
        <h1>Login</h1>
        <label htmlFor="email">Email :</label> <input type="email" id="email"  className='text-slate-700' onChange={handleEmailChange} />
        <label htmlFor="password">Password :</label><input type="password" className='text-slate-700' id="password" onChange={handlePasswordChange} />

        <button onClick={HandleClick}>Submit</button>
  </Container>
}

export default Login

const Container = styled.div`
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    h1{
        font-size: 2rem;
    }
`