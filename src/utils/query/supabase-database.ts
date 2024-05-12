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

export async function getAllProducts() {
  const supabase = supabaseServerClient();
  let { data: products, error } = await supabase
    .from("product")
    .select("*, category(*)");
  return { products, error };
}

export async function getAllOrders() {
  const supabase = supabaseServerClient();
  let { data: orders, error } = await supabase
    .from("order")
    .select(
      "*, product(*), customer(*, users(*)), users(*), order_product(*, product(*)), payment(*)"
    );
  return { orders, error };
}

export async function getAllInvoices() {
  const supabase = supabaseServerClient();
  let { data: invoices, error } = await supabase
    .from("invoice")
    .select(
      "*, order(*, product(*), order_product(*, product(*))), users(*), payment(*),  customer(*, users(*))"
    );
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
  let { data: product, error } = await supabase
    .from("product")
    .select(
      "*, color(*), sizes(*), category(*), sub_category(*)" // Nested selects with aliases
    )
    .eq("id", id)
    .eq("user_id", user.id);

  return { product, error };
}
