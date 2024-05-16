import { Card } from "@/components/ui/card";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import clsx from "clsx";
import {
  AlertCircle,
  Check,
  Clock,
  MailWarningIcon,
  Paperclip,
  Slash,
  TimerOff,
} from "lucide-react";

interface PaymentStatusCardsProps {
  card: { type: string; total: number; length: number };
}

export default function PaymentStatusCardsCard({
  card,
}: PaymentStatusCardsProps) {
  return (
    <Card className="min-w-fit w-[250px] flex-shrink-0 overflow-hidden p-2 h-[9rem]">
      <div className="flex items-center gap-3">
        <div
          className={clsx("rounded-full p-3 shadow-md text-4xl", {
            "text-orange-600": card.type === "pending",
            "text-red-600": card.type === "due",
            "text-red-800": card.type === "overdue",
            "text-green-600": card.type === "paid",
            "text-blue-600": card.type === "overpaid",
            "bg-red-700 text-white": card.type === "canceled",
          })}
        >
          {card.type === "total" && <Paperclip />}
          {card.type === "pending" && <Clock />}
          {card.type === "due" && <AlertCircle />}
          {card.type === "overdue" && <TimerOff />}
          {card.type === "paid" && <Check />}
          {card.type === "overpaid" && <MailWarningIcon />}
          {card.type === "canceled" && <Slash />}
        </div>

        <div className="grid grid-rows-2">
          <div>
            <div className="text-muted-foreground">
              {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
            </div>
            <div>
              {card.type === "total" && (
                <p className="text-muted-foreground text-sm italic">
                  (Including receivables)
                </p>
              )}
              {card.type === "paid" && (
                <p className="text-muted-foreground text-sm italic">
                  (Payments received)
                </p>
              )}
              {card.type === "pending" && (
                <div className="text-muted-foreground text-sm italic">
                  <p> (Payments made</p>
                  <p>but not yet received)</p>
                </div>
              )}
              {card.type === "due" && (
                <div className="text-muted-foreground text-sm italic">
                  <p> (Less of pending payments)</p>
                </div>
              )}
              {card.type === "overdue" && (
                <div className="text-muted-foreground text-sm italic">
                  <p> (The collection date has crossed)</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-[1.2rem] font-semibold">
              {formatCurrencyToNPR(card.total)}
            </div>
            <div className="text-sm text-muted-foreground">
              /from {card.length} {card.length > 1 ? "invoices" : "invoice"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
