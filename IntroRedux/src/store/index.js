import { legacy_createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        }
    }
    else if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        }
    }
    return state;
}

const store = legacy_createStore(counterReducer);
export default store;