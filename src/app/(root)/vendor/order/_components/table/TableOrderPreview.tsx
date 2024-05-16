import { completeOrderBasedOnOrderId } from "@/actions/supabase/supabaseDatabase";
import CustomModal from "@/components/Global/CustomModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import { useModal } from "@/providers/modal-provider";
import { OrderWithCustomer } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

import { Eye } from "lucide-react";
import {
  calculateRevenueTotal,
  calculateSummary,
} from "../../../_utils/revenue-calculation";
import TablePaymentStatus from "./TablePaymentStatus";
import TableStatusCell from "./TableStatusCell";

interface TableOrderPreviewProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}

export default function TableOrderPreview({
  rowDataWhichIsOrder,
}: TableOrderPreviewProps) {
  const { setOpen } = useModal();
  const [isPending, startTransition] = useTransition();

  //
  const revenueTotal = calculateRevenueTotal(rowDataWhichIsOrder.order_product);
  const {
    shippingCharge: SHIPPING_CHARGE,
    GLOBAL_DISCOUNT,
    tax,
    totalAmount,
  } = calculateSummary(revenueTotal);

  const paymentMethods = rowDataWhichIsOrder.payment?.filter(
    (payment) => payment.order_id === rowDataWhichIsOrder.id
  );
  if (!paymentMethods) return null;
  const totalPaid = paymentMethods?.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  function handleCompleteOrder(orderId: number) {
    startTransition(async () => {
      const response = await completeOrderBasedOnOrderId(orderId);
      const { _, error } = JSON.parse(response);
      if (error) {
        toast.error(JSON.stringify(error));
      }
    });
  }

  return (
    <Button
      variant={"ghost"}
      onClick={() =>
        setOpen(
          <CustomModal
            title={""}
            className="min-w-[60%] h-[90%] overflow-auto p-0"
          >
            <div className="flex flex-col">
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="flex items-center gap-6">
                  <div>
                    <h1 className="font-semibold md:text-2xl">
                      Order #{rowDataWhichIsOrder.id}
                    </h1>
                    <div className="text-muted-foreground text-sm">
                      {format(rowDataWhichIsOrder.order_date, "dd MMMM, yyyy")}
                    </div>
                  </div>
                  <TableStatusCell rowDataWhichIsOrder={rowDataWhichIsOrder} />
                </div>

                <div className="grid md:grid-cols-6 gap-6">
                  <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                    <Card className="border-none">
                      <CardHeader>
                        <CardTitle>Line items</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="max-w-[150px]">
                                Name
                              </TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Per unit</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rowDataWhichIsOrder.order_product?.map(
                              (order_product_item) => {
                                // Image
                                const imageArr = JSON.parse(
                                  order_product_item.product?.productImgs!
                                );
                                const imageUrl = imageArr[0].image;

                                const totalAmountAfterDiscount =
                                  Number(order_product_item.quantity) *
                                    Number(
                                      order_product_item.product?.salesPrice
                                    ) -
                                  Number(order_product_item.quantity) *
                                    Number(
                                      order_product_item.product?.salesPrice
                                    ) *
                                    (Number(
                                      order_product_item.product?.discount
                                    ) /
                                      100);
                                return (
                                  <TableRow key={order_product_item.product_id}>
                                    <TableCell className="flex items-center gap-2 p-1 py-2">
                                      <div className="relative h-10 w-10">
                                        <Image
                                          src={imageUrl}
                                          alt={
                                            order_product_item.product
                                              ?.name as string
                                          }
                                          fill
                                          priority
                                          className="rounded-full object-cover"
                                        />
                                      </div>
                                      <p> {order_product_item.product?.name}</p>
                                    </TableCell>
                                    <TableCell>
                                      {order_product_item?.quantity}
                                    </TableCell>
                                    <TableCell>
                                      {Number(
                                        order_product_item.product?.salesPrice
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {formatCurrencyToNPR(
                                        totalAmountAfterDiscount
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card className="text-sm border-none">
                      <CardHeader>
                        <CardTitle>Bill</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4 text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <div>Subtotal</div>
                          <div> {formatCurrencyToNPR(revenueTotal)}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Shipping</div>
                          <div>{SHIPPING_CHARGE}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Discount</div>
                          <div>-{GLOBAL_DISCOUNT}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>Taxes (10%)</div>
                          <div>{tax}</div>
                        </div>
                        <Separator />
                        <div className="flex items-center font-medium">
                          <div>Total</div>
                          <div className="ml-auto">
                            {formatCurrencyToNPR(Number(totalAmount))}
                          </div>
                        </div>
                        <div className="flex items-center font-medium">
                          <div>Paid</div>
                          <div className="ml-auto">
                            {formatCurrencyToNPR(Number(totalPaid))}
                          </div>
                        </div>
                        <div className="flex items-center font-medium">
                          <div>Total remaining</div>
                          <div className="ml-auto">
                            {" "}
                            {formatCurrencyToNPR(
                              Number(totalAmount) - Number(totalPaid)
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center gap-2">
                        {Number(totalAmount) <= Number(totalPaid) && (
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCompleteOrder(rowDataWhichIsOrder.id)
                            }
                          >
                            Collect payment
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                  <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
                    <Card className="border-none">
                      <div>
                        <CardHeader className="flex flex-row items-center space-y-0">
                          <CardTitle>Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="grid gap-1">
                            <div>
                              {rowDataWhichIsOrder.customer?.users?.first_name}{" "}
                              {rowDataWhichIsOrder.customer?.users?.last_name}
                            </div>
                            <div className="grid gap-1">
                              <p className="text-muted-foreground">
                                {rowDataWhichIsOrder.customer?.users?.email}
                              </p>
                              <div className="text-gray-500 dark:text-gray-400">
                                {rowDataWhichIsOrder.customer?.users?.phone}
                              </div>
                              <div className="text-muted-foreground">
                                {rowDataWhichIsOrder.shipping_address
                                  ? rowDataWhichIsOrder.shipping_address
                                  : rowDataWhichIsOrder.customer?.users
                                      ?.address}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                      <Separator />
                      <CardHeader>
                        <CardTitle>Payment history</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <TablePaymentStatus
                          rowDataWhichIsOrder={rowDataWhichIsOrder}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </main>
            </div>
          </CustomModal>
        )
      }
    >
      <Eye />
    </Button>
  );
}
