
import type { Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AddToCartButton } from '@/components/add_to_cart';
import { Cart, MenuItemProps, MenuProps, MenuSectionProps } from '@/app/MenuTypes';
import allFoodItems from '@/data/all_produce.json';


/**
 * A Component which displays a `menu` of items.
 *
 * @param menu - An Array of MenuItemProps
 * @returns A JSX.Element
 */
export default function Menu({ menu, cart, onAdd }: {
    menu: MenuProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    const menuSections = menu.menu.map(section =>

        <Box key={section.category}>
            <MenuSection menu_section={section} cart={cart} onAdd={onAdd} />
        </Box>
    );

    return (
        <>
            <Typography variant="h2">
                Menu
            </Typography>
            <Typography variant="h5">
                {menuSections}
            </Typography>

        </>
    );
}

function MenuSection({ menu_section, cart, onAdd }: {
    menu_section: MenuSectionProps,
    cart: { string?: number },
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    const menuItems = menu_section.items.map(item =>

        <Grid item xs={4} key={item.name}>
            <MenuItem
                cart={cart}
                onAdd={onAdd}
                menuItem={item} />
        </Grid>
    );

    return (
        <>
            <Typography variant="h3">
                {menu_section.category}
            </Typography>

            <Grid container spacing={6}>
                {menuItems}
            </Grid>
        </>
    );
}

function MenuItem({ menuItem, cart, onAdd }: {
    menuItem: MenuItemProps,
    cart: Cart
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    const menuItemName = menuItem.name as keyof typeof allFoodItems;
    let defaultMenuItem = allFoodItems[menuItemName];

    let finalMenuItem = {...menuItem}; // make a copy of menuItem
    finalMenuItem.description = defaultMenuItem.description;
    finalMenuItem.calories = defaultMenuItem.calories;
    finalMenuItem.price = defaultMenuItem.price;

    if (menuItem.price) {
        finalMenuItem.price = menuItem.price;
    }


    return (
        <Card>
            <Typography variant="h5">
                {finalMenuItem.name}
            </Typography>
            <Typography> {finalMenuItem.description} </Typography>
            <Typography> calories {finalMenuItem.calories} </Typography>
            <Typography> price ${finalMenuItem.price.toFixed(2)} </Typography>
            <AddToCartButton menuItem={finalMenuItem} cart={cart} onAdd={onAdd} />
        </Card>
    );
}
