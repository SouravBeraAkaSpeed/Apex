export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _All_SkillsToRule: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [];
      };
      _Available_skillsToGroup_Projects: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [];
      };
      _EnviromentsToprofile: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [];
      };
      All_Skills: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      Available_skills: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      Badges: {
        Row: {
          badge_type: Database["public"]["Enums"]["Badge_Type"];
          badge_url: string;
          id: string;
          profile_id: string;
        };
        Insert: {
          badge_type: Database["public"]["Enums"]["Badge_Type"];
          badge_url: string;
          id: string;
          profile_id: string;
        };
        Update: {
          badge_type?: Database["public"]["Enums"]["Badge_Type"];
          badge_url?: string;
          id?: string;
          profile_id?: string;
        };
        Relationships: [];
      };
      Category: {
        Row: {
          environment_id: string;
          id: string;
          name: string;
        };
        Insert: {
          environment_id: string;
          id: string;
          name: string;
        };
        Update: {
          environment_id?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      Environment: {
        Row: {
          access_type: Database["public"]["Enums"]["Privacy_type"];
          description: string;
          id: string;
          name: string;
          number_of_apexians: number;
          rule_id: string | null;
        };
        Insert: {
          access_type?: Database["public"]["Enums"]["Privacy_type"];
          description: string;
          id: string;
          name: string;
          number_of_apexians?: number;
          rule_id?: string | null;
        };
        Update: {
          access_type?: Database["public"]["Enums"]["Privacy_type"];
          description?: string;
          id?: string;
          name?: string;
          number_of_apexians?: number;
          rule_id?: string | null;
        };
        Relationships: [];
      };
      Experiences: {
        Row: {
          company: string;
          description: string;
          end_date: string;
          id: string;
          industry: string;
          location: string;
          location_type: string;
          profile_id: string;
          start_date: string;
          title: string;
          type: string;
        };
        Insert: {
          company: string;
          description: string;
          end_date: string;
          id: string;
          industry: string;
          location: string;
          location_type: string;
          profile_id: string;
          start_date: string;
          title: string;
          type: string;
        };
        Update: {
          company?: string;
          description?: string;
          end_date?: string;
          id?: string;
          industry?: string;
          location?: string;
          location_type?: string;
          profile_id?: string;
          start_date?: string;
          title?: string;
          type?: string;
        };
        Relationships: [];
      };
      Group_Projects: {
        Row: {
          description: string;
          enviroment_id: string;
          expected_duration: number;
          id: string;
          prize: number;
        };
        Insert: {
          description: string;
          enviroment_id: string;
          expected_duration: number;
          id: string;
          prize: number;
        };
        Update: {
          description?: string;
          enviroment_id?: string;
          expected_duration?: number;
          id?: string;
          prize?: number;
        };
        Relationships: [];
      };
      Position: {
        Row: {
          createdAt: string;
          id: string;
          level: number;
          profile_id: string;
          rank: Database["public"]["Enums"]["Rank"];
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          level?: number;
          profile_id: string;
          rank?: Database["public"]["Enums"]["Rank"];
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          level?: number;
          profile_id?: string;
          rank?: Database["public"]["Enums"]["Rank"];
          updatedAt?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          about: string | null;
          createdAt: string;
          email: string;
          firstname: string | null;
          github_url: string | null;
          id: string;
          lastname: string | null;
          linkedin_url: string | null;
          onboarded: boolean;
          profile_headline: string | null;
          profile_picture: string | null;
          updatedAt: string;
          x_url: string | null;
        };
        Insert: {
          about?: string | null;
          createdAt?: string;
          email: string;
          firstname?: string | null;
          github_url?: string | null;
          id: string;
          lastname?: string | null;
          linkedin_url?: string | null;
          onboarded?: boolean;
          profile_headline?: string | null;
          profile_picture?: string | null;
          updatedAt?: string;
          x_url?: string | null;
        };
        Update: {
          about?: string | null;
          createdAt?: string;
          email?: string;
          firstname?: string | null;
          github_url?: string | null;
          id?: string;
          lastname?: string | null;
          linkedin_url?: string | null;
          onboarded?: boolean;
          profile_headline?: string | null;
          profile_picture?: string | null;
          updatedAt?: string;
          x_url?: string | null;
        };
        Relationships: [];
      };
      Projects: {
        Row: {
          description: string;
          github_link: string;
          id: string;
          live_link: string;
          profile_id: string;
        };
        Insert: {
          description: string;
          github_link: string;
          id: string;
          live_link: string;
          profile_id: string;
        };
        Update: {
          description?: string;
          github_link?: string;
          id?: string;
          live_link?: string;
          profile_id?: string;
        };
        Relationships: [];
      };
      Qualifications: {
        Row: {
          createdAt: string;
          document_url: string | null;
          end_date: string;
          field_of_study: string;
          grade: string;
          id: string;
          isVerified: boolean;
          profile_id: string;
          qualification: string;
          school: string;
          start_date: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          document_url?: string | null;
          end_date: string;
          field_of_study: string;
          grade: string;
          id: string;
          isVerified?: boolean;
          profile_id: string;
          qualification: string;
          school: string;
          start_date: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          document_url?: string | null;
          end_date?: string;
          field_of_study?: string;
          grade?: string;
          id?: string;
          isVerified?: boolean;
          profile_id?: string;
          qualification?: string;
          school?: string;
          start_date?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      Rule: {
        Row: {
          environment_id: string;
          id: string;
          min_level_required: number;
          min_qualification_required: string;
          rank_required: string;
        };
        Insert: {
          environment_id: string;
          id: string;
          min_level_required: number;
          min_qualification_required: string;
          rank_required: string;
        };
        Update: {
          environment_id?: string;
          id?: string;
          min_level_required?: number;
          min_qualification_required?: string;
          rank_required?: string;
        };
        Relationships: [];
      };
      Skills: {
        Row: {
          id: string;
          isVerified: boolean;
          Level: Database["public"]["Enums"]["Skill_level"];
          profile_id: string;
          project_id: string | null;
          qualification_id: string | null;
          skill: string;
        };
        Insert: {
          id: string;
          isVerified?: boolean;
          Level?: Database["public"]["Enums"]["Skill_level"];
          profile_id: string;
          project_id?: string | null;
          qualification_id?: string | null;
          skill: string;
        };
        Update: {
          id?: string;
          isVerified?: boolean;
          Level?: Database["public"]["Enums"]["Skill_level"];
          profile_id?: string;
          project_id?: string | null;
          qualification_id?: string | null;
          skill?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          billing_address: Json | null;
          email: string;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          profile_picture: string | null;
        };
        Insert: {
          billing_address?: Json | null;
          email: string;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          profile_picture?: string | null;
        };
        Update: {
          billing_address?: Json | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          profile_picture?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Badge_Type:
        | "Discussion_Dynamo"
        | "Nextjs_Ninja"
        | "Project_Visionary"
        | "Code_Connoisseur"
        | "Deployment_Dynamo"
        | "Deep_Learning_Disciple"
        | "Model_Maestro"
        | "Cloud_Commander"
        | "Security_Sentinel"
        | "Problem_Solving_Sleuth"
        | "Testing_Titan";
      Privacy_type: "PRIVATE" | "PUBLIC";
      Rank:
        | "Platform_Pioneer"
        | "Neural_Network_Architect"
        | "Data_Alchemist"
        | "Algorithmic_Strategist"
        | "Machine_Learning_Mastermind"
        | "Security_Sentinel"
        | "Cloud_Maestro"
        | "UI_UX_Architect";
      Skill_level: "Beginner" | "Intermediate" | "Advanced";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;

export type Enviroments = {
  id: String;
  name: String; // Name of the group
  description: String; // About the Group
  rule_id: String;
  number_of_apexians: number; // Number of members of the environment
  access_type: Privacy_type; //  Access Type of the group. If it is private then only members can see the details if public anyone
  apexians: profile[]; // List of Members of the group
  rules: Rule; // ranks , level , qualifications , skills can be used to define rules to for accessing the Environment.
  categories: Category[];
  projects: Group_Projects[];
};

enum Privacy_type {
  PRIVATE,
  PUBLIC,
}


export type profile = {
  id: String;
  firstname: String; // firstname of the developer
  lastname: String; //lastname of the developer
  profile_headline: String; // profile headline to be shown beneath the name
  profile_picture: String; //  profile picture of the user
  about: String; // about the developer
  email: String;
  onboarded: Boolean;
  linkedin_url: String; // linkedin url of the developer
  x_url: String; //  X url of the developer (twitter)
  github_url: String; // github url of the developer
  positions: Position[]; // ranks of the developer
  qualifications: Qualifications[]; // qualification of the developer
  badges: Badges[]; // badges of the developer
  projects: Projects[]; // projects of the developer
  experiences: Experiences[]; // experiences of the developer
  skills: Skills[]; // skills of the developer
  environments: Enviroments[];
};

export type Rule = {};
export type Badges = {};
export type Category = {};
export type Projects = {};
export type Group_Projects = {};
export type Skills = {};
export type Position = {};
export type Qualifications = {};
export type Experiences = {};
