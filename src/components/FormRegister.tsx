import Button from "./Button";
import TextInput from "./TextInput";

export default function FormRegister() {
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
      <div className="flex justify-end">
        <Button type="submit" color="primary" className="w-1/3">Register</Button>
      </div>
    </form>
  )
}