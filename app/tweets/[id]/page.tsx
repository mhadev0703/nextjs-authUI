import TweetCard from "@/app/components/tweet-card";
import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import BackButton from "@/app/components/back-button";

async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          username: true,
        },
      },
      created_at: true,
    },
  });
}

interface DetailProps {
  params: {
    id: string;
  };
}

export default async function Detail({ params: { id } }: DetailProps) {
  const tweet = await getTweet(+id);

  if (!tweet) {
    return notFound();
  }

  return (
    <main className="flex justify-center w-screen min-h-screen p-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-80">
        <p className="text-lg font-semibold text-center">Detail</p>
        <TweetCard
          tweet={tweet.tweet}
          username={tweet.user.username}
          createdAt={tweet.created_at}
        />
        <div className="flex justify-center w-full mt-4">
          <BackButton />
        </div>
      </div>
    </main>
  );
}