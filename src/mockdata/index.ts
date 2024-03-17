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
  experience: [
    {
      position: "Machine learning Engineer",
      company: "Deep mind",
      description:
        "As a Software Engineer at XYZ Tech Solutions, I played a key role in developing and maintaining software solutions to meet the company's business objectives. My responsibilities included designing, coding, testing, debugging, and implementing scalable and efficient software applications. I collaborated with cross-functional teams, including product managers, designers, and fellow engineers, to deliver high-quality software products that met user requirements and exceeded expectations.",
      from: 2023,
      to: 2024,
    },
    {
      position: "Machine learning Engineer",
      company: "Open ai",
      description:
        "Led the development of a new customer management system using React.js and Node.js, resulting in a 30% increase in user engagement and a 20% decrease in customer support tickets. Implemented automated testing processes using Jest and Enzyme, reducing the time spent on manual testing by 50% and improving overall software quality.",
      from: 2023,
      to: 2024,
    },
  ],
  address: "LPU, Jalandhar, Punjab",
  about:
    "I am a dedicated and results-driven professional with a strong background in software engineering and project management. With over 8 years of experience in the tech industry, I have honed my skills in full-stack development, agile methodologies, and team leadership. I thrive in dynamic environments where innovation and collaboration are valued, and I am passionate about leveraging technology to solve complex problems and drive business growth.",
  links: [
    { GitHub: "https://github.com/Mvishal123" },
    { LinkedIn: "https://linkedin.com/Vishal123" },
    { X: "https://x.com/Vishal123" },
  ],
  projectsList: [
    {
      name: "An AI Summarizer Application",
      live: "https://ai.summarizer.app",
      github: "https://github.com/username/ai-summarizer",
      description:
        "An AI-powered application that uses natural language processing (NLP) techniques to generate concise summaries of large texts or articles.",
    },
    {
      name: "E-commerce Platform Redesign",
      live: "https://e-commerce.redesign.com",
      github: "https://github.com/username/e-commerce-redesign",
      description:
        "A redesign of an existing e-commerce platform with improved user interface, enhanced search functionality, and optimized checkout process.",
    },
    {
      name: "Mobile Task Management App",
      live: "https://mobile.taskmanager.app",
      github: "https://github.com/username/task-manager-app",
      description:
        "A mobile application for task management, allowing users to create, organize, and track their tasks and projects on-the-go.",
    },
  ],
   skills: [
    'JavaScript (Node.js, React, Angular, Vue.js)',
    'Python (Django, Flask)',
    'Java (Spring Boot)',
    'C# (.NET)',
    'Ruby (Ruby on Rails)',
    'Go (Golang)',
    'TypeScript',
    'SQL (MySQL, PostgreSQL)',
    'NoSQL (MongoDB, Redis)',
    'Git (GitHub, GitLab, Bitbucket)',
    'Docker',
    'AWS (Amazon Web Services)',
    'CI/CD (Continuous Integration/Continuous Deployment)',
    'RESTful APIs',
    'DevOps Practices',
  ]
};