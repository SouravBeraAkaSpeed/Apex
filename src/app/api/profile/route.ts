import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function POST(req: Request) {
  try {
    const newProfile = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const profileData = await db.profile.upsert({
        where: {
          id: profile_id ? profile_id : "",
        },
        update: {
          ...newProfile,
          onboarded: true,
        },
        create: {
          id: v4(),
          firstname: newProfile.firstname,
          lastname: newProfile.lastname,
          profile_headline: newProfile.headline,
          profile_picture: newProfile.profile_picture,
          avatar_url: newProfile.avatar_url,
          linkedin_url: newProfile.linkedin_url,
          x_url: newProfile.x_url,
          github_url: newProfile.github_url,
          onboarded: true,
          email: newProfile.email,
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      if (profileData) return NextResponse.json(profileData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[PROFILE]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
