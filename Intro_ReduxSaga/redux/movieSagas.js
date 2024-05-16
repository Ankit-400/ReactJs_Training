import { takeLatest, put, fork, call, takeEvery } from 'redux-saga/effects'
import { fetchMovies } from './api'
import { getMovies, setMovies } from './feature/movieSlice'

function* onLoadMoviesAsync({ payload }) {
    try {
        const movieName = payload;

        const response = yield call(fetchMovies, movieName);
        // Here we are calling our function for fetching movie.
        // Yield will wait for this call to finish before proceeding to the next line.
        console.log("Response arrived...", response);
        // Resone behind using call,
        // By using call, you make your sagas more testable. 
        // provides built-in error handling. If the function invoked by call throws an error or is rejected (in the case of asynchronous functions), Redux Saga will catch the error and handle it appropriately. 
        // When invoking asynchronous functions, such as API calls, using call allows Redux Saga to pause the execution of the saga until the asynchronous operation is completed. This ensures that your sagas remain synchronous in nature and can handle asynchronous logic more elegantly.


        if (response.status === 200) {
            yield put(setMovies({ ...response.data }))
            // put creates an Effect description that instructs the middleware to schedule the dispatching of action to the store. This dispatch may not be immediate since other tasks might lie ahead in the saga task queue or still be in progress. So, when the dispatch is finished it’ll pass the result to either success or failure.
            // put dispatches an action to redux store without blcoking the execution of the main code.
        }
    } catch (error) {
        console.error(error);
    }
}
// This function is called worker.

function* onLoadMovies() {
    yield takeEvery(getMovies.type, (query) => onLoadMoviesAsync(query.payload))
}
// This onLoadMovies function is called watcher function. takeLatest, takeEvery will check for the action if it is triggered or not. And if it is triggered then the onLoadMovieAsync will be called.

// Different methods like takeLatest and takeEvery has different way of handling trigger of actions. 

// takeEvery : Suppose one button is clicked 10 times and this action is dispatched 10 times. Then this will call worker for all the 10 times.
// takeLatest : This will only continue executing the worker for the last or latest triggered action and if there were any previous action was triggered and are pending then they will be canceled.

// take() => yield take(ACTION_NAME); This statement written inside any generator function will stop the execution of the function until the specified action is encountered.

// yield cancel(task) => Cancelling a running task will also cancel the current Effect where the task is blocked at the moment of cancellation.




// watcher takes worker as callback

export const movieSagas = [fork(onLoadMovies)];

// Fork is a method used to perform some asynchronous task independently of the execution of main code.
// The task or process may be too long to execute so sub-process will be created and executed independently to the main code execution.
// The parent saga continues executing the subsequent lines of code without waiting for the forked saga to complete.

// console.log(movieSagas);
// Althouhg it might be possible that the forked saga still be running in background but we will still see the output in console, as fork() will immediatly return task object representing the forked saga. So the result we are getting into console is not actual result but the task obejct.

// There are few different types of yield and specifically in the case of behaviour of yield when used with different methods provided by redux-saga
// Use yield take(actionType) to wait for specific actions.
// Use yield call(fn, ...args) to call functions that return Promises and pause the saga until the Promises settle.
// Use yield put(action) to dispatch actions without pausing the saga.