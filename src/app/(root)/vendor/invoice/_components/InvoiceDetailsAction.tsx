import CustomModal from "@/components/Global/CustomModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GLOBAL_DISCOUNT, SHIPPING_CHARGE } from "@/data/constant";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import { useModal } from "@/providers/modal-provider";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Image from "next/image";
import {
  calculateRevenueTotal,
  calculateSummary,
} from "../../_utils/revenue-calculation";
import TablePaymentStatus from "../../order/_components/table/TablePaymentStatus";
import firstLetterCapital from "@/lib/first-letter-capital";

interface InvoiceDetailsActionProps {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function InvoiceDetailsAction({
  rowDataWhichIsInvoice,
}: InvoiceDetailsActionProps) {
  const { setOpen } = useModal();
  const order_product = rowDataWhichIsInvoice.order?.order_product;
  const revenueTotal = calculateRevenueTotal(order_product!);
  const { totalAmount, tax } = calculateSummary(revenueTotal);

  const paymentMethod = rowDataWhichIsInvoice.payment?.filter(
    (payment) => payment.invoice_id === rowDataWhichIsInvoice.id
  );

  if (!paymentMethod) return null;

  const totalPaid = paymentMethod?.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  return (
    <Button
      onClick={() =>
        setOpen(
          <CustomModal
            title={""}
            className="min-w-[60%] max-md:min-w-[80%] h-[80%] overflow-auto"
          >
            <div className="bg-white dark:bg-gray-950 overflow-hidden rounded-md p-2">
              <h1 className="text-3xl mb-8">
                Invoice #{rowDataWhichIsInvoice.id}
              </h1>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-12">
                  <div className="space-y-1">
                    <div className="font-bold text-black">From</div>
                    <div>
                      {rowDataWhichIsInvoice.users?.first_name}{" "}
                      {rowDataWhichIsInvoice.users?.last_name}
                    </div>
                    <div>{rowDataWhichIsInvoice.users?.address}</div>
                    <div>
                      <strong>Email:</strong>{" "}
                      {rowDataWhichIsInvoice.users?.address}
                    </div>
                    <div>
                      <strong>Phone:</strong>{" "}
                      {rowDataWhichIsInvoice.users?.phone}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-black">To</div>
                    <div>
                      {rowDataWhichIsInvoice.customer?.users?.first_name}{" "}
                      {rowDataWhichIsInvoice.customer?.users?.last_name}
                    </div>
                    <div>{rowDataWhichIsInvoice.customer?.users?.address}</div>
                    <div>
                      <strong>Email:</strong>{" "}
                      {rowDataWhichIsInvoice.customer?.users?.address}
                    </div>
                    <div>
                      <strong>Phone:</strong>{" "}
                      {rowDataWhichIsInvoice.customer?.users?.phone}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 bg-zinc-100 p-4 shadow-md">
                  <div className="font-bold text-black">Details</div>
                  <div>Invoice ID: #{rowDataWhichIsInvoice.id}</div>
                  <p>
                    Created At:{" "}
                    {format(rowDataWhichIsInvoice.created_at, "yyyy MMM dd")}
                  </p>
                  <p>
                    Due date:{" "}
                    {format(rowDataWhichIsInvoice.dueDate!, "yyyy MMM dd")}
                  </p>
                </div>
              </div>
              <div className="py-6 text-sm">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Per unit</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rowDataWhichIsInvoice.order?.order_product?.map(
                        (order_product_item) => {
                          // Image
                          const imageArr = JSON.parse(
                            order_product_item.product?.productImgs!
                          );
                          const imageUrl = imageArr[0].image;

                          const totalAmountAfterDiscount =
                            Number(order_product_item.quantity) *
                              Number(order_product_item.product?.salesPrice) -
                            Number(order_product_item.quantity) *
                              Number(order_product_item.product?.salesPrice) *
                              (Number(order_product_item.product?.discount) /
                                100);
                          return (
                            <TableRow key={order_product_item.product_id}>
                              <TableCell className="font-medium flex items-center gap-4">
                                <div className="relative h-12 w-12">
                                  <Image
                                    src={imageUrl}
                                    alt={
                                      order_product_item.product?.name as string
                                    }
                                    fill
                                    priority
                                    className="rounded-full object-cover"
                                  />
                                </div>
                                {order_product_item.product?.name}
                              </TableCell>
                              <TableCell>
                                {order_product_item?.quantity}
                              </TableCell>
                              <TableCell>
                                {Number(order_product_item.product?.salesPrice)}
                              </TableCell>
                              <TableCell>
                                {formatCurrencyToNPR(totalAmountAfterDiscount)}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex">
                  <Card className="text-sm border-none w-[15rem] ml-auto">
                    <CardContent className="grid gap-2 px-4 py-2">
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
                        <div>Total paid</div>
                        <div className="ml-auto">
                          <div className="flex flex-col p-4">
                            {paymentMethod.map((payment) => {
                              return (
                                <div
                                  key={payment.id}
                                  className="flex items-center gap-2 justify-between"
                                >
                                  <p>{firstLetterCapital(payment.method)}</p>
                                  <p>{formatCurrencyToNPR(payment.amount)}</p>
                                </div>
                              );
                            })}
                            <Separator />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center font-medium">
                        <div>Remaining</div>
                        <div className="ml-auto">
                          {" "}
                          {formatCurrencyToNPR(
                            Number(totalAmount) - Number(totalPaid)
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2"></CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </CustomModal>
        )
      }
      variant={"ghost"}
    >
      <Eye />
    </Button>
  );
}
