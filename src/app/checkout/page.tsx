'use client'

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from '@/components/header';
import { Cart } from '@/app/MenuTypes';
import { all_locations } from '@/data/menu_location_data';
import {
    getLocationFromLocalStorage,
    getCartFromLocalStorage } from '@/lib/utils';


export default function CheckoutPage() {

    const [cart, setCart] = useState<Cart>({});
    const [currentLocation, setCurrentLocation] = useState("");

    const currentLocationKey = currentLocation as keyof typeof all_locations;
    const currentLocationName = currentLocation ?
        all_locations[currentLocationKey].name : "";


    useEffect(() => {
        const locationLocalStorage = getLocationFromLocalStorage();
        setCurrentLocation(locationLocalStorage);
        setCart(getCartFromLocalStorage());
    }, []);

    let cartElement: JSX.Element[] = [];
    let item: keyof Cart;
    for (item in cart) {
        cartElement = cartElement.concat(
            <List>
                <ListItem key={item}>
                    <ListItemText primary={item} />
                    {cart[item]} x
                </ListItem>
            </List>
        )
    }

    return (
        <>
            <Header cart={cart} location={currentLocationName} />
            <main>
                <Container>
                    <Typography variant="h3">
                        Checkout
                    </Typography>
                    {cartElement}
                </Container>
            </main>
        </>
    )
}
