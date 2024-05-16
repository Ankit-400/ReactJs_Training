import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "./features/counterSlice";
import { increaseAge, decreaseAge } from "./features/counterSlice";

export default function ReduxToolkitCounter() {
    console.log("Done...!!");
    const value = useSelector(state => state.counter.value);
    const age = useSelector(state => {
        console.log(state);
        // {counter: {value: 0}, getAge: {age: 20}}, This type of template is the whole combined state for our store.
        return state.getAge.age;
    });
    const dispatch = useDispatch();

    return <>
        <button style={{ padding: '10px' }} onClick={() => { dispatch(increment()) }}>+</button>
        <h2>{value}</h2>
        <button style={{ padding: '10px' }} onClick={() => { dispatch(decrement()) }}>-</button>
        <hr style={{ width: '200px' }} />
        <button style={{ padding: '10px' }} onClick={() => { dispatch(increaseAge(100)) }}>+ age</button>
        <h2>{age}</h2>
        <button style={{ padding: '10px' }} onClick={() => { dispatch(decreaseAge(50)) }}>- age</button>
    </>
} 