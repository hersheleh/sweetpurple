import type { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { kalnia } from '@/app/fonts';
import { AddToCartButton } from '@/components/add_to_cart';
import { Cart, MenuItemProps, MenuProps, MenuSectionProps } from '@/app/MenuTypes';
import allFoodItems from '@/data/all_produce.json';


/**
 * A Component which displays the given `menu`.
 *
 * @param menu - An Array of MenuItemProps
 * @param cart - passes this to MenuSections Component
 * @param onAdd - passes this to MenuSections Component
 * @returns A JSX.Element
 */
export function Menu({ menu, cart, onAdd }: {
    menu: MenuProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<Cart>>
}) {

    const menuSections = menu.menu.map(section =>

        <Box key={section.category}>
            <MenuSection menuSection={section} cart={cart} onAdd={onAdd} />
        </Box>
    );

    return (
        <>
        <Typography
            align="center"
            sx={{ flex: 1 }}
            className={kalnia.className}
            variant="h2">
            Menu
        </Typography>

            <Typography variant="h5">
                {menuSections}
            </Typography>
        </>

    );
}

/**
 * A Component which display one menu section.
 *
 * @param menu - An Array of MenuItemProps
 * @param cart - passes this to MenuItemCard Component
 * @param onAdd - passes this to MenuItemCard Component
 * @returns A JSX.Element
 */
export function MenuSection({ menuSection, cart, onAdd }: {
    menuSection: MenuSectionProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<Cart>>
}) {

    const menuItems = menuSection.items.map(item =>

        <Grid item xs={4} key={item.name}>
            <MenuItemCard
                cart={cart}
                onAdd={onAdd}
                menuItem={item} />
        </Grid>
    );

    return (
        <>
            <Typography
                sx={{ ml: 3 }}
                className={kalnia.className} variant="h3">
                {menuSection.category}
            </Typography>
            <Divider variant="middle" />
            <Grid container spacing={4}>
                {menuItems}
            </Grid>
        </>
    );
}

/**
 * This function displays a single menu item from the menu json
 *
 * @param menuItem - A MenuItemProp
 * @param cart - The current cart
 * @param onAdd - Function to set the state variable
 * @returns - A JSX.Element
 */
export function MenuItemCard({ menuItem, cart, onAdd }: {
    menuItem: MenuItemProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<Cart>>
}) {
    // Get menuItemName from
    const menuItemName = menuItem.name as keyof typeof allFoodItems;
    // let defaultMenuItem = allFoodItems[menuItemName];

    // Initialize the finalMenuItem from this locations json menuItem
    let finalMenuItem = { ...menuItem }; // make a copy of menuItem

    let total_calories = 0; // initialize the total calorie calculation

    // Calculate the total calories for this menu Item, by iterating through the ingredients
    // inside this locations menu json.
    // Then add each calorie from master produce json to this menu items calorie field
    let ingredient: string;
    for (ingredient in finalMenuItem.ingredients) {
        const ingredient_name = finalMenuItem.ingredients[ingredient];
        const ingredient_item = allFoodItems[ingredient_name as keyof typeof allFoodItems];
        total_calories += ingredient_item.calories;
    }

    // Create ListItems for each ingredient name
    const ingredient_names = finalMenuItem.ingredients.map(ingredient_name =>
        <ListItem>{ ingredient_name }</ListItem>
    )

    // Construct a menuItem card.
    // If the current menu item includes a price use it,
    // otherwise use the price from all_produce.json
    // finalMenuItem.description = defaultMenuItem.description;
    // finalMenuItem.calories = defaultMenuItem.calories;
    // finalMenuItem.price = defaultMenuItem.price;

    finalMenuItem.calories

    if (menuItem.price) {
        finalMenuItem.price = menuItem.price;
    }

    return (
        <Card sx={{ mx: 6, my: 3 }} elevation={1}>
            <Typography variant="h5">
                {finalMenuItem.name}
            </Typography>
            <Divider />
            <Typography title="description" variant="body1">
                {/*finalMenuItem.description*/}
            </Typography>
            <List>
                <ListItem title="calories">
                    <ListItemText primary="calories:" />
                    {total_calories}
                    {/*<Typography>  </Typography>*/}
                </ListItem>
                {ingredient_names}
                {/* <ListItem title="price"> */}
                {/*     <ListItemText primary="name:" /> */}
                {/*     {ingredient_names} */}
                {/*     ${\/*finalMenuItem.price.toFixed(2)*\/} */}
                {/*     {\/*<Typography> </Typography>*\/} */}
                {/* </ListItem> */}
            </List>
            <AddToCartButton
                menuItem={finalMenuItem}
                cart={cart}
                onAdd={onAdd} />
        </Card>
    );
}
