import SectionHeading from "@/components/Global/SectionHeading";
import Container from "@/components/Layout/Container";
import CategoriesTabs from "./_components/CategoriesTabs";

export default function Category() {
  return (
    <Container screen={"md"}>
      <div className="grid gap-6">
        <SectionHeading
          title={"Category Management"}
          description={"Manage your product categories and subcategories."}
        />
        <CategoriesTabs />
      </div>
    </Container>
  );
}
