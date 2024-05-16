// Javascript Library for building user interfaces
// React project use a build process => The code you write is not the code that gets executed in the browser. Instead the code we write is transformed before it's handed off to the browser. react-scripts is the library/package who does this process of code transformation.

// Reasons behind using build process
// 1. Row, unprocessed React code won't execute in the browser, ex jsx is not a default feature
// 2. the code would not be optimized for production


// Rendering in React
// Triggering a render (delivering the guest’s order to the kitchen)
// Rendering the component (preparing the order in the kitchen)
// Committing to the DOM (placing the order on the table)


// Render and Commit
// Referencing Values with Refs - When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

// - Limitations of React state don’t apply to refs.For example, state acts like a snapshot for every render and doesn’t update synchronously.But when you mutate the current value of a ref, it changes immediately:


// State as a Snapshot

// The value of state will never be change in the current rendering component. setState indicates the updation of state in the next rendering of that component, as setState always queues new rendering of omp.

// State is not like normal variable which will be vanished and re-created on render, instead it is managed by React itself outside the component, suppose one shelf to maintain the state.

//  React waits until all code in the event handlers (function) has run before processing your state updates.

// During the execution code of the handler function, all the setState function will be queued for execution which will trigger to re-render the component.
// After the handler code gets over, all the setState functio inside queue will be executed in FIFO manner. Then after the execution of all that set state functions, the component will be re-rendered with the new updated value of state which will be returned by last setState function in h queue.

// Using setState function multiple times in event handler is considered as updating the state multiple times before re-rendering.

// setState can be written in two ways...

// 1) Replacing the old value with the one passed as argument,
// React stores state outside of your component, as if on a shelf.
// When you call useState, React gives you a snapshot of the state for that render.
// Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
// Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.

// 2) Trying to compute the new state value from the previous value of state,
// It is called Updater Function.
// if you would like to update the same state variable multiple times before the next render, instead of passing the next state value like setNumber(number + 1), you can pass a function that calculates the next state based on the previous one in the queue, like setNumber(n => n + 1). It is a way to tell React to “do something with the state value” instead of just replacing it.

// React processes state updates after event handlers have finished running. This is called batching.

// Ex. 1 :
// setNumber(number + 5);
// setNumber(n => n + 1);
// setNumber(42);

// During the next render, React goes through the state queue:

// queued update	    n	        returns
// ”replace with 5”	    0(unused)	5
// n => n + 1,	        5	        5 + 1 = 6
// ”replace with 42”	6(unused)	42


// You should treat any JavaScript object that you put into state as read-only.

// Tips and Tricks

// 1. If our component is returning new array with few elements, then we would be warned to add the key attribute to them. To avoid it, we can wrap them in one wrapepr class like div or section or something.
// - By doing so, our html will have so much nested unwanted nested divs, which will slower down the speed of rendering. The solution could be creating new Wrapepr comp which accepts props and simply returns props.children as this wrapepr comp can written the children directly without violating any rule. Another way to handle this issue is using react fragment, <></> or <React.Fragment></React.Fragment>


// what is an Effect?

// Main job of React is to render UI and respond to ChannelMergerNode, render JSX, manage state and props etc.Other than that, everything is called side - effect.


// useReducer Hook
// - const [state, dispatch] = useReducer(reducer, initialArg, init?)


// - Dispatch function will trigger re-render.
// - Pass init function as ref which will be called once for initializing the state.
// - Never mutate the state inside reducer function, always return new.


// import { forwardRef, useRef, useImperativeHandle } from 'react';

// useImparativeHook and forwardref
// - useImperativeHandle(ref, createHandle, dependencies?)
// ref cannot be passed as props from parent to chiled component.
// const MyInput = forwardRef(function MyInput(props, ref) {
//     const inputRef = useRef(null);

//     useImperativeHandle(ref, () => {
//         return {
//             focus() {
//                 inputRef.current.focus();
//             },
//             scrollIntoView() {
//                 inputRef.current.scrollIntoView();
//             },
//         };
//     }, []);

//     return <input {...props} ref={inputRef} />;
// });

// Callback function inside will return object which will be accessible by outer components.


// States are being tracked by component type and position of instance of the component in the tree.

// The unique key assigned to the each instance of component is also very useful to optimally generate dynamic JSX using map method or something. => Ex in section 13, video 10

// Custom Hook

// - Hooks are reusable functions.
// - When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook.
// - Custom Hooks let you share stateful logic but not state itself. Each call to a Hook is completely independent from every other call to the same Hook.
// - When you need to share the state itself between multiple components, lift it up and pass it down instead.

// - The definition of your custom hook will be replaced at the place of calling. Now it seems like it is one component only. Now custom hook does not has any individual existance.

// Ex. useEffect() hook runs after the current comp finishes its execution. Suppose we are having useEffect hook in our custom hook then first out custom hook will be executed as it is function only then the calling component will be executed then the useEffect will run.


// setValue function from useState can be written in two ways,
// 1. Replacer function => setValue(value+30);
// 2. Updater function => setValue(prev => prev + 30);

// 1. First we trigger re-render immediatly


// Async / Await

// - If the asynchronous operation completes successfully, the executor will call the resolve() function to change the state of the promise from pending to fulfilled with a value. In case of an error, the executor will call the reject() function to change the state of the promise from pending to rejected with the error reason.

// - Once a promise reaches either a fulfilled or rejected state, it stays in that state and can’t go to another state.

// When an await is encountered in code (either in an async function or in a module), the awaited expression is executed, while all code that depends on the expression's value is paused and pushed into the microtask queue. The main thread is then freed for the next task in the event loop. This happens even if the awaited value is an already-resolved promise or not a promise.

// Control flow effects of await
// When an await is encountered in code (either in an async function or in a module), the awaited expression is executed, while all code that depends on the expression's value is paused and pushed into the microtask queue. The main thread is then freed for the next task in the event loop. This happens even if the awaited value is an already-resolved promise or not a promise. For example, consider the following code.
// as soon as there's one await, the function becomes asynchronous, and execution of following statements is deferred to the next tick.

// All the code inside async function will run in one single tick if and only if there is no await present. Once a single await is encountered, all the code dependent on the promise value(most probably, all the line of codes after the await) will be paused for execution and pushed into the microtask queue (Now main thread is free to resume its execution from caller function).


// React groups the re-render triggered by multiple state from same component.

// React <=17: wrap updates in unstable_batchedUpdates() to batch them together outside of event handlers
// React 18: wrap updates in flushSync() to force immediate renders and opt out of automatic batching


// Context update and rendering optimzation
// Wrap first provider child in React.memo()

// What is Redux
// - A state management system for cross - component or app -wide state
// Local State: state belongs to single component
// Cross - component State: state affecting multiple components
// App-wide State: state affecting the entire app


// Redux Saga


// Redux does everything synchronously. So anything asynchronous has to happend outside the store. This is where redux middleware come in. The most common async middleware is redux thunk. Thunks are recommended as the standard approach for writing async logic with redux.
// The word 'Thunk' is a programming term that means "a piece of code that does some delayed work."