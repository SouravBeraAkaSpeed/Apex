import { Group_Projects, ProjectStatus } from "@/lib/supabase/supabase.types";
import { randomUUID } from "crypto";
import { PassThrough } from "stream";

export let IS_USER_SESSION = false;

export let IS_FIRST_TIME = true;

export const USER = {
  id: "1",
  email: "apexian.user@gmail.com",
  password: "123123",
  environments: ["Team1", "Team2", "Team3", "Team4"],
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
    "JavaScript (Node.js, React, Angular, Vue.js)",
    "Python (Django, Flask)",
    "Java (Spring Boot)",
    "C# (.NET)",
    "Ruby (Ruby on Rails)",
    "Go (Golang)",
    "TypeScript",
    "SQL (MySQL, PostgreSQL)",
    "NoSQL (MongoDB, Redis)",
    "Git (GitHub, GitLab, Bitbucket)",
    "Docker",
    "AWS (Amazon Web Services)",
    "CI/CD (Continuous Integration/Continuous Deployment)",
    "RESTful APIs",
    "DevOps Practices",
  ],
};

export const GROUP_DETAILS = {
  environment_name: "Blazing AI",
  profile: "/boardApe.png",
  badge: "model_maestro",
  projects_completed: 68,
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

export const TEACHER_DETAILS = [
  {
    name: "John Doe",
    courses: [
      {
        id: "1",
        title: "Web Development Basics",
        description: "Learn the fundamentals of web development.",
        image:
          "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
        price: 1500,
        published: true,
        chapters: [
          {
            id: "1",
            teacher: "teacher_name",
            title: "Introduction to HTML",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Learn about HTML tags and elements.",
            chapterAccess: "FREE",
            published: true,
          },
          {
            id: "2",
            title: "CSS Styling",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Explore CSS properties and selectors.",
            chapterAccess: "PAID",
            published: true,
          },
        ],
      },
      {
        id: "2",
        title: "JavaScript Mastery",
        description: "Master JavaScript programming.",
        image:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        price: 2000,
        published: false,
        chapters: [
          {
            id: "3",
            teacher: "teacher_name",
            title: "JavaScript Basics",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Learn JavaScript syntax and data types.",
            chapterAccess: "FREE",
            published: true,
          },
          {
            id: "4",
            title: "Advanced JavaScript Concepts",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description:
              "Explore advanced topics like closures and prototypes.",
            chapterAccess: "PAID",
            published: false,
          },
        ],
      },
    ],
  },
  {
    name: "Jane Smith",
    courses: [
      {
        id: "3",
        title: "Python Programming",
        description: "A comprehensive guide to Python programming.",
        image:
          "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
        price: 1800,
        published: true,
        chapters: [
          {
            id: "5",
            teacher: "teacher_name",
            title: "Python Basics",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Introduction to Python syntax and basic concepts.",
            chapterAccess: "FREE",
            published: true,
          },
          {
            id: "6",
            title: "Object-Oriented Python",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description:
              "Learn about classes, inheritance, and objects in Python.",
            chapterAccess: "PAID",
            published: true,
          },
          {
            id: "7",
            title: "Python Web Development",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Build web applications using Python and Flask.",
            chapterAccess: "PAID",
            published: false,
          },
        ],
      },
    ],
  },
  {
    name: "Michael Johnson",
    courses: [
      {
        id: "4",
        title: "Data Science Fundamentals",
        description: "Explore the basics of data science and analytics.",
        image:
          "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
        price: 2200,
        published: true,
        chapters: [
          {
            id: "8",
            teacher: "teacher_name",
            title: "Data Analysis with Python",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description:
              "Learn data manipulation and analysis using Python libraries.",
            chapterAccess: "PAID",
            published: true,
          },
          {
            id: "9",
            title: "Machine Learning Essentials",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description:
              "Introduction to machine learning algorithms and techniques.",
            chapterAccess: "PAID",
            published: false,
          },
        ],
      },
    ],
  },
  {
    name: "Emily Thompson",
    courses: [
      {
        id: "5",
        title: "Graphic Design Mastery",
        description: "Unlock your creativity with graphic design skills.",
        image:
          "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
        price: 1900,
        published: true,
        chapters: [
          {
            id: "10",
            teacher: "teacher_name",
            title: "Typography Fundamentals",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Explore typography principles and techniques.",
            chapterAccess: "FREE",
            published: true,
          },
          {
            id: "11",
            title: "Logo Design Workshop",
            video:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            image:
              "https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1.jpg",
            description: "Create compelling logos using design software.",
            chapterAccess: "PAID",
            published: true,
          },
        ],
      },
    ],
  },
];

export const COURSES = [
  {
    id: "1",
    title: "Learn to develop websites in 30days using modern technologies (Zero to mastery)",
    description: "Learn the fundamentals of web development.",
    image: "https://example.com/image1.jpg",
    price: 1500,
    difficulty: "Beginner",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "Introduction to HTML",
        video: "https://example.com/video1.mp4",
        image: "https://example.com/html_intro.jpg",
        description: "Basic concepts and tags of HTML.",
        chapterAccess: "FREE",
        published: true,
      },
      {
        id: "2",
        title: "CSS Styling Techniques",
        video: "https://example.com/video2.mp4",
        image: "https://example.com/css_styling.jpg",
        description: "Advanced styling using CSS.",
        chapterAccess: "PAID",
        published: false,
      },
    ],
  },
  {
    id: "2",
    title: "JavaScript Programming",
    description: "Explore JavaScript programming language.",
    image: "https://example.com/image2.jpg",
    price: 1800,
    difficulty: "Intermediate",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "Introduction to JavaScript",
        video: "https://example.com/video3.mp4",
        image: "https://example.com/js_intro.jpg",
        description: "Basic syntax and concepts of JavaScript.",
        chapterAccess: "FREE",
        published: true,
      },
      {
        id: "2",
        title: "DOM Manipulation",
        video: "https://example.com/video4.mp4",
        image: "https://example.com/dom_manipulation.jpg",
        description: "Working with Document Object Model.",
        chapterAccess: "PAID",
        published: true,
      },
    ],
  },
  {
    id: "3",
    title: "Python Basics",
    description: "Introduction to Python programming language.",
    image: "https://example.com/image3.jpg",
    price: 2000,
    difficulty: "Beginner",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "Python Syntax",
        video: "https://example.com/video5.mp4",
        image: "https://example.com/python_syntax.jpg",
        description: "Basic syntax and data types in Python.",
        chapterAccess: "FREE",
        published: true,
      },
      {
        id: "2",
        title: "Python Functions",
        video: "https://example.com/video6.mp4",
        image: "https://example.com/python_functions.jpg",
        description: "Working with functions in Python.",
        chapterAccess: "PAID",
        published: false,
      },
    ],
  },
  {
    id: "4",
    title: "Data Science Fundamentals",
    description: "Explore the basics of data science and analytics.",
    image: "https://example.com/image4.jpg",
    price: 2200,
    difficulty: "Intermediate",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "Data Analysis with Python",
        video: "https://example.com/video7.mp4",
        image: "https://example.com/data_analysis.jpg",
        description:
          "Learn data manipulation and analysis using Python libraries.",
        chapterAccess: "PAID",
        published: true,
      },
      {
        id: "2",
        title: "Machine Learning Essentials",
        video: "https://example.com/video8.mp4",
        image: "https://example.com/ml_essentials.jpg",
        description:
          "Introduction to machine learning algorithms and techniques.",
        chapterAccess: "PAID",
        published: false,
      },
    ],
  },
  {
    id: "5",
    title: "React.js Fundamentals",
    description: "Learn the basics of React.js library.",
    image: "https://example.com/image5.jpg",
    price: 1800,
    difficulty: "Intermediate",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "React Components",
        video: "https://example.com/video9.mp4",
        image: "https://example.com/react_components.jpg",
        description: "Understanding React components and props.",
        chapterAccess: "FREE",
        published: true,
      },
      {
        id: "2",
        title: "React Hooks",
        video: "https://example.com/video10.mp4",
        image: "https://example.com/react_hooks.jpg",
        description: "Exploring React hooks for state management.",
        chapterAccess: "PAID",
        published: true,
      },
    ],
  },
  {
    id: "6",
    title: "Node.js Basics",
    description: "Introduction to Node.js backend development.",
    image: "https://example.com/image6.jpg",
    price: 2000,
    difficulty: "Intermediate",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "Node.js Environment Setup",
        video: "https://example.com/video11.mp4",
        image: "https://example.com/node_setup.jpg",
        description: "Setting up Node.js environment on your machine.",
        chapterAccess: "FREE",
        published: true,
      },
      {
        id: "2",
        title: "Express.js Basics",
        video: "https://example.com/video12.mp4",
        image: "https://example.com/express_basics.jpg",
        description: "Introduction to Express.js framework for Node.js.",
        chapterAccess: "PAID",
        published: true,
      },
    ],
  },
  {
    id: "7",
    title: "Responsive Web Design",
    description: "Learn how to create responsive web designs.",
    image: "https://example.com/image7.jpg",
    price: 1600,
    difficulty: "Intermediate",
    teacher: "teacher_name",
    published: true,
    chapters: [
      {
        id: "1",
        title: "Introduction to CSS Grid",
        video: "https://example.com/video13.mp4",
        image: "https://example.com/css_grid.jpg",
        description: "Understanding CSS Grid layout.",
        chapterAccess: "FREE",
        published: true,
      },
      {
        id: "2",
        title: "Flexbox Techniques",
        video: "https://example.com/video14.mp4",
        image: "https://example.com/flexbox_techniques.jpg",
        description: "Exploring CSS Flexbox for layout design.",
        chapterAccess: "PAID",
        published: true,
      },
    ],
  },
];