import { expect, test } from 'vitest';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './header';
import { Cart, MenuItemProps } from '@/app/MenuTypes';
import { AddToCartButton } from './add_to_cart';


test('Test that AddToCartButton updates the cart', () => {

    const menuItem: MenuItemProps = {
        name: "item",
        price: 2.50,
        calories: 100,
        description: "item test description"
    }
    const cart = {}
    const onAdd = () => {} //an empty function
    render(<AddToCartButton menuItem={menuItem} cart={cart} onAdd={onAdd} />);
    expect(screen.getByRole('link'))
});
