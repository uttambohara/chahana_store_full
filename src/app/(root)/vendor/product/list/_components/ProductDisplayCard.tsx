import { formatCurrencyToNPR } from "@/lib/format-currency";
import { Tables } from "@/types/supabase";
import Image from "next/image";

interface ProductDisplayCardProps {
  rowDataWhichIsProduct: Tables<"product">;
}

export default function ProductCard({
  rowDataWhichIsProduct,
}: ProductDisplayCardProps) {
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
      <div className="grid gap-4  items-start">
        <div className="grid gap-2">
          <h1 className="text-2xl md:text-4xl font-bold">
            {rowDataWhichIsProduct.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-md line-clamp-3">
            {rowDataWhichIsProduct.description}
          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">
              {formatCurrencyToNPR(rowDataWhichIsProduct.salesPrice)}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">SKU:</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {rowDataWhichIsProduct.sku}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">In Stock:</span>
              <span className="text-gray-500 dark:text-gray-400">
                {rowDataWhichIsProduct.quantity}
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">{/* Color */}</div>
          <div className="grid gap-2">{/* Size */}</div>
          <div className="grid gap-2">{/* Quantity */}</div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            {/* Buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}
