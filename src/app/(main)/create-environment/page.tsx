"use client";
import { EnvironmentLogoUpload } from "@/components/file-upload";
import MultiSelect from "@/components/multiselect";
import { useAppState } from "@/components/providers/state-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { EnvironmentsSchema, RuleSchema } from "@/lib/FormSchemas";
import { fetchAllSkills } from "@/lib/supabase/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { All_Skills, Privacy_type, Rank } from "@prisma/client";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
  const [selected, setSelected] = React.useState([]);
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const { state, dispatch } = useAppState();
  const [rulesId, setRulesId] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [allSkills, setallSkills] = useState<All_Skills[]>([]);
  const router = useRouter();

  const options = [
    { value: "React", id: "1" },
    { value: "Vue", id: "2" },
    { value: "Angular", id: "3" },
    { value: "Java", id: "4" },
  ];

  useEffect(() => {
    const fetchallSkillsData = async () => {
      let allskillsData = await fetchAllSkills();
      if (allskillsData) setallSkills(allskillsData);
    };

    fetchallSkillsData();
  }, []);

  const RuleForm = useForm<z.infer<typeof RuleSchema>>({
    mode: "onChange",
    resolver: zodResolver(RuleSchema),
    defaultValues: {
      rank_required: Rank.Platform_Pioneer,
      min_level_required: "1",
      min_qualification_required: "",
      min_skills_required: [],
    },
  });

  const isRuleLoading = RuleForm.formState.isSubmitting;

  const onRuleSubmit: SubmitHandler<z.infer<typeof RuleSchema>> = async (
    formData
  ) => {
    console.log(formData);

    try {
      const profile = await axios.post("/api/rule", formData);
      console.log(profile);

      toast({
        title: "Rules Upadted",
        description: `Your Rule has been added successfully.`,
      });
      RuleForm.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  const Environmentform = useForm<z.infer<typeof EnvironmentsSchema>>({
    mode: "onChange",
    resolver: zodResolver(EnvironmentsSchema),
    defaultValues: {
      name: "",
      description: "",
      rule_id: "",
      environment_imgUrl: "",
      access_type: Privacy_type.PUBLIC,
    },
  });

  const isEnviromentLoading = Environmentform.formState.isSubmitting;

  const onEnviromentSubmit: SubmitHandler<
    z.infer<typeof EnvironmentsSchema>
  > = async (formData) => {
    console.log(formData);
  };
  return (
    <div className="z-10 h-full">
      <div className="mt-10 text-black dark:text-white flex flex-col items-center justify-center">
        <div className=" flex text-[40px] font-semibold">
          Create Environment
        </div>
        <span className="flex text-sm dark:text-gray-400 text-black">
          Create a new environment to collaborate with developers for your
          project.
        </span>
      </div>

      <div className="flex gap-y-10 md:gap-y-0 flex-col md:flex-row justify-center px-10 mt-10 md:mb-10 ">
        <div className="flex flex-col md:w-[700px] mx-10  text-black bg-white rounded-[10px] mb-3 border-2 shadow-lg ">
          {isEnviromentLoading ? (
            <div className="flex text-black flex-1 justify-center items-center h-[300px]">
              <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
              <p className="text-xs text-black  ">Loading ...</p>
            </div>
          ) : (
            <Form {...Environmentform}>
              <form
                onChange={() => {}}
                onSubmit={Environmentform.handleSubmit(onEnviromentSubmit)}
                className="w-full text-black   mt-6 space-y-4 flex flex-col "
              >
                <div className="p-3">
                  <h1 className="text-xl font-bold text-black">
                    Create your Environment{" "}
                  </h1>
                  <hr />
                </div>

                <div className="flex  justify-center ">
                  <div className="flex flex-col  w-full mx-7">
                    <Label htmlFor="environment_imgUrl">Environment Logo</Label>
                    <FormField
                      disabled={isEnviromentLoading}
                      control={Environmentform.control}
                      name="environment_imgUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <EnvironmentLogoUpload
                              value={field.value}
                              onChange={field.onChange}
                              setUploadinglogo={setUploadingLogo}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex  justify-center ">
                  <div className="flex flex-col  w-full mx-7">
                    <Label className="font-semibold">Name*</Label>
                    <FormField
                      disabled={isEnviromentLoading}
                      control={Environmentform.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              className=" text-black  mt-2 bg-white"
                              placeholder="Ex: Neural Networks Env"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex  justify-center ">
                  <div className="flex flex-col  w-full mx-7">
                    <Label className="font-semibold">Description*</Label>
                    <FormField
                      disabled={isEnviromentLoading}
                      control={Environmentform.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={3}
                              className="text-black  mt-2 bg-white"
                              placeholder="Ex: This is a community for Neural Network Enginners ,where the engineer can connect , collaborate and build complex neural nets  , here we also shares paid projects related to neural networks."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex  justify-center ">
                  <div className="flex flex-col  w-full mx-7">
                    <Label htmlFor="github_link">Rule</Label>
                    <span className="text-xs my-2">
                      *Select the rules that every apexian must follow for
                      entrying in the environment.
                    </span>

                    <FormField
                      disabled={isEnviromentLoading}
                      control={Environmentform.control}
                      name="rule_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue
                                  placeholder="Select the Rule"
                                  className="text-black  mt-2 bg-white w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white text-black w-full">
                                <SelectGroup>
                                  <SelectLabel className="font-bold ">
                                    Your Rules
                                  </SelectLabel>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex  justify-center ">
                  <div className="flex flex-col  w-full mx-7">
                    <Label htmlFor="access_type">Access Type</Label>
                    <span className="text-xs mt-2">
                      *If Access Type is private then nobody will be able to
                      enter the environemnt
                    </span>

                    <span className="text-xs mb-2">
                      *If Access Type is public then anybody will be able to
                      enter the environemnt
                    </span>

                    <FormField
                      disabled={isEnviromentLoading}
                      control={Environmentform.control}
                      name="access_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue
                                  placeholder="Select the Access Type"
                                  className="text-black  mt-2 bg-white w-full"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-white text-black w-full">
                                <SelectGroup>
                                  <SelectLabel className="font-bold ">
                                    Access Types
                                  </SelectLabel>
                                  <SelectItem value={Privacy_type.PUBLIC}>
                                    Public
                                  </SelectItem>
                                  <SelectItem value={Privacy_type.PRIVATE}>
                                    Private
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          )}

          <hr className="m-3" />

          <Dialog>
            <div className="flex  justify-center  ">
              <div className="flex flex-col  w-full mx-7">
                <Label className="font-semibold"> Rules </Label>
                <div className="flex  border-2 p-3 mt-3 rounded-[4px] ">
                  <div className="flex   w-full mx-7  items-center">
                    <div className="font-semibold text-lg flex-1">
                      {" "}
                      Add Rules{" "}
                    </div>
                    <div className="font-semibold text-lg border-2 p-2 rounded-[4px] cursor-pointer">
                      {" "}
                      <DialogTrigger
                        asChild
                        className="bg-white text-black hover:bg-white"
                      >
                        <Button
                          onClick={() => {
                            setRulesId("");
                          }}
                        >
                          <Plus />{" "}
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex  justify-center  ">
              <div className="flex flex-col  w-full mx-6">
                <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                  {isEnviromentLoading ? (
                    <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                      <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                      <p className="text-xs text-black  ">Loading ...</p>
                    </div>
                  ) : (
                    <div>
                      <DialogHeader>
                        <DialogTitle>Add Rules</DialogTitle>
                        <hr />

                        <div className="text-sm border-2 p-2 m-2 mt-3 border-black rounded-[4px] bg-gray-300">
                          <ul className="mx-3 py-2 text-black ">
                            <li className="my-2">
                              Create the rules that every apexian must follow
                              for entrying in the environment.
                            </li>
                          </ul>
                        </div>
                      </DialogHeader>
                      <Form {...RuleForm}>
                        <form
                          onChange={() => {}}
                          onSubmit={RuleForm.handleSubmit(onRuleSubmit)}
                          className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                        >
                          <div className="flex flex-col  w-full">
                            <Label htmlFor="school">Rank Required*</Label>
                            <span className="my-2 text-xs">
                              *Your can read about the ranks here : ....
                            </span>
                            <FormField
                              disabled={isRuleLoading}
                              control={RuleForm.control}
                              name="rank_required"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <SelectTrigger className="w-full bg-white">
                                        <SelectValue
                                          placeholder="Select the Required Rank"
                                          className="text-black  mt-2 bg-white w-full"
                                        />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white text-black w-full">
                                        <SelectGroup>
                                          <SelectLabel className="font-bold ">
                                            Ranks
                                          </SelectLabel>
                                          {Object.keys(Rank).map(
                                            (rank, index) => (
                                              <SelectItem
                                                value={rank}
                                                key={index}
                                              >
                                                {rank}
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex flex-col  w-full">
                            <Label htmlFor="min_level_required">
                              Minimum Level Required*
                            </Label>
                            <span className="my-2">
                              * You can read about the levels here
                            </span>
                            <FormField
                              disabled={isRuleLoading}
                              control={RuleForm.control}
                              name="min_level_required"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={`${field.value}`}
                                    >
                                      <SelectTrigger className="w-full text-black  bg-white">
                                        <SelectValue
                                          placeholder="Select the Required Level"
                                          className="text-black bg-white  mt-2  w-full"
                                        />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white text-black w-full">
                                        <SelectGroup>
                                          <SelectLabel className="font-bold ">
                                            Levels
                                          </SelectLabel>
                                          {levels.map((level, index) => (
                                            <SelectItem
                                              value={`${level}`}
                                              key={index}
                                            >
                                              Lv{level}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex flex-col  w-full">
                            <Label htmlFor="min_qualification_required">
                              Minimum Qualification Required*
                            </Label>

                            <FormField
                              disabled={isRuleLoading}
                              control={RuleForm.control}
                              name="min_qualification_required"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      className=" text-black  mt-2  bg-white w-full"
                                      placeholder="Ex: Bachelor's of Technology"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex flex-col  w-full">
                            <Label htmlFor="min_skills_required">
                              Skills Required*
                            </Label>

                            <FormField
                              disabled={isRuleLoading}
                              control={RuleForm.control}
                              name="min_skills_required"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <MultiSelect
                                      options={allSkills}
                                      selected={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <Button
                            type="submit"
                            variant="ghost"
                            className="border-2 border-black hover:bg-gray-300 w-full"
                          >
                            Save changes
                          </Button>
                        </form>
                      </Form>
                    </div>
                  )}
                </DialogContent>
              </div>
            </div>
          </Dialog>

          <hr className="m-3" />
        </div>
      </div>
    </div>
  );
};

export default Page;
