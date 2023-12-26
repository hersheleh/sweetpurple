import { expect, test } from 'vitest';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './header';
import { Cart } from '@/app/MenuTypes';

// Because of nextjs font magic we need to mock these font includes
// See: https://stackoverflow.com/questions/76659367/typeerror-0-local-default-is-not-a-function-when-using-next-font-local-in-j

vi.mock("next/font/google", () => {
    const mock_font_object = {
        style: {
            fontFamily: "mock_google_font"
        }
    }
    return ({
        Noto_Serif: () => mock_font_object,
        Roboto: () => mock_font_object,
        Noto_Nastaliq_Urdu: () => mock_font_object
    })
});

vi.mock("next/font/local", () => ({
    default: () => ({
        className: "mock_kalina",
        style: {
            fontFamily: "mock_kalina_family",
        }
    })
}));



test('Test that Header displays the current location', () => {

    let testLocation = 'test_los_angeles'
    let testCart: Cart = {};
    testCart['product1' as keyof Cart] = { quantity: 3, price: 5.00 };
    testCart['product2' as keyof Cart] = { quantity: 1, price: 2.20 };
    render(<Header cart={testCart} location={testLocation} />);

    expect(screen.getByRole('heading', { name: "sweetpurple" })).toBeDefined();
    expect(screen.getByRole('link', { name: testLocation })).toBeDefined();
});
