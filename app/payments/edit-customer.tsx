"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Payment } from "./columns";
import { Input } from "@/components/ui/input";
import { capitalizeFirst } from "@/lib/utils";
import { PaymentSchema, Status } from "@/lib/schema";
import SubmitButton from "@/components/SubmitButton";
import { updatePayment } from "@/db/actions";

export default function EditCustomer({
  payment,
  onSuccess,
}: {
  payment: Payment;
  onSuccess: () => void;
}) {
  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: payment,
  });

  async function handleAction(formData: FormData) {
    const isValid = await form.trigger();

    console.log(form.getValues());
    console.log(payment.id);

    if (!isValid) return;

    const response = await updatePayment(formData, payment.id);

    return response && onSuccess();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogDescription>
          Make changes to customer profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="grid gap-4" action={handleAction}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select name={field.name} defaultValue={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(Status).map((status) => (
                        <SelectItem key={status} value={status}>
                          {capitalizeFirst(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select payment status.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <SubmitButton>Update Customer</SubmitButton>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
