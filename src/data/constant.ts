import { UserRole } from "@/types/formTypes";

export const userRole: UserRole[] = ["CUSTOMER", "VENDOR"];
export const ORDER_STATUS = [
  "ALL",
  "PENDING",
  "REFUNDED",
  "CANCELED",
  "COMPLETED",
] as const;

export const SHIPPING_CHARGE = 100;
export const TAXES = 10;
export const GLOBAL_DISCOUNT = 0;
