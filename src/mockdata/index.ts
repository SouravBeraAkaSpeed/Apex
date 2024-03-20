import { PassThrough } from "stream";

export let IS_USER_SESSION = false;

export let IS_FIRST_TIME = true;

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
