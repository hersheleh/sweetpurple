import { useState as useStateMock } from 'react';
import { beforeAll, expect, test } from 'vitest';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '@/components/header';
import type { MenuItemProps } from '@/app/MenuTypes';
import { AddToCartButton } from './add_to_cart';


const menuItem: MenuItemProps = {
    name: "item",
    price: 2.50,
    calories: 100,
    description: "item test description"
}


test('Test that AddToCartButton ', () => {

    let mockCart;
    // A mock function for setting state
    function setMockCart<Cart>(cart: Cart) { mockCart = cart }
    render(
        <AddToCartButton
            menuItem={menuItem}
            cart={{}}
            onAdd={setMockCart}
        />);

    const addToCartButton = screen.getByRole('button', { name: "Add to Cart" })
    expect(addToCartButton).toBeDefined();

    fireEvent.click(addToCartButton);
    expect(mockCart).toEqual({ "item": { quantity: 1, price: 2.50 } });
});
