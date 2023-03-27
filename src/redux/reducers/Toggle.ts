import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen :  true
}
const ToggleSlice = createSlice({
    name : "toggle",
    initialState ,
    reducers : {
        SET_OPEN(state){
             state.isOpen = !state.isOpen
             //console.log(state.isOpen)
        }
    }

})


export const {SET_OPEN} = ToggleSlice.actions
export default ToggleSlice.reducer;