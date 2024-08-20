import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  errors?: string[];
  icon: React.ReactNode;
}

export default function FormInput({
  name,
  errors = [],
  icon,
  ...rest
}: FormInputProps) {
  const hasError = errors.length > 0;

  return (
    <div className="mb-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-2 flex items-center">{icon}</span>
        <input
          name={name}
          className={`w-full pl-10 p-3 border rounded-xl focus:outline-none focus:ring ${
            hasError ? 'border-red-500 ring-red-300' : 'border-gray-300 ring-gray-200'
          }`}
          {...rest}
        />
      </div>
      {hasError && (
        <div className="mt-2">
          {errors.map((error, index) => (
            <p key={index} className="text-red-500 text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
