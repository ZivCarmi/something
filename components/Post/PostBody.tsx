import { Post } from "@/types/post";

const PostBody = ({ post }: { post: Post }) => {
  return (
    <div>
      <h2 className="text-2xl">{post.title}</h2>
      <div>{post.body}</div>
    </div>
  );
};

export default PostBody;
