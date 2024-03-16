"use client";
import { Enviroments, profile } from "@/lib/supabase/supabase.types";
import { usePathname } from "next/navigation";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

type Action =
  | {
      type: "UPDATE_PROFILE";
      payload: { profile: Partial<profile>; profileId: string };
    }
  | {
      type: "SET_PROFILE";
      payload: { profile: Partial<profile> };
    }
  | { type: "CREATE_ENVIRONMENT"; payload: Partial<Enviroments> }
  | {
      type: "UPDATE_ENVIRONMENT";
      payload: { environment: Partial<Enviroments>; environmentId: string };
    }
  | {
      type: "SET_ENVIRONMENTS";
      payload: { environments: Partial<Enviroments>[] | [] };
    };

interface AppState {
  environments: Partial<Enviroments>[] | []; // Environments of which the apexian is a member of
  profile: Partial<profile>;
}

const initialState: AppState = { environments: [], profile: {} };

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
    case "CREATE_ENVIRONMENT":
      return {
        ...state,
        environments: [...state.environments, action.payload],
      };
    case "UPDATE_ENVIRONMENT":
      return {
        ...state,
        environments: state.environments.map((environment) => {
          console.log("check: ", environment, action.payload);
          if (environment.id === action.payload.environmentId) {
            console.log("updated environment:", {
              ...environment,
              ...action.payload.environment,
            });
            return {
              ...environment,
              ...action.payload.environment,
            };
          }
          return environment;
        }),
      };
    case "SET_ENVIRONMENTS":
      return {
        ...state,
        environments: action.payload.environments,
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
