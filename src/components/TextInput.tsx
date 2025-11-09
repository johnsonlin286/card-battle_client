'use client';

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  required: boolean;
  onChange: (value: string) => void;
  className?: string;
}

export default function FormInput({ id, label, type, name, placeholder, required, onChange, className }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-md p-2 focus-within:border-blue-500">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          className="flex-1 outline-none"
          autoComplete={type === 'password' ? 'current-password' : 'off'}
          onChange={(e) => onChange(e.target.value)}
        />
        {
          type === 'password' && (
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-gray-700">
              {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
            </button>
          )
        }
      </div>
    </div>
  )
}