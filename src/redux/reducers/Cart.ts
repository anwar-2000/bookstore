import { createSlice } from "@reduxjs/toolkit";

interface CartBook {
    _id : string;
    titre : string ,
    prix : string ,
    image : string,
    quantite : number,
    poids : number;
    isChecked : boolean,
    livreurcolissimo : boolean;
    max_quantite : number;
}

interface InitialState {
    cart: CartBook[];
    show : boolean ;
    total : number ;
    items : number;
    totalPoids:number;
    quantite : number ;
    livreurcolissimo : boolean;
    isChecked : boolean ; 
    favoriteList : CartBook[];
}

const initialState: InitialState = {
    cart: [],
    total : 0,
    show: false,
    totalPoids :0,
    items: 0,
    livreurcolissimo : false,
    isChecked : true,
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
            //const index = state.favoriteList.findIndex(book => book.titre === action.payload.titre);
            state.favoriteList = [...state.favoriteList , action.payload];
           // console.log(state.favoriteList)
              // Store the favoriteList in localStorage
                     const favoriteListString = JSON.stringify(state.favoriteList);
                     localStorage.setItem('favoriteBooksList', favoriteListString);
        //}
        },
        ChangeChecked(state){
          state.isChecked === false ? state.isChecked = true :  state.isChecked = false;
        },
        AddToCart(state,action){
            //console.log("ADDING TO CART WITH COlissimo :  ",state.livreurcolissimo)
            const { titre, quantite} = action.payload;
            //console.log("SEEING IF Chatellerault IS CHECKED : " , state.isChecked)
            const index = state.cart.findIndex((book) => book.titre === titre);
          
            if (index !== -1) {
              // If the item is already in the cart
              const currentItem = state.cart[index];
              
              // Check if the quantity has reached the maximum allowed value
              if (currentItem.quantite < currentItem.max_quantite) {
                currentItem.quantite += 1;
              }else{
                return ;
              } 
            } else {
              // Item not in the cart, add it with a quantity of 1
              console.log("ACTION PAYLOAD PRIX before updating it :",action.payload);
              if(state.isChecked){
                 state.cart = [...state.cart, { ...action.payload, quantite: 1 , max_quantite : quantite || 1 }];
                 console.log("CART WHEN CHATELLERAULT : ",state.cart)
              }else{
                if(state.livreurcolissimo){
                   let book = action.payload;
                   console.log("product entering colisimo : ",book)
                  switch (state.livreurcolissimo) {
                    case book.poids <= 0.250:
                      //state.totalPricePoids += book.quantite * 4.95;
                       book.prix += 4.95; 
                       state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                       console.log('product after updating the item based on poids :', state.cart)
                      break;
                      case book.poids <= 0.5 && book.poids > 0.250 :
                        book.prix += 6.70; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 0.5 && book.poids <=0.750 :
                        book.prix += 7.60; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 0.750 && book.poids <= 1:
                         book.prix += 8.25; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 1 && book.poids <= 2:
                        book.prix += 9.55; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 2 && book.poids <= 5:
                        book.prix += 14.65; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 5 && book.poids <= 10:
                        book.prix += 21.30; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 10 && book.poids <= 15:
                        book.prix += 26.95; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 15 && book.poids <= 30:
                        book.prix += 33.40; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    case book.poids > 15 && book.poids < 30:
                        book.prix += 26.95; 
                        state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                        console.log('product after updating the item based on poids :', state.cart)
                        break;
                    default:
                      break;
                  }
                }else{
                  let book = action.payload;
                  console.log("product entering Mondial relay : ",book)
                  switch (state.livreurcolissimo === false) {
                    case book.poids <= 0.5:
                      book.prix += 3.67; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 0.5 && book.poids <= 1:
                      book.prix += 4.08; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 1 && book.poids <= 2:
                      book.prix += 5.42; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 2 && book.poids <= 3:
                      book.prix += 5.58; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 3 && book.poids <= 4:
                      book.prix += 5.75; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 4 && book.poids <= 5:
                      book.prix += 9.08; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 5 && book.poids <= 7:
                      book.prix += 10.75; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 7 && book.poids <= 10:
                      book.prix += 11.58; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 10 && book.poids <= 15:
                      book.prix += 16.58; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 15 && book.poids <= 20:
                      book.prix += 18.25; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    case book.poids > 20 && book.poids <= 30:
                      book.prix += 24.08; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                     case book.poids > 30 && book.poids <= 40:
                      book.prix += 35.66; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                     case book.poids > 40 && book.poids <= 60:
                      book.prix += 54.75; 
                      state.cart = [...state.cart, { ...book, quantite: 1 , max_quantite : quantite || 1 }];
                      console.log('product after updating the item based on poids :', state.cart)
                     break;
                    default:
                      break;
                  }
                }
              }
              //state.cart = [...state.cart, { ...action.payload, quantite: 1 , max_quantite : quantite }];
            }
            state.items = state.cart.length;
        },
        /*AddToCart(state, action) {
            console.log("ADDING TO CART WITH COlissimo :  ",state.livreurcolissimo)
            const { titre, quantite , isChecked } = action.payload;
            console.log("SEEING IF Chatellerault IS CHECKED : " , state.isChecked)
            const index = state.cart.findIndex((book) => book.titre === titre);
          
            if (index !== -1) {
              // If the item is already in the cart
              const currentItem = state.cart[index];
              
              // Check if the quantity has reached the maximum allowed value
              if (currentItem.quantite < currentItem.max_quantite) {
                currentItem.quantite += 1;
              }else{
                return ;
              } 
            } else {
              // Item not in the cart, add it with a quantity of 1
              state.cart = [...state.cart, { ...action.payload, quantite: 1 , max_quantite : quantite }];
            }
          
            // Calculate the total poids and total price by summing the poids and multiplying it by the price of each book in the cart
            let totalPoids = 0;
            
        //only if the chatellerault shipping is not  selected

       if(!isChecked){
        
        if(state.livreurcolissimo){
          console.log("ENTERING COLISSIMO LOGIC :")
          state.cart.forEach((book) => {
            switch (state.livreurcolissimo) {
              case book.poids <= 0.250:
                state.totalPricePoids += book.quantite * 4.95;
                break;
              case book.poids === 0.5:
                state.totalPricePoids += book.quantite * 6.70;
                break;
              case book.poids > 0.5 && book.poids <=0.750 :
                state.totalPricePoids += book.quantite * 7.60;
                break;
              case book.poids > 0.750 && book.poids <= 1:
                state.totalPricePoids += book.quantite * 8.25;
                console.log('HERE : ',state.totalPricePoids)
                break;
              case book.poids > 1 && book.poids <= 2:
                state.totalPricePoids += book.quantite * 9.55;
                break;
              case book.poids > 2 && book.poids <= 5:
                state.totalPricePoids += book.quantite * 14.65;
                break;
              case book.poids > 5 && book.poids <= 10:
                state.totalPricePoids += book.quantite * 21.30;
                break;
              case book.poids > 10 && book.poids <= 15:
                state.totalPricePoids += book.quantite * 26.95;
                break;
              case book.poids > 15 && book.poids <= 30:
                state.totalPricePoids += book.quantite * 33.40;
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
            console.log('COLISSIMO LOGIC: ' , totalPoids );
            calculateTotal()
          })
        }else {
          console.log("ENTERING MONDIAL LOGIC :")
          state.cart.forEach((book) => {
      switch (state.livreurcolissimo === false) {
        case book.poids <= 0.5:
          state.totalPricePoids += book.quantite * 3.67;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 0.5 && book.poids <= 1:
          state.totalPricePoids += book.quantite * 4.08;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 1 && book.poids <= 2:
          state.totalPricePoids += book.quantite * 5.42;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 2 && book.poids <= 3:
          state.totalPricePoids += book.quantite * 5.58;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 3 && book.poids <= 4:
          state.totalPricePoids += book.quantite * 5.75;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 4 && book.poids <= 5:
          state.totalPricePoids += book.quantite * 9.08;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 5 && book.poids <= 7:
          state.totalPricePoids += book.quantite * 10.75;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 7 && book.poids <= 10:
          state.totalPricePoids += book.quantite * 11.58;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 10 && book.poids <= 15:
          state.totalPricePoids += book.quantite * 16.58;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 15 && book.poids <= 20:
          state.totalPricePoids += book.quantite * 18.25;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        case book.poids > 20 && book.poids <= 30:
          state.totalPricePoids += book.quantite * 24.08;
           console.log(`HERE ${state.totalPoids} kg for : `,state.totalPricePoids)
          break;
        default:
          break;
      }

      
      totalPoids += book.quantite * book.poids;
      console.log('MONDIAL LOGIC : ' , totalPoids );
      calculateTotal()
    });
        }
        
       
      
      
            
              // Update the state with the new totalPoids and totalPrice values
              
              state.totalPoids = totalPoids;
              //state.total = totalPrice;
              state.items = state.cart.length;
      calculateTotal()
       }   
       state.items = state.cart.length;

          },*/
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
            state.total = 0;
            let totalPrice = state.cart.reduce((acc, book) => acc + parseFloat(book.prix) * book.quantite, 0).toFixed(2);
            state.total = parseFloat(totalPrice)
            //console.log("total of cart : ",state.total)
            let poidstotale = state.cart.reduce((acc,book)=> acc + book.poids *book.quantite , 0).toFixed(2)
            state.totalPoids = parseFloat(poidstotale);
            //console.log("total of poids : ",state.totalPoids)
            if(state.cart.length===0){
              state.total = 0;
            }
        },
        changeLivreur(state,action){
          if (action.payload.type === "COLISSIMO") {
            state.livreurcolissimo = true;
           // console.log("LIVREUR CHOISIS COlisimo:", state.livreurcolissimo);
          }
          if (action.payload.type === "MONDIAL") {
            state.livreurcolissimo = false;
            //console.log("LIVREUR CHOISIS colissimo :", state.livreurcolissimo);
          }
          calculateTotal()
        },
    }
})
export const {ChangeChecked ,toggleCart , AddToCart , DeleteFromCart , calculateTotal , AddToFavorite , changeLivreur} = CartSlice.actions
export default CartSlice.reducer