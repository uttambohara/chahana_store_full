import { supabaseServerClient } from "../supabase/server";
import getUser from "./get-user";

// All
export async function getAllProductsByVendorId(vendorId: string) {
  const supabase = supabaseServerClient();
  let { data: allProductsByVendor, error } = await supabase
    .from("product")
    .select("*, category(*)")
    .eq("user_id", vendorId);
  return { allProductsByVendor, error };
}

export async function getAllOrdersByVendorId(vendorId: string) {
  const supabase = supabaseServerClient();
  let { data: allOrdersByVendor, error } = await supabase
    .from("order")
    .select("*")
    .eq("vendor_id", vendorId);
  return { allOrdersByVendor, error };
}

export async function getAllInvoicesByVendorId(vendorId: string) {
  const supabase = supabaseServerClient();
  let { data: allInvoicesByVendor, error } = await supabase
    .from("invoice")
    .select("*")
    .eq("vendor_id", vendorId);
  return { allInvoicesByVendor, error };
}

interface GetAllProductsWithAdvancedFilteringProps {
  sort: string | string[];
  order: string | string[];
  limit: string | number | string[];
  search: string | string[] | undefined;
  start: number;
  end: number;
}

export async function getAllProductsWithAdvancedFiltering({
  sort,
  order,
  limit,
  search,
  start,
  end,
}: GetAllProductsWithAdvancedFilteringProps) {
  const numberConvertedLimit = Number(limit);
  const supabase = supabaseServerClient();
  let query = supabase
    .from("product")
    .select("*, category(*)")
    .order(sort as string, { ascending: order === "asc" })
    .limit(numberConvertedLimit);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  const { data: products, error } = await query.range(start, end);
  return { products, error };
}

interface GetAllOrdersWithAdvancedFilteringProps {
  sort: string | string[];
  order: string | string[];
  limit: string | number | string[];
  search: string | string[] | undefined;
  start: number;
  end: number;
  status: string | string[];
}
export async function getAllOrdersWithAdvancedFiltering({
  sort,
  order,
  limit,
  search,
  start,
  end,
  status,
}: GetAllOrdersWithAdvancedFilteringProps) {
  const numberConvertedLimit = Number(limit);
  const supabase = supabaseServerClient();
  let query = supabase
    .from("order")
    .select(
      "*, product(*), customer(*, users(*)), users(*), order_product(*, product(*)), payment(*)"
    )
    .order(sort as string, { ascending: order === "asc" })
    .limit(numberConvertedLimit);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }
  const { data: orders, error } = await query.range(start, end);
  return { orders, error };
}

interface GetAllInvoicesWithAdvancedFilteringProps {
  sort: string | string[];
  order: string | string[];
  limit: string | number | string[];
  search: string | string[] | undefined;
  start: number;
  end: number;
  status: string | string[];
}

export async function getAllInvoicesWithAdvancedFiltering({
  sort,
  order,
  limit,
  search,
  start,
  end,
  status,
}: GetAllInvoicesWithAdvancedFilteringProps) {
  const numberConvertedLimit = Number(limit);
  const supabase = supabaseServerClient();
  let query = supabase
    .from("invoice")
    .select(
      "*, order(*, product(*), order_product(*, product(*))), users(*), payment(*),  customer(*, users(*))"
    )
    .order(sort as string, { ascending: order === "asc" })
    .limit(numberConvertedLimit);

  if (search) {
    // query = query.ilike("id", `%${search}%`);
  }

  const { data: invoices, error } = await query.range(start, end);

  return { invoices, error };
}

export async function getAllUser() {
  const supabase = supabaseServerClient();
  let { data: users, error } = await supabase.from("users").select("*");
  return { users, error };
}

export async function getAllBillboards() {
  const supabase = supabaseServerClient();
  let { data: billboards, error } = await supabase
    .from("billboard")
    .select("*");
  return { billboards, error };
}

export async function getAllCategories() {
  const supabase = supabaseServerClient();
  let { data: categories, error } = await supabase.from("category").select("*");
  return { categories, error };
}

export async function getAllSizes() {
  const supabase = supabaseServerClient();
  let { data: sizes, error } = await supabase.from("sizes").select("*");
  return { sizes, error };
}

export async function getAllColors() {
  const supabase = supabaseServerClient();
  let { data: colors, error } = await supabase.from("color").select("*");
  return { colors, error };
}

export async function getAllSubCategories() {
  const supabase = supabaseServerClient();
  let { data: subCategories, error } = await supabase
    .from("sub_category")
    .select("*, category(*)");
  return { subCategories, error };
}

export async function getIndividualRowFromProduct(id: number) {
  const supabase = supabaseServerClient();
  const { data: user } = await getUser();
  if (!user) return { error: "No user found!" };

  let query = supabase
    .from("product")
    .select(
      "*, color(*), sizes(*), category(*), sub_category(*)" // Nested selects with aliases
    )
    .eq("id", id);

  if (user.role !== "ADMIN") {
    query = query.eq("user_id", user.id);
  }

  const { data: product, error } = await query;

  console.log(product);
  return { product, error };
}
