import type { Cart, MenuItemProps } from '@/app/MenuTypes';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, describe } from 'vitest';
import { AddToCartButton, ShoppingCartCounter } from '@/components/add_to_cart';


describe("Test AddToCartButton", () => {
    afterEach(cleanup);

    test('adds new item to cart', () => {

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

    test('adds existing item to cart', () => {

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


describe ("Test ShoppingCartCounter", () => {
    afterEach(cleanup);

    test("shows correct count", () => {
        // initialize the mock cart object
        let mockCart: Cart = {};
        mockCart["item1" as keyof Cart] = {quantity: 2, price: 2.50}
        mockCart["item2" as keyof Cart] = {quantity: 3, price: 0.50}

        render(
            <ShoppingCartCounter cart={mockCart}/>
        );
        const cartTotalQuantity = "5";

        const shoppingCartCounter = screen.getByRole(
            'heading',
            { level: 4, name: cartTotalQuantity });

        expect(
            shoppingCartCounter.textContent
        ).toEqual(
            cartTotalQuantity
        );
    });
});
