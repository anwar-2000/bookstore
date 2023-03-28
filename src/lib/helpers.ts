

const BASE_URL:String ="http://localhost:3000"

export const fetchBooks = async () =>{
   const response = await fetch(`${BASE_URL}/api/books`);
   const data = await response.json()
    return data
}
//single book
export const fetchBook = async (bookId : string) =>{
    const response = await fetch(`${BASE_URL}/api/${bookId}`);
    const data = await response.json()
    if(data) return data
     return {}
 }

 //posting a new book
export const addBook = async (formData:Object) =>{
    try {
        const options = {
            method : "POST",
            headers :{ "Conetent-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/books`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

  //updating a new book
export const updateBook = async (bookId : string ,formData:Object) =>{
    try {
        const options = {
            method : "PUT",
            headers :{ "Conetent-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/books/${bookId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }


   //deleting a new book
export const deleteBook = async (bookId : string ,formData:Object) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Conetent-Type" : "application/json"}
        }
        const response = await fetch(`${BASE_URL}/api/books/${bookId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }