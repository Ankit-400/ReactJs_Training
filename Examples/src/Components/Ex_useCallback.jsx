import { useState } from "react";
import Child_1 from "./Child_1";
import { useCallback } from "react";

// useCallback - parent
export default function EX_useCallback() {

    const [color, setColor] = useState('orange');
    const handleChangeColor = () => {
        setColor(prev => (prev === 'orange' ? 'blue' : 'orange'));
    }

    // const displayMsg = () => {
    //     return `I am calling from parent!!', ${Math.floor(Math.random() * 10)}`;
    // }
    const displayMsg = useCallback(() => {
        return `I am calling from parent!!', ${Math.floor(Math.random() * 10)}`;
    }, [])

    return <section style={{
        border: '2px solid black',
        padding: '20px',
        margin: '10px',
        width: '60%',
        margin: '10px auto',
        backgroundColor: color,
        color: 'white',
        fontSize: '20px'
    }}>
        I am Parent.
        <hr />
        <Child_1 print={displayMsg} />
        <button onClick={handleChangeColor}>Toddle Color</button>

        {/* Clicking this button to change color will re-render the component along with all child component. Now what if we just want to re-render this component only, not all the child component. 
            This is where useCallback it useful.
            Suppose I do not want to re-render the child components, as I just want to change color of parent.
            The Child_1 component will be wrapped in memo, and function passed from parent to child will be wrapped in useCallback(along with dependencies).

            Wrapping just child component in memo will not make any difference.

            memo - memo(Component, arePropsEqual?) - get the memoized version of your component,
            lets you skip re-rendering a component when its props are unchanged. But React may still re-render it: memoization is a performance optimization, not a guarantee.

            memo returns a new React component. It behaves the same as the component provided to memo except that React will not always re-render it when its parent is being re-rendered unless its props have changed. Even with memo, your component will re-render if its own state changes or if a context that it’s using changes.

            So just wrapping child in memo means it will stop re-rendering of its own component when its props are un-changed...right? But we are passing displayMsg as function in props and it will be re-created all the time whenever its component(parent) re-renderes, so each time function will be treated as new value and according to that the prop is changed and so that child will always re-render as prop is chnanged. 

            To persisit the copy of function between re-renders and avoid creating new copy each time, we have useCallback hook.

            So this is how we can achieve skipping re-render of child component.


            => Memoization only has to do with props that are passed to the component from its parent. Your component will still re-render in following cases, with or without memo,
            - when a context that it’s using changes
            - its inner state changes value.

            - If you set a state variable to its current value, React will skip re-rendering your component even without memo. 
        */}
    </section>
}