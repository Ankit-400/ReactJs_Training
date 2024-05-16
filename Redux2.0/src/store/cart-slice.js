import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        addItemToCart(state, action) {
            const { id, price, title } = action.payload;
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: id,
                    price,
                    name: title,
                    totalPrice: price,
                    quantity: 1
                })
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }

    }
})

console.log(cartSlice.reducer);

export default cartSlice.reducer;
export const { addItemToCart, removeItemFromCart } = cartSlice.actions;