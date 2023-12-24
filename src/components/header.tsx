import { useEffect } from 'react';
import NextLink from 'next/link';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { purple } from '@mui/material/colors';
import { kalnia } from '@/app/fonts';
import Link from "@mui/material/Link";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LocationOn from '@mui/icons-material/LocationOn';
import { ShoppingCartIconCounter } from  '@/components/add_to_cart';
import { Cart } from '@/app/MenuTypes';

const theme = createTheme({
    palette: {
        primary: purple
    },
    typography: {
        fontFamily: kalnia.style.fontFamily
    }
});



export default function Header({ cart, location }: {
    cart: Cart,
    location: string
}) {
    const locationWidget = (
        <>
            <LocationOn sx={{ mr: 2 }} />
            <Link component={NextLink} href="/location"
                sx={{ color: "white" }}>
                <Typography>Location: {location}</Typography>
            </Link>
        </>
    );

    return (
        <AppBar position="relative">
            <Toolbar>
                {(location == "") ? (
                    <></>
                ) : (
                    locationWidget
                )}
                <Typography
                    className={kalnia.className}
                    variant="h4"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}>
                    sweetpurple
                </Typography>
                <ShoppingCartIconCounter cart={cart} />
                <Link component={NextLink} href="/checkout"
                    sx={{ color: "white" }}>
                    <Typography> Checkout </Typography>
                </Link>
            </Toolbar>
        </AppBar>

    )
}
