import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import CheckoutPage from '@/app/checkout/page';


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


afterEach(cleanup);

test('Test CheckoutPage', () => {

    const mockCart = {
        item1: { quantity: 3, price: 1.00 },
        item2: { quantity: 1, price: 2.00 }
    }
    window.localStorage.setItem('cart', JSON.stringify(mockCart));
    render(<CheckoutPage />);
    expect(
        screen.getByTitle('total').textContent
    ).toEqual("$5.00")


});
