import { Post } from "@/types/post";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirst(value: string) {
  return value[0].toUpperCase() + value.substring(1);
}

export function isEditedPost(post: Post) {
  const updatedAt = Date.parse(post.updated_at.toISOString());
  const createdAt = Date.parse(post.created_at.toISOString());

  return Boolean(Math.abs(updatedAt - createdAt));
}
