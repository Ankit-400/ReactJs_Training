import { useEffect, useState } from "react"

export default function Demo() {
    const [cnt, setCnt] = useState(0);
    console.log("Re-rendered...");
    return <>
        <div onClick={() => {
            setCnt(prev => prev + 10);
            console.log(cnt);
        }}>{cnt}</div>
    </>
}