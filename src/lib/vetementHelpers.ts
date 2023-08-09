const BASE_URL:String ="https://emmaus-chatelleraudais.vercel.app"
//const BASE_URL:String ="http://localhost:3000"


export const fetchVetements = async (page = 1, limit = 10) => {
    const response = await fetch(`${BASE_URL}/api/vetements?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  export const fetchVetement= async (slug : string) => {
    const response = await fetch(`${BASE_URL}/api/vetements?slug=${slug}`);
    const data = await response.json();
    return data;
  };

  export const fetchHighPriceVetements = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/api/vetements?page=${page}&limit=${limit}&sort=highprice`);
    const data = await response.json();
    return data;
  };


 //posting a new book
export const addVetement = async (formData:Object) => {
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/vetements`,options)
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
        const response = await fetch(`${BASE_URL}/api/vetements?vetementId=${VetementId}`,options)
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
        const response = await fetch(`${BASE_URL}/api/vetements?vetementId=${VetementId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }