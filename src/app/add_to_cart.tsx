import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { MenuItemProps } from './MenuTypes'
import { useState } from 'react';


/**
 * A Button component which updates the user's cart by updating the 'cart'
 * key in local storage when a user clicks this Element
 *
 * @param menuItem A MenuItemProps object
 * @returns A JSX.Element
 */
export function AddToCartButton({ menuItem }: { menuItem: MenuItemProps }) {

    function addItemToCart() {
        const cartKey = 'cart';
        const cartItems = localStorage.getItem(cartKey);
        // let cart2: {number?: number} = {};
        let cart: Record<string, number> = {};

        // Check if 'cart' key in localStorage is set
        // if it's not set, add the current menuItem to it with quantity 0
        // if it is set increment the quantity of the current menuItem by 1
        if (cartItems == null) {
            cart[menuItem.name] = 1;
        }
        else {
            cart = JSON.parse(cartItems);
            if (cart[menuItem.name] == undefined) {
                cart[menuItem.name] = 1;
            }
            else {
                cart[menuItem.name]++;
            }
        }
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    return (
        <Button variant="contained" onClick={addItemToCart}>
            <AddShoppingCart />
        </Button>
    );
}

export function ShoppingCartIconCounter() {
    const [numItemsInCart] = useState(() => {
        const cartJsonString = localStorage.getItem('cart');
        if (cartJsonString != null) {
            let totalNumItemsInCart: number | undefined = 0;
            let cart: Record<string, number> = JSON.parse(cartJsonString);

            for (let item in cart) {
                let itemQuantity = cart[item];
                if (itemQuantity != undefined) {
                    totalNumItemsInCart = totalNumItemsInCart + itemQuantity;
                }
            }
            return totalNumItemsInCart;
        }
    }
    );

    return (
        <>
            <Typography>
                {numItemsInCart}
            </Typography>
            <ShoppingCart sx={{ mr: 2 }} />
        </>
    )
}
