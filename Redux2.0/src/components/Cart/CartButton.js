import classes from './CartButton.module.css';
import { toggle as toggleCart } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {

  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch();
  console.log(totalQuantity);

  function toggleCartHandler() {
    dispatch(toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
