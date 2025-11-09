import Panel from "@/components/Panel";
import FormLogin from "@/components/FormLogin";
import AuthLink from "@/components/AuthLink";

export default function LoginPage() {
  return (
    <section>
      <div className="container flex justify-center items-center h-screen">
        <Panel className="w-full max-w-md">
          <FormLogin />
          <AuthLink />
        </Panel>
      </div>
    </section>
  )
}