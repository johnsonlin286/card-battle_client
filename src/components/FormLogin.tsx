'use client';

import Button from "./Button";
import TextInput from "./TextInput";

export default function FormLogin() {
  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
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
      <div className="flex justify-end">
        <Button type="submit" color="primary" className="w-1/3">Login</Button>
      </div>
    </form>
  )
}