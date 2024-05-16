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
    <div className="px-1 py-4 space-y-6 text-[1.1rem]">
      <div className="h-[16rem] w-full relative shrink-0">
        <Image
          src={firstImg.image}
          alt={firstImg.name}
          fill
          priority
          className="rounded-lg overflow-hidden object-cover w-full aspect-square border border-gray-200 dark:border-gray-800"
        />
      </div>
      <div className="grid gap-2  items-start">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <h1 className="md:text-2xl font-bold">
              {rowDataWhichIsProduct.name}
            </h1>{" "}
            |
            <p className="text-muted-foreground">{rowDataWhichIsProduct.sku}</p>
          </div>

          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div>Colors:</div>
              {rowDataWhichIsProduct.color?.map((color) => {
                return (
                  <div
                    key={color.id}
                    className="h-6 w-6 rounded-full"
                    style={{ background: color.hex }}
                  ></div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div>Sizes:</div>
              {rowDataWhichIsProduct.sizes?.map((size) => {
                return (
                  <div key={size.id} className="border -rotate-4 p-2">
                    {size.code}
                  </div>
                );
              })}
            </div>
          </div>

          <div>Available quantity: {rowDataWhichIsProduct.quantity}</div>

          <p className="text-gray-500 dark:text-gray-400 text-md line-clamp-3">
            {rowDataWhichIsProduct.description}
          </p>
        </div>

        <div className="text-2xl font-bold">
          {formatCurrencyToNPR(rowDataWhichIsProduct.salesPrice)}
        </div>

        <div className="text-muted-foreground text-2xl">
          {rowDataWhichIsProduct.discount}% off
        </div>
      </div>
    </div>
  );
}
