import FeaturedProduct from "@/components/porduct/featuredProduct";
import AllProducts from "@/components/porduct/allProducts";
import Product from "@/models/productModel";
import { connectDB } from "@/dbconfig/dbconfig";
export default async function Home() {
  // 1. Establish your database connection
  await connectDB();

  // 2. Fetch data directly from MongoDB (lean() converts Mongoose docs to plain JS objects)
  const featuredData = await Product.find({ isFeatured: true }).lean();
  const allData = await Product.find({}).lean();

  // 3. Deep-serialize MongoDB objects (like ObjectIds) so they safely pass to Client Components
  const products = JSON.parse(JSON.stringify(featuredData));
  const allProducts = JSON.parse(JSON.stringify(allData));


  return (
    <>
      <main className="bg-gray-300">
        <FeaturedProduct products={products} />
        <AllProducts products={allProducts} />

      </main>
    </>
  );
}
