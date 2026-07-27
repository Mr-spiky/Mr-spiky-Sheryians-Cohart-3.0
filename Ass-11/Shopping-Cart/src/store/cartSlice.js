import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.qty += 1;
            } else {
                state.items.push({ ...product, qty: 1 });
            }
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },

        increaseQty: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) item.qty += 1;
        },

        decreaseQty: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && item.qty > 1) item.qty -= 1;
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
