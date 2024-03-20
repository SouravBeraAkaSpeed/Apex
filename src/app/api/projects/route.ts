import { v4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function POST(req: Request) {
  try {
    const newProject = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const projectData = await db.projects.upsert({
        where: {
          id: newProject.id ? newProject.id : "",
        },
        update: newProject,
        create: {
          profile_id: profile_id,
          title: newProject.title,
          github_link: newProject.github_link,
          live_link: newProject.live_link,
          description: newProject.description,
          id: v4(),
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      if (projectData) return NextResponse.json(projectData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[PROJECTS]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
