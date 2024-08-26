"use client";

import { useFormState } from "react-dom";
import FormButton from "./button";
import { uploadTweet } from "../action";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <form
      action={action}
      className="flex justify-between gap-4 w-full mb-6"
    >
      <textarea
        name="tweet"
        className="w-full h-20 p-3 border border-gray-300 rounded-lg 
        resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What's happening?"
      />
      <div className="flex justify-end w-full md:w-auto">
        <FormButton 
          text="Upload" 
          className="bg-blue-500 hover:bg-blue-600 text-white 
          font-semibold py-2 px-4 rounded-lg transition-colors duration-200" 
        />
      </div>
      {state?.fieldErrors?.tweet && (
        <p className="text-red-500 text-sm mt-2">{state.fieldErrors.tweet}</p>
      )}
    </form>
  );
}