import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../models/Product.model";
import Loader from "../../Loaders/Loader";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState(false);
    const [product, setProduct] = useState<Product | null>(null); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                const productData = (await response.json()) as Product;
                setProduct(productData);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
        <ItemDetail product={product}/>
    );
};

export default ItemDetailContainer;
