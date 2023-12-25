import { Cart, MenuItemProps } from '@/app/MenuTypes';
import Header from '@/components/header';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState as useStateMock } from 'react';
import { afterEach, afterAll, expect, test, vi, describe } from 'vitest';
import { AddToCartButton } from './add_to_cart';


describe("TestAddToCart", () => {
    afterEach(cleanup);

    test('add new item', () => {

        const menuItem: MenuItemProps = {
            name: "item",
            price: 2.50,
            calories: 100,
            description: "item test description"
        }

        // function setMockCart<Cart>(cart: Cart) { initialMockCart = cart }
        let initialMockCart: Cart = {};
        // A mock function for setting state
        function setMockCart<A>(cart: A) { initialMockCart = cart as Cart }

        render(
            <AddToCartButton
                menuItem={menuItem}
                cart={initialMockCart}
                onAdd={setMockCart}
            />);
        const addToCartButton = screen.getByRole('button', { name: "Add to Cart" })

        expect(
            addToCartButton
        ).toBeDefined();

        fireEvent.click(addToCartButton);

        expect(
            initialMockCart
        ).toEqual(
            { "item": { quantity: 1, price: 2.50 } }
        );
    });

    test('add existing item', () => {

        const menuItem: MenuItemProps = {
            name: "item",
            price: 2.50,
            calories: 100,
            description: "item test description"
        }

        // initialize the mock cart object with one item
        let initialMockCart: Cart = {};
        const item = "item" as keyof Cart;
        initialMockCart[item] = {quantity: 1, price: 2.50}

        // A mock function for setting state
        function setMockCart<A>(cart: A) { initialMockCart = cart as Cart }


        render(
            <AddToCartButton
                menuItem={menuItem}
                cart={initialMockCart}
                onAdd={setMockCart}
            />);

        const addToCartButton = screen.getByRole('button', { name: "Add to Cart" })
        expect(
            addToCartButton
        ).toBeDefined();

        fireEvent.click(addToCartButton);

        expect(
            initialMockCart
        ).toEqual(
            { "item": { quantity: 2, price: 2.50 } }
        );
    });

});

