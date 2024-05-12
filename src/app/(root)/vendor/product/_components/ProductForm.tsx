"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { coerce, z } from "zod";

import {
  deleteEverythingFromProductColorRelationIfProductIdMatches,
  deleteEverythingFromProductSizeRelationIfProductIdMatches,
  insertInProductColorRelation,
  insertInProductSizeRelation,
  upsertProduct,
} from "@/actions/supabase/supabaseDatabase";
import FileUploadImage from "@/components/FileUpload/FileUploadImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProduct } from "@/providers/create-product-provider";
import { useUploadImage } from "@/providers/upload-image-provider";
import { TProductWithCategorySubCategoryWithColorWithSizes } from "@/types";
import { Tables } from "@/types/supabase";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useInitProductData from "../_hooks/useInitProductData";
import { validateProductData } from "../_utils";
import ProductCardPreview from "./ProductCardPreview";
import ProductDisplayCard from "./ProductDisplayCard";
import ProductFormCategorySubCategoryComponent from "./ProductFormCategorySubCategoryComponent";
import ProductFormColorComponent from "./ProductFormColorComponent";
import ProductFormSizesComponent from "./ProductFormSizesComponent";
import ProductImageUploadImgList from "./ProductImageUploadImgList";

interface ProductFormProps {
  productBasedOnParamId?: TProductWithCategorySubCategoryWithColorWithSizes;
  user_id: string;
  categories: Tables<"category">[] | null;
  subCategories: Tables<"sub_category">[] | null;
  sizes: Tables<"sizes">[] | null;
  colors: Tables<"color">[] | null;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  sku: z.string().min(2, {
    message: "SKU must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  salesPrice: coerce.number().positive({
    message: "Price must be greater than 0",
  }),
  discount: coerce.number().positive({
    message: "Discount must be greater than 0",
  }),
  quantity: coerce
    .number()
    .positive({
      message: "Quantity must be greater than 0",
    })
    .refine((value) => String(value).length <= 2, {
      message: "Quantity must be a 1 or 2 digit number",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

export function ProductForm({
  productBasedOnParamId,
  user_id, // always required
  categories,
  subCategories,
  sizes,
  colors,
}: ProductFormProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const { state: CreateProductState, dispatch: CreateProductDispatch } =
    useCreateProduct();
  const { state: ImageState, dispatch: ImageDispatch } = useUploadImage();

  //...
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      description: "",
      salesPrice: 0,
      discount: 0,
      sku: "",
    },
  });

  const { watch } = form;
  const allValues = watch();

  const paramProductAlreadyExistCaseOfUpdate =
    productBasedOnParamId && productBasedOnParamId[0]?.id;

  // ...
  // Load initial data
  useInitProductData({
    productBasedOnParamId,
    form,
    CreateProductDispatch,
    ImageDispatch,
  });

  // Handle form submit
  async function onSubmit(values: FormSchema) {
    const { category, sub_category, colors, sizes } = CreateProductState;
    const { productImgs } = ImageState;

    // Data prep
    let finalData = {
      id: productBasedOnParamId?.[0]?.id,
      user_id,
      ...values,
      category_id: category?.id as number,
      sub_category_id: sub_category?.id as number,
      productImgs: JSON.stringify(productImgs),
      created_at: new Date().toISOString(),
      // colors (product_color/ needs manual mutation)
      // sizes (product_sizes)
    };

    // Validation
    const checkData = {
      ...values,
      category_id: category?.id as number,
      sub_category_id: sub_category?.id as number,
      productImgs,
      colors,
      sizes,
    };

    const errors = validateProductData(checkData);
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
      return;
    }

    // Mutation
    try {
      setIsCreating(true);

      // Upsert product (...basic/ excluding colors and sizes)
      const response = await upsertProduct(finalData as any); //
      const { data: updatedProductData, error } = JSON.parse(response);
      if (error) throw new Error(JSON.stringify(error));
      const productIdFromPOSTresponse = updatedProductData[0].id;

      // 1)
      if (!paramProductAlreadyExistCaseOfUpdate) {
        // product_color
        // product_size
        const mapAllColorsFromFormForInsertionInProductColor = colors.map(
          (color) =>
            insertInProductColorRelation(productIdFromPOSTresponse, color.id)
        );
        const mapAllSizesFromFormForInsertionInProductSize = sizes.map((size) =>
          insertInProductSizeRelation(productIdFromPOSTresponse, size.id)
        );
        const allSizesAndColors = [
          ...mapAllColorsFromFormForInsertionInProductColor,
          ...mapAllSizesFromFormForInsertionInProductSize,
        ];
        await Promise.all(allSizesAndColors);
      }

      // 2)
      if (paramProductAlreadyExistCaseOfUpdate) {
        // Delete everything from the previous entry / clear
        await Promise.all([
          deleteEverythingFromProductSizeRelationIfProductIdMatches(
            productBasedOnParamId[0].id
          ),
          deleteEverythingFromProductColorRelationIfProductIdMatches(
            productBasedOnParamId[0].id
          ),
        ]);

        // Insert everything anew from the preserved client side state
        const mapAllColorsFromFormForInsertionInProductColor = colors.map(
          (color) =>
            insertInProductColorRelation(productBasedOnParamId[0].id, color.id)
        );
        const mapAllSizesFromFormForInsertionInProductSize = sizes.map((size) =>
          insertInProductSizeRelation(productBasedOnParamId[0].id, size.id)
        );
        const allSizesAndColors = [
          ...mapAllColorsFromFormForInsertionInProductColor,
          ...mapAllSizesFromFormForInsertionInProductSize,
        ];
        await Promise.all(allSizesAndColors);
      }

      // Reset

      if (!paramProductAlreadyExistCaseOfUpdate) {
        form.reset();
        CreateProductDispatch({
          type: "RESET",
        });
        ImageDispatch({
          type: "RESET",
        });
      }

      //
      toast.success(
        `Product data ${
          paramProductAlreadyExistCaseOfUpdate ? "updated" : "created"
        }`
      );
      router.refresh();
    } catch (err) {
      setIsCreating(false);
      console.log(err);
      toast.error(JSON.stringify(err));
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="grid md:grid-cols-[60%_1fr] gap-6">
      <Card>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="flex items-center gap-2 text-3xl">
              Create product
              <ProductCardPreview />
            </CardTitle>
            <CardDescription>Create product of your choice.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-[100%]">
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem className="w-[100%]">
                      <FormLabel>SKU*</FormLabel>
                      <FormControl>
                        <Input placeholder="S_K_U" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Quantity"
                        {...field}
                        type="number"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                        className="min-h-[140px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="salesPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Price*</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Discount*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10%"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*  */}
              <div className="space-y-2">
                <ProductFormCategorySubCategoryComponent
                  categories={categories}
                  subCategories={subCategories}
                />
              </div>

              {/* */}
              <div className="flex flex-col gap-6 md:flex-row lg:gap-12">
                <div className="w-[100%]">
                  <div className="text-sm">Select colors*</div>
                  <ProductFormColorComponent colors={colors} />
                </div>

                <div className="w-[100%]">
                  <div className="text-sm">Select sizes*</div>
                  <ProductFormSizesComponent sizes={sizes} />
                </div>
              </div>

              {/*  */}
              <div className="grid grid-cols-[65%_1fr]">
                <FileUploadImage
                  fileNumber={4}
                  bucketName={"vendor"}
                  folderName={"product_upload"}
                  dispatch={ImageDispatch}
                />
                <ProductImageUploadImgList
                  bucketName={"vendor"}
                  folderName={"product_upload"}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating && <Loader className="animate-spin" />}
                {paramProductAlreadyExistCaseOfUpdate
                  ? "Update"
                  : "Create"}{" "}
                product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <ProductDisplayCard allValues={allValues} />
    </div>
  );
}
