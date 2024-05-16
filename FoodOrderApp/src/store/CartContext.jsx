import { createContext, useReducer } from "react";

const initialValue = {
    items: [],
    addItemToCart: (item) => { },
    removeItemFromCart: (id) => { }
}

const CartContext = createContext(initialValue);

function reducerFn(state, action) {
    let updatedItems;
    if (action.type === 'ADD_ITEM') {
        // ... Add item to cart
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);

        if (existingItemIndex === -1) {
            updatedItems = [...state.items, { ...action.item, quantity: 1 }];
            // updatedItems.push({ ...action.item, quantity: 1 });
        }
        else {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        // ... Remove Item from cart

        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity === 1) {
            updatedItems = [...state.items];
            // updatedItems.splice(existingItemIndex, 1);
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems
        };
    }
    return state;
}


export function CartContextProvider({ children }) {

    const [cartState, dispatchCartAction] = useReducer(reducerFn, { items: [] });

    function addItem(item) {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        });
    }

    function removeItem(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        });
    }
    const cartContext = {
        items: cartState.items,
        addItemToCart: addItem,
        removeItemFromCart: removeItem
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;