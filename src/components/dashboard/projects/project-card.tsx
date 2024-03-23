import { Group_Projects } from "@/lib/supabase/supabase.types";
import React from "react";

type ProjectCardProps = {
  data: Group_Projects;
  className?: string;
};

const ProjectCard = ({ data, className }: ProjectCardProps) => {
  return (
    <div
      className={`bg-black/30 backdrop-blur-xl border border-slate-700/50 rounded-lg h-[120px] px-4 py-2 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="line-clamp-2 md:text-xl font-semibold">
            {data.description}
          </h1>
        </div>
        <div className="">
          <div className="md:text-xl font-bold text-brand/yellow">
            ${data.prize}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;