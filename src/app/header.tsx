import { useEffect } from 'react';
import NextLink from 'next/link';
import Link from "@mui/material/Link";
import { AppBar, Toolbar, Typography } from "@mui/material";
import LocationOn from '@mui/icons-material/LocationOn';
import { ShoppingCartIconCounter } from "./add_to_cart";


export default function Header({ cart, location }: {
    cart: { string?: number },
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
