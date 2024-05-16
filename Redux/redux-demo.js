const redux = require('redux');

const initialValue = {
    count: 0
}

const counterReducer = (state = initialValue, action) => {
    console.log("Called");
    return {
        count: state.count + 1
    }
}

const store = redux.legacy_createStore(counterReducer);

// console.log(store.getState());

const counterSubscriber = () => {
    console.log("As you are subscriber..!!");
    const latestState = store.getState();
    console.log(latestState);
}

store.subscribe(counterSubscriber);
store.dispatch({ type: 'inc' })