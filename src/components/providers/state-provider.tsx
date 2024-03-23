"use client";
import {
  All_Skills,
  Available_skills,
  Category,
  Enviroments,
  Experiences,
  Group_Projects,
  Projects,
  Qualifications,
  Rule,
  profile,
} from "@/lib/supabase/supabase.types";
import { Skills } from "@prisma/client";
import { usePathname } from "next/navigation";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type ProfileWithQualificationWithExperienceWithSkillsWithProjects =
  profile & { qualifications: Qualifications[] | [] } & {
    projects: Projects[] | [];
  } & { skills: Skills[] | [] } & { experiences: Experiences[] | [] };

export type RuleWithAllSkill = Rule & {
  min_skills_required: All_Skills[] | [];
};
export type GroupProjectWithSkillsRequired = Group_Projects & {
  skills_required: Available_skills[] | [];
};
export type EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects =
  Partial<Enviroments> & {
    profiles: profile[] | [];
  } & { rule: RuleWithAllSkill } & {
    categories: Category[] | [];
  } & {
    groupProjects: GroupProjectWithSkillsRequired[];
  };

type Action =
  | {
      type: "UPDATE_PROFILE";
      payload: {
        profile: Partial<ProfileWithQualificationWithExperienceWithSkillsWithProjects>;
      };
    }
  | {
      type: "UPDATE_QUALIFICATIONS";
      payload: {
        qualification: Qualifications;
      };
    }
  | {
      type: "UPDATE_EXPERIENCES";
      payload: {
        experiences: Experiences;
      };
    }
  | {
      type: "SET_PROFILE";
      payload: {
        profile: Partial<ProfileWithQualificationWithExperienceWithSkillsWithProjects>;
      };
    }
  | { type: "CREATE_ENVIRONMENT"; payload: Partial<Enviroments> }
  | {
      type: "UPDATE_ENVIRONMENT";
      payload: {
        environment: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>;
        environmentId: string;
      };
    }
  | {
      type: "SET_ENVIRONMENTS";
      payload: {
        environments:
          | Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>[]
          | [];
      };
    }
  | {
      type: "SET_CURRENTENVIRONMENT";
      payload: {
        environment: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>;
      };
    };

interface AppState {
  currentEnvironemnt:
    | Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>
    | {};
  environments:
    | Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>[]
    | []; // Environments of which the apexian is a member of
  profile: ProfileWithQualificationWithExperienceWithSkillsWithProjects | {};
}

const initialState: AppState = {
  currentEnvironemnt: {},
  environments: [],
  profile: {},
};

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
      environmentId: string | undefined;
    }
  | undefined
>(undefined);

const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case "UPDATE_QUALIFICATIONS":
      return {
        ...state,
        profile: {
          ...state.profile,
          qualifications: (
            state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
          ).qualifications
            ? [
                ...(
                  state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                ).qualifications,
                action.payload.qualification,
              ]
            : [action.payload.qualification], // Handle empty qualifications
        },
      };
    case "UPDATE_EXPERIENCES":
      return {
        ...state,
        profile: {
          ...state.profile,
          experiences: (
            state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
          ).experiences
            ? [
                ...(
                  state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                ).experiences,
                action.payload.experiences,
              ]
            : [action.payload.experiences], // Handle empty qualifications
        },
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
      };

    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
      };

    case "UPDATE_ENVIRONMENT":
      return {
        ...state,
        environments:
          (
            state.environments as EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects[]
          ).length > 0
            ? state.environments.map((environment) => {
                if (environment.id === action.payload.environmentId) {
                  return {
                    ...(environment as EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects),
                    ...action.payload.environment,
                  };
                }
                return environment;
              })
            : [action.payload.environment],
      };

    case "SET_ENVIRONMENTS":
      return {
        ...state,
        environments: action.payload.environments,
      };

    case "SET_CURRENTENVIRONMENT":
      return {
        ...state,
        currentEnvironemnt: action.payload.environment,
      };

    default:
      return initialState;
  }
};

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const pathname = usePathname();

  const envPages = ["dashboard", "chats", "apexians", "projects"];
  const environmentId = useMemo(() => {
    const urlSegments = pathname?.split("/").filter(Boolean);
    if (urlSegments)
      if (urlSegments.length > 2 && envPages.includes(urlSegments[2])) {
        return urlSegments[1];
      }
  }, [pathname]);

  useEffect(() => {
    console.log("App State Changed", state);
  }, [state]);

  return (
    <AppStateContext.Provider
      value={{ state, dispatch, environmentId: environmentId }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
