"use client";

import { useFormState } from "react-dom";
import FormButton from "../components/button";
import FormInput from "../components/input";
import { logIn } from "./action";
import {
  FireIcon,
  EnvelopeIcon,
  KeyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export default function LogIn() {
  const [state, action] = useFormState(logIn, null);

  const successMessage =
    state?.fieldErrors && Object.keys(state.fieldErrors).length === 0 ? (
      <div className="flex items-center gap-2 text-green-500 bg-green-100 p-3 rounded">
        <ShieldCheckIcon className="w-6 h-6" />
        <span>Welcome back!</span>
      </div>
    ) : null;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <FireIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
      </div>
      <form action={action} className="flex flex-col gap-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email ?? []}
          icon={<EnvelopeIcon className="h-6 w-6 text-gray-500" />}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password ?? []}
          icon={<KeyIcon className="h-6 w-6 text-gray-500" />}
        />
        <FormButton text="Log in" />
        {successMessage && (
          <p className="text-green-500 bg-green-100 p-3 rounded-xl">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}
