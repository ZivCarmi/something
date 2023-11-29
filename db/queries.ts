export const getPosts = async () => {
  const response = await fetch("https://dummyjson.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};
