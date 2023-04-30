import React   from "react";
import {ShoppingCart} from "lucide-react"
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "@/redux/reducers/Cart";
import SearchInput from "./SearchInput";
import { useRouter } from "next/router";


const NavBar = () => {
  const BASE_URL:string ="https://bookstore-delta-two.vercel.app"
  const imageUrl = `${BASE_URL}/logo.jpg`;
  const router = useRouter()
  const {items} = useSelector((state:any)=>state.cart)
  const dispatch = useDispatch()

  
  return <>
    <section className="flex items-center justify-center sticky top-0 bg-yellow-400 z-40">
      <div className="flex justify-between items-center w-screen pr-1">
        <div className="container mx-auto flex items-center justify-evenly text-slate-700 p-5 font-bold gap-5 md:gap-0">
          <div className="flex gap-0 items-center justify-center">
            <img
              src={imageUrl}
              alt=""
              className="w-28 mix-blend-multiply cursor-pointer"
              onClick={() => router.push('/')}
            />
            <Link href={`${BASE_URL}/all`}>
            <div>
              <h3 className="whitespace-nowrap">Tou livres</h3>
            </div>
          </Link>
          </div>
          <div className="flex items-center justify-center gap-5 md:justify-end">
            <div className="flex items-center justify-center">
              <div className="hidden md:block">
                <SearchInput />
              </div>
            </div>
          </div>
          <Link href="/">
            <div>
              <h3>Accueil</h3>
            </div>
          </Link>
          <div className="flex items-center justify-end">
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative"
            >
              <ShoppingCart
                className="cursor-pointer border rounded-lg p-2 hover:outline"
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
    </section>

    
  </>
}

  

export default NavBar
