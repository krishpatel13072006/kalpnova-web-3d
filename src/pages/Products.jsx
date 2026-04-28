import ProductList from "../sections/ProductList";
import SEO from "../components/SEO";

export default function Products() {
  return (
    <main className="pt-32 pb-60">
      <SEO
        title="Our Products"
        description="Premium digital products and exclusive tools designed by Kalpnova for ambitious brands."
        url="/products"
      />
      <ProductList />
    </main>
  );
}
