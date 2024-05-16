import { currencyFormatter } from "../util/formatting";

export default function CartItem({ name, quantity, price, onIncreaseItem, onDecreaseItem }) {
    return (
        <li className="cart-item">
            <p>
                {name} - {quantity} X {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={onDecreaseItem}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncreaseItem}>+</button>
            </p>
        </li>
    )
}