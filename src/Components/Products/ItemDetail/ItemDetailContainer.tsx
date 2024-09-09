import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../models/Product.model";
import Loader from "../../Loaders/Loader";
import ItemDetail from "./ItemDetail";
import { useUser } from "../../../context/UserContext";
import { Snackbar, Alert } from "@mui/material";

const ItemDetailContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState(false);
    const [product, setProduct] = useState<Product | null>(null); 
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [buttonIcon, setButtonIcon] = useState<Boolean>(false);
    const { user } = useUser(); 

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                const productData = (await response.json()) as Product;
                setProduct(productData);
            } catch (error: any) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        setButtonIcon(true);

        try {
            if (!user || !user.cart) {
                throw new Error("No cart ID found for user");
            }

            
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(500);
            

            const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/product/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: 1 }),
            });

            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }

            setSnackbarMessage("Product added to cart successfully!");
            setOpenSnackbar(true);

        } catch (error: any) {
            setError(true);
        } finally {
            setButtonIcon(false);
        }
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

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Something went wrong! Please try again.</div>;
    }

    if (!product) {
        return <div>No product found!</div>;
    }

    return (
        <ItemDetail 
            product={product}       
            handleAddToCart={handleAddToCart}
            snackbar={snackbar}
            buttonIcon={buttonIcon}
        />
    );
};

export default ItemDetailContainer;
