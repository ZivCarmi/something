"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { pool } from ".";
import { PaymentSchema, PostSchema } from "@/lib/schema";
import { getPost } from "./queries";

export const savePost = async (formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parse = PostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parse.success) {
    return false;
  }

  const data = parse.data;

  try {
    const query = {
      text: "INSERT INTO posts(email, title, body, created_by) VALUES($1, $2, $3, $4)",
      values: [session.user.email, data.title, data.body, session.user.name],
    };

    await pool.query(query);

    revalidatePath("/");

    return true;
  } catch (error) {
    return false;
  }
};

export const updatePost = async (formData: FormData, postId: number) => {
  const parse = PostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parse.success) {
    return false;
  }

  const data = parse.data;

  try {
    const query = {
      text: "UPDATE posts SET title = $1, body = $2, updated_at = $3 WHERE id = $4",
      values: [data.title, data.body, new Date(), postId],
    };

    await pool.query(query);

    revalidatePath("/");

    return true;
  } catch (e) {
    return false;
  }
};

export const deletePost = async (postId: number) => {
  const session = await getServerSession();
  const post = await getPost(postId);

  if (!session || session.user?.email !== post?.email) {
    return false;
  }

  try {
    const query = {
      text: "DELETE FROM posts WHERE id = $1",
      values: [postId],
    };

    await pool.query(query);

    revalidatePath("/");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const savePayment = async (formData: FormData) => {
  const parse = PaymentSchema.safeParse({
    id: "filler-unused",
    status: formData.get("status"),
    email: formData.get("email"),
    amount: formData.get("amount"),
  });

  if (!parse.success) {
    return false;
  }

  const data = parse.data;

  try {
    const query = {
      text: "INSERT INTO payments(status, email, amount) VALUES($1, $2, $3)",
      values: [data.status, data.email, data.amount],
    };

    await pool.query(query);

    revalidatePath("/payments");

    return true;
  } catch (error) {
    return false;
  }
};

export const updatePayment = async (formData: FormData, paymentId: string) => {
  const parse = PaymentSchema.safeParse({
    id: paymentId,
    status: formData.get("status"),
    email: formData.get("email"),
    amount: formData.get("amount"),
  });

  if (!parse.success) {
    return false;
  }

  const data = parse.data;

  try {
    const query = {
      text: "UPDATE payments SET email = $1, amount = $2, status = $3, updated_at = $4 WHERE id = $5",
      values: [data.email, data.amount, data.status, new Date(), paymentId],
    };

    await pool.query(query);

    revalidatePath("/payments");

    console.log(query);

    return true;
  } catch (e) {
    return false;
  }
};

export const deletePayment = async (paymentId: number | string) => {
  try {
    const query = {
      text: "DELETE FROM payments WHERE id = $1",
      values: [paymentId],
    };

    await pool.query(query);

    revalidatePath("/payments");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
