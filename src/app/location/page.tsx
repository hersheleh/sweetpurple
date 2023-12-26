'use client'

import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from '@/components/header';
import {
    getCartFromLocalStorage,
    getLocationFromLocalStorage } from '@/utils/utils';
import { Typography } from '@mui/material';
import { all_locations } from '@/data/menu_location_data';

export default function Location() {

    const [cart, setCart] = useState({});
    const [currentLocation, setCurrentLocation] = useState("");

    const currentLocationKey = currentLocation as keyof typeof all_locations;
    const currentLocationName = currentLocation ?
        all_locations[currentLocationKey].name : "";

    useEffect(() => {
        setCart(getCartFromLocalStorage());
        setCurrentLocation(getLocationFromLocalStorage());
    }, []);

    let locationCards: JSX.Element[] = [];
    let key: keyof typeof all_locations;

    for (key in all_locations) {
        const location = all_locations[key];
        const locationName = location.name;
        locationCards = locationCards.concat(
            <Grid item xs={6} key={key}>
                <LocationCard
                    id={key}
                    name={locationName}
                    onUpdate={setCurrentLocation} />
            </Grid>
        )
    }

    return (
        <>
            <Header cart={cart} location={currentLocationName} />
            <Container>
                <Typography variant="h4">
                    Choose Location
                </Typography>
                <Grid container spacing={8}>
                    {locationCards}
                </Grid>
            </Container>
        </>
    );
}

function LocationCard({ id, name, onUpdate }: {
    id: string,
    name: string,
    onUpdate: Dispatch<SetStateAction<string>>
}) {

    const router = useRouter();

    function updateLocation() {
        saveLocationToLocalStorage(id);
        onUpdate(id);
        router.push('/menu');
    }

    function saveLocationToLocalStorage(currentLocation: string) {
        const locationKey = "current_location";
        localStorage.setItem(locationKey, currentLocation);
    }

    return (
        <Card onClick={updateLocation}>
            <Typography variant="h5">
                {name}
            </Typography>
        </Card>
    );
}
