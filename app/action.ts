"use server";

import db from "../app/lib/db";
import { z } from "zod";
import getSession from "@/app/lib/session";

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
    skip: page * 3,
    take: 3,
  });
}

const tweetSchema = z
  .string()
  .min(3, "Tweet must be longer than three characters.")
  .max(200, "Tweet must be shorter than 200 characters.");

export async function postTweet(_: any, formData: FormData) {
  const tweet = formData.get("tweet");

  const result = tweetSchema.safeParse(tweet);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  return db.tweet.create({
    data: {
      tweet: result.data,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
  });
}
