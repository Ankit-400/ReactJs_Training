import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0)

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2 className="cart"></h2>
            <ul>
                {
                    cartCtx.items.map(item => (
                        <CartItem
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            onIncreaseItem={() => cartCtx.addItemToCart(item)}
                            onDecreaseItem={() => cartCtx.removeItemFromCart(item.id)}
                        />
                    ))
                }
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}> Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go To Checkout</Button>}
            </p>
        </Modal >
    )
}