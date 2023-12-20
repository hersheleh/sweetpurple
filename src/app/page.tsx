'use client'

import { AppBar, Toolbar, Typography } from "@mui/material";
import Menu from './menu'
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { kalnia } from './fonts';

import menu from './menu.json'
import { ShoppingCartIconCounter } from "./add_to_cart";

const theme = createTheme({
    palette: {
        primary: purple
    },
    typography: {
        fontFamily: kalnia.style.fontFamily
    }
});


export default function Home() {
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
                    <ShoppingCartIconCounter />
                </Toolbar>
            </AppBar>
            <main>
                <Menu menu={menu} />
            </main>
        </ThemeProvider>
    );
}
