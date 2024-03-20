import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function POST(req: Request) {
  try {
    const newExperience = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const experienceData = await db.experiences.upsert({
        where: {
          id: newExperience.id ? newExperience.id : "",
        },
        update: newExperience,
        create: {
          id: v4(),
          profile_id: profile_id,
          title: newExperience.title,
          type: newExperience.type,
          location: newExperience.location,
          location_type: newExperience.location_type,
          industry: newExperience.industry,
          description: newExperience.description,
          company: newExperience.company,
          end_date: new Date(newExperience.end_date)
            ?.toISOString()
            .toLocaleString(),
          start_date: new Date(newExperience.start_date)
            .toISOString()
            .toLocaleString(),
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      if (experienceData) return NextResponse.json(experienceData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[EXPERIENCE]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
