import { all } from "redux-saga/effects";
import { movieSagas } from "./movieSagas";


export default function* rootSaga() {
    var x = yield all([...movieSagas]);
    console.log(x);
    // all() is for combining multiple functions and these all will be executed parallely and it will wait for the response from all of that.
    yield x;
}