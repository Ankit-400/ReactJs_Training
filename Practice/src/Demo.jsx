import { useState } from "react";
import { useEffect } from "react";

// How the component re-renders when having custom hooks.

const useMyValue = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log("use effect of hook", count);
        setCount(count + 10);
    }, []);

    console.log("Hii");
    // ...do something
    return [count, setCount];
};

export default function Demo() {

    const [value, setValue] = useMyValue();
    console.log("Demo", value);
    return <>
        <button> +1 </button>
    </>
};