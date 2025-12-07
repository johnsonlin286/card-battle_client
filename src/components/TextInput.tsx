'use client';

import { useState, useCallback, useMemo } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  value?: string;
  required: boolean;
  onChange: (value: string) => void;
  errorMessage?: string;
  className?: string;
}

function TextInput({ id, label, type, name, placeholder, value, required, onChange, errorMessage, className }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Memoize password toggle handler to prevent function recreation
  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Memoize input type to avoid recalculation on every render
  const inputType = useMemo(() => {
    return type === 'password' ? (showPassword ? 'text' : 'password') : type;
  }, [type, showPassword]);

  // Memoize autoComplete value
  const autoCompleteValue = useMemo(() => {
    return type === 'password' ? 'current-password' : 'off';
  }, [type]);

  // Memoize container className to avoid string concatenation on every render
  const containerClassName = useMemo(() => {
    const baseClasses = 'flex items-center justify-between gap-2 bg-white border border-zinc-300/20 rounded-full shadow-inner shadow-zinc-300 py-2 px-4';
    return errorMessage ? `${baseClasses} border border-red-500` : baseClasses;
  }, [errorMessage]);

  // Memoize wrapper className
  const wrapperClassName = useMemo(() => {
    return className ? `flex flex-col gap-2 ${className}` : 'flex flex-col gap-2';
  }, [className]);

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="w-fit text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className={containerClassName}>
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value ?? ''}
          required={required}
          className="flex-1 outline-none"
          autoComplete={autoCompleteValue}
          onChange={(e) => onChange(e.target.value)}
        />
        {type === 'password' && (
          <button 
            type="button" 
            onClick={handleTogglePassword} 
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
          </button>
        )}
      </div>
      {errorMessage && (
        <small className="text-red-500">
          {errorMessage}
        </small>
      )}
    </div>
  );
}

export default TextInput;