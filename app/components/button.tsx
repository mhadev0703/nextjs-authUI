import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
  className?: string;
}

export default function FormButton({ text, className }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full p-3 rounded-xl ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
