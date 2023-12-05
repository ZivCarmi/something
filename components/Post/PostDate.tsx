const PostDate = ({ date }: { date: Date }) => {
  return (
    <span className="text-sm">
      {date.toLocaleTimeString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
};

export default PostDate;
