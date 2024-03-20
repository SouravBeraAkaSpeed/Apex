"use server";

import { redirect } from "next/navigation";
import { currentProfile } from "../currentProfile";
import { db } from "../db";
import { Qualifications } from "./supabase.types";

export const fetchQualifications = async () => {
  const user = await currentProfile();
  if (!user) return redirect("/login");
  let qualifications: Qualifications[] = [];
  try {
    qualifications = await db.qualifications.findMany({
      where: { profile_id: user.id },
    });

    return qualifications;
  } catch (error) {
    console.log("ERROR_FETCH_QUALIFICATIONS: ", error);
    return qualifications;
  }
};

export const fetchProfile = async () => {
  const user = await currentProfile();
  if (!user) return redirect("/login");
  return user;
};
