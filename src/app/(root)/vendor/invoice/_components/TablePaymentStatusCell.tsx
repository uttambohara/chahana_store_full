import { Badge } from "@/components/ui/badge";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import clsx from "clsx";
import {
  AlertCircle,
  Check,
  Clock,
  MailWarningIcon,
  Slash,
} from "lucide-react";
import { calculatePaymentStatus } from "./PaymentStatusCheck";
import firstLetterCapital from "@/lib/first-letter-capital";

interface TablePaymentStatusCellProps {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TablePaymentStatusCell({
  rowDataWhichIsInvoice,
}: TablePaymentStatusCellProps) {
  const status = calculatePaymentStatus(rowDataWhichIsInvoice);
  return <div>{firstLetterCapital(status)}</div>;
}
