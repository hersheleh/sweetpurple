'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { all_locations } from '@/data/menu_location_data';
import Header from '@/components/header';

import {
    getCartFromLocalStorage,
    getLocationFromLocalStorage
} from '@/utils/utils';


/**
 * The HomePage
 *
 */
export default function Home() {

    const [cart, setCart] = useState({});
    const [currentLocation, setCurrentLocation] = useState("");


    const router = useRouter();

    useEffect(() => {
        // Read state variables from local storage when rendering on the client
        setCart(getCartFromLocalStorage());
        setCurrentLocation(getLocationFromLocalStorage())

        // If current location is set and is valid, route to the menu page
        // otherwise route to the location page so user can set location.
        if (currentLocation == "" || !(currentLocation in all_locations)) {
            router.push('/location');
        }
        else {
            router.push('/menu');
        }

    }, [currentLocation, router]);

    // Just render the Header on this page, if page shows up before redirect.
    return (
        <>
            <Header cart={cart} location={currentLocation} />
            <main>
            </main>
        </>
    );
}
