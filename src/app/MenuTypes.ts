
/**
 * This is the cart object saved to local storage.
 */
export interface Cart {
    string?: {
        quantity: number,
        price?:number
    }
};

export interface MenuProps {
    location: string,
    menu: MenuSectionProps[];
}

export interface MenuSectionProps {
    category: string;
    items: MenuItemProps[];
}

export interface MenuItemProps {
    name: "string",
    price?: number,
    description?: string;
    calories?: number;
}

export interface FoodItemProps {
    name: {
        description: string;
        calories: number;
        price: number;
    }
}
