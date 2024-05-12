import Container from "@/components/Layout/Container";
import Billboard from "./_components/Billboard";

export default function BillboardPage() {
  return (
    <Container screen={"lg"}>
      <div className="grid gap-6">
        <Billboard />
      </div>
    </Container>
  );
}
