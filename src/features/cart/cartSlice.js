import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
const url = 'https://course-api.com/react-useReducer-cart-project'
const initialState={
    cartItems:[],
    amount:0,
    total:0,
    isLoading: true
}
export const getCartItems = createAsyncThunk('cart/getCartItems',()=>{
    return fetch(url).then((resp)=>resp.json()).catch((err)=>console.log(err))
})
const cartSlice = createSlice({
    name :'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{state.cartItems = []
            state.amount= 0},
        removeItem:(state,action)=>{
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((cartItem)=>
                cartItem.id !== itemId
            )
        },
        increase:(state,action)=>{
           const cartItem = state.cartItems.find((item)=> item.id === action.payload)
           cartItem.amount += 1
        },
        decrease:(state,action)=>{
            const cartItem = state.cartItems.find((item)=> item.id === action.payload)
           cartItem.amount -= 1
        },
        calculateTotals:(state)=>{
        let amount = 0
        let total = 0
        state.cartItems.forEach((index)=>{
            amount += index.amount
            total += index.price * index.amount
        })
        state.amount  = amount
        state.total = total
        }

    },
    extraReducers:{
      [getCartItems.pending]:(state)=>{
        state.isLoading = true;
      },
      [getCartItems.fulfilled]:(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload;
      },
      [getCartItems.rejected]:(state)=>{
        state.isLoading=false;
      }
    }
})
export const {clearCart,removeItem,increase,decrease,calculateTotals} = cartSlice.actions
export default cartSlice.reducer