'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import { all_locations } from '@/data/menu_location_data';
import Header from '@/components/header';

import {
    getCartFromLocalStorage,
    getLocationFromLocalStorage
} from '@/lib/utils';


export default function Home() {

    const [cart, setCart] = useState({});
    const [currentLocation, setCurrentLocation] = useState("");


    const router = useRouter();
    // if location is set


    useEffect(() => {
        setCart(getCartFromLocalStorage());
        setCurrentLocation(getLocationFromLocalStorage())

        if (currentLocation == "" || !(currentLocation in all_locations)) {
            router.push('/location');
        }
        else {
            router.push('/menu');
        }

    }, [currentLocation, router]);

    return (
        <>
            <Header cart={cart} location={currentLocation} />
            <main>
                <Container>
                </Container>
            </main>
        </>
    );
}
