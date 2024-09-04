import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid, Box, Divider, Button, Typography } from "@mui/material";
import Loader from "../Loaders/Loader";

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    code: string;
    status: string;
    stock: number;
    category: string;
    owner: string;
}

interface CartProduct {
    product: Product;
    quantity: number;
    _id: string;
}

interface Cart {
    _id: string;
    products: CartProduct[];
}

const CartContainer = () => {
    const { id } = useParams<{ id: string }>();
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:8080/api/carts/${id}`);
                const cartData = (await response.json()) as Cart;
                setCart(cartData);
            } catch (error) {
                console.error("Error fetching cart:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!cart || cart.products.length === 0) {
        return (
            <Box textAlign="center">
                <Typography variant="h6">El carrito está vacío.</Typography>
                <Button variant="contained" href="/home">
                    Volver a la tienda
                </Button>
            </Box>
        );
    }

    const totalAmount = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleIncrement = (index: number) => {
        const updatedProducts = [...cart.products];
        updatedProducts[index].quantity += 1;
        setCart({ ...cart, products: updatedProducts });
    };

    const handleDecrement = (index: number) => {
        const updatedProducts = [...cart.products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            setCart({ ...cart, products: updatedProducts });
        }
    };

    return (
        <Grid container  spacing={45}>
            <Grid item xs={8}>
                {cart.products.map((item, index) => (
                    <Box key={item._id} sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                        <img src={item.product.thumbnail} alt={item.product.title} width={100} height={100} />
                        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                            <Typography variant="h6">{item.product.title}</Typography>
                            <Typography variant="body2">Price: ${item.product.price}</Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button onClick={() => handleDecrement(index)}>-</Button>
                                <Typography alignContent="center" variant="body1">{item.quantity}</Typography>
                                <Button onClick={() => handleIncrement(index)}>+</Button>
                            </Box>
                        </Box>
                        <Divider />
                    </Box>
                ))}
            </Grid>
            <Grid item xs={4}>
                <Box
                    sx={{
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
                        borderRadius: "8px", 
                        padding: "1.5rem", 
                    }}
                >
                    <Typography variant="h5">Purchase summary</Typography>
                    <Divider />
                    <Typography variant="h6">Total: ${totalAmount}</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Buy
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CartContainer;
