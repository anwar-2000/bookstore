import { configureStore } from "@reduxjs/toolkit";
import ToggleReducer from './reducers/Toggle'
import DetailReducer from './reducers/DetailBook'
import CartReducer from './reducers/Cart'


export default configureStore({
    reducer : {
        toggle : ToggleReducer ,
        bookDetail : DetailReducer,
        cart : CartReducer
    }
})
