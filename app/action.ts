"use server";

import db from "@/app/lib/db";

/**
 * @param page - The page number starting from 0.
 */
export async function getTweets(page: number) {
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
    skip: page * 5,
    take: 5,
  });
}
