'use client';

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchState } from "@/services/state";
import { QUERY_KEYS } from "@/utils/constant";
import Button from "./Button";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

export default function FormRegister() {
  const [state, setState] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [countryData, setCountryData] = useState<SelectOption[]>([]);

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QUERY_KEYS.STATE],
    queryFn: () => fetchState({ name: '', page: 1, limit: 10 }),
    select: (data) => data.data.map((state: { name: string }) => ({ value: state.name, label: state.name })),
    enabled: !!keyword,
  })
  
  useEffect(() => {
    if (states) {
      console.log(states);
    }
  }, [states])

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <TextInput
        id="username"
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        required={true}
        onChange={() => {}}
      />
      <TextInput
        id="email"
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required={true}
        onChange={() => {}}
      />
      <TextInput
        id="password"
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        required={true}
        onChange={() => {}}
      />
      <TextInput
        id="confirm_password"
        label="Confirm Password"
        type="password"
        name="confirm_password"
        placeholder="Enter your confirm password"
        required={true}
        onChange={() => {}}
      />
      <SelectInput
        id="state"
        label="State"
        name="state"
        options={states || []}
        required={true}
        onChange={(value) => setState(value)}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" className="w-1/3">Register</Button>
      </div>
    </form>
  )
}