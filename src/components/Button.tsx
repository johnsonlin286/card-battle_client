import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | 'link';
  color: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success';
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, type, color, href, disabled, onClick, className }: ButtonProps) {
  const colorClass = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    info: 'bg-blue-500 text-white hover:bg-blue-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  }[color];

  return (
    <>
      {type === 'link' ? (
        <Link href={href as string} className={`${colorClass} px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}>
          {children}
        </Link>
      ) : (
        <button type={type} disabled={disabled} className={`${colorClass} px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  )
}