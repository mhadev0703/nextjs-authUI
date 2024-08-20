import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`w-full p-3 text-black bg-gray-200 rounded-xl ${
        pending ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={pending}
    >
      {pending ? 'Loading...' : text}
    </button>
  );
}
