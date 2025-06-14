type InputProps = {
  value: string | number;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  type?: "text" | "email" | "password" | "number" | "phone";
};

export function Input({ value, name, label, onChange, errorMessage, type }: InputProps) {
  return (
    <div>
      <label className="block text-lg font-medium mt-6" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        placeholder={label}
        className="w-full p-2 border border-gray-300 rounded-md mt-4"
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </div>
  );
}
