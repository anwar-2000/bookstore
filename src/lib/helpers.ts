

//const BASE_URL:String ="bookstore-delta-two.vercel.app"
//const BASE_URL:String ="http://localhost:3000"


export const fetchBooks = async (page = 1, limit = 10) => {
    const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

//single book
export const fetchBook = async (bookId : string) =>{
    const response = await fetch(`/api/query/${bookId}`);
    const data = await response.json()
    if(data) return data
     return {}
 }

 //posting a new book
export const addBook = async (formData:Object) =>{
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`/api/books`,options)
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
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`/api/books?bookId=${bookId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }


   //deleting a new book
export const deleteBook = async (bookId : string) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Content-Type" : "application/json"}
        }
        const response = await fetch(`/api/books?bookId=${bookId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

 // quering books having the title or auteur when search input triggered
 export const fetchCategories = async () => {
    const response = await fetch(`/api/categories`);
    const data = await response.json();
    return data;
  };

// query  books based on categorie
  export const fetchBooksOfCategory = async (categorie : string) =>{
    const response = await fetch(`/api/${categorie}`);
    const data = await response.json()
    if(data) return data
     return {}
 }

 // query of a search input
 export const preparedFetchforInput = async (searchParam: string, searchValue: string) => {
    const response = await fetch(
      `/api/search?searchParam=${searchParam}&searchValue=${searchValue}`
    );
    //console.log("data before converting t JSON" , response)
    const data = await response.json();
    //console.log("fetching by search res : ",data)
    if (data) return data;
    //console.log("no data")
    return {};
  };

   //posting a new user
export const addUser = async (formData:Object) =>{
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`/api/register`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

//checking if user is admin
export const checkAdminStatus = async (email: string) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      };
      const response = await fetch(`/api/checkUserAdmin`, options);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data.isAdmin;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
 
  
  
  
  
  