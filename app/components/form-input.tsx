interface FormInputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  errors: string[];
  icon: React.ReactNode;
}

export default function FormInput({
  id,
  name,
  type,
  placeholder,
  required,
  errors,
  icon,
}: FormInputProps) {
  const hasError = errors.length > 0;

  return (
    <div className="mb-4">
      <div className="relative flex items-center">
        <span className="absolute inset-y-0 left-2 flex items-center">{icon}</span>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-10 p-3 border rounded-xl focus:outline-none focus:ring ${
            hasError ? 'border-red-500 ring-red-300' : 'border-gray-300 ring-gray-200'
          }`}
        />
        {hasError && (
          <p className="absolute text-red-500 text-sm -bottom-5 left-0">{errors[0]}</p>
        )}
      </div>
    </div>
  );
}
