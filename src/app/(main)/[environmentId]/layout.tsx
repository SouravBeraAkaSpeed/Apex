"use client";
import Header from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/dashboard/sidebar";
import {
  EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects,
  ProfileWithQualificationWithExperienceWithSkillsWithProjects,
  RuleWithAllSkill,
  useAppState,
} from "@/components/providers/state-provider";
import {
  fetchEnvironmentDetails,
  fetchEnvironments,
  fetchExperiences,
  fetchProfile,
  fetchProjects,
  fetchQualifications,
  fetchRules,
  fetchSkills,
} from "@/lib/supabase/queries";
import {
  Enviroments,
  Experiences,
  Projects,
  Qualifications,
} from "@/lib/supabase/supabase.types";
import { Skills as prismaSkills } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    environmentId: string;
  };
}) => {
  const [dataLoading, setDataLoading] = useState(true);
  const [rules, setRules] = useState<RuleWithAllSkill[]>([]);
  const { state, dispatch } = useAppState();
  const fetchData = async () => {
    setDataLoading(true);
    const rulesData: RuleWithAllSkill | null = await fetchRules(
      params.environmentId
    );
    // console.log(rulesData);
    // console.log("rules:", rulesData);
    // const apexians = await fetchEnvProfiles();
    const currentenvironment: Partial<Enviroments> | null =
      await fetchEnvironmentDetails(params.environmentId);

    const environemnts: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>[] =
      await fetchEnvironments();

    if (environemnts) {
      let updatedEnvironments: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>[] =
        [];
      console.log(environemnts);
      updatedEnvironments.push(...environemnts);
    }

    const qualificationData: Qualifications[] | null =
      await fetchQualifications();
    console.log("qualification:", qualificationData);
    const profile = await fetchProfile();
    const experienceData: Experiences[] | null = await fetchExperiences();
    const projectData: Projects[] | null = await fetchProjects();

    const skillsData: prismaSkills[] | null = await fetchSkills();
    let updatedProfile: Partial<ProfileWithQualificationWithExperienceWithSkillsWithProjects>;
    updatedProfile = profile;
    updatedProfile.qualifications = qualificationData;
    updatedProfile.experiences = experienceData;
    updatedProfile.projects = projectData;
    updatedProfile.skills = skillsData;

    dispatch({
      type: "UPDATE_PROFILE",
      payload: { profile: updatedProfile },
    });

    // console.log(environment);
    // const categoriesData: Category[] | null = await fetchCategories();
    // const groupProjectData: GroupProjectWithSkillsRequired[] | undefined =
    //   await fetchGroupProjects();
    if (currentenvironment) {
      let updatedEnvironment: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>;
      updatedEnvironment = currentenvironment ? currentenvironment : {};
      console.log(updatedEnvironment);
      // updatedEnvironment.profiles = apexians;
      updatedEnvironment.rule = rulesData ? rulesData : undefined;
      setRules(rulesData ? [rulesData] : []);
      // updatedEnvironment.groupProjects = groupProjectData;

      dispatch({
        type: "UPDATE_ENVIRONMENT",
        payload: {
          environment: updatedEnvironment,
          environmentId: params.environmentId,
        },
      });

      dispatch({
        type: "SET_CURRENTENVIRONMENT",
        payload: {
          environment: currentenvironment,
        },
      });
    }

    setDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading)
    return (
      <div className="flex text-black flex-1 justify-center items-center h-[300px]">
        <Loader2 className="h-7 w-7 text-black dark:text-white animate-spin my-4" />
        <p className="text-xs text-black dark:text-white ">
          Loading Your Environment...
        </p>
      </div>
    );

  return (
    <div className="lg:flex">
      <Header environmentId={params.environmentId} />
      <Sidebar environmentId={params.environmentId} />
      <div className="pl-10 lg:pl-[16rem] pt-20 lg:pt-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
