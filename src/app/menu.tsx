
import type { Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { AddToCartButton } from './add_to_cart';
import { MenuItemProps } from './MenuTypes';


/**
 * A Component which displays a menu of items.
 *
 * @param menu - An Array of MenuItemProps
 * @returns A JSX.Element
 */
export default function Menu({ menu, cart, onAdd }: {
    menu: Array<MenuItemProps>,
    cart: { string?: number },
    onAdd: Dispatch<SetStateAction<{}>>
}) {

    const menuItems = menu.map(item =>
        <Grid item xs={3} key={item.name}>
            <MenuItem
                cart={cart}
                onAdd={onAdd}
                menuItem={item} />
        </Grid>
    );

    return (
        <Grid container spacing={4}>
            {menuItems}
        </Grid>
    );
}


function MenuItem({ menuItem, cart, onAdd }: {
    menuItem: MenuItemProps,
    cart: { string?: number }
    onAdd: Dispatch<SetStateAction<{}>>
}) {
    return (
        <Card>
            <Typography variant="h5">
                {menuItem.name}
            </Typography>
            <Typography> {menuItem.description} </Typography>
            <Typography> calories {menuItem.calories} </Typography>
            <Typography> price ${menuItem.price} </Typography>
            <AddToCartButton menuItem={menuItem} cart={cart} onAdd={onAdd} />
        </Card>
    );
}
