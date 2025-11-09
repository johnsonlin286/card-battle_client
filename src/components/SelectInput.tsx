'use client';

interface SelectInputProps {
  id: string;
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required: boolean;
  onChange: (value: string) => void;
  className?: string;
}

export default function SelectInput({ id, label, name, options, required, onChange, className }: SelectInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-md p-2 focus-within:border-blue-500">
        <select
          id={id}
          name={name}
          required={required}
          className="flex-1 outline-none"
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}