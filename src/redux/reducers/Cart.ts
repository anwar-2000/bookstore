import { createSlice } from "@reduxjs/toolkit";


interface CartBook {
    titre : string ,
    prix : string ,
    image : string
}

interface InitialState {
    cart: CartBook[];
    show : boolean ;
    total : number ;
    items : number
}

const initialState: InitialState = {
    cart: [],
    show: false,
    total: 0,
    items: 0
};
export const CartSlice = createSlice({
    name :"cart",
    initialState,
    reducers : {
        toggleCart (state) {
            state.show = !state.show
            console.log( "Show cart state : " + state.show)
        },
        AddToCart(state,action) {
            state.cart = [...state.cart, action.payload];
            state.items = state.cart.length
          //  console.log(state.cart)
        },
        DeleteFromCart(state, action) {
            /** if the index is not -1 => its found + if there is a lot of same item , only one will be deleted */
            const index = state.cart.findIndex(book => book.titre === action.payload.titre);
                    if (index !== -1) {
                          state.cart.splice(index, 1);
             }
            state.items = state.cart.length
        },
        calculateTotal(state) {
            /** acc = 0 first execute then it will take the total amount accumulated each time of execution */
           let totalPrice = state.cart.reduce((acc, book) => acc + parseFloat(book.prix), 0).toFixed(2);
           state.total = parseFloat(totalPrice)
          },
    }
})
export const {toggleCart , AddToCart , DeleteFromCart , calculateTotal} = CartSlice.actions
export default CartSlice.reducer