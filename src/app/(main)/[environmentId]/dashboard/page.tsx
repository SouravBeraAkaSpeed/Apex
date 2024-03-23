"use client";
import RenderChart from "@/components/dashboard/chart";
import UserBadge from "@/components/user-badge";

import { FaStar } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { useEffect } from "react";
import {
  EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects,
  useAppState,
} from "@/components/providers/state-provider";

const DashboardPage = ({ params }: { params: { environmentId: string } }) => {
  const { state } = useAppState();
  // const ollamaLlm = new ChatOllama({
  //   baseUrl: "http://localhost:11434", // Default value
  //   model: "mistral", // Default value
  // });

  // useEffect(() => {
  //   const ollamatest = async () => {
  //     console.log("runned")
  //     const response = await ollamaLlm.invoke(
  //       "Simulate a rap battle between Stephen Colbert and John Oliver"
  //     );
  //     console.log("response :", response.content);
  //   };

  //   ollamatest();
  // }, [ollamaLlm]);

  return (
    <div className="w-full">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
          <section className="bg-black/20 p-2 rounded-xl col-span-2 h-30 grid grid-cols-2">
            {/* section 1 */}
            <div className="bg-black/30 rounded flex flex-col gap-6 justify-start items-center p-2">
              <div className="mx-auto py-2">
                <UserBadge type={"code_conneiseur"} />
              </div>
              <div className="mx-auto">
                <p className="font-mono border border-slate-400 font-bold lg:text-lg  px-3 rounded-full text-center">
                  {
                    (
                      state.currentEnvironemnt as EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects
                    ).name
                  }
                </p>
              </div>
            </div>

            {/* section 2 */}
            <div className="grid">
              <div className="py-2 px-4 flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-sm md:text-">
                    Environment XP
                  </h3>
                  <h2 className="text-brand/yellow text-xl xl:text-4xl font-mono font-bold flex gap-2 items-center mt-1">
                    <span>
                      <FaStar />
                    </span>
                    20
                  </h2>
                </div>
                <div>
                  <h3 className="font-semibold">Projects completed</h3>
                  <h2 className="text-brand/yellow text-xl xl:text-4xl font-mono font-bold flex gap-2 mt-1">
                    48
                  </h2>
                </div>
                <div>
                  <h3 className="font-semibold">Competitions won</h3>
                  <h2 className="text-brand/yellow text-xl xl:text-4xl font-bold font-mono flex gap-2 mt-1">
                    24
                  </h2>
                </div>
                <div>
                  <h3 className="font-semibold">Activity</h3>
                  <h2 className="text-brand/yellow text-xl xl:text-4xl font-bold font-mono flex gap-2 items-center mt-1">
                    High
                    <span>
                      <AiOutlineRise />
                    </span>
                  </h2>
                </div>
              </div>
              {/* <div className="border"></div> */}
            </div>
          </section>

          {/*Graph  */}
          <section className="bg-black/20 p-2 rounded-xl col-span-2 h-30">
            <div className="w-full h-full">
              <h1 className="text-xl font-bold ml-2 py-2">Ranking</h1>
              <RenderChart />
            </div>
          </section>

          {/* Projects */}
          <section className="bg-black/20 p-2 rounded-xl md:col-span-full max-h-[50vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Projects</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Skills required</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mock data */}
                {Array(5)
                  .fill(0)
                  .map((arr, index) => (
                    <TableRow className="max-h-[20px]  truncate" key={index}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        AI Collab
                      </TableCell>
                      <TableCell className="font-medium truncate">
                        4 weeks
                      </TableCell>
                      <TableCell className="font-medium max-w-[400px] truncate">
                        Fullstack, real time and ML
                      </TableCell>
                      <TableCell className="font-medium truncate">
                        <Badge className="">Ongoing</Badge>
                      </TableCell>
                      <TableCell className="font-medium text-right truncate">
                        AI Collab
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
