import type { Dispatch, SetStateAction } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { MenuItemProps, Cart } from '@/app/MenuTypes'


/**
 * A Button component which updates the user's cart by updating the 'cart'
 * key in local storage when a user clicks this Element
 *
 * @param menuItem A MenuItemProps object
 * @returns A JSX.Element
 */
export function AddToCartButton({
    menuItem,
    cart,
    onAdd
}: {
    menuItem: MenuItemProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    function updateCart() {
        const key = menuItem.name as keyof Cart;
        let new_cart = { ...cart };
        if (new_cart[key] != undefined) {
            new_cart[key].quantity += 1;
        }
        else {
            new_cart[key] = {quantity: 1, price: menuItem.price};
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
    );}


export function ShoppingCartIconCounter({ cart }: { cart: Cart }) {

    const numItemsInCart = calculateNumItemsInCart(cart);

    function calculateNumItemsInCart(theCart: Cart) {
        let totalNumItemsInCart: number = 0;
        let item: keyof Cart;
        for (item in theCart) {
            let itemQuantity = theCart[item]?.quantity;
             if (itemQuantity != undefined) {
                totalNumItemsInCart = totalNumItemsInCart + itemQuantity;
            }
        }
        return totalNumItemsInCart;
    }

    return (
        <>
            <Typography>
                {numItemsInCart}
            </Typography>
            <ShoppingCart sx={{ ml: 2, mr: 2 }} />
        </>
    )
}

