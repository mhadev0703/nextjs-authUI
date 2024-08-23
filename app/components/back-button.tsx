"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={router.back}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Back
    </button>
  );
}