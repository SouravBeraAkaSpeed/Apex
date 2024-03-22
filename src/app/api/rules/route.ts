import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function POST(req: Request) {
  try {
    const newRule = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if(!newRule.id){

      const ruleExist = await db.rule.findFirst({
        where:{
          environment_id:newRule.environment_id,
        }
      })

      if(ruleExist){
        return  new Response('This Environment already has a Rule',{status : 200})
      }
    }

    if (profile_id) {
      const ruleData = await db.rule.upsert({
        where: {
          id: newRule.id ? newRule.id : "",
        },
        update: {
          ...newRule,
          min_skills_required: {
            connect: newRule.min_skills_required.map((skill: string[]) => ({
              id: skill,
            })),
          },
        },
        create: {
          rank_required: newRule.rank_required,
          min_level_required: newRule.min_level_required,
          id: v4(),
          environment_id: newRule.environment_id,
          min_skills_required: {
            connect: newRule.min_skills_required.map((skill: string[]) => ({
              id: skill,
            })),
          },

          min_qualification_required: newRule.min_qualification_required,
        },
      });
      if (ruleData) return NextResponse.json(ruleData);
    } else {
      console.log("No Profile Id found!");
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[RULES]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
