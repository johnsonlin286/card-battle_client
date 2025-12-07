'use client';

import { usePathname } from 'next/navigation';

import Link from "next/link";

export default function AuthLink() {
  const pathname = usePathname();

  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';
  const isForgotPassword = pathname === '/forgot-password';

  return (
    <div className="flex flex-col justify-center items-center gap-2 border-t border-zinc-200 pt-4 mt-4">
      {
        isLogin && (
          <p className="text-sm text-gray-500">Don't have an account? <Link href="/register" className="text-blue-500 underline hover:text-blue-600">Register</Link></p>
        )
      }
      {
        isRegister && (
          <p className="text-sm text-gray-500">Already have an account? <Link href="/login" className="text-blue-500 underline hover:text-blue-600">Login</Link></p>
        )
      }
      {
        isForgotPassword ? (
          <p className="text-sm text-gray-500">Back to <Link href="/login" className="text-blue-500 underline hover:text-blue-600">Login</Link></p>
        ) : (
          <p className="text-sm text-gray-500">Forgot password? <Link href="/forgot-password" className="text-blue-500 underline hover:text-blue-600">Reset Password</Link></p>
        )
      }
    </div>
  );
}