import db from "../app/lib/db";
import TweetList from "./components/tweet-list";

export interface Tweet {
  id: number;
  tweet: string;
  user: {
    id: number;
    username: string;
  };
  created_at: Date;
}

async function getTweetsCount(): Promise<number> {
  return db.tweet.count();
}

async function getTweets(): Promise<Tweet[]> {
  return db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 1,
  });
}

export default async function Home() {
  const tweets = await getTweets();
  const tweetsCount = await getTweetsCount();

  return (
    <main className="flex justify-center w-screen min-h-screen p-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-80">
        {tweets.length === 0 ? (
          <p className="text-lg font-semibold text-center">
            No tweets to show.
          </p>
        ) : (
          <TweetList initialTweets={tweets} tweetsCount={tweetsCount} />
        )}
      </div>
    </main>
  );
}
