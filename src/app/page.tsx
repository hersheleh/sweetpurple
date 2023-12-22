'use client'

import { useEffect, useState } from 'react'

import Container from '@mui/material/Container';

import Menu from './menu';
import menuLA from './menu_Los_Angeles.json';
import { MenuProps } from './MenuTypes';
import Header from './header';




export default function Home() {

    const [cart, setCart] = useState({});
    const [location, setLocation] = useState("Location");

    useEffect(() => {
        setCart(getCartFromLocalStorage());
    }, []);

    function getCartFromLocalStorage() {
        const cartKey = 'cart';
        const cartJsonString = localStorage.getItem(cartKey);
        if (cartJsonString != null) {
            const localCart = JSON.parse(cartJsonString);
            return localCart;
        }
        else {
            return {};
        }
    }

    return (
        <>
            <Header cart={cart} location={location} />
            <main>
                <Container>
                    <Menu
                        menu={menuLA as MenuProps}
                        cart={cart}
                        onAdd={setCart} />
                </Container>
            </main>
        </>
    );
}
