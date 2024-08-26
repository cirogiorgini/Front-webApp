import { useEffect, useState } from "react"
import { Product } from "../../../models/Product.model";
import Loader from "../../Loaders/Loader";
import ItemList from "./ItemList";



const ItemListContainer: React.FC = () => {
    const [error, setError] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchProducts = async () => {
            setIsLoading(true)

            try {
                const response = await fetch('http://localhost:8080/api/products')
                const products = (await response.json()) as Product[];
                setProducts(products)
            } catch (error: any) {
                setError(error)
            } finally {
                setIsLoading(false)
            }

        };

        fetchProducts();
    }, [])

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Algo ha salido mal, vuelvelo a intentar</div>
    }

    return (
        <ItemList products={products} />
    )
}

export default ItemListContainer