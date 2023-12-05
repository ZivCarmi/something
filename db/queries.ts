import { unstable_noStore as noStore } from "next/cache";
import { pool } from "@/db";
import { Post } from "@/types/post";
import { Payment } from "@/app/payments/columns";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    return result.rows;
  } catch (error) {
    console.log(error);
  }

  return [];
};

export const getPost = async (id: string | number): Promise<Post | null> => {
  try {
    const query = {
      name: "fetch-post",
      text: "SELECT * FROM posts WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0] || null;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const result = await pool.query(
      "SELECT * FROM payments ORDER BY created_at DESC"
    );

    return result.rows;
  } catch (error) {
    console.log(error);
  }

  return [];
};
