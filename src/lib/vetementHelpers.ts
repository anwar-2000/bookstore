//const BASE_URL:String ="https://emmtaboutique.com"
const BASE_URL:String ="http://localhost:3000"


export const fetchVetements = async (page = 1, limit = 10) => {
    const response = await fetch(`/api/vetements?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  export const fetchHighPriceVetements = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/api/vetements?page=${page}&limit=${limit}&sort=highprice`);
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
export const addVetement = async (formData:Object) => {
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`/api/vetements`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

  //updating a new book
export const updateVetement = async (VetementId : string ,formData:Object) =>{
    try {
        const options = {
            method : "PUT",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`/api/vetements?vetementId=${VetementId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }


   //deleting a new book
export const deleteVetements = async (VetementId : string) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Content-Type" : "application/json"}
        }
        const response = await fetch(`/api/vetements?vetementId=${VetementId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }