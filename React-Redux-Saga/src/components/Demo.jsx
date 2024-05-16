export default function Demo(props) {
    console.log(props);
    return <button onClick={() => {
        console.log("Yass");
        props.demo();
    }
    }>Special</button>
}