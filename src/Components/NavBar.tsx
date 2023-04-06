import React   from "react";
import {ShoppingCart} from "lucide-react"
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/redux/reducers/Cart";
import SearchInput from "./SearchInput";


const NavBar = () => {
  const {items} = useSelector((state:any)=>state.cart)
  const dispatch = useDispatch()

  
  return <>
    <section className="flex items-center justify-center sticky top-0 bg-yellow-400  z-40 ">
      <div className="flex justify-between items-center w-screen pr-1">
        <div className="container mx-auto flex items-center justify-evenly text-slate-700 p-5 font-bold ">
          <div className="flex gap-5 items-center justify-center ">
            <h1 className="">EMMAUS CHATELLERAULT</h1>
          </div>
          <div className= 'flex items-center justify-center gap-10 md:justify-end'>
            <div className="flex items-center justify-center">
              <div className=" hidden md:block">
              <SearchInput />
              </div>
            </div>
          </div>
          <Link href='/'>
          <div>
            <h3>Acceuil</h3>
          </div>
          </Link>
          <div className="flex items-center justify-end">
           <button onClick={()=>dispatch(toggleCart())} className="relative">
            <ShoppingCart className="cursor-pointer border rounded-lg p-2 hover:outline " size={45}  />
            <small id="totalItemsCart" className="absolute top-0 right-0 bg-black text-white rounded-full px-1 text-xs">{items}</small>
            </button> 
          </div>
        </div>
      </div>
    </section>

    
  </>

  };
  

export default NavBar
