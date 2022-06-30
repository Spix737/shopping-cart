import { IndeterminateCheckBoxTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
// Types
import { CartItemType } from "../App";
// Styles
import { Wrapper } from "./CartItem.styles";

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}
const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) =>
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="item-details">
                <p>Price: ${(item.price).toFixed(2)}</p>
                <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button size='small' disableElevation variant='contained' onClick={() => removeFromCart(item.id)}>
                    -
                </Button>
                <p>{item.quantity}</p>
                <Button size='small' disableElevation variant='contained' onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>

export default CartItem;