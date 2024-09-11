import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid, Box, Divider, Button, Typography, CircularProgress } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from "../Loaders/Loader";
import { Cart } from "../../models/CartModel";

const CartContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState(false)
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [buttonIcon, setButtonIcon] = useState<Boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

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
                <Typography variant="h6">Cart is empty.</Typography>
                <Button variant="contained" href="/home">
                    Return to home
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

    const handleDelete = async ( pid: string ) => {
        setButtonIcon(true);

        try {

            const response = await fetch(`http://localhost:8080/api/carts/${cart._id}/product/${pid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete product from cart");
            }

            setSnackbarMessage("Product deleted from the cart successfully!");
            setOpenSnackbar(true);

            const updatedProducts = cart.products.filter(item => item.product._id !== pid);
            setCart({ ...cart, products: updatedProducts });


        } catch (error: any) {
            setError(true);
        } finally {
            setButtonIcon(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const snackbar = (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleCloseSnackbar} severity="success">
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );

    if (error) {
        return <div>Something went wrong! please try again.</div>
    }

    return (
        <Grid paddingTop={6} container  spacing={45}>
            <Grid item xs={8}>
                {cart.products.map((item, index) => (
                    <Box key={item._id} sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                        <img src={item.product.thumbnail} alt={item.product.title} width={100} height={100} />
                        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                            <Typography variant="h6">{item.product.title}</Typography>
                            <Typography variant="body2">Price: ${item.product.price}</Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button size="small" onClick={() => handleDecrement(index)}>-</Button>
                                <Typography alignContent="center" variant="body1">{item.quantity}</Typography>
                                <Button size="small" onClick={() => handleIncrement(index)}>+</Button>
                                <Button 
                                disabled={!!buttonIcon}
                                onClick={() =>handleDelete(item.product._id)}
                                >
                                {buttonIcon ? <CircularProgress color="secondary" size={24}/> :  <DeleteIcon/>}
                                </Button>
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
            {snackbar}
        </Grid>
    );
};

export default CartContainer;
