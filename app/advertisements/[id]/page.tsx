const SingleAdPage = async ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default SingleAdPage;
