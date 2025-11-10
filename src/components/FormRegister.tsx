'use client';

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchState } from "@/services/state";
import { QUERY_KEYS } from "@/utils/constant";
import Button from "./Button";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

export default function FormRegister() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countryKeyword, setCountryKeyword] = useState<string>('');
  const [countryData, setCountryData] = useState<SelectOption[]>([
    { value: 'indonesia', label: 'Indonesia' },
    { value: 'thailand', label: 'Thailand' },
    { value: 'philippines', label: 'Philippines' },
    { value: 'vietnam', label: 'Vietnam' },
    { value: 'malaysia', label: 'Malaysia' },
    { value: 'singapore', label: 'Singapore' },
  ]);

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
        isSearchable={true}
        label="State"
        name="state"
        placeholder="Select or search your country"
        options={countryData}
        value={selectedCountry}
        required={true}
        onKeywordChange={(value) => setCountryKeyword(value)}
        onChange={(value) => setSelectedCountry(value)}
        isLoading={isLoadingStates}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" className="w-1/3">Register</Button>
      </div>
    </form>
  )
}