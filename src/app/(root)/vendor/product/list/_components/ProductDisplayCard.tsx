import { formatCurrencyToNPR } from "@/lib/format-currency";
import { TProductWithCategorySubColorAndSizes } from "@/types";
import Image from "next/image";

export default function ProductCard({
  rowDataWhichIsProduct,
}: {
  rowDataWhichIsProduct: TProductWithCategorySubColorAndSizes;
}) {
  const img = JSON.parse(rowDataWhichIsProduct.productImgs);
  const firstImg = img[0];
  return (
    <div className="px-1 py-4 space-y-6">
      <div className="h-[16rem] w-full relative shrink-0">
        <Image
          src={firstImg.image}
          alt={firstImg.name}
          fill
          priority
          className="rounded-lg overflow-hidden object-cover w-full aspect-square border border-gray-200 dark:border-gray-800"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-xl font-bold">
          <h2>{rowDataWhichIsProduct.name}</h2> |
          <p>{rowDataWhichIsProduct.sku}</p>
        </div>

        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            Color:
            {rowDataWhichIsProduct.color?.map((color) => (
              <div key={color.id}>{color.name}</div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            Size:
            {rowDataWhichIsProduct.sizes?.map((size) => (
              <div key={size.id}>{size.code}</div>
            ))}
          </div>
        </div>

        <div>Available quantity: {rowDataWhichIsProduct.quantity}</div>

        <div className="text-muted-foreground line-clamp-2">
          {rowDataWhichIsProduct.description}
        </div>

        <div className="text-3xl font-bold">
          NPR {rowDataWhichIsProduct.salesPrice}
        </div>

        {rowDataWhichIsProduct.discount > 0 && (
          <div className="text-muted-foreground text-xl">
            {rowDataWhichIsProduct.discount}% off
          </div>
        )}
      </div>
    </div>
  );
}
