import React, {useState } from 'react'
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
            if(data && data.ok){router.push('/dashboard')}
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
        <Title>Connectez Vous (Admin)</Title>
        <Label htmlFor="email">Email :</Label> <Input type="email" id="email"  className='text-slate-700' onChange={handleEmailChange} />
        <Label htmlFor="password">Password :</Label><Input type="password" className='text-slate-700' id="password" onChange={handlePasswordChange} />

        <Button onClick={HandleClick}>Connecter</Button>
  </Container>
}

export default Login

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #3182ce;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top : 2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2b6cb0;
  }
`;