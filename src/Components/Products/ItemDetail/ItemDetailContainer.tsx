import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../models/Product.model";
import Loader from "../../Loaders/Loader";
import ItemDetail from "./ItemDetail";
import { useUser } from "../../../context/UserContext"

const ItemDetailContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState(false);
    const [product, setProduct] = useState<Product | null>(null); 
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser(); 

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
        setIsLoading(true);

        try {
            if (!user || !user.cart) {
                throw new Error("No cart ID found for user");
            }

            const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/product/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ quantity: 1 })
            });

            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }

            const productData = await response.json();
            setProduct(productData);
        } catch (error: any) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

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
            product={product}       handleAddToCart={handleAddToCart}
        />
    );
};

export default ItemDetailContainer;
