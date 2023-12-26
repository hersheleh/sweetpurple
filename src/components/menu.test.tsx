import { afterEach, vi, test, describe, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MenuItemCard, MenuSection, Menu } from '@/components/menu';

import type { Cart, MenuItemProps, MenuSectionProps, MenuProps } from '@/app/MenuTypes';


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

// mock the all produce list since 'item' is not in it
vi.mock("@/data/all_produce.json", () => {
    return ({
        default: {
            item: {
                description: "mock item description",
                calories: 100,
                price: 1.00
            }
        }
    })
});

describe("Test Menu", () => {
    afterEach(cleanup);

    test('displays the Menu heading', () => {
        const mockMenu: MenuProps = {
            location: "test_location",
            menu: [{
                category: "category1",
                items: [{
                    name: "item",
                    price: 2.50
                }]
            }]
        }
        const mockCart = {};
        function setMockCart() {}

        render(
            <Menu menu={mockMenu} cart={mockCart} onAdd={setMockCart} />
        );
        expect(
            screen.getByRole('heading', { level: 2, name: "Menu"})
        ).toBeDefined()
    });



})

describe("Test MenuSection", () => {
    afterEach(cleanup);

    test('displays the section heading', () => {
        const mockMenuSection = {
            category: "category1",
            items: [{
                name: "item",
                price: 2.50
            }]
        }

        const mockCart = {};
        function setMockCart() {}

        render(
            <MenuSection
                menuSection={mockMenuSection}
                cart={mockCart}
                onAdd={setMockCart} />
        );
        const categoryHeading = screen.getByRole(
            "heading", {
            level: 3,
            name: mockMenuSection.category
        });
        expect(
            categoryHeading
        ).toBeDefined()

    })
});

describe("Test MenuItemCard", () => {
    afterEach(cleanup);

    test('displays correct information', () => {
        const mockMenuItem: MenuItemProps = {
            name: "item",
            price: 2.50,
        }
        const mockCart = {};
        function setMockCart() {}

        render(
            <MenuItemCard
                menuItem={mockMenuItem}
                cart={mockCart}
                onAdd={setMockCart} />);

        expect(
            screen.getByRole('heading', { name: mockMenuItem.name })
        ).toBeDefined();

        expect(
            screen.getByTitle("description")
        ).toBeDefined();

        expect(
            screen.getByTitle("calories").textContent
        ).toContain(100);

        expect(
            screen.getByTitle("price").textContent
        ).toContain(2.50);
    });
})
