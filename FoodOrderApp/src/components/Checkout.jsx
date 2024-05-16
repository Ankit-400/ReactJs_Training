import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        });
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail Address" id="email" type="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}