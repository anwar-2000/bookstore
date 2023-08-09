const BASE_URL:String ="https://emmaus-chatelleraudais.vercel.app"
//const BASE_URL:String ="http://localhost:3000"


export const fetchMusics = async (page = 1, limit = 20) => {
    const response = await fetch(`${BASE_URL}/api/music?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  };

  export const fetchMusic= async (slug : string) => {
    const response = await fetch(`${BASE_URL}/api/music?slug=${slug}`);
    const data = await response.json();
    return data;
  };

  export const fetchHighPriceMusic = async (page = 1, limit = 8) => {
    const response = await fetch(`${BASE_URL}/api/music?page=${page}&limit=${limit}&sort=highprice`);
    const data = await response.json();
    return data;
  };



 //posting a new book
export const addMusic = async (formData:Object) => {
    try {
        const options = {
            method : "POST",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
      //  console.log('HELPERS' , formData)
        const response = await fetch(`${BASE_URL}/api/music`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }

  //updating a new book
export const updateMusic = async (musicId : string ,formData:Object) =>{
    try {
        const options = {
            method : "PUT",
            headers :{ "Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}/api/music?musicId=${musicId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }


   //deleting a new book
export const deleteMusic = async (musicId : string) =>{
    try {
        const options = {
            method : "DELETE",
            headers :{ "Content-Type" : "application/json"}
        }
        const response = await fetch(`${BASE_URL}/api/music?musicId=${musicId}`,options)
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
 }