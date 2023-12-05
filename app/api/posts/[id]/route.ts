import { getPost } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const post = await getPost(id);

  if (!post) {
    return NextResponse.json("", {
      status: 400,
    });
  }

  return NextResponse.json(post);
}
