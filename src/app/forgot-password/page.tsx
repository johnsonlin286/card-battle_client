import Panel from "@/components/Panel";
import FormForgotPassword from "@/components/FormForgotPassword";
import AuthLink from "@/components/AuthLink";

export default function ForgotPasswordPage() {
  return (
    <section>
      <div className="container flex justify-center items-center h-dvh">
        <Panel className="w-full max-w-lg">
          <FormForgotPassword />
          <AuthLink />
        </Panel>
      </div>
    </section>
  )
}