'use client'

import { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Menu from '@/app/menu';
import menuLA from '@/data/menu_los_angeles.json';

import { MenuProps } from './MenuTypes';
import Header from '@/app/header';
import { getCartFromLocalStorage } from '@/lib/utils';

interface LocationData {
    name: string;
    id: string;
}

export default function Home() {

    const [cart, setCart] = useState({});
    const [location, setLocation] = useState("Los Angeles");
    const [menu, setMenu] = useState({});

    useEffect(() => {
        setCart(getCartFromLocalStorage());

    },[]);

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
