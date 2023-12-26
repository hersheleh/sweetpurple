import { useEffect } from 'react';
import NextLink from 'next/link';
import createTheme from '@mui/material/styles/createTheme';
// import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { purple } from '@mui/material/colors';
import { kalnia } from '@/app/fonts';
import Link from "@mui/material/Link";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import LocationOn from '@mui/icons-material/LocationOn';
import { ShoppingCartCounter } from '@/components/add_to_cart';
import { Cart } from '@/app/MenuTypes';



/**
 * Displays the header which shows the logo, the current location
 * and the cart counter. Logo can be clicked to go to the menu page.
 * Only displays the location widget if current_location is set in
 * in localStorage
 *
 * @param cart - the shopping cart data
 * @param location - the current location
 * @returns - A JSX.Element
 */
export default function Header({ cart, location }: {
    cart: Cart,
    location: string
}) {
    const locationWidget = (
        <>
            <LocationOn sx={{ mr: 2 }} />
            <Link className="prop-location" component={NextLink} href="/location"
                sx={{ color: "white" }}>
                <Typography variant="h6">{location}</Typography>
            </Link>
        </>
    );

    return (
        <AppBar position="relative">
            <Container>
                <Toolbar>
                    {(location == "") ? (
                        <></>
                    ) : (
                        locationWidget
                    )}
                    <Link
                        align="center"
                        noWrap
                        sx={{ flex: 1 }}
                        component={NextLink} href="/menu">
                        <Typography
                            variant="h4"
                            className={kalnia.className}
                            color="white"
                        >
                            sweetpurple
                        </Typography>
                    </Link>
                    <ShoppingCartCounter cart={cart} />
                    <Link component={NextLink} href="/checkout"
                        sx={{ color: "white" }}>
                        <Typography variant="h6"> Checkout </Typography>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>

    )
}
