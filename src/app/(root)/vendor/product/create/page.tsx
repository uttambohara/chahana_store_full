import Container from "@/components/Layout/Container";
import Product from "../_components/Product";

export default function ProductPage() {
  return (
    <Container screen={"lg"}>
      <div className="grid gap-6 py-12">
        <Product />
      </div>
    </Container>
  );
}
