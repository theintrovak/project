
import FeaturedProduct from "@/components/porduct/featuredProduct";
import AllProducts from "@/components/porduct/allProducts";
import axios from 'axios';

export default async function Home() {
  const products = await axios.get(`${process.env.NEXTAUTH_URL}/api/product/featured`)
  const allProducts = await axios.get(`${process.env.NEXTAUTH_URL}/api/product`)


  return (
    <>
      <main>
        <FeaturedProduct products={products.data} />
        <AllProducts products={allProducts.data} />

      </main>
    </>
  );
}
