import { SignOutButton } from "@clerk/nextjs";

export default function DashobardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignOutButton />
    </div>
  );
}
