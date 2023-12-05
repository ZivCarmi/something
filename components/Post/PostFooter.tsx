import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { isEditedPost } from "@/lib/utils";
import PostActions from "./PostActions";
import PostDate from "./PostDate";
import { Post } from "@/types/post";

const PostFooter = async ({ post }: { post: Post }) => {
  const session = await getServerSession(authOptions);
  const createdByCurrentUser = session?.user?.email === post.email;
  const isEdited = isEditedPost(post);

  if (!createdByCurrentUser && !isEdited) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      {isEdited && <PostDate date={post.updated_at} />}
      {createdByCurrentUser && <PostActions post={post} />}
    </div>
  );
};

export default PostFooter;
