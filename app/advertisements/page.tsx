import Wrapper from "./Wrapper";

async function getData() {
  const res = await fetch(
    `https://api.unsplash.com/collections/?client_id=${process.env.ACCESS_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const AdPage = async () => {
  const data = await getData();

  return (
    <div className="px-10">
      <ul className="grid grid-cols-6">
        {data.map((collection: any) => (
          <Wrapper key={collection.id} collectionId={collection.id} />
        ))}
      </ul>
    </div>
  );
};

export default AdPage;
