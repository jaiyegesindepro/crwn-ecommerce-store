import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {Name, Quantity, Price, 
        CheckoutItemContainer, ImageContainer, Arrow,
        Value,RemoveButton} from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name as='span'>{name}</Name>
            <Quantity as='span'>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                 <Value as='span'>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price as='span'>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )

}

export default CheckoutItem;