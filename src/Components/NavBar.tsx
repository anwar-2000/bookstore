import React   from "react";
import {ShoppingCart} from "lucide-react"
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/redux/reducers/Cart";
import SearchInput from "./SearchInput";
import MobileNav from "./ui/MobileNav";


const NavBar = () => {
  const BASE_URL:string ="https://emmaus-chatelleraudais.vercel.app"
  //const BASE_URL2:string ="http://localhost:3000"

  const imageUrl = `${BASE_URL}/emmaus2.png`;
  const {items} = useSelector((state:any)=>state.cart)
  const dispatch = useDispatch()

  
  return <>
 <section className="bg-slate-700 flex items-center justify-center sticky top-0 h-20  text-white  border-b-2 border-slate-700 z-50 ">
  <div className="hidden md:flex justify-between items-center w-screen ">
    <div className="container mx-auto flex items-center justify-between text-dark  font-bold gap-5 md:gap-0">
      <div className="flex gap-0 items-center justify-center transform translate-x-1 md:translate-x-0">
        <img
          src={imageUrl}
          title="Emmaus-chatellerault-Boutique des livres rares" aria-details="livres rares et anciens disponibles dans la boutique emmaus chatellerault a un prix compététif"
          className=" sm:ml-6 h-24 w-28 max-h-70 object-contain mr-4 rounded cursor-pointer transform translate-x-7 md:translate-x-0"
          
        />
            <Link href={`https://emmtaboutique.com/all`}>
            <div className="md:block hidden lg:block pr-1">
              <h3 className="whitespace-nowrap ml-3">Explorer</h3>
            </div>
          </Link>
          <Link href={`https://emmtaboutique.com/actualites`}>
            <div className="md:block md:mr-2 lg:block pr-2">
              <h3 className="whitespace-nowrap ml-3 transform translate-x-1 md:translate-x-0">Actualités</h3>
            </div>
          </Link>
          </div>
          <div className="flex items-center justify-center gap-5 md:justify-end">
            <div className="flex items-center justify-center md:justify-evenly">
              <div className="hidden md:block md:mr-8" >
                <SearchInput />
              </div>
            </div>
          </div>
          <Link href="/">
            <div className="md:hidden block lg:block transform translate-x-2 md:translate-x-0 " >
              <h3 >Accueil</h3>
            </div>
          </Link>
          <Link href="/emmausNaintre">
            <div className="hidden lg:block">
              <h3>Nous somme ?</h3>
            </div>
          </Link>
          <div className="flex items-center justify-end">
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
        </div>
       </div>
       <div className="block md:hidden">
         <MobileNav />
       </div>
    </section>

    
  </>
}

  

export default NavBar



