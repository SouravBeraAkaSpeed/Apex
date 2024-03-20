import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { Skill_level } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const newSkill = await req.json();

    const Level = [
      Skill_level.Beginner,
      Skill_level.Intermediate,
      Skill_level.Advanced,
    ];

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const skillsData = await db.skills.upsert({
        where: {
          id: newSkill.id ? newSkill.id : "",
        },
        update: {
          ...newSkill,
          Level: Level[newSkill.Level] as Skill_level,
          project_id: newSkill.project_id ? newSkill.project_id : null,
          qualification_id: newSkill.qualification_id
            ? newSkill.qualification_id
            : null,
        },
        create: {
          profile_id: profile_id,
          skill: newSkill.skill,
          Level: Level[newSkill.Level] as Skill_level,
          project_id: newSkill.project_id ? newSkill.project_id : null,
          qualification_id: newSkill.qualification_id
            ? newSkill.qualification_id
            : null,
          id: v4(),
          isVerified: false,
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      if (skillsData) return NextResponse.json(skillsData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[SKILLS]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
