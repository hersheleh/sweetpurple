'use client'

import { useState } from 'react'
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { kalnia } from './fonts';
import { ShoppingCartIconCounter } from "./add_to_cart";
import Menu from './menu'
import menu from './menu.json'
import { MenuItemProps } from './MenuTypes';


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


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography
                        variant="h4"
                        color="inherit"
                        align="center"
                        noWrap
                        sx={{ flex: 1 }}>
                        sweetpurple
                    </Typography>
                    <ShoppingCartIconCounter cart={cart}/>
                </Toolbar>
            </AppBar>
            <main>
                <Menu menu={menu} cart={cart} onAdd={setCart} />
            </main>
        </ThemeProvider>
    );
}
