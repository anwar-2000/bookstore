import { configureStore } from "@reduxjs/toolkit";
import ToggleReducer from './reducers/Toggle'
import DetailReducer from './reducers/DetailBook'

export default configureStore({
    reducer : {
        toggle : ToggleReducer ,
        bookDetail : DetailReducer
    }
})
