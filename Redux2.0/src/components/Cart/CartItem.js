import { addItemToCart, removeItemFromCart } from '../../store/cart-slice';
import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  function handleIncreaseQuantity() {
    dispatch(addItemToCart({ id, price, title }));
  }

  function handleDecreseQuantity() {
    dispatch(removeItemFromCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDecreseQuantity}>-</button>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
