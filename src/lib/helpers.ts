

//const BASE_URL:String ="https://emmtaboutique.com"
const BASE_URL:String ="http://localhost:3000"


export const fetchBooks = async (page = 1, limit = 10) => {
    const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  export const fetchHighPriceBooks = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/api/books?page=${page}&limit=${limit}&sort=highprice`);
    const data = await response.json();
    return data;
  };

//single book
export const fetchBook = async (slug: string) => {
  console.log('helper',slug)
  try {
    const url = `${BASE_URL}/api/query/${slug}`;
    //console.log('URL:', url); // Log the URL for debugging

    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      return data;
    }
    return {};
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

 //posting a new book
export const addBook = async (formData:Object) => {
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
    const response = await fetch(`${BASE_URL}/api/categories`);
    const data = await response.json();
    return data;
  };

// query  books based on categorie
  export const fetchBooksOfCategory = async (categorie : string) =>{
    const response = await fetch(`${BASE_URL}/api/${categorie}`);
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
//fetch users
  export const fetchUsers = async (page = 1, limit = 10) => {
    const response = await fetch(`/api/users?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  export const deleteUser = async (userEmail : string) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Content-Type" : "application/json"}
        }
        const response = await fetch(`/api/users?userEmail=${userEmail}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }
   
  
  /********************************** CLIENTS AND PAYMENTS FOR STRIPE ********************************************************* */

  export const fetchStripe = async () => {
    const response = await fetch(`/api/stripeclients/clients`);
    const data = await response.json();
    return data;
  };

  /** LOGIC FOR FUNDS */

  export const getAllFunds = async () => {
    
      const response =  await fetch(`/api/dons`);
      const data = await response.json()

      return data;
 }

   export const addFund = async (formData:Object) => {
      const options = {
      method : "POST",
      headers :{ "Content-Type" : "application/json"},
      body : JSON.stringify(formData)
       }
        const response =  await fetch(`/api/dons`,options);
        const data = await response.json()

        return data;
   }

   /********************************** LOGIC FOR COMMENTS AND VIEWS */

   export const fetchComments = async (slug :string , page = 1, limit = 10) => {
    const response = await fetch(`/api/comments?slug=${slug}&page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

   //posting a new comment 
export const addCommentToBook = async (formData:Object) => {
  try {
      const options = {
          method : "POST",
          headers :{ "Content-Type" : "application/json"},
          body : JSON.stringify(formData)
      }
      const response = await fetch(`/api/comments`,options)
      const data = await response.json()

      return data
  } catch (error) {
      return error
  }
}

export const addCommentlikes = async (commentId:string,state:string) => {
  try {
      const options = {
          method : "PUT",
          headers :{ "Content-Type" : "application/json"},
          body : ""
      }
      const response = await fetch(`/api/comments?commentId=${commentId}&state=${state}`,options)
      const data = await response.json()

      return data
  } catch (error) {
      return error
  }
}


 /********************************** LOGIC FOR  VIEWS */

 export const fetchViews = async (slug :string) => {
  const response = await fetch(`${BASE_URL}/api/views?slug=${slug}`);
  const data = await response.json();
  return data;
};

 //posting a new comment 
 export const addViewerToBook = async (slug: string) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    };
    const response = await fetch(`/api/views`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

/**************************************** PAYPAL **********************************/

export const PaypalOrder = async (orderData:Object) => {
  try {
      const options = {
          method : "POST",
          headers :{ "Content-Type" : "application/json"},
          body : JSON.stringify(orderData)
      }
      const response = await fetch(`/api/paypal`,options)
      const data = await response.json()

      return data
  } catch (error) {
      return error
  }
}


/*************************** Retours logic */

export const getAllRetour = async () => {
    
  const response =  await fetch(`/api/retour`);
  const data = await response.json()

  return data;
}

export const addRetour = async (formData:Object) => {
  const options = {
  method : "POST",
  headers :{ "Content-Type" : "application/json"},
  body : JSON.stringify(formData)
   }
    const response =  await fetch(`/api/retour`,options);
    const data = await response.json()

    return data;
}
