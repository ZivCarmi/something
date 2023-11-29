import Link from "next/link";
import Slider from "./Slider";

async function getCollectionData(id: string) {
  const res = await fetch(
    `https://api.unsplash.com/collections/${id}/photos/?client_id=${process.env.ACCESS_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Wrapper = async ({ collectionId }: { collectionId: string }) => {
  const photos = await getCollectionData(collectionId);
  const images = photos.map((photo: any) => photo.urls.regular);

  return (
    <li className="mr-6 mb-6">
      <Link href={`/advertisements/${collectionId}`}>
        <Slider images={images} />
      </Link>
    </li>
  );
};

export default Wrapper;
