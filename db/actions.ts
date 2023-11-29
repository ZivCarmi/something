"use server";

import { z } from "zod";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const Post = z.object({
  title: z.string(),
  body: z.string(),
});

export const savePostForm = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData);

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const post = Post.parse(data);

  const response = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: Math.random(),
      userId: 12,
      ...post,
      tags: ["test1", "test3"],
    }),
  });

  revalidatePath("/");

  return await response.json();
};
