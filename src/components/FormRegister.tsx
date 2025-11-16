'use client';

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { QUERY_KEYS, MUTATION_KEYS } from "@/utils/constant";
import { fetchState } from "@/services/state";
import { registerUser } from "@/services/user";
import { useToastStore } from "@/store/toast";
import Button from "./Button";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }).max(20, { message: 'Username must be less than 20 characters' }).regex(/^[a-zA-Z0-9]+$/, {
    message: 'Username must contain only letters and numbers',
  }),
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  }),
  confirm_password: z.string(),
  country: z.string().min(1),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type RegisterForm = z.infer<typeof formSchema>;

export default function FormRegister() {
  const nextRouter = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    country: '',
  });
  const [formErrors, setFormErrors] = useState<RegisterForm | undefined>();
  const [countryKeyword, setCountryKeyword] = useState<string>('');
  const [countryData, setCountryData] = useState<SelectOption[]>([
    { value: 'indonesia', label: 'Indonesia' },
    { value: 'thailand', label: 'Thailand' },
    { value: 'philippines', label: 'Philippines' },
    { value: 'vietnam', label: 'Vietnam' },
    { value: 'malaysia', label: 'Malaysia' },
    { value: 'singapore', label: 'Singapore' },
  ]);
  const { addToast } = useToastStore();

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QUERY_KEYS.STATE, countryKeyword],
    queryFn: () => fetchState({ name: countryKeyword, page: 1, limit: 10 }),
    select: (data) => data.data.map((state: { name: string }) => ({ value: state.name, label: state.name })),
    enabled: !!countryKeyword,
  })
  
  useEffect(() => {
    if (states) {
      setCountryData(states);
    }
  }, [states])

  const updateFormData = (key: keyof registerUserPayload, value: string) => {
    setFormErrors((prev) => ({ ...prev, [key]: '' }) as RegisterForm);
    setFormData({ ...formData, [key]: value });
  }

  const { mutateAsync: registerUserAsync, isPending: isRegistering } = useMutation({
    mutationKey: [MUTATION_KEYS.REGISTER],
    mutationFn: (payload: registerUserPayload) => registerUser(payload),
    onSuccess: () => {
      nextRouter.push('/login');
      addToast({
        message: 'Register successful! You can now login.',
        variant: 'success',
      });
    },
    onError: (error) => {
      addToast({
        message: 'Register failed. Please try again.',
        variant: 'error',
      });
      setFormData((prev) => ({ ...prev, password: '', confirm_password: '' }) as RegisterForm);
    },
  })

  const handleError = (error: { path: string, message: string }[]) => {
    error.forEach((item) => {
      switch (item.path) {
        case 'username':
          setFormErrors((prev) => ({ ...prev, username: item.message }) as RegisterForm);
          break;
        case 'email':
          setFormErrors((prev) => ({ ...prev, email: item.message }) as RegisterForm);
          break;
        case 'password':
          setFormErrors((prev) => ({ ...prev, password: item.message }) as RegisterForm);
          break;
        case 'confirm_password':
          setFormErrors((prev) => ({ ...prev, confirm_password: item.message }) as RegisterForm);
          break;
        case 'country':
          setFormErrors((prev) => ({ ...prev, country: item.message }) as RegisterForm);
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
    registerUserAsync(data);
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <TextInput
        id="username"
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        required={true}
        onChange={(value) => updateFormData('username', value)}
        errorMessage={formErrors?.username}
      />
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
      <TextInput
        id="confirm_password"
        label="Confirm Password"
        type="password"
        name="confirm_password"
        placeholder="Enter your confirm password"
        value={formData.confirm_password}
        required={true}
        onChange={(value) => updateFormData('confirm_password', value)}
        errorMessage={formErrors?.confirm_password}
      />
      <SelectInput
        id="state"
        isSearchable={true}
        label="State"
        name="state"
        placeholder="Select or search your country"
        options={countryData}
        value={formData.country}
        required={true}
        onKeywordChange={(value) => setCountryKeyword(value)}
        onChange={(value) => updateFormData('country', value)}
        isLoading={isLoadingStates}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" disabled={isRegistering} className="w-1/3">Register</Button>
      </div>
    </form>
  )
}