import { M_PLUS_Rounded_1c } from "next/font/google";

const rounded = M_PLUS_Rounded_1c({
  weight: "800",
  subsets: ["cyrillic-ext"],
  display: "swap",
});

const Hero = () => {
  return (
    <div className="flex justify-center mt-6">
      <div
        className={`text-[2.8rem] sm:text-[4rem] lg:text-[4rem] font-bold w-full md:max-w-[64rem]  text-center leading-sm lg:leading-none tracking-tight flex-col ${rounded.className} uppercase`}
      >
        <h1>
          Create
          <span className="text-indigo-600 font-bold">new Development</span>
          <br />
          <span className="custom-h1-border-white text-red-200">
            experiences
          </span>{" "}
          with{" "}
          <span className="text-brand/yellow drop-shadow-[4px_4px_var(--tw-shadow-color)] shadow-yellow-600 custom-h1-border-black">
            collaboration{" "}
          </span>
          and{" "}
          <span className="text-blue-200 custom-dotted-border px-6 py-2 inline-block mt-4 rotate-3 w-[5rem]">
            building
          </span>{" "}
          <span className="text-purple-400">With the help of AI</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
