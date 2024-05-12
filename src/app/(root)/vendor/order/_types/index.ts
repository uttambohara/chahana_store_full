import { ORDER_STATUS } from "@/data/constant";

export type OrderStatusType = (typeof ORDER_STATUS)[number];
export type OrderStatusWithoutAll = Exclude<OrderStatusType, "ALL">;
