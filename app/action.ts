"use server";

import db from "../app/lib/db";
import getSession from "./lib/session";
import { redirect } from "next/navigation";
import { TWEET_MIN_LENGTH, TWEET_MAX_LENGTH } from "./lib/constants";
import { z } from "zod";

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

const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "This field is required.",
    })
    .min(TWEET_MIN_LENGTH, {
      message: `Tweet must be at least ${TWEET_MIN_LENGTH} characters long.`,
    })
    .max(TWEET_MAX_LENGTH, {
      message: `Tweet must be at most ${TWEET_MAX_LENGTH} characters long.`,
    }),
});

export async function uploadTweet(state: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
