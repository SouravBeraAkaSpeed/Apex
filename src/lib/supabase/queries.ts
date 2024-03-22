"use server";

import { redirect } from "next/navigation";
import { currentProfile } from "../currentProfile";
import { db } from "../db";
import {
  Enviroments,
  Experiences,
  Projects,
  Qualifications,
} from "./supabase.types";
import { All_Skills, Skills } from "@prisma/client";
import { RuleWithAllSkill } from "@/components/providers/state-provider";

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

export const fetchProjects = async () => {
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let projects: Projects[] = [];
  try {
    projects = await db.projects.findMany({
      where: { profile_id: user.id },
    });

    return projects;
  } catch (error) {
    console.log("ERROR_FETCH_PROJECTS: ", error);
    return projects;
  }
};

export const fetchSkills = async () => {
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let skills: Skills[] = [];
  try {
    skills = await db.skills.findMany({
      where: { profile_id: user.id },
    });

    return skills;
  } catch (error) {
    console.log("ERROR_FETCH_SKILLS: ", error);
    return skills;
  }
};

export const uploadProfilePicture = async ({
  profile_picture,
  id,
}: {
  profile_picture: string;
  id: string;
}) => {
  const user = await currentProfile();
  if (!user) return redirect("/login");
  try {
    const profile = await db.profile.update({
      where: {
        id: id,
      },
      data: {
        profile_picture: profile_picture,
      },
    });

    return profile;
  } catch (error) {
    console.log("[UPLOAD_PROFILE_PICTURE]", error);
    return user;
  }
};

export const fetchAllSkills = async () => {
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let allSkills: All_Skills[] = [];

  try {
    allSkills = await db.all_Skills.findMany({
      where: {},
    });
    return allSkills;
  } catch (error) {
    console.log("[FETCH_ALL_SKILL_ERROR]", error);
  }
};

export const fetchRules = async (environment_id: string) => {
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let rulesWithAllSkillsData: RuleWithAllSkill | null = null;
  try {
    rulesWithAllSkillsData = await db.rule.findFirst({
      where: {
        environment_id: environment_id,
      },
      include:{
        min_skills_required:true
      }
    }) ;

    return rulesWithAllSkillsData;
  } catch (error) {
    console.log("[FETCH_RULES_WITH_ALLSKILLS]", error);
    return rulesWithAllSkillsData;
  }
};

export const fetchEnvironmentDetails = async (environment_id: string) => {
  const user = await currentProfile();
  if (!user) return redirect("/login");

  let environmentData: Partial<Enviroments> | null = {};

  try {
    environmentData = await db.enviroments.findUnique({
      where:{
        id:environment_id
      }
    })
    
    return environmentData
  } catch (error) {
    console.log("[FETCH_ENVIRONMENT_DETAILS]", error);
    return environmentData;
  }
};
