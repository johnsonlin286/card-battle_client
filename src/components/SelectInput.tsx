'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
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
  errorMessage?: string;
  isLoading?: boolean;
  className?: string;
}

function SelectInput({ id, isSearchable, label, name, placeholder, options, value, required, onChange, onKeywordChange, errorMessage, isLoading, className }: SelectInputProps) {
  const elmRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const debounceKeyword = useDebounce(selectedValue, 500);
  
  // Memoize click outside handler to prevent function recreation
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (elmRef.current && !elmRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  }, []);

  // Setup click outside listener with proper cleanup
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Sync value prop with internal state
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Focus input when options are shown
  useEffect(() => {
    if (showOptions) {
      inputRef.current?.focus();
    }
  }, [showOptions]);

  // Handle debounced keyword change
  useEffect(() => {
    if (isSearchable && onKeywordChange && debounceKeyword.length >= 2) {
      onKeywordChange(debounceKeyword);
    }
  }, [debounceKeyword, isSearchable, onKeywordChange]);

  // Memoize keyword change handler
  const handleKeywordChange = useCallback((newValue: string) => {
    if (!isSearchable) return;
    setSelectedValue(newValue);
  }, [isSearchable]);

  // Memoize option selection handler
  const handleSelectOption = useCallback((optionValue: string) => {
    setSelectedValue(optionValue);
    setShowOptions(false);
    onChange(optionValue);
  }, [onChange]);

  // Memoize toggle options handler
  const handleToggleOptions = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  // Memoize focus handler
  const handleFocus = useCallback(() => {
    setShowOptions(true);
  }, []);

  // Memoize container className to avoid string concatenation on every render
  const containerClassName = useMemo(() => {
    const baseClasses = 'flex items-center justify-between gap-2 bg-white rounded-full border border-zinc-300/20 shadow-md shadow-zinc-300 py-2 px-4';
    return errorMessage ? `${baseClasses} border border-red-500` : baseClasses;
  }, [errorMessage]);

  // Memoize wrapper className
  const wrapperClassName = useMemo(() => {
    const baseClasses = 'relative flex flex-col gap-2';
    return className ? `${baseClasses} ${className}` : baseClasses;
  }, [className]);

  // Memoize chevron icon rotation class
  const chevronClassName = useMemo(() => {
    return `w-4 h-4 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`;
  }, [showOptions]);

  // Memoize options list rendering
  const optionsList = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-2">
          <Loader2Icon className="w-4 h-4 animate-spin text-gray-500" />
        </div>
      );
    }
    
    if (options.length === 0) {
      return (
        <div className="text-gray-500 text-center py-2">No options found</div>
      );
    }

    return options.map((option) => (
      <button 
        key={option.value} 
        value={option.value} 
        onClick={() => handleSelectOption(option.value)} 
        className="w-full text-left text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer py-2 px-4"
      >
        {option.label}
      </button>
    ));
  }, [isLoading, options, handleSelectOption]);

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="w-fit text-sm font-medium text-gray-700">
        {label}
      </label>
      <div ref={elmRef} className={containerClassName}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          value={selectedValue}
          required={required}
          onFocus={handleFocus}
          onChange={(e) => handleKeywordChange(e.target.value)}
          className="flex-1 outline-none"
          readOnly={!isSearchable}
        />
        <button 
          type="button" 
          onClick={handleToggleOptions} 
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label={showOptions ? 'Close options' : 'Open options'}
        >
          <ChevronDownIcon className={chevronClassName} />
        </button>
      </div>
      {errorMessage && (
        <small className="text-red-500">
          {errorMessage}
        </small>
      )}
      {showOptions && (
        <div className="absolute top-full left-0 w-full max-h-[230px] overflow-y-auto bg-white border border-zinc-300/20 rounded-2xl shadow-md shadow-zinc-300 p-2 mt-2 z-10">
          {optionsList}
        </div>
      )}
    </div>
  );
}

export default SelectInput;