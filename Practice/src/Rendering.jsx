import * as React from 'react';
import { useState } from 'react';

const Rendering = () => {
    const [counter, setCounter] = React.useState(42);
    const [clicked, setClicked] = React.useState(0);

    const [random, setRandom] = useState(Math.random() * 10);

    const handleCounter = (digit) => {
        if (50 > 30) setRandom(Math.random() * 10);
        setCounter(counter + digit);
        setClicked(clicked + 1);
    };

    console.log('component rendering');

    return (
        <div>
            <button type="button" onClick={() => handleCounter(1)}>
                Increase
            </button>
            <button type="button" onClick={() => handleCounter(-1)}>
                Decrease
            </button>

            <div>Counter: {counter}</div>
            <div>Clicked: {clicked}</div>
            <div>Random: {random}</div>
        </div>
    );
};

const MyComponent = ({ item }) => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [prevItem, setPrevItem] = useState(null);
    console.log('rendered..');
    if (item !== prevItem) {
        console.log("Yes");
        setLastUpdated(new Date());
        setPrevItem(item);
    }
    else console.log("No");
    console.log("Still running..");
    return <p>Last Updated: {lastUpdated.toLocaleTimeString('en-US')}</p>;
};

export default MyComponent;