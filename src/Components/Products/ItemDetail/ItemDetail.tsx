import { Box, CardMedia, CardContent } from "@mui/material";
import { Product } from "../../../models/Product.model"

interface productProp{
    product: Product;
}

const ItemDetail: React.FC<productProp> = ({ product }) => {
    return (
        <Box display={"flex"} >
            <CardMedia>
                <img src={product.thumbnail} alt={product.thumbnail} />
            </CardMedia>
            <CardContent>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
            </CardContent>
        </Box>
    )
}

export default ItemDetail