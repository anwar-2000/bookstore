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
      const inputValue = searchInput.current?.value ?? "";
      router.push(`/search?searchParam=${searchParam}&searchValue=${inputValue}`);
    };
  return <Container>
    <select
        value={searchParam}
        onChange={changeParamHandler}
        className="bg-transparent  text-slate-700 rounded-lg p-2"
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
                className="p-2 m-2 rounded outline-none border-l-stone-900  bg-transparent text-slate-700 placeholder:text-slate-700 placeholder-shown:border-none focus:border-none block"
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
  margin-left : 2rem;

  select  {
      border : solid 1.5px black;
      padding : 1.1rem;
      border-radius : 10px;
    }

  #inputs {
    display: flex;
    align-items: center;
    justify-content: center;
    border : solid 1.5px black;
    padding-right : 0.5rem;
    border-radius : 10px;
  }

  /* Adding media queries here */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;

    #inputs {
      flex-direction: row;
      margin-left : 2rem;
      gap: 0.5rem;
    }
  }
`;