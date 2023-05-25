import { createSlice } from "@reduxjs/toolkit";


interface CartBook {
    titre : string ,
    prix : string ,
    image : string,
    quantite : number
}

interface InitialState {
    cart: CartBook[];
    show : boolean ;
    total : number ;
    items : number;
    quantite : number ; 
    favoriteList : CartBook[];
}

const initialState: InitialState = {
    cart: [],
    show: false,
    total: 0,
    items: 0,
    quantite: 1,
    favoriteList : [] ,
};
export const CartSlice = createSlice({
    name :"cart",
    initialState,
    reducers : {
        toggleCart (state) {
            state.show = !state.show
            //console.log( "Show cart state : " + state.show)
        },
        AddToFavorite(state,action){
            const index = state.favoriteList.findIndex(book => book.titre === action.payload.titre);
             /* if (index !== -1) {
                // If the item is in the favoriteList , remove it ....
                state.favoriteList.splice(index, 1);
            } else { */
            state.favoriteList = [...state.favoriteList , action.payload];
            console.log(state.favoriteList)
              // Store the favoriteList in localStorage
                     const favoriteListString = JSON.stringify(state.favoriteList);
                     localStorage.setItem('favoriteBooksList', favoriteListString);
        //}
        },
        AddToCart(state, action) {
            const { titre, quantite } = action.payload;
            const index = state.cart.findIndex(book => book.titre === titre);
            
            if (index !== -1) {
                // If the item is already in the cart
                const currentItem = state.cart[index];
                
                // Check if the quantity has reached the maximum allowed value
                if (currentItem.quantite < quantite) {
                    // Increase the quantity by 1
                    currentItem.quantite += 1;
                } else {
                    // Quantity has reached the maximum, no further increase allowed
                    // You can show an error message or handle it in your UI accordingly
                }
            } else {
                // Item not in the cart, add it with a quantity of 1
                state.cart = [...state.cart, {...action.payload, quantite: 1}];
            }
            
            state.items = state.cart.length;
        },
        DeleteFromCart(state, action) {
            const index = state.cart.findIndex(book => book.titre === action.payload.titre);
            if (index !== -1) {
                // If the item is in the cart multiple times, decrease its quantity by 1
                if (state.cart[index].quantite > 1) {
                    state.cart[index].quantite -= 1;
                } else {
                    // If the item is in the cart only once, remove it from the cart
                    state.cart.splice(index, 1);
                }
            }
            state.items = state.cart.length;
        },
        calculateTotal(state) {
            let totalPrice = state.cart.reduce((acc, book) => acc + parseFloat(book.prix) * book.quantite, 0).toFixed(2);
            state.total = parseFloat(totalPrice);
        },
    }
})
export const {toggleCart , AddToCart , DeleteFromCart , calculateTotal , AddToFavorite} = CartSlice.actions
export default CartSlice.reducer