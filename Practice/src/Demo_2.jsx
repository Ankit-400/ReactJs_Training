import { useState } from "react"

export default function Demo_2() {

    const [value, setValue] = useState(0);
    console.log("Component Updated...");
    return <>
        <button onClick={() => {
            // debugger;
            setValue(value + 20);
            console.log("Value Updated...");
            setValue(value + 40);
        }}>Increae</button>
        <h2>{value}</h2>
    </>
}