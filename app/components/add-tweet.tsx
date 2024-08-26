"use client";

import { useFormState, useFormStatus } from "react-dom";
import { postTweet } from "../action";
import { isValidArray } from "@/app/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "submitting..." : "Tweet"}
    </button>
  );
}

export default function AddTweet() {
  const [state, action] = useFormState(postTweet, null);

  return (
    <form action={action} className="flex justify-between gap-4 w-full">
      <div className="flex flex-col">
        <input
          type="text"
          id="tweet"
          name="tweet"
          placeholder="Type something..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
        {state && "formErrors" in state && isValidArray(state.formErrors) && (
          <p className="text-red-500 text-sm">{state?.formErrors[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
