import { Search } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { FC , MouseEvent, useRef, useState  } from 'react'
import styled from 'styled-components'


const SearchInput:FC = ({}) => {
    const [searchValue,setSearchValue] = useState<string>('')
    const [searchParam,setSearchParam] = useState<string>('titre')
    const router = useRouter();
    const searchInput = useRef<HTMLInputElement>(null)

    const changeParamHandler = () =>{
        if (searchParam === 'titre') {setSearchParam('auteur')} else {setSearchParam('titre')}
    }
    const handleClick = (searchParam: string, searchValue: string) => (
        event: MouseEvent<SVGSVGElement>
      ) => {
        //const Base_url = process.env.BASE_URL;
       //undefined console.log(Base_url)
        const inputValue = searchInput.current?.value ?? ""; // if undefined give me this
        router.push(`http://localhost:3000/search?searchParam=${searchParam}&searchValue=${inputValue}`);
      };
  return <Container>
    <select
        value={searchParam}
        onChange={changeParamHandler}
        className="bg-transparent focus:outline-none text-slate-700 rounded-lg p-2"
      >
        <option value="">Select an option</option>
        <option value="auteur">Auteur</option>
        <option value="titre">Titre</option>
      </select>
    <div id='inputs'>
              <input
                ref ={searchInput}
                type="text"
                autoComplete="false"
                placeholder="livres / auteur ..."
                className="p-2 m-2 rounded focus:outline-none border bg-transparent text-slate-700 placeholder-shown:border-slate-700  block"
              />
              <Search strokeWidth="4" color='black' className="cursor-pointer block" onClick={handleClick(searchParam, searchValue)} />
            </div>
  </Container>
}

export default SearchInput

const Container = styled.div`
transform: translateX(0.4rem);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      #inputs {
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
`