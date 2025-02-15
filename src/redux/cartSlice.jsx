import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
       addToCart(state,action){
        state.push(action.payload);
        // localStorage.setItem('cart', JSON.stringify(state));
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          localStorage.setItem(`cart_${user.user.uid}`, JSON.stringify(state));
        }else{
            localStorage.setItem('cart', JSON.stringify(state));
        }

         return state;
       },

       deleteFromCart(state,action){
        const newState = state.filter(item => item.id != action.payload.id);

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          localStorage.setItem(`cart_${user.user.uid}`, JSON.stringify(newState));
        }
        else {
            localStorage.setItem('cart', JSON.stringify(newState)); // General cart if no user
          }
        return newState;
        // localStorage.setItem('cart', JSON.stringify(newState)); // Save to localStorage
        // return newState;

       },

       setCartItems:(state,action)=>{
        // return action.payload;

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          localStorage.setItem(`cart_${user.user.uid}`, JSON.stringify(action.payload));
        }
        else {
            localStorage.setItem('cart', JSON.stringify(action.payload)); // General cart if no user
          }
        return action.payload;

        // localStorage.setItem('cart', JSON.stringify(action.payload)); // Save to localStorage
        // return action.payload;
       }
    }
})
export const {addToCart,deleteFromCart,setCartItems} = cartSlice.actions;
export default cartSlice.reducer