import { configureStore } from "@reduxjs/toolkit";
import ToggleReducer from './reducers/Toggle'

export default configureStore({
    reducer : {
        toggle : ToggleReducer
    }
})
