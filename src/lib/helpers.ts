const BASE_URL:String ="http://localhost:3000"

export const fetchBooks = async () =>{
   const response = await fetch(`${BASE_URL}/api/books`);
   const data = await response.json()
    return data
}