export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _All_SkillsToRule: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: []
      }
      _Available_skillsToGroup_Projects: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: []
      }
      _EnviromentsToprofile: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: []
      }
      All_Skills: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Available_skills: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Badges: {
        Row: {
          badge_type: Database["public"]["Enums"]["Badge_Type"]
          badge_url: string
          createdAt: string
          id: string
          profile_id: string
          updatedAt: string
        }
        Insert: {
          badge_type: Database["public"]["Enums"]["Badge_Type"]
          badge_url: string
          createdAt?: string
          id: string
          profile_id: string
          updatedAt: string
        }
        Update: {
          badge_type?: Database["public"]["Enums"]["Badge_Type"]
          badge_url?: string
          createdAt?: string
          id?: string
          profile_id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Category: {
        Row: {
          environment_id: string
          id: string
          name: string
        }
        Insert: {
          environment_id: string
          id: string
          name: string
        }
        Update: {
          environment_id?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      Environment: {
        Row: {
          access_type: Database["public"]["Enums"]["Privacy_type"]
          createdAt: string
          description: string
          environment_imgUrl: string | null
          environment_ownerId: string
          id: string
          name: string
          number_of_apexians: number
          rule_id: string | null
          updatedAt: string
        }
        Insert: {
          access_type?: Database["public"]["Enums"]["Privacy_type"]
          createdAt?: string
          description: string
          environment_imgUrl?: string | null
          environment_ownerId: string
          id: string
          name: string
          number_of_apexians?: number
          rule_id?: string | null
          updatedAt: string
        }
        Update: {
          access_type?: Database["public"]["Enums"]["Privacy_type"]
          createdAt?: string
          description?: string
          environment_imgUrl?: string | null
          environment_ownerId?: string
          id?: string
          name?: string
          number_of_apexians?: number
          rule_id?: string | null
          updatedAt?: string
        }
        Relationships: []
      }
      Experiences: {
        Row: {
          company: string
          createdAt: string
          description: string
          end_date: string
          id: string
          industry: string
          location: string
          location_type: string
          profile_id: string
          start_date: string
          title: string
          type: string
          updatedAt: string
        }
        Insert: {
          company: string
          createdAt?: string
          description: string
          end_date: string
          id: string
          industry: string
          location: string
          location_type: string
          profile_id: string
          start_date: string
          title: string
          type: string
          updatedAt: string
        }
        Update: {
          company?: string
          createdAt?: string
          description?: string
          end_date?: string
          id?: string
          industry?: string
          location?: string
          location_type?: string
          profile_id?: string
          start_date?: string
          title?: string
          type?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Group_Projects: {
        Row: {
          createdAt: string
          description: string
          enviroment_id: string
          expected_duration: number
          id: string
          prize: number
          status: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description: string
          enviroment_id: string
          expected_duration: number
          id: string
          prize: number
          status: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string
          enviroment_id?: string
          expected_duration?: number
          id?: string
          prize?: number
          status?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Position: {
        Row: {
          createdAt: string
          id: string
          level: number
          profile_id: string
          rank: Database["public"]["Enums"]["Rank"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          level?: number
          profile_id: string
          rank?: Database["public"]["Enums"]["Rank"]
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          level?: number
          profile_id?: string
          rank?: Database["public"]["Enums"]["Rank"]
          updatedAt?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          about: string | null
          avatar_url: string | null
          createdAt: string
          email: string
          firstname: string | null
          github_url: string | null
          id: string
          lastname: string | null
          linkedin_url: string | null
          onboarded: boolean
          profile_headline: string | null
          profile_picture: string | null
          updatedAt: string
          x_url: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          createdAt?: string
          email: string
          firstname?: string | null
          github_url?: string | null
          id: string
          lastname?: string | null
          linkedin_url?: string | null
          onboarded?: boolean
          profile_headline?: string | null
          profile_picture?: string | null
          updatedAt?: string
          x_url?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          createdAt?: string
          email?: string
          firstname?: string | null
          github_url?: string | null
          id?: string
          lastname?: string | null
          linkedin_url?: string | null
          onboarded?: boolean
          profile_headline?: string | null
          profile_picture?: string | null
          updatedAt?: string
          x_url?: string | null
        }
        Relationships: []
      }
      Projects: {
        Row: {
          createdAt: string
          description: string
          github_link: string
          id: string
          live_link: string
          profile_id: string
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description: string
          github_link: string
          id: string
          live_link: string
          profile_id: string
          title: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string
          github_link?: string
          id?: string
          live_link?: string
          profile_id?: string
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Qualifications: {
        Row: {
          createdAt: string
          document_url: string | null
          end_date: string
          field_of_study: string
          grade: string
          id: string
          isVerified: boolean
          profile_id: string
          qualification: string
          school: string
          start_date: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          document_url?: string | null
          end_date: string
          field_of_study: string
          grade: string
          id: string
          isVerified?: boolean
          profile_id: string
          qualification: string
          school: string
          start_date: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          document_url?: string | null
          end_date?: string
          field_of_study?: string
          grade?: string
          id?: string
          isVerified?: boolean
          profile_id?: string
          qualification?: string
          school?: string
          start_date?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Rule: {
        Row: {
          environment_id: string
          id: string
          min_level_required: number
          min_qualification_required: string
          rank_required: string
        }
        Insert: {
          environment_id: string
          id: string
          min_level_required: number
          min_qualification_required: string
          rank_required: string
        }
        Update: {
          environment_id?: string
          id?: string
          min_level_required?: number
          min_qualification_required?: string
          rank_required?: string
        }
        Relationships: []
      }
      Skills: {
        Row: {
          createdAt: string
          id: string
          isVerified: boolean
          Level: Database["public"]["Enums"]["Skill_level"]
          profile_id: string
          project_id: string | null
          qualification_id: string | null
          skill: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          isVerified?: boolean
          Level?: Database["public"]["Enums"]["Skill_level"]
          profile_id: string
          project_id?: string | null
          qualification_id?: string | null
          skill: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          isVerified?: boolean
          Level?: Database["public"]["Enums"]["Skill_level"]
          profile_id?: string
          project_id?: string | null
          qualification_id?: string | null
          skill?: string
          updatedAt?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          billing_address: Json | null
          email: string
          full_name: string | null
          id: string
          payment_method: Json | null
          profile_picture: string | null
        }
        Insert: {
          billing_address?: Json | null
          email: string
          full_name?: string | null
          id: string
          payment_method?: Json | null
          profile_picture?: string | null
        }
        Update: {
          billing_address?: Json | null
          email?: string
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          profile_picture?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
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
        | "Testing_Titan"
      Privacy_type: "PRIVATE" | "PUBLIC"
      Rank:
        | "Platform_Pioneer"
        | "Neural_Network_Architect"
        | "Data_Alchemist"
        | "Algorithmic_Strategist"
        | "Machine_Learning_Mastermind"
        | "Security_Sentinel"
        | "Cloud_Maestro"
        | "UI_UX_Architect"
      Skill_level: "Beginner" | "Intermediate" | "Advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type Enviroments = {
  id: string;
  name: string; // Name of the group
  environment_ownerId: string;
  description: string; // About the Group
  rule_id: string;
  number_of_apexians: number; // Number of members of the environment
  access_type: Privacy_type; //  Access Type of the group. If it is private then only members can see the details if public anyone
  // apexians: Partial<profile>[]; // List of Members of the group
  // rules: Rule; // ranks , level , qualifications , skills can be used to define rules to for accessing the Environment.
  // categories: Category[];
  // projects: Partial<Group_Projects>[];
  createdAt: Date;
  updatedAt: Date;
};

export enum Privacy_type {
  PRIVATE,
  PUBLIC,
}

export type profile = {
  id: string;
  firstname: string | null; // firstname of the developer
  lastname: string | null; //lastname of the developer
  profile_headline: string | null; // profile headline to be shown beneath the name
  profile_picture: string | null; //  profile picture of the user
  avatar_url: string | null;
  about: string | null; // about the developer
  email: string;
  onboarded: Boolean;
  linkedin_url: string | null; // linkedin url of the developer
  x_url: string | null; //  X url of the developer (twitter)
  github_url: string | null; // github url of the developer
  createdAt: Date;
  updatedAt: Date;
};

export type All_Skills = {
  id: string;
  name: string; // Name of the skill
  // rule: Rule[]; // rules with which  this skill is associated.
};

export type Rule = {
  id: string;
  rank_required: string; // Rank required for the rule
  min_level_required: number; // minimum  level required for the rule
  min_qualification_required: string; //  Minimum qualifications required for the rule
  environment_id: string; // environment  where the rule applies to
  // min_skills_required: All_Skills[]; // Max two skills can be choosed
};

export enum Badge_Type {
  Discussion_Dynamo, //Awarded for consistently participating in discussions and providing valuable insights. // Criteria : Participated in the discussions more then 10 time.
  Nextjs_Ninja, // Awarded for demonstrating proficiency in using Next.js within the platform. // Criteria : Completed atleast 3 nextjs projects
  Project_Visionary, // Badge given for completing and showcasing a remarkable project built using the platform. Criteria ; Completed atleast 10 projects
  Code_Connoisseur, // Awarded for writing clean, efficient, and well-documented code.
  Deployment_Dynamo, // Award for completing 3 consecutive successfull deployments.
  Deep_Learning_Disciple, // Awarded for successfully applying deep learning techniques within the platform.
  Model_Maestro, // Badge recognizing expertise in designing, training, and evaluating machine learning models.
  Cloud_Commander, // Awarded for efficiently managing and optimizing cloud infrastructure.
  Security_Sentinel, //   Badge recognizing the implementation of robust security measures within the platform.
  Problem_Solving_Sleuth, //Badge given for effectively debugging and resolving complex technical issues
  Testing_Titan, //Awarded for creating comprehensive and effective unit and integration tests.
}
export type Badges = {
  id: string;
  badge_type: Badge_Type;
  badge_url: string;
  profile_id: string; //Profile to which the badge belong to
  // profile: profile;
};
export type Category = {
  id: string;
  name: string; // categories can be  Web Development , App Developement , Ai and Machine Learning etc.
  environment_id: string; //  Environment in which category is used
  // environment: Enviroments;
};
export type Projects = {
  id: string;
  title: string;
  // skills_used: Skills[]; // Skill used in the project
  github_link: string; // github link of the project
  live_link: string; // Live link of the project
  description: string; // Description of the project
  profile_id: string; //profile to which the project belong to
  // profile: profile;
  createdAt: Date;
  updatedAt: Date;
};
export type Available_skills = {
  id: string;
  name: string; // Name of the skill
  // group_projects: Group_Projects[]; // Projects that use this skill
};

export type Group_Projects = {
  id: string;
  // skills_required: Available_skills[]; // Skill used in the project
  description: string; // Description of the project
  prize: number; // Prize offered by the Group Owner
  expected_duration: number; // Expected duration of the project in days.
  enviroment_id: string; //profile to which the project belong to
  // enviroment: Enviroments;
  createdAt: Date;
  updatedAt: Date;
};
export enum Skill_level {
  Beginner,
  Intermediate,
  Advanced,
}

export type Skills = {
  id: string;
  skill: string; // App Development , Web Development
  Level: Skill_level; // Level of skill
  isVerified: Boolean; // Skill is verified on not
  profile_id: string; // Profile to which the skill belongs to
  project_id?: string; // project from which the skill availed from
  qualification_id?: string; // qualification  from which the skill availed from
  // profile: profile;
  // project: Projects;
  // qualification: Qualifications;
  createdAt: Date;
  updatedAt: Date;
};
export enum Rank {
  Platform_Pioneer, // Initial Level of all Developers
  Neural_Network_Architect, // Ai Engineer who designs and builds neural network models for the platform
  Data_Alchemist, // Data Scientist who prepares, cleans, and manipulates data for effective AI training.
  Algorithmic_Strategist, // DSA engineer who Selects and implements suitable algorithms for platform tasks.
  Machine_Learning_Mastermind, //  Possesses the highest level of expertise in machine learning techniques.
  Security_Sentinel, // Cyber Engineer who implements robust security measures to protect the platform and its AI components.
  Cloud_Maestro, // Cloud Engineer who  manages and optimizes cloud infrastructure for efficient performance.
  UI_UX_Architect, //Ui Ux Designer who Designs user interfaces optimized for better interaction.
}
export type Position = {
  id: string;
  rank: Rank; // Based on skills , qualification and projects (priority based on same hirerachy)
  level: number; // ( Lv1 to Lv10)
  profile_id: string; // profile to which the position belong to
  // profile: profile;
};
export type Qualifications = {
  id: string;
  qualification: string; //Example Bachelor's in Technology
  school: string; // Boston University
  field_of_study: string; //Business
  start_date: Date; // start date of the qualification
  end_date: Date; // (or expected)
  grade: string; // grade in the qualification
  isVerified: Boolean; // Verification takes around 30 mins and sometimes 1 day or more .
  document_url: string | null; // Document related to qualification used for verification
  // Skills: Skills[]; // All the skills  should be mentioned in the certificate provided by you  for verification purposes.
  profile_id: string; // profile to which the Qualification belong to
  // profile: profile;
  createdAt: Date;
  updatedAt: Date;
};

export type Experiences = {
  id: string;
  title: string; // Software Developer
  type: string; // Full time
  company: string; // Google
  location: string; // san francisco
  location_type: string; // Remote
  start_date: Date; // Feb 1 , 2020
  end_date: Date; // April 20 , 2023
  description: string; // Worked as software developer for the website
  industry: string; // Software Development
  profile_id: string; // profile to which  this experience belong to
  createdAt: Date;
  updatedAt: Date;
  // profile: profile;
};
