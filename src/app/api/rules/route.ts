import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { All_Skills } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const newRule = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const ruleData = await db.rule.upsert({
        where: {
          id: newRule.id ? newRule.id : "",
        },
        update: newRule,
        create: {
          rank_required: newRule.rank_required,
          min_level_required: newRule.min_level_required,
          id: v4(),
          environment_id: newRule.enviroment_id,
          min_skills_required: {
            connect: newRule.min_skills_required.map((skill: All_Skills) => ({
              id: skill.id,
            })),
          },
          min_qualification_required: newRule.min_qualification_required,
        },
      });
      if (ruleData) return NextResponse.json(ruleData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[RULES]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
