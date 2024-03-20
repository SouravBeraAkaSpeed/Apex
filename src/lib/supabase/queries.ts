"use server";

import { redirect } from "next/navigation";
import { currentProfile } from "../currentProfile";
import { db } from "../db";
import { Experiences, Projects, Qualifications } from "./supabase.types";
import { Skills } from "@prisma/client";

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

export const fetchExperiences = async () => {
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let experiences: Experiences[] = [];

  try {
    experiences = await db.experiences.findMany({
      where: { profile_id: user.id },
    });

    return experiences;
  } catch (error) {
    console.log("ERROR_FETCH_EXPERIENCES: ", error);
    return experiences;
  }
};


export const fetchProjects = async () =>{
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let projects : Projects[] =[];
  try {
    projects = await db.projects.findMany({
      where: { profile_id: user.id },
    });

    return projects;
  } catch (error) {
    console.log("ERROR_FETCH_PROJECTS: ", error);
    return projects;
  }

}


export const fetchSkills = async () =>{
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let skills : Skills[] = [];
  try {
    skills = await db.skills.findMany({
      where: { profile_id: user.id },
    });

    return skills;
  } catch (error) {
    console.log("ERROR_FETCH_SKILLS: ", error);
    return skills;
  }

}