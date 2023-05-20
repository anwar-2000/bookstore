import { preparedFetchforInput } from '@/lib/helpers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


interface Props {
    searchValue : string;
    searchParam : string;
    resetValue : () => void;//empty value to hide the items after going to detail page
}
interface Book {
    id : string;
    _id : string;
    titre : string;
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
    /**
     * 
     * 
     */
    useEffect(()=>{
        if(debouncedValue){
            preparedFetchforInput(searchParam,searchValue).then((data:any)=>{
                    setBooks(data)
            })  
        }else {
            setBooks([])
        }
    },[debouncedValue])

    const handleClick = (bookId : string) => (event: React.MouseEvent<HTMLDivElement>) =>{
        resetValue()
        router.push(`/details/${bookId}`)
    }
  return (<Container>
    <SimpleBar style={{ maxHeight: 300 }}>
    {books.map((book : Book) => (
      <Item key={book.id} onClick={handleClick(book._id)}>
        <img src={book.imageUrl1} alt={book.titre} />
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
  
    align-items:center;
    justify-content : center;
    background : white;
    height : 20rem;
    border-radius : 20px;


`
const Item = styled.div`
    display : flex;
    align-items:center;
    justify-content : space-between;
    width : 15rem;
    padding : 0.5rem 1.5rem;
    cursor : pointer;

    &:hover {
        background : black;
        color : white;
    }

    img {
        margin-right : 0.8rem;
        width : 60px;
        height : 60px;
    }
`