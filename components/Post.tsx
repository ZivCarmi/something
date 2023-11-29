import Tag from "./Tag";

const Post = ({ post }: { post: any }) => {
  return (
    <li className="space-y-2">
      <h2 className="text-lg">{post.title}</h2>
      <div>{post.body}</div>
      <div className="flex gap-4">
        {post?.tags.map((tag: string) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </li>
  );
};

export default Post;
