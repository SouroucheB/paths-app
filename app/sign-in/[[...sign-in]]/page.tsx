import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn />
    </div>
  );
}