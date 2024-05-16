import { Link, useParams } from "react-router-dom";

function ProductDetail() {

    const params = useParams();

    return <>
        <h3>Product Detail</h3>
        <h4>Hii Product...{params.productId}</h4>
        <p><Link to='..'>Back</Link></p>
        {/* '..' is Relative path. Here this path will take you to one level upward in your path according to your router definition. As we have '/products/:productId' as child of '/', this back button will take us ack to the '/' or home page because we are using absolute path in router definition.  */}
        {/* When working with Link, we have one special prop named relative. This can take two values, path or route. Default value is route. Route will behaves as the relative to the route definition. But when using with path, react router will ook at the currently active path and simply remove one segment from that path. */}
        {/* The relative prop does not matter if we have absolute path. */}
    </>
}

export default ProductDetail;