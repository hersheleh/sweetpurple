'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link';
import Link from "@mui/material/Link";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import { purple } from "@mui/material/colors";
import LocationOn from '@mui/icons-material/LocationOn';
import { kalnia } from './fonts';
import { ShoppingCartIconCounter } from "./add_to_cart";
import Menu from './menu';
import menuLA from './menu_Los_Angeles.json';
import { MenuProps } from './MenuTypes';


const theme = createTheme({
    palette: {
        primary: purple
    },
    typography: {
        fontFamily: kalnia.style.fontFamily
    }
});


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
        <ThemeProvider theme={theme}>
            <AppBar position="relative">
                <Toolbar>
                    <LocationOn sx={{ mr: 2 }} />
                    <Link component={NextLink} href="/location" sx={{ color: "white"}}>
                        <Typography>Location: {location}</Typography>
                    </Link>
                    <Typography
                        variant="h4"
                        color="inherit"
                        align="center"
                        noWrap
                        sx={{ flex: 1 }}>
                        sweetpurple
                    </Typography>
                    <ShoppingCartIconCounter cart={cart} />
                </Toolbar>
            </AppBar>
            <main>
                <Container>
                    <Menu
                        menu={menuLA as MenuProps}
                        cart={cart}
                        onAdd={setCart} />
                </Container>
            </main>
        </ThemeProvider>
    );
}
