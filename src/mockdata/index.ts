import { Group_Projects, ProjectStatus } from "@/lib/supabase/supabase.types";
import { PassThrough } from "stream";

export let IS_USER_SESSION = false;

export let IS_FIRST_TIME = true;

export const GROUP_DETAILS = {
  environment_name: "Blazing AI",
  profile: "/boardApe.png",
  badge: "model_maestro",
  projects_completed: 68,
};
export const USER = {
  id: "1",
  email: "vishal.test@gmail.com",
  password: "123123",
};

export const USER_ONBOARDING_DETAILS = {
  username: "Vishal",
  firstName: "Vishal",
  email: "vishal@gmail.com",
  lastName: "M",
  profilePicture: "/boardApe.png",
  headline: "CEO of earth",
  hasExperience: true,
  education: [
    {
      school: "Name of School",
      address: "Address",
      course:
        "Course Name",
      from: "from",
      to: "to",
    },
  ],
  experience: [
    {
      position: "Position Title",
      company: "Company ",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit facere distinctio vel aspernatur veritatis enim voluptate nisi assumenda delectus ipsum, esse ad pariatur, qui natus tempora, saepe facilis ut sapiente.",
      from: "from",
      to: "to",
    },
  ],
  address: "Address",
  about:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit facere distinctio vel aspernatur veritatis enim voluptate nisi assumenda delectus ipsum, esse ad pariatur, qui natus tempora, saepe facilis ut sapiente.",
  links: [
    { GitHub: "https://github.com/Mvishal123" },
    { LinkedIn: "https://linkedin.com/Vishal123" },
    { X: "https://x.com/Vishal123" },
  ],
  projectsList: [
    {
      name: "Project Name",
      live: "https://livelink.com",
      github: "https://github.com",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit facere distinctio vel aspernatur veritatis enim voluptate nisi assumenda delectus ipsum, esse ad pariatur, qui natus tempora, saepe facilis ut sapiente.",
    },
  ],
  skills: [
    "Skill 1",
    "Skill 2",
    "Skill 3",
  ],
};


export const ENVIRONMENT_PROJECTS: Group_Projects[] = [
  {
    id: "1",
    description: "Develop a sentiment analysis tool using NLP techniques.",
    prize: 1000,
    expected_duration: 30,
    enviroment_id: "env1",
    status: ProjectStatus.Ongoing,
    createdAt: new Date("2024-01-01T12:00:00Z"),
    updatedAt: new Date("2024-01-10T15:30:00Z"),
  },
  {
    id: "2",
    description: "Create a responsive e-commerce website for online retail.",
    prize: 1500,
    expected_duration: 45,
    enviroment_id: "env2",
    status: ProjectStatus.Completed,
    createdAt: new Date("2024-02-01T09:30:00Z"),
    updatedAt: new Date("2024-02-20T14:20:00Z"),
  },
  {
    id: "3",
    description: "Build interactive data dashboards for sales analytics.",
    prize: 800,
    expected_duration: 20,
    enviroment_id: "env3",
    status: ProjectStatus.Pending,
    createdAt: new Date("2024-03-01T17:45:00Z"),
    updatedAt: new Date("2024-03-15T11:10:00Z"),
  },
  {
    id: "4",
    description: "Develop a cross-platform task management app.",
    prize: 1200,
    expected_duration: 60,
    enviroment_id: "env4",
    status: ProjectStatus.Ongoing,
    createdAt: new Date("2024-02-15T14:00:00Z"),
    updatedAt: new Date("2024-03-30T09:45:00Z"),
  },
  {
    id: "5",
    description: "Integrate payment gateways into an existing web app.",
    prize: 500,
    expected_duration: 15,
    enviroment_id: "env5",
    status: ProjectStatus.Completed,
    createdAt: new Date("2024-01-20T08:20:00Z"),
    updatedAt: new Date("2024-02-05T16:30:00Z"),
  },
  {
    id: "6",
    description: "Design promotional posters for a music festival.",
    prize: 300,
    expected_duration: 10,
    enviroment_id: "env6",
    status: ProjectStatus.Pending,
    createdAt: new Date("2024-03-10T11:30:00Z"),
    updatedAt: new Date("2024-03-25T09:00:00Z"),
  },
  {
    id: "7",
    description: "Optimize database queries for improved performance.",
    prize: 900,
    expected_duration: 25,
    enviroment_id: "env7",
    status: ProjectStatus.Ongoing,
    createdAt: new Date("2024-02-05T13:15:00Z"),
    updatedAt: new Date("2024-02-25T10:45:00Z"),
  },
  {
    id: "8",
    description: "Develop a 2D multiplayer platformer game.",
    prize: 2000,
    expected_duration: 90,
    enviroment_id: "env8",
    status: ProjectStatus.Ongoing,
    createdAt: new Date("2024-01-10T10:00:00Z"),
    updatedAt: new Date("2024-03-15T14:15:00Z"),
  },
  {
    id: "9",
    description: "Build a RESTful API for a social networking platform.",
    prize: 1100,
    expected_duration: 40,
    enviroment_id: "env9",
    status: ProjectStatus.Completed,
    createdAt: new Date("2024-02-20T09:45:00Z"),
    updatedAt: new Date("2024-04-05T11:30:00Z"),
  },
  {
    id: "10",
    description: "Perform predictive analysis on stock market data.",
    prize: 1300,
    expected_duration: 50,
    enviroment_id: "env10",
    status: ProjectStatus.Pending,
    createdAt: new Date("2024-03-05T15:30:00Z"),
    updatedAt: new Date("2024-04-10T12:20:00Z"),
  },
  {
    id: "11",
    description: "Develop a web app for task management and scheduling.",
    prize: 600,
    expected_duration: 18,
    enviroment_id: "env11",
    status: ProjectStatus.Completed,
    createdAt: new Date("2024-01-25T14:20:00Z"),
    updatedAt: new Date("2024-02-10T16:45:00Z"),
  },
  {
    id: "12",
    description: "Design and prototype a fitness tracking mobile app.",
    prize: 400,
    expected_duration: 12,
    enviroment_id: "env12",
    status: ProjectStatus.Ongoing,
    createdAt: new Date("2024-02-15T12:45:00Z"),
    updatedAt: new Date("2024-03-30T11:00:00Z"),
  },
  {
    id: "13",
    description:
      "Develop a scalable backend system for managing online orders.",
    prize: 950,
    expected_duration: 35,
    enviroment_id: "env13",
    status: ProjectStatus.Ongoing,
    createdAt: new Date("2024-01-30T09:00:00Z"),
    updatedAt: new Date(),
  },
];