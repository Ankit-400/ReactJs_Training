import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {

    const cartCtx = useContext(CartContext);
    function handleAddItem(item) {
        cartCtx.addItemToCart(item);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/` + meal.image} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={() => handleAddItem(meal)}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}