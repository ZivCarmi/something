import { Post } from "@/types/post";
import PostDate from "./PostDate";
import PostFooter from "./PostFooter";
import PostBody from "./PostBody";

const Post = ({ post }: { post: Post }) => {
  return (
    <li className="border rounded-lg [&>*]:py-2 [&>*]:px-4 [&>*:not(:last-child)]:border-b">
      <div className="flex justify-between items-center">
        {post.created_by}
        <PostDate date={post.created_at} />
      </div>
      <div className="space-y-2">
        <PostBody post={post} />
      </div>
      <PostFooter post={post} />
    </li>
  );
};

export default Post;
