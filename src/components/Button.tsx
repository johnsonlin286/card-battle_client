import { useMemo } from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | 'link';
  color: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success' | 'none';
  block?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  spanStyle?: string;
}

// Move color maps outside component to prevent recreation on every render
const COLOR_CLASSES = {
  primary: 'border-2 border-blue-500 hover:bg-blue-500 hover:text-white',
  secondary: 'border-2 border-gray-500 hover:border-gray-600',
  danger: 'border-2 border-red-500 hover:bg-red-500 hover:text-white',
  warning: 'border-2 border-yellow-500 hover:bg-yellow-500 hover:text-white',
  info: 'border-2 border-blue-500 hover:bg-blue-500 hover:text-white',
  success: 'border-2 border-green-500 hover:bg-green-500 hover:text-white',
  none: 'border-2 border-transparent hover:bg-zinc-100',
} as const;

const BLOCK_CLASSES = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-500 hover:border-gray-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  info: 'bg-blue-500 hover:bg-blue-600 text-white',
  success: 'bg-green-500 hover:border-green-600 text-white',
  none: 'bg-transparent hover:bg-transparent text-black',
} as const;

// Base classes constant to avoid recreation
const BASE_CLASSES = 'bg-white border border-zinc-300/20 shadow-md shadow-zinc-300 rounded-full flex justify-center items-center cursor-pointer active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-1';
const SPAN_CLASSES = 'inline-block w-full h-full rounded-full px-6 py-1.5 transition-colors duration-200';

function Button({ children, type, color, block, href, disabled, onClick, className, spanStyle }: ButtonProps) {
  // Memoize the style class based on color and block props
  const buttonStyle = useMemo(() => {
    return block ? BLOCK_CLASSES[color] : COLOR_CLASSES[color];
  }, [block, color]);

  // Memoize className construction
  const containerClassName = useMemo(() => {
    return className ? `${BASE_CLASSES} ${className}` : BASE_CLASSES;
  }, [className]);

  const spanClassName = useMemo(() => {
    return `${buttonStyle} ${SPAN_CLASSES} ${spanStyle}`;
  }, [buttonStyle]);

  if (type === 'link') {
    return (
      <Link href={href as string} className={containerClassName}>
        <span className={spanClassName}>{children}</span>
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      disabled={disabled} 
      className={containerClassName} 
      onClick={onClick}
    >
      <span className={spanClassName}>{children}</span>
    </button>
  );
}

export default Button;