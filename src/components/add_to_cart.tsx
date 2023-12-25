import type { Dispatch, SetStateAction } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MenuItemProps, Cart } from '@/app/MenuTypes'


/**
 * A Button component which adds `menuItem` to the `cart` object and
 * saves it to the "cart" key in localStorage when clicked
 *
 * @param menuItem - A MenuItemProps object
 * @param cart - A Cart object
 * @param onAdd - pass a react useState set function here
 * @returns - A JSX.Element
 */
export function AddToCartButton({
    menuItem,
    cart,
    onAdd
}: {
    menuItem: MenuItemProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<Cart>>
}) {

    function updateCart() {
        const key = menuItem.name as keyof Cart;
        let new_cart = { ...cart };
        if (new_cart[key] != undefined) {
            new_cart[key].quantity += 1;
        }
        else {
            new_cart[key] = { quantity: 1, price: menuItem.price };
        }
        onAdd(new_cart);
        saveCartToLocalStorage(new_cart);
    }

    function saveCartToLocalStorage(newCart: Cart) {
        const cartKey = 'cart';
        localStorage.setItem(cartKey, JSON.stringify(newCart));
    }

    return (
        <Button variant="contained" onClick={updateCart}>
            {/*<AddShoppingCart sx={{ mr: 2 }} /> */}
            Add to Cart
        </Button>
    );
}


/**
 * A Component which displays the total quantity of items in `cart`
 * by taking the sum of all cart[item].quantity values in the cart.
 *
 * @param cart - A `Cart` containing item name, quantity & price
 * @returns - JSX.Element
 */
export function ShoppingCartItemCounter({ cart }: { cart: Cart }) {

    let numItemsInCart = 0; // sum of the quantity keys of all items
    let item: keyof Cart;

    for (item in cart) {
        let itemQuantity = cart[item]?.quantity;
        if (itemQuantity != undefined) {
            numItemsInCart = numItemsInCart + itemQuantity;
        }
    }

    return (
        <>
            <Typography>
                {numItemsInCart}
            </Typography>
            <ShoppingCartIcon sx={{ ml: 2, mr: 2 }} />
        </>
    )
}
