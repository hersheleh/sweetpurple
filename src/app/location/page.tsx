'use client'

import type { Dispatch, SetStateAction } from 'react';
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
    const [currentLocation, setCurrentLocation] = useState<string>();

    useEffect(() => {
        setCart(getCartFromLocalStorage());
    }, []);

    let location_cards: JSX.Element[] = [];
    let key: keyof typeof all_locations;

    for (key in all_locations) {
        const location = all_locations[key];
        const location_name = location.name;
        location_cards = location_cards.concat(
            <Grid item xs={6} key={key}>
                <LocationCard
                    id={key}
                    name={location_name}
                    onUpdate={setCurrentLocation} />
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

function LocationCard({ id, name, onUpdate }: {
    id: string,
    name: string,
    onUpdate: Dispatch<SetStateAction<string | undefined>>
}) {

    function updateLocation() {
        saveLocationToLocalStorage(id);
        onUpdate(id);

    }

    function saveLocationToLocalStorage(current_location: string) {
        const location_key = "current_location";
        localStorage.setItem(location_key, current_location);
    }


    return (
        <Card onClick={updateLocation}>
            <Typography variant="h5">
                {name}
            </Typography>
        </Card>
    );
}
