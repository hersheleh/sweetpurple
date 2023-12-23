'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Menu from '@/components/menu';
import { all_locations } from '@/data/menu_location_data';

import { MenuProps } from '@/app/MenuTypes';
import Header from '@/components/header';
import {
    getCartFromLocalStorage,
    getLocationFromLocalStorage
} from '@/lib/utils';


export default function MenuPage() {

    const [cart, setCart] = useState({});
    const [currentLocation, setCurrentLocation] = useState("");

    const currentLocationKey = currentLocation as keyof typeof all_locations;
    const currentLocationName = currentLocation ?
        all_locations[currentLocationKey].name : "";

    let menu;

    if (currentLocation != "") {
        const key = currentLocation as keyof typeof all_locations;
        const location = all_locations[key];
        menu = location.menu;
    }


    const menuElement = (
        <Menu
            menu={menu as MenuProps}
            cart={cart}
            onAdd={setCart} />
    );

    const router = useRouter();

    useEffect(() => {

        const locationLocalStorage = getLocationFromLocalStorage();

        setCurrentLocation(locationLocalStorage);
        setCart(getCartFromLocalStorage());

        if (locationLocalStorage == "") {
            router.push('/location');
        }
    }, [router]);

    return (
        <>
            <Header cart={cart} location={currentLocationName} />
            <main>
                <Container>
                    {currentLocation == "" ? (
                        <></>
                    ) : (
                        menuElement
                    )}
                </Container>
            </main>
        </>
    );
}
