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
export default function Menu({ menu }: { menu: Array<MenuItemProps> }) {

    const menuItems = menu.map(item =>
        <Grid item xs={3} key={item.name}>
            <MenuItem
                id={item.id} name={item.name} description={item.description}
                calories={item.calories} price={item.price} />
        </Grid>
    );

    return (
        <Grid container spacing={4}>
            {menuItems}
        </Grid>
    );
}


function MenuItem(menuItem: MenuItemProps) {
    return (
        <Card>
            <Typography variant="h5">
                {menuItem.name}
            </Typography>
            <Typography> {menuItem.description} </Typography>
            <Typography> calories {menuItem.calories} </Typography>
            <Typography> price ${menuItem.price} </Typography>
            <AddToCartButton menuItem={menuItem}/>
        </Card>
    );
}
