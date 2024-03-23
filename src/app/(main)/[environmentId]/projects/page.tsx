import CarouselContainer from "@/components/carousel-container";
import ProjectCard from "@/components/dashboard/projects/project-card";
import { Group_Projects, ProjectStatus } from "@/lib/supabase/supabase.types";
import { ENVIRONMENT_PROJECTS } from "@/mockdata";
import Link from "next/link";

import { FaExternalLinkAlt } from "react-icons/fa";
// import { useEffect, useState } from "react";

const page = () => {
  // const [ongoingProjects, setOngoingProjects] = useState<Group_Projects[] | []>(
  //   []
  // );
  // const [pendingProjects, setPendingProjects] = useState<Group_Projects[] | []>(
  //   []
  // );
  // [];
  // const [completedProjects, setCompletedProjetcs] = useState<
  //   Group_Projects[] | []
  // >([]);

  const projects = ENVIRONMENT_PROJECTS;

  const completedProjects = ENVIRONMENT_PROJECTS.filter(
    (project) => project.status === ProjectStatus.Completed
  );

  const ongoingProjects = ENVIRONMENT_PROJECTS.filter(
    (project) => project.status === ProjectStatus.Ongoing
  );

  const pendingProjects = ENVIRONMENT_PROJECTS.filter(
    (project) => project.status === ProjectStatus.Pending
  );

  const totalProjects =
    completedProjects.length + ongoingProjects.length + pendingProjects.length;

  return (
    <div className="px-2 md:px-10">
      <div className="bg-gradient-to-r from-amber-400 to-sky-400 w-full h-24 p-[2px] rounded-lg">
        <div className="h-full bg-[#191919] rounded-lg flex md:flex-col items-center justify-between md:justify-center  px-4">
          <h1 className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent font-bold text-3xl">
            Projects completed
          </h1>
          <div className="flex gap-2 items-center">
            <h3 className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent font-semibold text-2xl md:text-4xl">
              {completedProjects.length}
            </h3>
            <span className="text-xs md:text-md">/ {totalProjects}</span>
          </div>
        </div>
      </div>

      {/* Ongoing projects */}
      <section>
        <div className="flex justify-between items-center mt-12">
          <h1 className="text-xl md:text-2xl font-semibold text-brand/yellow">
            Ongoing projects
          </h1>

          {/* TODO: Implement later */}
          <Link
            href={`projects/ongoing`}
            className="text-sm flex items-center gap-2 text-slate-100/50 hover:text-slate-100 cursor-pointer"
          >
            See all <FaExternalLinkAlt />
          </Link>
        </div>
        <div className="mt-6">
          <CarouselContainer
            settings={{
              infinite: false,
              slidesToShow: 2,
              className: "mx-5 md:m-0",
            }}
          >
            {completedProjects &&
              completedProjects.map((project) => (
                <Link href={`projects/${project.id}`} key={project.id}>
                  <ProjectCard data={project} />
                </Link>
              ))}
          </CarouselContainer>
        </div>
      </section>

      {/* Pending projects */}
      <section className="mt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-brand/yellow">
            Pending projects
          </h1>

          {/* TODO: Implement later */}
          <Link
            href={`projects/pending`}
            className="text-sm flex items-center gap-2 text-slate-100/50 hover:text-slate-100 cursor-pointer"
          >
            See all <FaExternalLinkAlt />
          </Link>
        </div>
        <div className="mt-6">
          <CarouselContainer
            settings={{
              infinite: false,
              slidesToShow: 2,
              className: "mx-5 md:m-0",
            }}
          >
            {completedProjects &&
              pendingProjects.map((project) => (
                <Link href={`projects/${project.id}`} key={project.id}>
                  <ProjectCard data={project} />
                </Link>
              ))}
          </CarouselContainer>
        </div>
      </section>

      {/* Completed projects */}
      <section className="mt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-brand/yellow">
            Completed projects
          </h1>

          {/* TODO: Implement later */}
          <Link
            href={`projects/completed`}
            className="text-sm flex items-center gap-2 text-slate-100/50 hover:text-slate-100 cursor-pointer"
          >
            See all <FaExternalLinkAlt />
          </Link>
        </div>
        <div className="mt-6">
          <CarouselContainer
            settings={{
              infinite: false,
              slidesToShow: 2,
              className: "mx-5 md:m-0",
            }}
          >
            {completedProjects &&
              completedProjects.map((project) => (
                <Link href={`projects/${project.id}`} key={project.id}>
                  <ProjectCard data={project} />
                </Link>
              ))}
          </CarouselContainer>
        </div>
      </section>
    </div>
  );
};

export default page;