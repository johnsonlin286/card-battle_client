'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import Cookies from "js-cookie";

import { MUTATION_KEYS } from "@/utils/constant";
import { loginUser } from "@/services/user";
import { useToast } from "@/hooks/ToastContext";
import Button from "./Button";
import TextInput from "./TextInput";

const formSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' }),
});

type LoginForm = z.infer<typeof formSchema>

export default function FormLogin() {
  const nextRouter = useRouter();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<LoginForm | undefined>();
  const { success, error: showError } = useToast();

  const updateFormData = (key: keyof LoginForm, value: string) => {
    setFormErrors((prev) => ({ ...prev, [key]: '' }) as LoginForm);
    setFormData({ ...formData, [key]: value });
  }

  const { mutateAsync: loginUserAsync, isPending: isLoggingIn } = useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: (payload: loginUserPayload) => loginUser(payload),
    onSuccess: (data) => {
      success('Login successful! You are now logged in.');
      Cookies.set('cardBattleToken', data.token, { expires: 7 }); // 7 days
      nextRouter.push('/dashboard');
    },
    onError: (error) => {
      switch (error.message) {
        case 'Invalid login credentials':
          setFormErrors((prev) => ({ ...prev, password: 'Invalid email or password' }) as LoginForm);
          break;
        case 'Email not confirmed':
          setFormErrors((prev) => ({ ...prev, email: 'Email not confirmed' }) as LoginForm);
          break;
        default:
          showError('Login failed. Please try again.');
          break;
      }
      setFormData((prev) => ({ ...prev, password: '' }) as LoginForm);
    },
  })

  const handleError = (error: { path: string, message: string }[]) => {
    error.forEach((item) => {
      switch (item.path) {
        case 'email':
          setFormErrors((prev) => ({ ...prev, email: item.message }) as LoginForm);
          break;
        case 'password':
          setFormErrors((prev) => ({ ...prev, password: item.message }) as LoginForm);
          break;
      }
    })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = formSchema.safeParse(formData);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues.map((issue) => ({
        path: issue.path.join('.') || "(root)",
        message: issue.message,
      }));
      handleError(errorMessage);
      return;
    }
    const { data } = validationResult;
    loginUserAsync(data);
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <TextInput
        id="email"
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        required={true}
        onChange={(value) => updateFormData('email', value)}
        errorMessage={formErrors?.email}
      />
      <TextInput
        id="password"
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        required={true}
        onChange={(value) => updateFormData('password', value)}
        errorMessage={formErrors?.password}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" disabled={isLoggingIn} className="w-1/3">Login</Button>
      </div>
    </form>
  )
}