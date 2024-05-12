import SectionHeading from "@/components/Global/SectionHeading";
import Container from "@/components/Layout/Container";
import { getAllColors, getAllSizes } from "@/utils/query/supabase-database";
import ColorCard from "./_components/ColorCard";
import ColorCardForm from "./_components/ColorCardForm";
import SizeCard from "./_components/SizeCard";
import SizeCardForm from "./_components/SizeCardForm";

export default async function Settings() {
  const colors = getAllColors();
  const sizes = getAllSizes();

  const [colorResponse, sizeResponse] = await Promise.all([colors, sizes]);

  const colorsData = colorResponse.colors;
  const sizesData = sizeResponse.sizes;

  return (
    <Container screen={"lg"}>
      <div className="grid gap-6">
        <SectionHeading
          title={"Settings"}
          description={"Manage your size and color settings."}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <SizeCardForm />
            <div className="flex flex-wrap gap-4 p-6">
              {sizesData?.map((size, i) => (
                <SizeCard size={size} key={i} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <ColorCardForm />
            <div className="flex flex-wrap gap-4 p-6">
              {colorsData?.map((color, i) => (
                <ColorCard color={color} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
