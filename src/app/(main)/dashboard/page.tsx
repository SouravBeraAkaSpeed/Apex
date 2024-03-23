import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


const Page = async () => {
  const profile = await currentProfile();

  if (!profile) redirect("/login");

  const env = await db.enviroments.findFirst({
    where: {
      environment_ownerId: profile.id,
    },
  });

  if (!env) redirect("/create-environment");

  return redirect(`${env.id}/dashboard`);
};

export default Page;
