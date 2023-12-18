import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

interface MenuItemProps {
    id: number;
    name: string;
    description: string;
    calories: number;
    price: number;
}

export default function Menu({ menu }: { menu: Array<MenuItemProps> }) {

    const menu_items: void[] = menu.map((item) => {
         menu_items.push(
            <Grid item xs={3} key={item.id}>
                <MenuItem
                    id={item.id} name={item.name} description={item.description}
                    calories={item.calories} price={item.price} />
            </Grid>
        );
    });

    return (
        <Grid container spacing={4}>
          {menu_items as Array<MenuItemProps>}
        </Grid>
    );
}


function MenuItem(
    { name, description, calories, price }: MenuItemProps) {
    return (
        <Card>
            <Typography variant="h5">
                {name}
            </Typography>
            <Typography> {description} </Typography>
            <Typography> calories {calories} </Typography>
            <Typography> price ${price} </Typography>
        </Card>
    );
}
