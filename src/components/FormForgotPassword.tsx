'use client';

import Button from "./Button"
import TextInput from "./TextInput"

export default function FormForgotPassword() {
  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
      <p className="text-sm text-gray-500 text-center">Enter your email to receive a link to reset your password</p>
      <TextInput
        id="email"
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required={true}
        onChange={() => {}}
      />
      <div className="flex justify-end">
        <Button type="submit" color="primary" className="w-1/3">Request Password Reset</Button>
      </div>
    </form>
  )
}