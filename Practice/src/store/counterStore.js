import { configureStore } from '@reduxjs/toolkit'
import { counterReducer, ageReducer } from '../features/counterSlice'

// Here we are configuring store which has reducer key. As value we will use object which will contain all the reducer functions which we have created for each state as Slice as key value pair. This key will be used in useSelector hook to access perticuler value from state. 

export const counterStore = configureStore({
    reducer: {
        counter: counterReducer,
        getAge: ageReducer
    }
})