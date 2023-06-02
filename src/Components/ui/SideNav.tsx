import React, { FC, HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'
import {ChevronRight , Menu} from "lucide-react"
import Link from 'next/link'
import { SET_OPEN } from '@/redux/reducers/Toggle'
import { useDispatch} from 'react-redux'
import { useSelector } from "react-redux";

import SearchInput from '../SearchInput'

interface Props extends React.HTMLAttributes<HTMLElement>{

}

type StyledComponentProps = {
    isOpen: boolean;
  };

const SideNav:FC<Props> = ({...rest}) => {

    const dispatch = useDispatch()
    const toggle = () => {
        dispatch(SET_OPEN());
    
    }
    const { isOpen } = useSelector((state: any) => state.toggle);

    
  return <Container isOpen={isOpen}>
        <div className='header'>
            <Menu className='Menu' color='#4F6398' onClick={toggle} />
            <img src='./logo.jpg' alt='Emmaus Image'  />
            <h1>EMMAUS CHATELLERAULT</h1>
            <small>BOUTIQUE</small>
        </div>
        <div className='block lg:hidden'>
            <SearchInput />
        </div>
        <div className='navlinks'>
            <h5>Explorer</h5>
            <ChevronRight color='#4F6398' />
        </div>
        <Link href={'/all/categories'}>
        <div className='navlinks'>
            <h5>Categories</h5>
            <ChevronRight color='#4F6398' />
        </div>
        </Link>
        <Link href={'/all/favories'}>
        <div className='navlinks'>
            <h5>Mes Favories</h5>
            <ChevronRight color='#4F6398' />
        </div>
        </Link>
        <Link href={'/'}>
        <div className='navlinks'>
            <h5>Home</h5>
            <ChevronRight color='#4F6398' />
        </div>
        </Link>
        
  </Container>
}

export default SideNav

const Container = styled.div<StyledComponentProps>`
    width: 28.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    color: #4242ce;
    gap: 4rem;
    border-right: #4F6398 solid 1px;
   
     /* styles for screens smaller than 768px */
     @media screen and (max-width: 767px) {
      width: 27rem;
}
    .onlyOnSmallerDevices{
        display : block !important;

       & @media screen and (min-width: 1024px) {
              &{
                display : none;
            } 
            }   
    }
    
    .header{
        margin-top: 0.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: black;

        img {
            width: 35%;
            margin-bottom: 0.8rem;
        }
    }
    .Menu {
        position: absolute;
        top: 0;
        right: ${(props) => (props.isOpen === false && '1rem')};
        right: ${(props) => (props.isOpen === true && 'auto')};
        left: ${(props) => (props.isOpen === true && '2rem')};
        cursor: pointer;
        z-index : 11;
    }

    .navlinks {
        display: flex;
        gap: 2rem;
        transition: all ease-in-out 400ms;
        margin-left: 3rem;
        cursor: pointer;
        h5 {
            color: #4F6398;
            font-weight: bold;
            margin-right: 8rem;
        }

        &:hover{
            border-bottom: #4F6398 1px solid;
            margin-left: 4rem;
        }
    }
`

