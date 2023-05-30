import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen :  false,
    showOptions : true
}
const ToggleSlice = createSlice({
    name : "toggle",
    initialState ,
    reducers : {
        SET_OPEN(state){
             state.isOpen = !state.isOpen
             //console.log(state.isOpen)
        },
        SET_LIVRAISON(state){
            state.showOptions = false;
        }
    }

})


export const {SET_OPEN , SET_LIVRAISON} = ToggleSlice.actions
export default ToggleSlice.reducer;