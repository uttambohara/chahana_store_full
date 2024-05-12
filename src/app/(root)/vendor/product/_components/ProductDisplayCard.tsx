import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import { useCreateProduct } from "@/providers/create-product-provider";
import { useUploadImage } from "@/providers/upload-image-provider";
import Image from "next/image";

interface ProductDisplayCard {
  allValues: {
    name: string;
    sku: string;
    description: string;
    salesPrice: number;
    discount: number;
    quantity: number;
  };
}

export default function ProductDisplayCard({ allValues }: ProductDisplayCard) {
  const { state: productState } = useCreateProduct();
  const { state: imageState } = useUploadImage();

  // Conditional variables
  const image = productState.showCardDetails ? (
    <Image
      src={imageState.productImgs?.[0]?.image as string}
      alt={imageState.productImgs?.[0]?.name as string}
      fill
      priority
      className="object-cover"
    />
  ) : (
    <img
      alt="Product Image"
      className="object-cover h-full w-full"
      src="/placeholder.svg"
    />
  );
  const title = productState.showCardDetails ? allValues.name : "Title";
  const SKU = productState.showCardDetails ? allValues.sku : "SKU";
  const availableQuantity = productState.showCardDetails
    ? allValues.quantity
    : "0";
  const description = productState.showCardDetails
    ? allValues.description
    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum facere";
  const choosenColor =
    productState.showCardDetails &&
    productState.colors.map((color) => color.name).join(", ");
  const choosenSize =
    productState.showCardDetails &&
    productState.sizes.map((size) => size.code).join(", ");
  const currency = productState.showCardDetails
    ? formatCurrencyToNPR(allValues.salesPrice)
    : "Rs.0";
  const discount = productState.showCardDetails ? `${allValues.discount}` : "0";

  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden h-[30rem]">
      <div className="h-[15rem] overflow-hidden relative">{image}</div>
      <CardContent className="p-4 grid gap-2">
        <CardTitle className="text-lg font-semibold">
          {title} | {SKU}
        </CardTitle>

        <div className="flex justify-between">
          <p className="text-gray-500 dark:text-gray-400">
            Color: {choosenColor}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Size: {choosenSize}
          </p>
        </div>

        <div>Available quantity: {availableQuantity}</div>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {description}
        </CardDescription>

        <div className="text-2xl font-bold">{currency}</div>
        <div className="text-gray-500 dark:text-gray-400 text-xl">
          {discount}% off
        </div>
      </CardContent>
    </Card>
  );
}
