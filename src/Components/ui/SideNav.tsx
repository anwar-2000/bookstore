import React, { FC, HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'
import {ChevronRight , Menu} from "lucide-react"
import Link from 'next/link'
import { SET_OPEN } from '@/redux/reducers/Toggle'
import { useDispatch} from 'react-redux'
import SearchInput from '../SearchInput'

interface Props extends React.HTMLAttributes<HTMLElement>{

}

const SideNav:FC<Props> = ({...rest}) => {
    const dispatch = useDispatch()
    const toggle = () => {
        dispatch(SET_OPEN());
    }
  return <Container>
        <div className='header'>
            <Menu className='Menu' color='#4F6398' onClick={toggle} />
            <img src='./emmaus.jpg' alt='Emmaus Image' />
            <h1>EMMAUS CHATELLEARAULT</h1>
            <small>BOUTIQUE</small>
        </div>
        <div>
            <SearchInput />
        </div>
        <div className='navlinks'>
            <h5>Explore</h5>
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
            <h5>Mes Favorie</h5>
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

const Container = styled.div`
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
            margin-left: 2.3rem;
            margin-bottom: 0.8rem;
            mix-blend-mode: darken;
        }
    }
    .Menu {
        position: absolute;
        top: 0;
        right: 1rem;
        cursor: pointer;
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

