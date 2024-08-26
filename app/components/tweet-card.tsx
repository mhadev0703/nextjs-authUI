import { formatToTimeAgo } from "../lib/utils";

interface TweetCardProps {
  tweet: string;
  username: string;
  createdAt: Date;
}

export default function TweetCard({
  tweet,
  username,
  createdAt,
}: TweetCardProps) {
  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-lg w-full">
      <p className="text-gray-500">{username}</p>
      <p className="text-lg font-bold">{tweet}</p>

      <div className="flex justify-between mt-2">
        <p className="text-gray-500">{formatToTimeAgo(createdAt.toString())}</p>
      </div>
    </div>
  );
}
