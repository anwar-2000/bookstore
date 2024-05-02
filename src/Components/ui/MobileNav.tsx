import Link from 'next/link'
import  { useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../SearchInput'
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { toggleCart } from '@/redux/reducers/Cart';
interface Props {}

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const BASE_URL:string ="https://emmaus-chatelleraudais.vercel.app"
    //const BASE_URL2:string ="http://localhost:3000"
    const {items} = useSelector((state:any)=>state.cart)
    const dispatch = useDispatch()
  
    const imageUrl = `${BASE_URL}/emmaus2.png`;
    const navVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0 },
      };
  return <>
    <img
            src={imageUrl}
            title="Emmaus-chatellerault-Boutique des livres rares" aria-details="livres rares et anciens disponibles dans la boutique emmaus chatellerault a un prix compététif"
            className="absolute -top-3 -left-5 h-24 w-44 max-h-70 object-contain mr-4 rounded cursor-pointer"
            
            />
     <div className="flex items-center justify-end absolute top-3 right-4">
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative"
            >
              <ShoppingCart
                className="cursor-pointer p-3 "
                size={45}
              />
              <small
                id="totalItemsCart"
                className="absolute top-0 right-0 bg-black text-white rounded-full px-1 text-xs"
              >
                {items}
              </small>
            </button>
          </div>
  <RxHamburgerMenu size={22} className='absolute top-6  right-20' onClick={()=>setIsOpen(!isOpen)} />
  {isOpen &&
    <Container
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{duration : 0.5}}
            exit="hidden"
  >
        <Link href="/all" onClick={()=>setIsOpen(false)}>
            <h1>Explorer</h1>
        </Link>
        <Link href="/actualite" onClick={()=>setIsOpen(false)}>
            <h1>Actualités</h1> 
        </Link>
        <Link href="/emmausNaintre" onClick={()=>setIsOpen(false)}>
              <h1>Nous somme ?</h1>
          </Link>
          <Link href="/" onClick={()=>setIsOpen(false)}>
              <h1>Accueil</h1>
          </Link>

        <div className="search">
        <SearchInput />
        </div>
       
  </Container>}
  </>
}

export default MobileNav
const Container = styled(motion.div)`
    padding : 3rem 1rem;
    height : 100vh;
    background : #334155;
    position : absolute;
    top:3rem;
    left : 0px;
    right:0px;
    width : 100vw;
    display : flex;
    flex-direction  : column;
    align-items : center;
    justify-content : flex-start;
    color : white;
    gap : 1.2rem;

    .search{
        transform : translateX(-1.2rem)
    }
`