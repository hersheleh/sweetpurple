'use client'

import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from '@/components/header';
import { Cart } from '@/app/MenuTypes';
import { all_locations } from '@/data/menu_location_data';
import {
    getLocationFromLocalStorage,
    getCartFromLocalStorage
} from '@/utils/utils';


export default function CheckoutPage() {

    const [cart, setCart] = useState<Cart>({});
    const [currentLocation, setCurrentLocation] = useState("");

    const currentLocationKey = currentLocation as keyof typeof all_locations;
    // Get the proper name of the location so we can display it in the header
    const currentLocationName = currentLocation ?
        all_locations[currentLocationKey].name : "";

    useEffect(() => {
        // Since we are reading form local storage the state vars
        // need to be set in useEffect which runs on the client explicitly
        const locationLocalStorage = getLocationFromLocalStorage();
        setCurrentLocation(locationLocalStorage);
        setCart(getCartFromLocalStorage());
    }, []);

    let cartElement: JSX.Element[] = [];

    let item: keyof Cart;
    let total = 0;
    // Iterate through all the items from the cart variable
    // calculate the total price  by multiplying the price and quantity
    // and add the results to the total price.
    // Construct a list item for each item with price and quantity
    for (item in cart) {
        let cartItem = cart[item];
        if (!cartItem || !cartItem.price) {
            continue;
        }
        total += (cartItem.price * cartItem.quantity);
        cartElement = cartElement.concat(

            <ListItem key={item}>
                <ListItemText primary={item} />
                {cartItem.quantity} x ${cartItem.price.toFixed(2)}
            </ListItem>

        )
    }
    // Add the total price as the last element
    cartElement = cartElement.concat(
        <>
            <Divider variant="middle" />
            <ListItem>
                <ListItemText primary="total" />
                <Typography title="total">${total.toFixed(2)}</Typography>
            </ListItem>
        </>
    );

    return (
        <>
            <Header cart={cart} location={currentLocationName} />
            <main>
                <Container>
                    <Paper>
                        <Typography variant="h3">
                            Checkout
                        </Typography>
                        <List>
                            {cartElement}
                        </List>
                    </Paper>
                </Container>
            </main>
        </>
    )
}
