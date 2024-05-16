import { useRef, useState } from "react";

export default function Player() {
  // Notes down below
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  // const [submitted, setSubmitted] = useState(false);
  // refs
  const playerName = useRef();
  console.log(playerName);

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    // playerName.current.value = '';      // Imperative code, not declarative
    // This would clear the input field, but is is good?
    // React is about writing declarative code. We should avoid code which is directy manipulating the DOM.
    // Writing this line here can be acceptable, as we are just clearing one input field which is not connected with any further state or something. We are just clearing it which also saves our few lines of code. 
    // The key difference between state and ref,

    // useState re-renders a component when the state is updated, whereas ref does not re-render a component on updating the value. So using enteredPlayerName as ref instead of state want work.
    // Use state where the values should directly be updated to UI. And it should not be used for behind the scenes values that have no direct UI impact.

    // refs can be used when you want direct access to the DOM element where changing it should not have direct impact on UI, as it does not re-evaluate/re-render the component.
    // Great for reading values or accessing certain browser API.

  }

  return (
    <section id="player">
      {/* <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2> */}
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      {/* if first val is truthy, it will be printed else second will be printed(?? opr) */}
      <p>
        <input type="text" ref={playerName} />
        {/* No need for onChange method calling on every strok and also no need of val attr */}
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

// As we are trying to implement the functionality of setting the user name as per the value entered in input field. We have used two useStates here, then also it is not the working ideally as it should be. 
// useRefs's most common use is accessing DOM elements. 
// We can simplify this component by using ref. Ref is an special type of value which is managed by react in a special way. 
// We can connect ref variable to any JSX element by mentioning special ref atttribute in any element. We can access all the methods and properties through the ref variable of connected JSX element.