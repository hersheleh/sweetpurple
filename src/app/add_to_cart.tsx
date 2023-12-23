import type { Dispatch, SetStateAction } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { MenuItemProps } from './MenuTypes'
import { useReducer, useContext } from 'react';

/**
 * A
 */
interface Cart {
    string?: number
};


// type AddToCartAction = { type: 'addtocart', value: string };

// const initialState: Cart = {};


// function stateReducer(
//     // cart: Record<string, number>,
//     cart: Cart,
//     action: AddToCartAction): Cart {

//     switch (action.type) {
//         // Get the current cart. See if menuItem.name is in the cart.
//         // If it is, increment that key. If it's not initialize it to 1.
//         case "addtocart":
//             // reducer must be 'pure' so make a copy of the cart
//             let new_cart = { ...cart };
//             const key: keyof Cart = action.value as "string";
//             if (new_cart[key] != undefined) {
//                 new_cart[key] += 1;
//             }
//             else {
//                 new_cart[key] = 1;
//             }
//             return new_cart;
//         default:
//             throw new Error("Unknown action");
//     }
// }

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
    cart: { string?: number },
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    // const [state, dispatch] = useReducer(stateReducer, initialState);

    // const addToCart = () => dispatch({ type: 'addtocart', value: menuItem.name });

    function updateCart() {
        // const key: keyof Cart = menuItem.name as "string";
        const key = menuItem.name as keyof Cart;
        let new_cart = { ...cart };
        if (new_cart[key] != undefined) {
            new_cart[key] += 1;
        }
        else {
            new_cart[key] = 1;
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
            <AddShoppingCart sx={{ mr: 2 }} /> Add to Cart
        </Button>
    );}


export function ShoppingCartIconCounter({ cart }: { cart: Cart }) {

    const numItemsInCart = calculateNumItemsInCart(cart);

    function calculateNumItemsInCart(theCart: Cart) {
        let totalNumItemsInCart: number = 0;
        let item: keyof Cart;
        for (item in theCart) {
            let itemQuantity = theCart[item];
            if (itemQuantity != undefined) {
                totalNumItemsInCart = totalNumItemsInCart + itemQuantity;
            }
        }
        return totalNumItemsInCart;
    }

    // const cart = useContext(CartContext);

    // const [cart] = useReducer(stateReducer, initialState);
    // const [numItemsInCart, setNumItemsInCart] = useState(() => {
    //     let totalNumItemsInCart: number = 0;
    //     let item: keyof Cart;
    //     for (item in cart) {
    //         let itemQuantity = cart[item];
    //         if (itemQuantity != undefined) {
    //             totalNumItemsInCart = totalNumItemsInCart + itemQuantity;
    //         }
    //     }
    //     return totalNumItemsInCart;
    // });

    return (
        <>
            <Typography>
                {numItemsInCart}
            </Typography>
            <ShoppingCart sx={{ ml: 2, mr: 2 }} />
        </>
    )
}

