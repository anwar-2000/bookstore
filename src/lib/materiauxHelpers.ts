const BASE_URL:String ="https://emmtaboutique.com"
//const BASE_URL:String ="http://localhost:3000"


export const fetchMateriaux = async (page = 1, limit = 10) => {
    const response = await fetch(`${BASE_URL}/api/materiaux?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  export const fetchMaterial= async (slug : string) => {
    const response = await fetch(`${BASE_URL}/api/materiaux?slug=${slug}`);
    const data = await response.json();
    return data;
  };

  export const fetchHighPriceMateriaux = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/api/materiaux?page=${page}&limit=${limit}&sort=highprice`);
    const data = await response.json();
    return data;
  };



 //posting a new book
export const addMateriaux = async (formData:Object) => {
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/materiaux`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

  //updating a new book
export const updateMateriaux = async (MaterialId : string ,formData:Object) =>{
    try {
        const options = {
            method : "PUT",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/materiaux?materialId=${MaterialId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }


   //deleting a new book
export const deleteMateriaux = async (MaterialId : string) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Content-Type" : "application/json"}
        }
        const response = await fetch(`${BASE_URL}/api/materiaux?materialId=${MaterialId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }