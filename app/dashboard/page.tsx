import { Header, Main } from "@/components";
import { auth, currentUser } from "@clerk/nextjs/server";

import { SignOutButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user || !user.firstName || !user.lastName) {
    return null;
  }

  const simpleUser = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return (
    <>
      <Header user={simpleUser} />
      <Main>Dashboard</Main>
    </>
  );
}
