import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./feature/movieSlice";
import cretaeSagaMiddleware from 'redux-saga'
import rootSaga from "./rootSaga";
// debugger
const sagaMiddleware = cretaeSagaMiddleware();

const movieStore = configureStore({
    reducer: {
        movie: movieReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

console.log('Hiii');
sagaMiddleware.run(rootSaga);
// Watcher function will be passed here. If we have multiple function to start when the application starts then we can create rootsaga which will contain all the watcher like did here. Then we just have to start the rootsaga.

export default movieStore;


// In the code above we did three things:
// We imported createSagaMiddleware which as specified in the name will help us in the creation of the saga in our app.
// We created a variable sagaMiddleware that will let us access all the things saga has to offer.
// We included our variable sagaMiddleware in our store so that it can be accessed throughout the app just like how we did for the reducer.

