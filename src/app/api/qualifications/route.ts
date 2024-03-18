import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function POST(req: Request) {
  try {
    const newQualification = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;

    if (profile_id) {
      const qualificationData = await db.qualifications.upsert({
        where: {
          id: newQualification.id ?  newQualification.id : "" ,
        },
        update: newQualification,
        create: {
          profile_id: profile_id,
          qualification: newQualification.qualification,
          school: newQualification.school,
          field_of_study: newQualification.field_of_study,
          grade: newQualification.grade,
          document_url: newQualification.document_url,
          end_date: new Date(newQualification.end_date)
            ?.toISOString()
            .toLocaleString(),
          id: v4(),
          isVerified: false,
          start_date: new Date(newQualification.start_date)
            .toISOString()
            .toLocaleString(),
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      if (qualificationData) return NextResponse.json(qualificationData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[QUALIFICATIONS]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
