import { Box, CardMedia, CardContent,Typography,Button } from "@mui/material";
import { Product } from "../../../models/Product.model"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ItemDetailProps{
    product: Product;
    handleAddToCart: () => Promise<void>;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ product, handleAddToCart }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
            }} >
            <CardMedia>
                <img src={product.thumbnail} alt={product.thumbnail} />
            </CardMedia>
            <Box>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        ${product.price}
                    </Typography>
                    <Button variant="contained" onClick={handleAddToCart}><AddShoppingCartIcon /> Add to cart </Button>
                </CardContent>
            </Box>
        </Box>
    )
}

export default ItemDetail