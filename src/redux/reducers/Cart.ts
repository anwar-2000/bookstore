import { createSlice } from "@reduxjs/toolkit";


interface CartBook {
    titre : string ,
    prix : string ,
    image : string,
    quantite : number,
    poids : number;
    isChecked : boolean
}

interface InitialState {
    cart: CartBook[];
    show : boolean ;
    total : number ;
    items : number;
    totalPricePoids : number;
    totalPoids:number;
    quantite : number ;
    isChecked : boolean; 
    favoriteList : CartBook[];
}

const initialState: InitialState = {
    cart: [],
    total : 0,
    show: false,
    totalPricePoids: 0,
    totalPoids :0,
    items: 0,
    isChecked : false,
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
            state.favoriteList = [...state.favoriteList , action.payload];
            console.log(state.favoriteList)
              // Store the favoriteList in localStorage
                     const favoriteListString = JSON.stringify(state.favoriteList);
                     localStorage.setItem('favoriteBooksList', favoriteListString);
        //}
        },
        AddToCart(state, action) {
            const { titre, quantite, poids, prix , isChecked } = action.payload;
            state.isChecked = isChecked
            const index = state.cart.findIndex((book) => book.titre === titre);
          
            if (index !== -1) {
              // If the item is already in the cart
              const currentItem = state.cart[index];
          
              // Check if the quantity has reached the maximum allowed value
              if (currentItem.quantite < quantite) {
                // Increase the quantity by 1
                currentItem.quantite += 1;
              } 
            } else {
              // Item not in the cart, add it with a quantity of 1
              state.cart = [...state.cart, { ...action.payload, quantite: 1 }];
            }
          
            // Calculate the total poids and total price by summing the poids and multiplying it by the price of each book in the cart
            let totalPoids = 0;
            let totalPrice = 0;
          
           
state.cart.forEach((book) => {
    switch (true) {
      case book.poids <= 0.5:
        state.totalPricePoids += book.quantite * 3.67;
        break;
      case book.poids > 0.5 && book.poids <= 1:
        state.totalPricePoids += book.quantite * 4.08;
        break;
      case book.poids > 1 && book.poids <= 2:
        state.totalPricePoids += book.quantite * 5.42;
        break;
      case book.poids > 2 && book.poids <= 3:
        state.totalPricePoids += book.quantite * 5.58;
        break;
      case book.poids > 3 && book.poids <= 4:
        state.totalPricePoids += book.quantite * 5.75;
        break;
      case book.poids > 4 && book.poids <= 5:
        state.totalPricePoids += book.quantite * 9.08;
        break;
      case book.poids > 5 && book.poids <= 7:
        state.totalPricePoids += book.quantite * 10.75;
        break;
      case book.poids > 7 && book.poids <= 10:
        state.totalPricePoids += book.quantite * 11.58;
        break;
      case book.poids > 10 && book.poids <= 15:
        state.totalPricePoids += book.quantite * 16.58;
        break;
      case book.poids > 15 && book.poids <= 20:
        state.totalPricePoids += book.quantite * 18.25;
        break;
      case book.poids > 20 && book.poids <= 30:
        state.totalPricePoids += book.quantite * 24.08;
        break;
      default:
        break;
    }
  
    totalPoids += book.quantite * book.poids;
  });
          
            // Update the state with the new totalPoids and totalPrice values
            
            state.totalPoids = totalPoids;
            state.total = totalPrice;
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
      
            state.total = state.isChecked ? parseFloat(totalPrice) : parseFloat(totalPrice) + state.totalPricePoids;
        },
    }
})
export const {toggleCart , AddToCart , DeleteFromCart , calculateTotal , AddToFavorite} = CartSlice.actions
export default CartSlice.reducer