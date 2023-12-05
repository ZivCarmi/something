import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, {
    message: "Title is a required field",
  }),
  body: z.string().min(1, {
    message: "Body is a required field",
  }),
});

export const Status = {
  pending: "pending",
  processing: "processing",
  success: "success",
  failed: "failed",
} as const;

export const PaymentSchema = z.object({
  id: z.coerce.string().min(1, {
    message: "ID must be at least 2 characters",
  }),
  amount: z.coerce.number().min(1, {
    message: "Payment amount is required",
  }),
  status: z.nativeEnum(Status, {
    errorMap: (issue, ctx) => ({ message: "Please select status" }),
  }),
  email: z.string().email({ message: "Customer email is required" }),
});
