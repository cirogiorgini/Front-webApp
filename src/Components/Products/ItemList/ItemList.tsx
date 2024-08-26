import { Product } from "../../../models/Product.model"
import { Card, CardContent, Typography, CardMedia, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface ItemListProps {
    products: Product[];
}
const ItemList: React.FC<ItemListProps> = ({ products }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent:'center', gap: 2, flexWrap: 'wrap', paddingTop: '3.5rem' }}>
            {products.map((product) => (
                <Card key={product._id} sx={{ width: 345 }}>
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
                        <Link to={`/item/${product._id}`}>
                            <Button variant="outlined">Ver más</Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default ItemList