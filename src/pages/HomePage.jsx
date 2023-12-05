import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductAllCard from "../components/ProductAllCard";

function HomePage() {
    const { getAProducts, products } = useProducts();

    useEffect(() => {
        getAProducts()
    }, []);

    if (products.length === 0) return (<h1>No products</h1>);

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2" >
            {products.map(product => (
                <ProductAllCard product={product} key={product._id} />
            ))}
        </div>

    );
}

export default HomePage;