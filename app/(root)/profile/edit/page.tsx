import Profile from "@/components/forms/Profile";
import { getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const result = await getUserInfo({ userId });

  return (
    <div>
      <h1 className="text-xl">Edit Profile</h1>
      <Profile clerkId={userId} profileDetails={JSON.stringify(result.user)} />
    </div>
  );
};

export default Page;
