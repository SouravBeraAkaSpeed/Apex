"use client";
import { EnvironmentLogoUpload } from "@/components/file-upload";
import MultiSelect from "@/components/multiselect";
import {
  EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects,
  GroupProjectWithSkillsRequired,
  RuleWithAllSkill,
  useAppState,
} from "@/components/providers/state-provider";
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
import {
  fetchAllSkills,
  fetchEnvironmentDetails,
  fetchEnvironments,
  fetchRules,
} from "@/lib/supabase/queries";
import {
  Category,
  Enviroments,
  Group_Projects,
  Rule,
} from "@/lib/supabase/supabase.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { All_Skills, Privacy_type, Rank } from "@prisma/client";
import axios from "axios";
import { Edit, Loader2, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

const Page = () => {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);
  const { state, dispatch } = useAppState();
  const [rulesId, setRulesId] = useState("");
  const [rules, setRules] = useState<RuleWithAllSkill[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [allSkills, setallSkills] = useState<All_Skills[]>([]);
  const router = useRouter();
  const [environmentId, setenvironmentId] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const searchParams = useSearchParams();
  const env = searchParams.get("env");

  useEffect(() => {
    const fetchallSkillsData = async () => {
      let allskillsData = await fetchAllSkills();
      if (allskillsData) setallSkills(allskillsData);

      // const environemnt = await axios.post("/api/environments", {});
      // console.log(environemnt);
      // setenvironmentId(environemnt.data.id);
    };

    fetchallSkillsData();
  }, [env]);

  useEffect(() => {
    if (env) {
      setenvironmentId(env);
      fetchData();
    }
  }, [env, environmentId]);

  const fetchData = async () => {
    setDataLoading(true);
    const rulesData: RuleWithAllSkill | null = await fetchRules(environmentId);
    // console.log(rulesData);
    // console.log("rules:", rulesData);
    // const apexians = await fetchEnvProfiles();
    const currentenvironment: Partial<Enviroments> | null =
      await fetchEnvironmentDetails(environmentId);

    const environemnts: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>[] =
      await fetchEnvironments();

    if (environemnts) {
      let updatedEnvironments: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>[] =
        [];
      console.log(environemnts);
      updatedEnvironments.push(...environemnts);
    }

    // console.log(environment);
    // const categoriesData: Category[] | null = await fetchCategories();
    // const groupProjectData: GroupProjectWithSkillsRequired[] | undefined =
    //   await fetchGroupProjects();
    if (currentenvironment) {
      let updatedEnvironment: Partial<EnvironmentWithProfilesWithRuleWithCategoryWithGroupprojects>;
      updatedEnvironment = currentenvironment ? currentenvironment : {};
      console.log(updatedEnvironment);
      // updatedEnvironment.profiles = apexians;
      updatedEnvironment.rule = rulesData ? rulesData : undefined;
      setRules(rulesData ? [rulesData] : []);
      // updatedEnvironment.groupProjects = groupProjectData;

      dispatch({
        type: "UPDATE_ENVIRONMENT",
        payload: {
          environment: updatedEnvironment,
          environmentId: environmentId,
        },
      });

      dispatch({
        type: "SET_CURRENTENVIRONMENT",
        payload: {
          environment: currentenvironment,
        },
      });

      Environmentform.reset({
        name: currentenvironment?.name ? currentenvironment?.name : "",
        description: currentenvironment?.description
          ? currentenvironment?.description
          : "",
        environment_imgUrl: currentenvironment?.environment_imgUrl
          ? currentenvironment?.environment_imgUrl
          : "",
        access_type: currentenvironment?.access_type
          ? currentenvironment?.access_type
          : "PUBLIC",
        rule_id: currentenvironment?.rule_id ? currentenvironment.rule_id : "",
      });
    }

    setDataLoading(false);
  };

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
      const rule = await axios.post("/api/rules", {
        ...formData,
        environment_id: environmentId,
        min_level_required: parseInt(formData.min_level_required),
      });
      console.log(rule);

      if (rule.data === "This Environment already has a Rule") {
        toast({
          title: "Rule Already Exists",
          description: "This Environment already has a Rule",
        });
        RuleForm.reset();
        router.refresh();
      } else {
        toast({
          title: "Rules Upadted",
          description: "Your Rule has been successfully updated.",
        });
        RuleForm.reset();
        router.push(`${environmentId}/dashboard`);
      }
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

    try {
      const environemnt = await axios.post("/api/environments", {
        ...formData,
        id: environmentId,
      });
      console.log(environemnt);

      toast({
        title: "Environment Created",
        description: `Your Environment has been added successfully.`,
      });
      if (!environmentId) {
        toast({
          title: "Add rules",
          description: `Add rules that will govern who can enter the environment`,
        });
      }
      setenvironmentId(environemnt.data.id);
      Environmentform.reset();
      router.push(
        `/edit-environment/?env=${
          environmentId ? environmentId : environemnt.data.id
        }`
      );
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  if (dataLoading || environmentId === "")
    return (
      <div className="flex text-black flex-1 justify-center items-center h-[300px]">
        <Loader2 className="h-7 w-7 text-black dark:text-white animate-spin my-4" />
        <p className="text-xs text-black dark:text-white ">Loading ...</p>
      </div>
    );
  return (
    <div className="z-10 h-full">
      <div className="mt-10 text-black dark:text-white flex flex-col items-center justify-center">
        <div className=" flex text-[40px] font-semibold">Edit Environment</div>
        <span className="flex text-sm text-center w-[76%] dark:text-gray-400 text-black">
          Edit your environment will judge who will be able to collaborate
          within your enviroment for your project.
        </span>
      </div>

      {dataLoading ? (
        <div className="flex text-black flex-1 justify-center items-center h-[300px]">
          <Loader2 className="h-7 w-7 text-black dark:text-white animate-spin my-4" />
          <p className="text-xs text-black dark:text-white ">Loading ...</p>
        </div>
      ) : (
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
                  className="w-full text-black   mt-6 space-y-4 flex flex-col  "
                >
                  <div className="p-3">
                    <h1 className="text-xl font-bold text-black">
                      Create your Environment{" "}
                    </h1>
                    <hr />
                  </div>

                  <div className="flex  justify-center ">
                    <div className="flex flex-col  w-full mx-7">
                      <Label htmlFor="environment_imgUrl">
                        Environment Logo
                      </Label>
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

                  {environmentId && (
                    <div className="flex  justify-center ">
                      <div className="flex flex-col  w-full mx-7">
                        <Label htmlFor="github_link">Rule</Label>
                        <span className="text-xs my-2">
                          *Select the rules that every apexian must follow for
                          entrying in the environment.
                        </span>

                        <span className="text-xs mb-2">
                          *You can create the rules now
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
                                      {rules.map((rule, index) => (
                                        <SelectItem value={rule.id} key={index}>
                                          {rule.rank_required}{" "}
                                          {rule.min_level_required}{" "}
                                          {rule.min_qualification_required}
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
                    </div>
                  )}

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

                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      variant="ghost"
                      className="border-2 border-black bg-black text-white hover:bg-gray-300  hover:text-black w-[93%]"
                    >
                      Save changes
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            <hr className="m-3" />
            {environmentId && (
              <div>
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
                        {isRuleLoading ? (
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
                                    Create the rules that every apexian must
                                    follow for entrying in the environment.
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

                                <div className="flex flex-col   w-full">
                                  <Label htmlFor="min_skills_required">
                                    Skills Required*
                                  </Label>

                                  <FormField
                                    disabled={isRuleLoading}
                                    control={RuleForm.control}
                                    name="min_skills_required"
                                    render={({ field }) => (
                                      <FormItem className="mt-2">
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
                                  className="border-2 border-black hover:bg-gray-300 hover:text-black w-full"
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

                {rules.map((rule, index) => (
                  <Dialog key={index}>
                    <div
                      className="flex flex-col  border-2 p-3 m-3 mx-7 rounded-[4px] "
                      key={index}
                    >
                      <div className="flex   w-full items-center">
                        <div className="font-semibold flex items-center text-lg mx-3 flex-1">
                          <div className="mr-2">
                            {rule.rank_required}.Lv{rule.min_level_required}{" "}
                          </div>
                        </div>
                        <div className="font-semibold text-sm flex  rounded-[4px] cursor-pointer">
                          <DialogTrigger
                            asChild
                            className="bg-white text-black border-2 p-1 mx-1 hover:bg-white"
                          >
                            <Button
                              onClick={() => {
                                setRulesId(rule.id);
                                const minskillsrequired =
                                  rule.min_skills_required.map(
                                    (skill) => skill.id
                                  );
                                RuleForm.reset({
                                  rank_required: rule.rank_required,
                                  min_level_required:
                                    rule.min_level_required.toString(),
                                  min_skills_required: minskillsrequired,
                                  min_qualification_required:
                                    rule.min_qualification_required,
                                });
                              }}
                            >
                              <Edit />
                            </Button>
                          </DialogTrigger>
                          <Button className="border-2 p-1 mx-1">
                            <Trash />
                          </Button>
                        </div>
                      </div>

                      <div className="flex   w-full  mx-3  items-center">
                        <div className="  text-md ">
                          {rule.min_qualification_required}
                        </div>
                      </div>
                    </div>

                    <div className="flex  justify-center  ">
                      <div className="flex flex-col  w-full mx-7">
                        <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                          {isRuleLoading ? (
                            <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                              <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                              <p className="text-xs text-black  ">
                                Loading ...
                              </p>
                            </div>
                          ) : (
                            <div>
                              <DialogHeader>
                                <DialogTitle>Add Rules</DialogTitle>
                                <hr />

                                <div className="text-sm border-2 p-2 m-2 mt-3 border-black rounded-[4px] bg-gray-300">
                                  <ul className="mx-3 py-2 text-black ">
                                    <li className="my-2">
                                      Create the rules that every apexian must
                                      follow for entrying in the environment.
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
                                    <Label htmlFor="school">
                                      Rank Required*
                                    </Label>
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
                                                  {levels.map(
                                                    (level, index) => (
                                                      <SelectItem
                                                        value={`${level}`}
                                                        key={index}
                                                      >
                                                        Lv{level}
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

                                  <div className="flex flex-col   w-full">
                                    <Label htmlFor="min_skills_required">
                                      Skills Required*
                                    </Label>

                                    <FormField
                                      disabled={isRuleLoading}
                                      control={RuleForm.control}
                                      name="min_skills_required"
                                      render={({ field }) => (
                                        <FormItem className="mt-2">
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
                                    className="border-2 border-black hover:bg-gray-300 hover:text-black w-full"
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
                ))}

                <hr className="m-3" />

                <div className="flex flex-col items-center w-full justify-center">
                  <Button
                    variant="ghost"
                    className="border-2 border-black my-10  hover:bg-gray-300 hover:text-black w-[93%] bg-black text-white"
                  >
                    <Link href={`${environmentId}/dashboard`}>
                      Go To Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
