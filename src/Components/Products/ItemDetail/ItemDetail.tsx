import { Box, CardMedia, CardContent,Typography } from "@mui/material";
import { Product } from "../../../models/Product.model"

interface productProp {
    product: Product;
}

const ItemDetail: React.FC<productProp> = ({ product }) => {
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
                </CardContent>
            </Box>
        </Box>
    )
}

export default ItemDetail