"use server";

import { OrderStatusWithoutAll } from "@/app/(root)/vendor/order/_types";
import { TProductSupabaseUpsert } from "@/types";
import { Database } from "@/types/supabase";
import { supabaseServerClient } from "@/utils/supabase/server";

// Create
export async function createCategory(categoryObj: {
  name: string;
  image_url: string;
}) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("category")
    .upsert({ ...categoryObj })
    .select();

  return JSON.stringify(response);
}

export async function createSubCategory(categoryObj: {
  name: string;
  image_url: string;
  category_id: number;
}) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("sub_category")
    .upsert({ ...categoryObj })
    .select();

  return JSON.stringify(response);
}

export async function createSize(categoryObj: { name: string; code: string }) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("sizes")
    .upsert({ ...categoryObj })
    .select();

  return JSON.stringify(response);
}

export async function createColor(categoryObj: { name: string; hex: string }) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("color")
    .upsert({ ...categoryObj })
    .select();

  return JSON.stringify(response);
}

// Update
export async function uploadBillboardImages(
  images: { name: string; image: string }[]
) {
  const supabase = supabaseServerClient();
  const supabaseImagesPromise = images.map((image) =>
    supabase
      .from("billboard")
      .insert([{ name: image.name, image_url: image.image }])
      .select()
  );
  const response = await Promise.all(supabaseImagesPromise);
  return response;
}

export async function completeOrderBasedOnOrderId(orderId: number) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("order")
    .update({ status: "COMPLETED" })
    .eq("id", orderId)
    .select();
  return JSON.stringify(response);
}

export async function updateOrderStatusByOrderId(
  orderId: number,
  status: OrderStatusWithoutAll
) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("order")
    .update({ status })
    .eq("id", orderId)
    .select();
  return JSON.stringify(response);
}

export async function updateUserRole(newRole: string, userId: string) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("users")
    .update({ role: newRole })
    .match({ id: userId });

  return JSON.stringify(response);
}

// Delete
export async function deleteTableBy(
  table: keyof Database["public"]["Tables"],
  column: string,
  value: string | number
) {
  const supabase = supabaseServerClient();
  const response = await supabase.from(table).delete().eq(column, value);
  return JSON.stringify(response);
}

export async function deleteImgFromBucket(
  bucketName: string,
  imgName: string,
  folder: string
) {
  const supabase = supabaseServerClient();
  const response = await supabase.storage
    .from(bucketName)
    .remove([`${folder}/${imgName}`]);
  return response;
}

export async function deleteEverythingFromProductColorRelationIfProductIdMatches(
  product_id: number
) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("product_color")
    .delete()
    .match({ product_id });
  return JSON.stringify(response);
}

export async function deleteEverythingFromProductSizeRelationIfProductIdMatches(
  product_id: number
) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("product_size")
    .delete()
    .match({ product_id });
  return JSON.stringify(response);
}

// insert
export async function insertInProductColorRelation(
  product_id: number,
  color_id: number
) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("product_color")
    .insert({ product_id, color_id });
  return JSON.stringify(response);
}

export async function insertInProductSizeRelation(
  product_id: number,
  size_id: number
) {
  const supabase = supabaseServerClient();
  const response = await supabase
    .from("product_size")
    .insert({ product_id, size_id });
  return JSON.stringify(response);
}

// upsert
export async function upsertProduct(data: TProductSupabaseUpsert) {
  const supabase = supabaseServerClient();
  const response = await supabase.from("product").upsert(data).select();
  return JSON.stringify(response);
}

// Get indv
export async function getOnlyProductImgsFromProductTableUsingProductId(
  productId: number
) {
  const supabase = supabaseServerClient();
  const { data: ProductImgs, error } = await supabase
    .from("product")
    .select("productImgs") // Select only the 'productImgs' column
    .eq("id", productId) // Filter by the 'id' column matching productId
    .single();
  return { ProductImgs, error };
}

// Advanced filtering GET
interface GetProductsWithAdvancedFilteringProps {
  sort: string | string[];
  order: string | string[];
  userId: string;
  limit: string | number | string[];
  search: string | string[] | undefined;
  start: number;
  end: number;
}

export async function getProductsWithAdvancedFiltering({
  sort,
  order,
  userId,
  limit,
  search,
  start,
  end,
}: GetProductsWithAdvancedFilteringProps) {
  const numberConvertedLimit = Number(limit);
  const supabase = supabaseServerClient();
  let query = supabase
    .from("product")
    .select(
      "*, color(*), sizes(*), category(*), sub_category(*)" // Nested selects with aliases
    )
    .order(sort as string, { ascending: order === "asc" })
    .eq("user_id", userId)
    .limit(numberConvertedLimit);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  const { data: products, error } = await query.range(start, end);
  return { products, error };
}

interface GetOrdersWithAdvancedFilteringProps {
  sort: string | string[];
  order: string | string[];
  userId: string;
  limit: string | number | string[];
  start: number;
  end: number;
  status: string | string[];
}

export async function getOrdersWithAdvancedFiltering({
  sort,
  order,
  userId,
  limit,
  start,
  end,
  status,
}: GetOrdersWithAdvancedFilteringProps) {
  const numberConvertedLimit = Number(limit);
  const supabase = supabaseServerClient();
  let query = supabase
    .from("order")
    .select(
      "*, product(*), customer(*, users(*)), users(*), order_product(*, product(*)), payment(*)"
    )
    .order(sort as string, { ascending: order === "asc" })
    .eq("vendor_id", userId)
    .limit(numberConvertedLimit);

  const { data: orders, error } = await query.range(start, end);

  return { orders, error };
}

interface GetInvoicesWithAdvancedFilteringProps {
  sort: string | string[];
  order: string | string[];
  userId: string;
  limit: string | number | string[];
  start: number;
  end: number;
  status: string | string[];
}

export async function getInvoicesWithAdvancedFiltering({
  sort,
  order,
  userId,
  limit,
  start,
  end,
  status,
}: GetInvoicesWithAdvancedFilteringProps) {
  const numberConvertedLimit = Number(limit);
  const supabase = supabaseServerClient();
  let query = supabase
    .from("invoice")
    .select(
      "*, order(*, product(*), order_product(*, product(*))), users(*), payment(*),  customer(*, users(*))"
    )
    .order(sort as string, { ascending: order === "asc" })
    .eq("vendor_id", userId)
    .limit(numberConvertedLimit);

  const { data: invoices, error } = await query.range(start, end);

  return { invoices, error };
}
