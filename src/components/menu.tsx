
import type { Dispatch, SetStateAction } from 'react';
import { kalnia } from '@/app/fonts';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { AddToCartButton } from '@/components/add_to_cart';
import { Cart, MenuItemProps, MenuProps, MenuSectionProps } from '@/app/MenuTypes';
import allFoodItems from '@/data/all_produce.json';
import { Divider } from '@mui/material';


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
            <Typography className={kalnia.className}variant="h2">
                Menu
            </Typography>
            <Divider variant="middle" />
            <Typography variant="h5">
                {menuSections}
            </Typography>

        </>
    );
}

function MenuSection({ menu_section, cart, onAdd }: {
    menu_section: MenuSectionProps,
    cart: Cart,
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    const menuItems = menu_section.items.map(item =>

        <Grid item xs={4} key={item.name}>
            <MenuItemCard
                cart={cart}
                onAdd={onAdd}
                menuItem={item} />
        </Grid>
    );

    return (
        <>
            <Typography className={ kalnia.className } variant="h3">
                {menu_section.category}
            </Typography>
            <Divider variant="middle" />
            <Grid container spacing={16}>
                {menuItems}
            </Grid>
        </>
    );
}

function MenuItemCard({ menuItem, cart, onAdd }: {
    menuItem: MenuItemProps,
    cart: Cart
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    const menuItemName = menuItem.name as keyof typeof allFoodItems;
    let defaultMenuItem = allFoodItems[menuItemName];

    let finalMenuItem = { ...menuItem }; // make a copy of menuItem
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
            <Typography> {finalMenuItem.description}f </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="calories:" />
                    {finalMenuItem.calories}
                    {/*<Typography>  </Typography>*/}
                </ListItem>
                <ListItem>
                    <ListItemText primary="price:" />
                    ${finalMenuItem.price.toFixed(2)}
                    {/*<Typography> </Typography>*/}
                </ListItem>
            </List>
            <AddToCartButton
                menuItem={finalMenuItem}
                cart={cart}
                onAdd={onAdd} />
        </Card>
    );
}
