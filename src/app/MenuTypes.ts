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
