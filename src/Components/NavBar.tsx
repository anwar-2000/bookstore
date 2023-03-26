import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import {ShoppingCart} from "lucide-react"
import Link from "next/link";

interface Props {}

const NavBar = () => {
  const [isOpen,setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="flex items-start justify-center ">
      <div className="flex justify-center items-center w-screen">
        <div className="container mx-auto flex items-center justify-around text-slate-900 p-5 font-bold">
          <div className="flex gap-5 items-center justify-center">
            <h1 className="">EMAUS CHATELLERAULT</h1>
          </div>
          <div className= 'flex items-center justify-center gap-10 md:justify-end'>
            <div className="flex items-center justify-between">
              <input
                type="text"
                autoComplete="none"
                placeholder="livres ..."
                className="p-2 m-2 rounded border placeholder-shown:border-gray-500 hidden md:block"
              />
              <Search strokeWidth="4" className="cursor-pointer hidden md:block" />
            </div>
            <div className='hidden md:block'>
              <Link href="" > 
                Acceuil
              </Link>
            </div>
            <div className="">
              <Link href="" className="hidden md:block">
                Tous Livres
              </Link>
            </div>
          </div>
          <button
              onClick={toggleMenu}
              className="md:hidden text-slate-900 focus:outline-none p-2"
            >
              <Menu strokeWidth="4" />
            </button>
          <div className="flex items-center justify-end">
            <ShoppingCart className="cursor-pointer border rounded-lg p-2 hover:outline" size={42} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NavBar

