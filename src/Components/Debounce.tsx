import { preparedFetchforInput } from '@/lib/helpers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { PuffLoader } from 'react-spinners';


interface Props {
    searchValue : string;
    searchParam : string;
    resetValue : () => void;//empty value to hide the items after going to detail page
}
interface Book {
    nom?:string,
    id : string;
    slug : string;
    titre? : string;
    imageUrl1 : string;
}



const useDebounce = (value : string, delay : number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value]);
  
    return debouncedValue;
  };



const Debounce:React.FC<Props> = ({ searchParam, searchValue , resetValue}) => {
    const router = useRouter()
    const [books,setBooks] = useState<[]>([])
    const debouncedValue = useDebounce(searchValue,500);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    /**
     * 
     * 
     */
    useEffect(() => {
      const fetchData = async () => {
        if (debouncedValue) {
          setIsLoading(true)
          const data = await preparedFetchforInput(searchParam, searchValue);
          setIsLoading(false)
          setBooks(data);
        } else {
          setBooks([]);
        }
      };
      fetchData();
    }, [debouncedValue]);

    const handleClick = (book : Book) => (event: React.MouseEvent<HTMLDivElement>) =>{
        resetValue()

        let url = '/details'

        if(searchParam === "vetements"){
          url=`/articles/details/${searchParam}`
        }
        if(searchParam === "materiaux"){
          url=`/articles/details/${searchParam}`
        }
        router.push(`${url}/${book.slug}`)
    }
  return (<Container>
    <SimpleBar style={{ maxHeight: 300 }}>
      {!isLoading && books.map((book : Book) => (
      <Item key={book.id} onClick={handleClick(book)}>
        <img src={book.imageUrl1} alt={book.titre} />
        {book.nom}
        {book.titre}
        </Item>
    ))}
    </SimpleBar>
  </Container>
);
}

export default Debounce;

const Container = styled.div`
    display : flex;
    flex-direction:column;
    gap : 1rem;
    align-items:start;
    justify-content : start;
    background : #334155;
    height : 20rem;
    border-radius : 20px;
    width : 15rem;
    height : auto;
    position : relative;
    padding-bottom : 0.8rem;
    color:white;
    padding : 0.8rem;


`
const Item = styled.div`
    display : flex;
    align-items:center;
    justify-content : center;
    width : 13rem;
    padding : 0.5rem 0.5rem;
    cursor : pointer;

    &:hover {
        background : black;
        color : white;
        border-radius : 20px;
    }

    img {
        margin-right : 0.8rem;
        width : 60px;
        height : 60px;
        border-radius : 10px;
    }
`