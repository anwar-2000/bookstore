
const BASE_URL:String ="https://emmtaboutique.com"
//const BASE_URL:String ="http://localhost:3000"


export const fetchactualite = async () => {
    const response = await fetch(`${BASE_URL}/api/actualite`);
    const data = await response.json();
   // console.log(data)
    return data;
  };

  export const fetchHighPriceactualite = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/api/actualite?page=${page}&limit=${limit}&sort=highprice`);
    const data = await response.json();
    return data;
  };

 //posting a new actualite
export const addactualite = async (formData:Object) => {
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
      //  console.log('HELPERS' , formData)
        const response = await fetch(`${BASE_URL}/api/actualite`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

  //updating an actualite
export const updateactualite = async (MaterialId : string ,formData:Object) =>{
    try {
        const options = {
            method : "PUT",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/actualite?materialId=${MaterialId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }


   //deleting a new actualite
export const deleteactualite = async (MaterialId : string) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Content-Type" : "application/json"}
        }
        const response = await fetch(`${BASE_URL}/api/actualite?materialId=${MaterialId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }