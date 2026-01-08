"use client"
import { Marquee } from './ui/marquee'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from './ui/spinner';


async function getFeaturedProducts() {
    const res = await axios.get('/api/products/featured');
    return res.data
}
const ProductCard = ({ name, price, image }: any) => (
    <div className="group relative flex flex-col w-full  overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="aspect-h-4 aspect-w-3 h-32 w-full bg-gray-100">
            <img
                src={image}
                alt={name}
                className="h-full w-full mx-auto  object-cover object-center"
            />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-700">Rs. {price}</p>
        </div>
    </div>
)

export default function FeaturedProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("/api/products/featured")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div><Spinner /></div>
    }
    return (
        <div className="mx-auto max-w-2xl px-2 py-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight dark:text-white text-gray-950">Featured Products</h2>
            <Marquee reverse className="mt-4 space-x-1" pauseOnHover>
                {products.map((product) => (
                    <ProductCard key={product._id}
                        name={product.name}
                        price={product.price}
                        // Access the first image from the array here
                        image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} />
                ))}
            </Marquee>
        </div>
    )
}