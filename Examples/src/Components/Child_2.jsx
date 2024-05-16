export default function Child_2(props) {
    return <div style={{
        width: '90%',
        border: '1px solid black',
        padding: '20px'
    }}>
        {props.children} {(Math.random() * 10).toFixed(3)}
    </div>
}