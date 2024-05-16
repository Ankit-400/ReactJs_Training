import { createSlice } from "@reduxjs/toolkit";

// Each slice represents indivial state we can say, and each state contains atleast 3 things -> name, initial state and reducer for each action.
// reducer defines that how to update the state. 
// Reducer function for each state will have 2 arguments, fixed and first is state which represents state for that individual reducer. And another will be object which can considered as the payload which will be useful for modifying the state.  

// We do not have to create action separatly in redux toolkit, it will be created by toolkit itself. We just need to export actions created by toolkit by destructuring them from slice.actions.

// We also have to export ageSlice.reducer which represents the whole reducer function for that state in itself.

// In reducer functions, we should never modify existing or old state as objects are always passed as reference and if we modify existing state, then that will be shared between two renders which will lead to un-expected behaviour in one or other way. So we should always return new state with the smae template of initial value.

// But when using redux toolkit, we can modify the existing state as it will be automatically converted into new object by immer library. We even do not need to return anything from the reducer function as we are just updating the existing state only.



const initialState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--;
        }
    }
});

const ageSlice = createSlice({
    name: 'age',
    initialState: { age: 20 },
    reducers: {
        increaseAge(state, { payload }) {
            console.log(state);
            state.age += payload
        },
        decreaseAge(state, { payload }) {
            console.log(state);
            state.age -= payload
        }
    }
})

export const { increment, decrement } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
export const { increaseAge, decreaseAge } = ageSlice.actions;
export const ageReducer = ageSlice.reducer;