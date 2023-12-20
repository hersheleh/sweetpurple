import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { MenuItemProps } from './MenuTypes'
import { useState, useReducer } from 'react';


interface Cart {
    string?: number
};


type AddToCartAction = { type: 'addtocart', value: string };

const initialState: Cart = {};


function stateReducer(
    // cart: Record<string, number>,
    cart: Cart,
    action: AddToCartAction): Cart {
    debugger;
    switch (action.type) {
        case "addtocart":
            /* Get the current cart. See if menuItem.name is in the cart.
             * If it is, increment that key. If it's not initialize it to 1.
             */
            let new_cart = {...cart}; // reducer must be 'pure' so make a copy of the cart
            const key: keyof Cart = action.value as "string";
            if (new_cart[key] != undefined) {
                new_cart[key] += 1;
            }
            else {
                new_cart[key] = 1;
            }
            return new_cart;
        default:
            throw new Error("Unknown action");
    }
}

/**
 * A Button component which updates the user's cart by updating the 'cart'
 * key in local storage when a user clicks this Element
 *
 * @param menuItem A MenuItemProps object
 * @returns A JSX.Element
 */
export function AddToCartButton({ menuItem }: { menuItem: MenuItemProps }) {

    const [cart, dispatch] = useReducer(stateReducer, initialState);

    const addToCart = () => dispatch({ type: 'addtocart', value: menuItem.name });


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
        <Button variant="contained" onClick={addToCart}>
            <AddShoppingCart />
        </Button>
    );
}

export function ShoppingCartIconCounter() {
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


    // const [numItemsInCart] = useState(() => {
    //     const cartJsonString = localStorage.getItem('cart');
    //     if (cartJsonString != null) {
    //         let totalNumItemsInCart: number | undefined = 0;
    //         let cart: Record<string, number> = JSON.parse(cartJsonString);

    //         for (let item in cart) {
    //             let itemQuantity = cart[item];
    //             if (itemQuantity != undefined) {
    //                 totalNumItemsInCart = totalNumItemsInCart + itemQuantity;
    //             }
    //         }
    //         return totalNumItemsInCart;
    //     }
    // }
    // );

    return (
        <>
            <Typography>
                {/*numItemsInCart*/}
            </Typography>
            <ShoppingCart sx={{ mr: 2 }} />
        </>
    )
}

