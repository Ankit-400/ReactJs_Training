import { memo } from "react";
import Child_2 from "./Child_2";

const Child_1 = memo(function Child_1(props) {
    return <section style={{
        width: '90%',
        border: '1px solid black',
        padding: '20px'
    }}>
        This is Middle child.
        <hr />
        {props.print()}
        <Child_2>
            This is Inner most child component.
        </Child_2>
    </section>
}, (prevP, newP) => {
    // Generally this functio will not be there, as react will compare both objects by itself and return the boolean.
    // just for demo, that we can getprev props and new props in parameter of the function
    // console.log(prevP, newP);

    // return true; => it will skip the re-render, both the props will be compared by Object.is() and then true/false will be returned.

    // return false; => it will re-render the component as it is in the case of not using useCallback + memo.
});

export default Child_1;