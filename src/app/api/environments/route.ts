import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { Privacy_type } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const newEnvironment = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const environmentData = await db.enviroments.upsert({
        where: {
          id: newEnvironment.id ? newEnvironment.id : "",
        },
        update: newEnvironment,
        create: {
          access_type: newEnvironment.access_type
            ? newEnvironment.access_type
            : Privacy_type.PUBLIC,
          environment_ownerId: profile_id,
          name: newEnvironment.name ? newEnvironment.name : null,
          number_of_apexians: 0,
          description: newEnvironment.description
            ? newEnvironment.description
            : null,
          environment_imgUrl: newEnvironment.environment_imgUrl
            ? newEnvironment.environment_imgUrl
            : null,
          id: v4(),
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      if (environmentData) return NextResponse.json(environmentData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[ENVIRONMENT]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
