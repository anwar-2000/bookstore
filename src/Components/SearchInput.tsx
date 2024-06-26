import { Search } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { FC , MouseEvent, useRef, useState  } from 'react'
import styled from 'styled-components'
import Debounce from './Debounce'


const SearchInput:FC = ({}) => {
    const [searchValue,setSearchValue] = useState<string>('')
    const [searchParam,setSearchParam] = useState<string>('titre')
    const searchInput = useRef(null)

    const changeParamHandler = (e:any) =>{
        setSearchParam(e.target.value)
    }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchValue(event.target.value);
    }
  return <>
  <Container>
  <InputContainer>
    <select
     
        value={searchParam}

        onChange={changeParamHandler}
        className="bg-transparent  text-slate-400  p-2 focus:outline-none"
      >
        <option value="">Select an option</option>
        <option value="auteur">Auteur</option>
        <option value="titre">Titre</option>
        <option value="vetements">Vetements</option>
        <option value="materiaux">Materiaux</option>
      </select>
    <div id='inputs'>
             <div className='inputs2'>
              <input
                ref ={searchInput}
                type="text"
                autoComplete="false"
                onChange={changeHandler}
                value={searchValue}
                placeholder="Rechercher ici ..."
                className="text-center md:text-start md:p-2 m-2 rounded outline-none focus:outline-none border-l-stone-900  bg-transparent text-slate-300 placeholder:text-slate-400 placeholder-shown:border-none focus:border-none block"
                />
              <Search strokeWidth="2" color='grey'  className="cursor-pointer block" />
              </div>
              {searchValue.length!==0 &&
   <div className='items'>
    <Debounce searchParam={searchParam} searchValue={searchValue} resetValue={()=>setSearchValue('')}/>
    </div>
  }
              </div>
  </InputContainer>
  
   
 
  </Container>
  </>
}

export default SearchInput

const Container = styled.div`
  display : flex;
  flex-direction : column;
  gap : 1.5rem;
  
 
    
`

const InputContainer = styled.div`
  transform: translateX(0.4rem);
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-left: 2rem;

  /* Adding media queries here */
  @media screen and (max-width: 768px) {
    
    margin-left: 2rem;
    flex-direction: row; /* Add this line to make it flex row */
  }


  .items {
    position: absolute;
    top: 4.9rem;
    right: 1.2rem;

    /* Adding media queries here */
    @media (max-width: 768px) {
      top: 9rem;
      right: 0.5rem;
    }
  }

  select {    
    padding: 1.1rem;
    border-bottom: solid 1px grey;
    @media screen and (max-width: 768px) {
      padding : 0.6rem 0.7rem;
      text-align : center;
  }
  }

  #inputs {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media screen and (max-width: 768px) {
        flex-direction : row;
        gap : 0.8rem;
        
  }
  }

  .inputs2 {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px grey;
    padding-right: 0.5rem;

  }
    
  /* Adding media queries here */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    

    #inputs {
      flex-direction: row;
      margin-left: 0; 
      gap: 0.5rem;
      
    }
  }
`;
