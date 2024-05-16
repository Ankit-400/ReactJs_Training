import Button from './UI/Button'
import imgLogo from '../assets/logo.jpg'
import { useContext } from 'react'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {

    const cartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);
    const totalItems = cartCtx.items.reduce((acc, item) => acc + item.quantity, 0);

    function handleShowCart() {
        UserProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={imgLogo} alt="Logo of App" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalItems})</Button>
            </nav>
        </header>
    )
}