'use client'

import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from '@/app/header';
import { getCartFromLocalStorage } from '@/lib/utils';
import { Typography } from '@mui/material';
import { all_locations } from '../menu_location_data';

export default function Location() {

    const [cart, setCart] = useState({});

    useEffect(() => {
        setCart(getCartFromLocalStorage());
    }, []);

    let location_cards: JSX.Element[] = [];
    let key: keyof typeof all_locations;

    for (key in all_locations) {
        const location = all_locations[key];
        const location_name = location.name;
        location_cards= location_cards.concat(
            <Grid item xs={6} key={key}>
                <LocationCard name={location_name} />
            </Grid>
        )
    }

    return (
        <>
            <Header cart={cart} location="Los Angeles" />
            <Container>
                <Typography variant="h4">
                    Choose Location
                </Typography>
                <Grid container spacing={8}>
                    {location_cards}
                </Grid>
            </Container>
        </>
    );
}

function LocationCard({ name }:{ name: string }) {
    return (
        <Card >
            <Typography variant="h5">
                {name}
            </Typography>
        </Card>
    );
}
