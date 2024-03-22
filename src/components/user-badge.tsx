"use client";


import Image from "next/image";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { badgesTypes } from "../lib/types";

const badgeStyle = {
  discussion_dynamo: {
    label: "Discussion Dynamo",
    background: "bg-gradient-to-b from-sky-500 to-slate-50",
    image: "/badges/discussion-dynamo.jpeg",
  },
  model_maestro: {
    label: "Model Maestro",
    background: "bg-gradient-to-b from-slate-900 to-slate-300",
    image: "/badges/model-maestro.jpeg",
  },
  cloud_commander: {
    label: "Cloud Commander",
    background: "bg-gradient-to-b from-amber-600 to-slate-50",
    image: "/badges/cloud-commander.jpeg",
  },
  code_conneiseur: {
    label: "Code Conneiseur",
    background: "bg-gradient-to-b from-slate-900 to-slate-300",
    image: "/badges/code-conneiseur.jpeg",
  },
  deep_learning_disciple: {
    label: "Deep learning disciple",
    background: "bg-gradient-to-b from-red-900 via-red-400 to-black",
    image: "/badges/deep-learning-disciple.jpeg",
  },
  project_visionary: {
    label: "Project Visionary",
    background: "bg-gradient-to-b from-orange-700 to-slate-100",
    image: "/badges/project-visionary.jpeg",
  },
  uiux_architect: {
    label: "UI/UX Architect",
    background: "bg-gradient-to-b from-[#ec489c] to-cyan-500 ",
    image: "/badges/UI-UX.jpeg",
  },
};

interface UserBadgeProps {
  type: badgesTypes;
  showBadge?: boolean;
  className?: string;
}

const UserBadge = ({ type, showBadge = false, className }: UserBadgeProps) => {
    console.log(badgeStyle[type].image)
  return (
    <div className={className ?? ""}>
      <div className="relative flex flex-col items-center group">
        <div
          className={clsx(
            "p-1 rounded-t-lg rounded-b-full h-full w-full",
            badgeStyle[type].background
          )}
        >
          <Image
            src={badgeStyle[type].image}
            alt="badge"
            height={1024}
            width={1024}
            className={`w-full h-full rounded-b-full object-cover object-center ${
              showBadge && "group-hover:opacity-20"
            }`}
          />
        </div>
        {showBadge && (
          <div className="absolute top-0 bottom-0  items-start hidden group-hover:flex rounded-full z-10 p-[1px] max-w-[100%]">
            <span className="text-white rounded-full px-1 text-center font-bold text-[1em]">
              {badgeStyle[type].label}
            </span>
          </div>
        )}

        {/* Either the above or the below one */}

        {/* <Badge className="flex rounded-full bg-black -m-4 z-10 p-[1px] max-w-[100%]">
        <span className="bg-white text-black rounded-full px-1 text-center font-bold">
          {badgeStyle[type].label}
        </span>
      </Badge> */}
      </div>
    </div>
  );
};

export default UserBadge;