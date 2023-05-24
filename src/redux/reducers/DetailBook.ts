import { createSlice } from "@reduxjs/toolkit"

interface Props {
    bookId : string
}

const initialState : Props = {
    bookId  : ""
}

const DetailBookSlice = createSlice({
    name : "bookDetail",
    initialState,
    reducers : {
        setID(state,action){
            state.bookId = action.payload
          //  console.log(state.bookId)
        }
    }
})

export const {setID} = DetailBookSlice.actions
export default DetailBookSlice.reducer;