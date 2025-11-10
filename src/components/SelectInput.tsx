'use client';

import { useRef, useState, useEffect } from "react";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";

import useDebounce from "@/hooks/useDebounce";

interface SelectInputProps {
  id: string;
  isSearchable?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  required: boolean;
  onKeywordChange?: (value: string) => void;
  onChange: (value: string) => void;
  isLoading?: boolean;
  className?: string;
}

export default function SelectInput({ id, isSearchable, label, name, placeholder, options, value, required, onChange, onKeywordChange, isLoading, className }: SelectInputProps) {
  const elmRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const debounceKeyword = useDebounce(selectedValue, 500);
  
  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (elmRef.current && !elmRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('click', clickOutside);
    return () => document.removeEventListener('click', clickOutside);
  }, [])

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value])

  useEffect(() => {
    if (showOptions) {
      inputRef.current?.focus();
    }
  }, [showOptions])

  useEffect(() => {
    if (isSearchable && onKeywordChange) {
      if (debounceKeyword.length < 2) return;
      onKeywordChange(debounceKeyword);
    }
  }, [debounceKeyword, isSearchable])

  const onChangeKeyword = (value: string) => {
    if (!isSearchable) return;
    setSelectedValue(value);
  }

  const handleSelectOption = (value: string) => {
    setSelectedValue(value);
    setShowOptions(false);
    onChange(value);
  }

  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div ref={elmRef} className="flex items-center justify-between gap-2 border border-gray-300 rounded-md p-2 focus-within:border-blue-500">
        {isSearchable ? (
          <>
            <input
              ref={inputRef}
              type="text"
              id={id}
              name={name}
              placeholder={placeholder}
              value={selectedValue}
              required={required}
              onFocus={() => setShowOptions(true)}
              onChange={(e) => onChangeKeyword(e.target.value)}
              className="flex-1 outline-none"
            />
            <button type="button" onClick={() => setShowOptions(!showOptions)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`} />
            </button>
          </>
        ) : (
          <select
            id={id}
            name={name}
            required={required}
            value={selectedValue}
            className="flex-1 outline-none"
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} selected={selectedValue === option.value}>{option.label}</option>
            ))}
          </select>
        )}
      </div>
      {showOptions && (
        <div className="absolute top-full left-0 w-full max-h-[230px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md p-2 mt-2">
          { isLoading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2Icon className="w-4 h-4 animate-spin text-gray-500" />
            </div>
          ) : options.length > 0 ? options.map((option) => (
            <button key={option.value} value={option.value} onClick={() => handleSelectOption(option.value)} className="w-full text-left text-gray-500 hover:text-gray-700 cursor-pointer py-2 px-4">
              {option.label}
            </button>
          )) : (
            <div className="text-gray-500 text-center py-2">No options found</div>
          )}
        </div>
      )}
    </div>
  )
}