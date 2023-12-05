import Post from "@/components/Post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Form from "./Form";
import { SignIn, SignOut } from "./buttons";
import { getPosts } from "@/db/queries";
import { Suspense } from "react";
import Loading from "./loading";

const Home = async () => {
  return (
    <section className="max-w-[768px] m-auto">
      <h1 className="font-medium text-2xl mb-8">write your post</h1>
      <Suspense fallback={<Loading />}>
        <PostForm />
        <PostsEntries />
      </Suspense>
    </section>
  );
};

const PostForm = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
};

const PostsEntries = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default Home;
