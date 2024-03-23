import { z } from "zod";
import {
  Badge_Type,
  Category,
  Enviroments,
  Rank,
  Skill_level,
} from "./supabase/supabase.types";
import { Privacy_type } from "@prisma/client";
export const FormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export const SignUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be minimum 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be minimum 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const PositionSchema = z.object({
  id: z.string().optional(), // Allow optional ID for updates
  rank: z.nativeEnum(Rank), // Use the Rank enum for validation
  level: z.number().positive().lte(10), // Level must be positive and less than or equal to 10
  profile_id: z.string(),
});
export const SkillsSchema = z.object({
  // Allow optional ID for updates
  skill: z.string(),
  Level: z.string(), // Use the Skill_level enum for validation
  // isVerified: z.boolean(),
  // profile_id: z.string().optional(), // Profile ID can be optional for referencing in projects or qualifications
  project_id: z.string().optional(), // Project ID can be optional for referencing a project skill
  qualification_id: z.string().optional(), // Qualification ID can be optional for referencing a qualification skill
});
export const ExperiencesSchema = z.object({
  title: z.string(),
  type: z.string(),
  company: z.string(),
  location: z.string(),
  location_type: z.string(),
  start_date: z.date(),
  end_date: z.date().optional(), // End date can be optional
  description: z.string(),
  industry: z.string(),
  // profile_id: z.string(),
});
export const QualificationsSchema = z.object({
  qualification: z.string(),
  school: z.string(),
  field_of_study: z.string(),
  start_date: z.date(),
  end_date: z.date().optional(), // End date can be optional
  grade: z.string().optional(), // Grade can be optional
  // isVerified: z.boolean(),
  document_url: z.string().optional(), // Optional document URL with validation
  // Skills: z.array(SkillsSchema), // Array of Skill schemas
  // profile_id: z.string(),
});

export const BadgesSchema = z.object({
  id: z.string().optional(), // Allow optional ID for updates
  badge_type: z.nativeEnum(Badge_Type), // Use the Badge_Type enum for validation
  badge_url: z.string().url("Invalid badge URL"),
  profile_id: z.string(),
});

export const ProjectsSchema = z.object({
  // skills_used: z.array(z.string()), // Array of skill IDs (reference skills by ID)
  github_link: z.string().url("Invalid GitHub link").optional(), // Optional GitHub link with validation
  live_link: z.string().url("Invalid live link").optional(), // Optional live link with validation
  description: z.string(),
  // profile_id: z.string(),
  title: z.string(),
});
export const ProfileFormSchema = z.object({
  firstname: z.string().describe("First name of the Apexian"),
  lastname: z.string().describe("Last name of the  Apexian"),
  profile_headline: z.string(),
  about: z.string().max(150, "About can have max 150 characters"),
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  onboarded: z.boolean(),
  linkedin_url: z.string().url("Invalid LinkedIn URL").optional(),
  x_url: z.string().url("Invalid X URL").optional(),
  github_url: z.string().url("Invalid GitHub URL"),
});

export const EnvironmentsSchema = z.object({
  // Allow optional ID for updates
  name: z.string(),
  description: z.string(),
  rule_id: z.string().optional(),
  environment_imgUrl: z.string(),
  // number_of_apexians: z.number().nonnegative(), // Number of members must be non-negative
  access_type: z.nativeEnum(Privacy_type), // Use the Privacy_type enum for validation
  // apexians: z.array(z.partial(profile)), // Array of partial profile objects (avoids unnecessary data transfer)
  // rules: z.unknown(), // This schema can reference a separate Rule schema if needed (details not provided)
  // categories: z.array(z.partial(Category)), // Array of partial Category objects
  // projects: z.array(z.partial(ProjectsSchema)), // Array of partial Project schemas
});

export const RuleSchema = z.object({
  // Allow optional ID for updates
  rank_required: z.string(), // Rank required for the rule
  min_level_required: z.string(), // Minimum level must be non-negative integer
  min_qualification_required: z.string(),
  min_skills_required: z.array(z.string()), // Max two skills (optional)
  // environment: z.lazy(() => EnvironmentsSchema), // Lazy reference to Environments schema
});
