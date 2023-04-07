import Hero from "@/Components/Hero";
import RecentBooks from "@/Components/RecentBooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Home() {
  return <>
        <Hero />
        <RecentBooks />
    </>
  
}
