import { useMemo } from "react";
import Link from "next/link";
interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | 'link';
  color: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
  block?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, type, color, block, href, disabled, onClick, className }: ButtonProps) {
  const colorClass = {
    primary: 'border-2 border-blue-500 hover:border-blue-600',
    secondary: 'border-2 border-gray-500 hover:border-gray-600',
    danger: 'border-2 border-red-500 hover:border-red-600',
    warning: 'border-2 border-yellow-500 hover:border-yellow-600',
    info: 'border-2 border-blue-500 hover:border-blue-600',
    success: 'border-2 border-green-500 hover:border-green-600',
  }[color];

  const blockClass = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:border-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
    success: 'bg-green-500 hover:border-green-600 text-white',
  }[color]

  const buttonStyle = useMemo(() => {
    if (block) {
      return blockClass;
    }
    return colorClass;
  }, [block, colorClass, blockClass]);

  return (
    <>
      {type === 'link' ? (
        <Link href={href as string} className={`bg-white shadow-md rounded-full flex justify-center items-center cursor-pointer active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-1 ${className}`}>
          <span className={`${buttonStyle} inline-block w-full h-full rounded-full px-6 py-1.5`}>{children}</span>
        </Link>
      ) : (
        <button type={type} disabled={disabled} className={`bg-white shadow-md rounded-full flex justify-center items-center cursor-pointer active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed p-1 ${className}`} onClick={onClick}>
          <span className={`${buttonStyle} inline-block w-full h-full rounded-full px-6 py-1.5`}>
            {children}
          </span>
        </button>
      )}
    </>
  )
}