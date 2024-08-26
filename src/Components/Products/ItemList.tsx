import { Product } from "../../models/Product.model"
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ItemListProps {
    products: Product[];
}
const ItemList: React.FC<ItemListProps> = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <div key={product._id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.thumbnail}
                            alt="Placeholder image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Link to={`/item/${product._id}`} ><Button variant="outlined">Ver mas</Button></Link>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default ItemList