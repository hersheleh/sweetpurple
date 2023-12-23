'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Menu from '@/app/menu';
import { all_locations } from '@/app/menu_location_data';
import menu_los_angeles from '@/data/menu_los_angeles.json';

import { MenuProps } from './MenuTypes';
import Header from '@/app/header';
import {
    getCartFromLocalStorage,
    getLocationFromLocalStorage
} from '@/lib/utils';


interface LocationData {
    name: string;
    id: string;
}

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
