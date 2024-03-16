import { Enviroments, profile } from "@/lib/supabase/supabase.types";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

type Action = { type: "CREATE_PROFILE"; payload: {} };

interface AppState {
  environments: Partial<Enviroments>[] | []; // Environments of which the apexian is a member of
  profile: Partial<profile>[] | [];
}

const AppStateContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
      workspaceId: string | undefined;
      folderId: string | undefined;
      fileId: string | undefined;
    }
  | undefined
>(undefined);

interface AppStateProviderProps {
  children: React.ReactNode;
}
const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  return <div>Page</div>;
};

export default AppStateProvider;
