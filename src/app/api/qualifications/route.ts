import { v4 } from "uuid";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

export async function POST(req: Request) {
  try {
    const {
      qualification,
      school,
      field_of_study,
      start_date,
      end_date,
      grade,
      document_url,
    } = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile_id = profile.id;
    if (profile_id) {
      const qualificationData = await db.qualifications.create({
        data: {
          document_url: document_url,
          end_date: new Date(end_date)?.toISOString().toLocaleString(),
          field_of_study: field_of_study,
          grade: grade,
          id: v4(),
          isVerified: false,
          profile_id: profile_id,
          qualification: qualification,
          school: school,
          start_date: new Date(start_date).toISOString().toLocaleString(),
          updatedAt: new Date().toISOString().toLocaleString(),
        },
      });
      return NextResponse.json(qualificationData);
    } else {
      return new NextResponse("No Profile Id found!", { status: 404 });
    }
  } catch (error) {
    console.log("[QUALIFICATIONS]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
