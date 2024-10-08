"use client";

import { useEffect, useState } from "react";
import { getTweets } from "../action";
import TweetCard from "./tweet-card";
import Link from "next/link";
import { Tweet } from "../page";

interface TweetListProps {
  initialTweets: Tweet[];
  tweetsCount: number;
}

export default function TweetList({
  initialTweets,
  tweetsCount,
}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);

  const getNewPageTweets = async (page: number) => {
    const tweets = await getTweets(page);
    setTweets(tweets);
  };

  useEffect(() => {
    getNewPageTweets(page);
  }, [page]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {tweets.map(tweet => (
          <Link href={`/tweets/${tweet.id}`} key={tweet.id}>
            <TweetCard
              tweet={tweet.tweet}
              username={tweet.user.username}
              createdAt={tweet.created_at}
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={() => setPage(prev => prev - 1)}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
            page === 0 ? "invisible" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(prev => prev + 1)}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
            tweets.length < 3 || tweets.length + page * 3 >= tweetsCount
              ? "invisible"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
