"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ExperiencesSchema,
  ProfileFormSchema,
  ProjectsSchema,
  QualificationsSchema,
  SkillsSchema,
} from "@/lib/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  Edit,
  Loader2,
  Plus,
  Trash,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn, formatDate } from "@/lib/utils";
import { FileUpload, ImageUpload } from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ProfileWithQualificationWithExperienceWithSkillsWithProjects,
  useAppState,
} from "@/components/providers/state-provider";
import {
  Experiences,
  Projects,
  Qualifications,
  Skill_level,
  Skills,
} from "@/lib/supabase/supabase.types";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchExperiences,
  fetchProfile,
  fetchProjects,
  fetchQualifications,
  fetchSkills,
} from "@/lib/supabase/queries";
import { Skills as prismaSkills } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ToolTip from "@/components/tool-tip";
import { v4 } from "uuid";

const Page = () => {
  const { toast } = useToast();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [uploadingdocument, setUploadingdocument] = useState(false);
  const router = useRouter();
  const [dataLoading, setDataLoading] = useState(false);
  const { state, dispatch, environmentId } = useAppState();
  const [qualificationId, setQualificationId] = useState("");
  const [experienceId, setexperienceId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profile_picture, setProfile_picture] = useState<string | null>("");
  const [UploadingImage, setUploadingImage] = useState(false)

  const Level = {
    Beginner: Skill_level.Beginner,
    Intermediate: Skill_level.Intermediate,
    Advanced: Skill_level.Advanced,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchData = async () => {
    setDataLoading(true);
    const qualificationData: Qualifications[] | null =
      await fetchQualifications();
    console.log("qualification:", qualificationData);
    const profile = await fetchProfile();
    const experienceData: Experiences[] | null = await fetchExperiences();
    const projectData: Projects[] | null = await fetchProjects();

    const skillsData: prismaSkills[] | null = await fetchSkills();
    let updatedProfile: Partial<ProfileWithQualificationWithExperienceWithSkillsWithProjects>;
    updatedProfile = profile;
    updatedProfile.qualifications = qualificationData;
    updatedProfile.experiences = experienceData;
    updatedProfile.projects = projectData;
    updatedProfile.skills = skillsData;

    dispatch({
      type: "UPDATE_PROFILE",
      payload: { profile: updatedProfile },
    });
    setDataLoading(false);

    form.reset({
      firstname: profile.firstname ? profile.firstname : undefined,
      lastname: profile.lastname ? profile.lastname : undefined,
      profile_headline: profile.profile_headline
        ? profile.profile_headline
        : undefined,
      about: profile.about ? profile.about : undefined,
      email: profile.email ? profile.email : undefined,
      onboarded: profile.onboarded ? profile.onboarded : undefined,
      linkedin_url: profile.linkedin_url ? profile.linkedin_url : undefined,
      x_url: profile.x_url ? profile.x_url : undefined,
      github_url: profile.github_url ? profile.github_url : undefined,
    });
  };
  useEffect(() => {
    console.log(state);
    fetchData();
  }, []);

  useEffect(() => {
    setProfile_picture(
      (
        state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
      ).profile_picture
        ? (
            state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
          ).profile_picture
        : "/boardApe.png"
    );
  }, [state]);

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      profile_headline: "",
      about: "",
      email: "",
      onboarded: false,
      linkedin_url: "",
      x_url: "",
      github_url: "",
    },
  });

  const Qualificationform = useForm<z.infer<typeof QualificationsSchema>>({
    mode: "onChange",
    resolver: zodResolver(QualificationsSchema),
    defaultValues: {
      qualification: "",
      school: "",
      field_of_study: "",
      start_date: new Date(),
      end_date: new Date(),
      grade: "",
      document_url: "",
    },
  });

  const ExperienceForm = useForm<z.infer<typeof ExperiencesSchema>>({
    mode: "onChange",
    resolver: zodResolver(ExperiencesSchema),
    defaultValues: {
      title: "",
      company: "",
      start_date: new Date(),
      end_date: new Date(),
      description: "",
      industry: "",
      location: "",
      location_type: "",
      type: "",
    },
  });

  const ProjectForm = useForm<z.infer<typeof ProjectsSchema>>({
    mode: "onChange",
    resolver: zodResolver(ProjectsSchema),
    defaultValues: {
      github_link: "",
      description: "",
      live_link: "",
      title: "",
    },
  });

  const SkillsForm = useForm<z.infer<typeof SkillsSchema>>({
    mode: "onChange",
    resolver: zodResolver(SkillsSchema),
    defaultValues: {
      skill: "",
      Level: "",
      project_id: "",
      qualification_id: "",
    },
  });

  const isSkillLoading = SkillsForm.formState.isSubmitting;
  const isProjectLoading = ProjectForm.formState.isSubmitting;
  const isExperienceLoading = ExperienceForm.formState.isSubmitting;
  const isQualificationLoading = Qualificationform.formState.isSubmitting;
  const isLoading = form.formState.isSubmitting;

  const onSkillSubmit: SubmitHandler<z.infer<typeof SkillsSchema>> = async (
    formData
  ) => {
    const data: Partial<Skills> = {
      skill: formData.skill,
      Level: (formData.Level === "Beginner"
        ? Level[formData.Level]
        : formData.Level === "Intermediate"
        ? Level[formData.Level]
        : formData.Level === "Advanced" &&
          Level[formData.Level]) as Skill_level,
      id: skillId,
      project_id: formData.project_id ? formData.project_id : undefined,
      qualification_id: formData.qualification_id
        ? formData.qualification_id
        : undefined,
    };

    console.log(data);

    try {
      const skill = await axios.post("/api/skills", data);
      console.log(skill);
      fetchData();
      toast({
        title: skillId ? "Skill Edited" : "Skill Added",
        description: `${skill.data.skill}  has been ${
          skillId ? "edited" : "added"
        } as your skill successfully.`,
      });
      SkillsForm.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  const onProjectSubmit: SubmitHandler<z.infer<typeof ProjectsSchema>> = async (
    formData
  ) => {
    console.log(formData);

    try {
      const project = await axios.post("/api/projects", {
        ...formData,
        id: projectId,
      });
      console.log(project);
      fetchData();
      toast({
        title: projectId ? "Project Edited" : "Project Added",
        description: `${project.data.title} project has been ${
          projectId ? "edited" : "added"
        } successfully.`,
      });
      ProjectForm.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  const onExperienceSubmit: SubmitHandler<
    z.infer<typeof ExperiencesSchema>
  > = async (formData) => {
    try {
      const experience = await axios.post("/api/experiences", {
        ...formData,
        id: experienceId,
      });
      console.log(experience);
      fetchData();
      toast({
        title: experienceId ? "Experience Edited" : "Experience Added",
        description: `${experience.data.title} experience has been ${
          experienceId ? "edited" : "added"
        } successfully.`,
      });
      ExperienceForm.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof ProfileFormSchema>> = async (
    formData
  ) => {
    console.log(formData);

    try {
      const profile = await axios.post("/api/profile", formData);
      console.log(profile);
      fetchData();
      toast({
        title: "Profile Upadted",
        description: `Your profile has been added successfully.`,
      });
      form.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  const onQualificationSubmit: SubmitHandler<
    z.infer<typeof QualificationsSchema>
  > = async (formData) => {
    try {
      const qualification = await axios.post("/api/qualifications", {
        ...formData,
        id: qualificationId,
      });
      console.log(qualification);
      fetchData();
      toast({
        title: qualificationId ? "Qualification Edited" : "Qualification Added",
        description: `${qualification.data.qualification} has been ${
          qualificationId ? "edited" : "added"
        } successfully.`,
      });
      Qualificationform.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  if (!isMounted) return <Loader />;
  if (dataLoading) return <Loader />;

  return (
    <div className="z-10 h-full">
      <div className="absolute top-10 left-10">
        <ToolTip
          content={
            <Link
              href={` ${
                environmentId
                  ? `/${environmentId}/dashboard`
                  : "/join-environments"
              } `}
            >
              <ArrowLeft />{" "}
            </Link>
          }
          tooltip={` ${environmentId ? `Dashboard` : "Join An Environment"} `}
        />
      </div>
      <div className="mt-10 text-black dark:text-white flex flex-col items-center justify-center">
        <div className=" flex text-[40px] font-semibold">Your Profile</div>
        <span className="flex text-sm dark:text-gray-400 text-black">
          *By completing the full profile you can access to all features.
        </span>
      </div>

      <div className="flex gap-y-10 md:gap-y-0 flex-col md:flex-row justify-center px-10 mt-10 md:mb-10 ">
        {isEditing && (
          <div className="flex flex-col md:w-[600px] mx-10  text-black bg-white rounded-[10px] border-2 shadow-lg ">
            {isLoading ? (
              <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                <p className="text-xs text-black  ">Loading ...</p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onChange={() => {
                    if (submitError) setSubmitError("");
                  }}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full text-black   mt-6 space-y-4 flex flex-col "
                >
                  <div className="p-3">
                    <h1 className="text-xl font-bold text-black">
                      Create your profile{" "}
                    </h1>
                    <hr />
                  </div>

                  <div className="flex  justify-center ">
                    <div className="flex flex-col mx-7 w-full">
                      <Label className="font-semibold">First Name*</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                className=" text-black  mt-2 bg-white"
                                placeholder="Elon"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col mx-7 w-full">
                      <Label className="font-semibold">Last Name*</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                className=" text-black mt-2 bg-white"
                                placeholder="Musk"
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
                    <div className="flex flex-col mx-7  w-full">
                      <Label className="font-semibold">Email*</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="email"
                                className=" text-black mt-2 bg-white"
                                placeholder="neomodeostudio@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col w-full mx-7 ">
                      <Label className="font-semibold">Github Url*</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="github_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="url"
                                className=" text-black  mt-2 bg-white"
                                placeholder="https://github.com"
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
                    <div className="flex flex-col mx-7  w-full">
                      <Label className="font-semibold">Linkedin Url</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="linkedin_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="url"
                                className=" text-black mt-2 bg-white"
                                placeholder="https://linkedin.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col w-full mx-7 ">
                      <Label className="font-semibold">Twitter Url</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="x_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="url"
                                className="text-black  mt-2 bg-white"
                                placeholder="https://x.com"
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
                      <Label className="font-semibold">Profile Headline*</Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="profile_headline"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                className=" text-black  mt-2 bg-white"
                                placeholder="Ex: Full Stack Web Developer"
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
                      <Label className="font-semibold"> About* </Label>
                      <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                rows={4}
                                className=" text-black  mt-2 bg-white"
                                placeholder="Ex: I am a dedicated and results-driven professional with a strong background in software engineering and project management. With over 8 years of experience in the tech industry, I have honed my skills in full-stack development, agile methodologies, and team leadership."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="m-3 bg-black text-white">
                    Submit
                  </Button>
                </form>
              </Form>
            )}

            <hr className="m-3" />

            <Dialog>
              <div className="flex  justify-center  ">
                <div className="flex flex-col  w-full mx-7">
                  <Label className="font-semibold"> Education </Label>
                  <div className="flex  border-2 p-3 mt-3 rounded-[4px] ">
                    <div className="flex   w-full mx-7  items-center">
                      <div className="font-semibold text-lg flex-1">
                        {" "}
                        Add Qualifications{" "}
                      </div>
                      <div className="font-semibold text-lg border-2 p-2 rounded-[4px] cursor-pointer">
                        {" "}
                        <DialogTrigger
                          asChild
                          className="bg-white text-black hover:bg-white"
                        >
                          <Button
                            onClick={() => {
                              setQualificationId("");
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
                    {isQualificationLoading ? (
                      <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                        <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                        <p className="text-xs text-black  ">Loading ...</p>
                      </div>
                    ) : (
                      <div>
                        <DialogHeader>
                          <DialogTitle>Add Qualification</DialogTitle>
                          <hr />
                          <h1 className="text-lg font-bold mx-2 text-black">
                            Info:
                          </h1>
                          <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                            <ul className="mx-3 py-2 text-black ">
                              <li className="my-2">
                                Make sure you have a document that supports the
                                verification of your qualification.
                              </li>

                              <li className="my-2">
                                Until the document associated with qualification
                                is verified by the Ai , it will not consider
                                valid qualification.
                              </li>
                            </ul>
                          </div>
                        </DialogHeader>
                        <Form {...Qualificationform}>
                          <form
                            onChange={() => {
                              if (submitError) setSubmitError("");
                            }}
                            onSubmit={Qualificationform.handleSubmit(
                              onQualificationSubmit
                            )}
                            className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                          >
                            <div className="flex flex-col  w-full">
                              <Label htmlFor="school">Qualification*</Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="qualification"
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
                              <Label htmlFor="school">School*</Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="school"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Boston University"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="field_of_study">
                                Field of Study*
                              </Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="field_of_study"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Computer Science"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="start_date">Start Date*</Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="start_date"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "pl-3 text-left font-normal bg-white mt-2 w-full",
                                              !field.value &&
                                                "text-muted-foreground"
                                            )}
                                          >
                                            {field.value ? (
                                              format(field.value, "PPP")
                                            ) : (
                                              <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                          }
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="end_date">End Date</Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="end_date"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "pl-3 text-left font-normal bg-white mt-2 w-full",
                                              !field.value &&
                                                "text-muted-foreground"
                                            )}
                                          >
                                            {field.value ? (
                                              format(field.value, "PPP")
                                            ) : (
                                              <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                          }
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="grade">Grade</Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="grade"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: 8.9 in CGPA "
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="document_url">
                                Document supporting your qualification
                                <span className="text-blue-500">
                                  {uploadingdocument && " Uploading...."}
                                </span>
                              </Label>
                              <FormField
                                disabled={isQualificationLoading}
                                control={Qualificationform.control}
                                name="document_url"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <FileUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        setUploadingdocument={
                                          setUploadingdocument
                                        }
                                      />
                                      {/* <Input
                                      type="file"
                                      accept="application/pdf,application/vnd.ms-excel"
                                      placeholder="Ex: Graduation Certificate, Diploma, Cource Certificate etc."
                                      className="text-black  mt-2 bg-white w-full"
                                      onChange={(e) => {
                                        onQualificationDocumentUpload({
                                          e: e,
                                          onChange: field.onChange,
                                        });
                                      }}
                                      value={field.value}
                                    /> */}
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <DialogFooter>
                              <Button
                                type="submit"
                                disabled={uploadingdocument}
                                variant="ghost"
                                className="border-2 border-black hover:bg-gray-300 w-full"
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </div>
                    )}
                  </DialogContent>
                </div>
              </div>
            </Dialog>

            {(
              state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
            )?.qualifications?.map((qualification, index) => (
              <Dialog key={index}>
                <div
                  className="flex flex-col  border-2 p-3 m-3 mx-7 rounded-[4px] "
                  key={index}
                >
                  <div className="flex   w-full items-center">
                    <div className="font-semibold items-center flex text-md mx-3 flex-1 ">
                      <div className="mr-2">{qualification.school} </div>
                      <div>
                        {qualification.isVerified ? (
                          <ToolTip
                            content={
                              <div className="flex text-sm border-2 rounded-[20px] p-2 ">
                                <Check className="text-white h-5 w-5 font-bold rounded-full bg-green-600" />
                                <div className="text-black font-semibold mx-2 ">
                                  Verified
                                </div>{" "}
                              </div>
                            }
                            tooltip="Your qualification is verified by the ai."
                          />
                        ) : (
                          <ToolTip
                            content={
                              <div className="flex text-sm border-2 rounded-[20px] p-2 ">
                                <X className="text-white h-5 w-5 font-bold rounded-full bg-red-600" />
                                <div className="text-black font-semibold mx-2 ">
                                  UnVerified
                                </div>{" "}
                              </div>
                            }
                            tooltip="Ai is in process of verifying your qualification..."
                          />
                        )}
                      </div>
                    </div>
                    <div className="font-semibold text-sm flex   rounded-[4px] cursor-pointer">
                      <DialogTrigger
                        asChild
                        className="bg-white text-black border-2 p-1 mx-1 hover:bg-white"
                      >
                        <Button
                          onClick={() => {
                            setQualificationId(qualification.id);
                            Qualificationform.reset({
                              qualification: qualification.qualification,
                              school: qualification.school,
                              start_date: qualification.start_date,
                              end_date: qualification.end_date,
                              document_url: qualification.document_url
                                ? qualification.document_url
                                : undefined,
                              grade: qualification.grade,
                              field_of_study: qualification.field_of_study,
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
                  <div className="flex ">
                    <div className="flex   w-full  flex-1 mx-3  items-center">
                      <div className="text-md w-full">
                        {qualification.qualification} -{" "}
                        {qualification.field_of_study} - {qualification.grade}{" "}
                        CGPA
                      </div>
                    </div>
                    <div className="flex    mx-3  items-center">
                      <div className="  text-sm  font-semibold">
                        {new Date(qualification.start_date)
                          .toISOString()
                          .substring(0, 10)}{" "}
                        -{" "}
                        {new Date(qualification.end_date)
                          .toISOString()
                          .substring(0, 10) ===
                        new Date(qualification.createdAt)
                          .toISOString()
                          .substring(0, 10)
                          ? "Present"
                          : new Date(qualification.end_date)
                              .toISOString()
                              .substring(0, 10)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex  justify-center  ">
                  <div className="flex flex-col  w-full mx-7">
                    <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                      {isQualificationLoading ? (
                        <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                          <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                          <p className="text-xs text-black  ">Loading ...</p>
                        </div>
                      ) : (
                        <div>
                          <DialogHeader>
                            <DialogTitle>Add Qualification</DialogTitle>
                            <hr />
                            <h1 className="text-lg font-bold mx-2 text-black">
                              Info:
                            </h1>
                            <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                              <ul className="mx-3 py-2 text-black ">
                                <li className="my-2">
                                  Make sure you have a document that supports
                                  the verification of your qualification.
                                </li>

                                <li className="my-2">
                                  Until the document associated with
                                  qualification is verified by the Ai , it will
                                  not consider valid qualification.
                                </li>
                              </ul>
                            </div>
                          </DialogHeader>
                          <Form {...Qualificationform}>
                            <form
                              onChange={() => {
                                if (submitError) setSubmitError("");
                              }}
                              onSubmit={Qualificationform.handleSubmit(
                                onQualificationSubmit
                              )}
                              className="w-full text-black my-6 mx-2 space-y-4 flex flex-col "
                            >
                              <div className="flex flex-col  w-full">
                                <Label htmlFor="school">Qualification*</Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="qualification"
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
                                <Label htmlFor="school">School*</Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="school"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Boston University"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="field_of_study">
                                  Field of Study*
                                </Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="field_of_study"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Computer Science"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="start_date">Start Date*</Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="start_date"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant={"outline"}
                                              className={cn(
                                                "pl-3 text-left font-normal bg-white mt-2 w-full",
                                                (!field.value &&
                                                  "text-muted-foreground") ||
                                                  (!qualification.start_date &&
                                                    "text-muted-foreground")
                                              )}
                                            >
                                              {qualification.start_date ? (
                                                format(
                                                  qualification.start_date,
                                                  "PPP"
                                                )
                                              ) : field.value ? (
                                                format(field.value, "PPP")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                              date > new Date() ||
                                              date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="end_date">End Date</Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="end_date"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant={"outline"}
                                              className={cn(
                                                "pl-3 text-left font-normal bg-white mt-2 w-full",
                                                (!field.value &&
                                                  "text-muted-foreground") ||
                                                  (!qualification.end_date &&
                                                    "text-muted-foreground")
                                              )}
                                            >
                                              {qualification.end_date ? (
                                                format(
                                                  qualification.end_date,
                                                  "PPP"
                                                )
                                              ) : field.value ? (
                                                format(field.value, "PPP")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                              date > new Date() ||
                                              date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="grade">Grade</Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="grade"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: 8.9 in CGPA "
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="document_url">
                                  Document supporting your qualification
                                  <span className="text-blue-500">
                                    {uploadingdocument && " Uploading...."}
                                  </span>
                                </Label>
                                <FormField
                                  disabled={isQualificationLoading}
                                  control={Qualificationform.control}
                                  name="document_url"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <FileUpload
                                          value={
                                            qualification.document_url
                                              ? qualification.document_url
                                              : field.value
                                          }
                                          onChange={field.onChange}
                                          setUploadingdocument={
                                            setUploadingdocument
                                          }
                                        />
                                        {/* <Input
                                       type="file"
                                       accept="application/pdf,application/vnd.ms-excel"
                                       placeholder="Ex: Graduation Certificate, Diploma, Cource Certificate etc."
                                       className="text-black  mt-2 bg-white w-full"
                                       onChange={(e) => {
                                         onQualificationDocumentUpload({
                                           e: e,
                                           onChange: field.onChange,
                                         });
                                       }}
                                       value={field.value}
                                     /> */}
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <DialogFooter>
                                <Button
                                  type="submit"
                                  disabled={uploadingdocument}
                                  variant="ghost"
                                  className="border-2 border-black hover:bg-gray-300 w-full"
                                >
                                  Save changes
                                </Button>
                              </DialogFooter>
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
            <Dialog>
              <div className="flex  justify-center  ">
                <div className="flex flex-col  w-full mx-7">
                  <Label className="font-semibold"> Experiences </Label>
                  <div className="flex  border-2 p-3 mt-3 rounded-[4px] ">
                    <div className="flex   w-full mx-7  items-center">
                      <div className="font-semibold text-lg flex-1">
                        {" "}
                        Add Experiences{" "}
                      </div>
                      <div className="font-semibold text-lg border-2 p-2 rounded-[4px] cursor-pointer">
                        {" "}
                        <DialogTrigger
                          asChild
                          className="bg-white text-black hover:bg-white"
                        >
                          <Button
                            onClick={() => {
                              setexperienceId("");
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
                <div className="flex flex-col  w-full mx-7">
                  <DialogContent className="sm:max-w-[425px] bg-white text-black  overflow-auto h-[600px]">
                    {isExperienceLoading ? (
                      <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                        <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                        <p className="text-xs text-black  ">Loading ...</p>
                      </div>
                    ) : (
                      <div>
                        <DialogHeader>
                          <DialogTitle>Add Experiences</DialogTitle>
                          <hr />
                          <h1 className="text-lg font-bold mx-2 text-black">
                            Info:
                          </h1>
                          <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                            <ul className="mx-3 py-2 text-black">
                              <li className="my-2">
                                Make sure you have a document that supports the
                                verification of your experience.
                              </li>

                              <li className="my-2">
                                Until the document associated with experience is
                                verified by the Ai , it will not consider valid
                                experience.
                              </li>
                            </ul>
                          </div>
                        </DialogHeader>
                        <Form {...ExperienceForm}>
                          <form
                            onChange={() => {
                              if (submitError) setSubmitError("");
                            }}
                            onSubmit={ExperienceForm.handleSubmit(
                              onExperienceSubmit
                            )}
                            className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                          >
                            <div className="flex flex-col  w-full">
                              <Label htmlFor="title">Title*</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2  bg-white w-full"
                                        placeholder="Ex: Machine Learing Engineer"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="type">Type*</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="type"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Full time"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="company">Company*</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Tesla"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="company">Location*</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="location"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: San Francisco"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="location_type">
                                Location Type*
                              </Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="location_type"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Remote"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="start_date">Start Date*</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="start_date"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "pl-3 text-left font-normal bg-white mt-2 w-full",
                                              !field.value &&
                                                "text-muted-foreground"
                                            )}
                                          >
                                            {field.value ? (
                                              format(field.value, "PPP")
                                            ) : (
                                              <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                          }
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="end_date">End Date</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="end_date"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            variant={"outline"}
                                            className={cn(
                                              "pl-3 text-left font-normal bg-white mt-2 w-full",
                                              !field.value &&
                                                "text-muted-foreground"
                                            )}
                                          >
                                            {field.value ? (
                                              format(field.value, "PPP")
                                            ) : (
                                              <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                      >
                                        <Calendar
                                          mode="single"
                                          selected={field.value}
                                          onSelect={field.onChange}
                                          disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                          }
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="industry">Industry</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="industry"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Car Automation & Ai Industry"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex flex-col  w-full">
                              <Label htmlFor="description">Description</Label>
                              <FormField
                                disabled={isExperienceLoading}
                                control={ExperienceForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: I have worked for 2 years in Tesla as a machine learning Engineer for the purpose of optimizing the vision model"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <DialogFooter>
                              <Button
                                type="submit"
                                variant="ghost"
                                className="border-2 border-black hover:bg-gray-300 w-full"
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </div>
                    )}
                  </DialogContent>
                </div>
              </div>
            </Dialog>

            {(
              state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
            )?.experiences?.map((experience, index) => (
              <Dialog key={index}>
                <div
                  className="flex flex-col  border-2 p-3 m-3 mx-7 rounded-[4px] "
                  key={index}
                >
                  <div className="flex   w-full items-center">
                    <div className="font-semibold text-lg mx-3 flex-1">
                      {experience.company} , {experience.type}
                    </div>
                    <div className="font-semibold text-sm flex  rounded-[4px] cursor-pointer">
                      <DialogTrigger
                        asChild
                        className="bg-white text-black border-2 p-1 mx-1 hover:bg-white"
                      >
                        <Button
                          onClick={() => {
                            setexperienceId(experience.id);
                            ExperienceForm.reset({
                              title: experience.title,
                              type: experience.type,
                              start_date: experience.start_date,
                              end_date: experience.end_date,
                              location: experience.location,
                              location_type: experience.location_type,
                              industry: experience.industry,
                              description: experience.description,
                              company: experience.company,
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

                  <div className="flex   w-full items-center">
                    <div className="font-semibold text-lg mx-3 flex-1">
                      {experience.title}
                    </div>
                    <div className="font-semibold text-sm flex  rounded-[4px] cursor-pointer">
                      {new Date(experience.start_date)
                        .toISOString()
                        .substring(0, 10)}{" "}
                      -{" "}
                      {new Date(experience.end_date)
                        .toISOString()
                        .substring(0, 10) ===
                      new Date(experience.createdAt)
                        .toISOString()
                        .substring(0, 10)
                        ? "Present"
                        : new Date(experience.end_date)
                            .toISOString()
                            .substring(0, 10)}
                    </div>
                  </div>

                  <div className="flex   w-full  mx-3  items-center">
                    <div className="  text-md ">{experience.description}</div>
                  </div>
                </div>

                <div className="flex  justify-center  ">
                  <div className="flex flex-col  w-full mx-7">
                    <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                      {isExperienceLoading ? (
                        <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                          <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                          <p className="text-xs text-black  ">Loading ...</p>
                        </div>
                      ) : (
                        <div>
                          <DialogHeader>
                            <DialogTitle>Add Experiences</DialogTitle>
                            <hr />
                            <h1 className="text-lg font-bold mx-2 text-black">
                              Info:
                            </h1>
                            <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                              <ul className="mx-3 py-2 text-black">
                                <li className="my-2">
                                  Make sure you have a document that supports
                                  the verification of your experience.
                                </li>

                                <li className="my-2">
                                  Until the document associated with experience
                                  is verified by the Ai , it will not consider
                                  valid experience.
                                </li>
                              </ul>
                            </div>
                          </DialogHeader>
                          <Form {...ExperienceForm}>
                            <form
                              onChange={() => {
                                if (submitError) setSubmitError("");
                              }}
                              onSubmit={ExperienceForm.handleSubmit(
                                onExperienceSubmit
                              )}
                              className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                            >
                              <div className="flex flex-col  w-full">
                                <Label htmlFor="title">Title*</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2  bg-white w-full"
                                          placeholder="Ex: Machine Learing Engineer"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="type">Type*</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="type"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Full time"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="company">Company*</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="company"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Tesla"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="location">Location*</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="location"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: San Francisco"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="location_type">
                                  Location Type*
                                </Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="location_type"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Remote"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="start_date">Start Date*</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="start_date"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant={"outline"}
                                              className={cn(
                                                "pl-3 text-left font-normal bg-white mt-2 w-full",
                                                !field.value &&
                                                  "text-muted-foreground"
                                              )}
                                            >
                                              {field.value ? (
                                                format(field.value, "PPP")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                              date > new Date() ||
                                              date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="end_date">End Date</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="end_date"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button
                                              variant={"outline"}
                                              className={cn(
                                                "pl-3 text-left font-normal bg-white mt-2 w-full",
                                                !field.value &&
                                                  "text-muted-foreground"
                                              )}
                                            >
                                              {field.value ? (
                                                format(field.value, "PPP")
                                              ) : (
                                                <span>Pick a date</span>
                                              )}
                                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                              date > new Date() ||
                                              date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                          />
                                        </PopoverContent>
                                      </Popover>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="industry">Industry</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="industry"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Car Automation & Ai Industry"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="flex flex-col  w-full">
                                <Label htmlFor="description">Description</Label>
                                <FormField
                                  disabled={isExperienceLoading}
                                  control={ExperienceForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: I have worked for 2 years in Tesla as a machine learning Engineer for the purpose of optimizing the vision model"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <DialogFooter>
                                <Button
                                  type="submit"
                                  variant="ghost"
                                  className="border-2 border-black hover:bg-gray-300 w-full"
                                >
                                  Save changes
                                </Button>
                              </DialogFooter>
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

            <Dialog>
              <div className="flex  justify-center  ">
                <div className="flex flex-col  w-full mx-7">
                  <Label className="font-semibold"> Projects </Label>
                  <div className="flex  border-2 p-3 mt-3 rounded-[4px] ">
                    <div className="flex   w-full mx-7  items-center">
                      <div className="font-semibold text-lg flex-1">
                        {" "}
                        Add Projects{" "}
                      </div>
                      <div className="font-semibold text-lg border-2 p-2 rounded-[4px] cursor-pointer">
                        {" "}
                        <DialogTrigger
                          asChild
                          className="bg-white text-black hover:bg-white"
                        >
                          <Button
                            onClick={() => {
                              setProjectId("");
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
                <div className="flex flex-col  w-full mx-7">
                  <DialogContent className="sm:max-w-[425px] bg-white text-black overflow-auto h-[600px]">
                    {isProjectLoading ? (
                      <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                        <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                        <p className="text-xs text-black  ">Loading ...</p>
                      </div>
                    ) : (
                      <div>
                        <DialogHeader>
                          <DialogTitle>Add Projects</DialogTitle>
                          <hr />
                          <h1 className="text-lg font-bold mx-2 text-black">
                            Info:
                          </h1>
                          <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                            <ul className="mx-3 py-2 text-black">
                              <li className="my-2">
                                Make sure you have a valid github link of your
                                project pushed to the github account associated
                                with your email.
                              </li>
                              <li className="my-2">
                                Make sure you have a valid live link of the same
                                project pushed to the github account associated
                                with your email.
                              </li>

                              <li className="my-2">
                                Until the links associated with project is
                                verified by the Ai , it will not consider valid
                                project.
                              </li>
                            </ul>
                          </div>
                        </DialogHeader>
                        <Form {...ProjectForm}>
                          <form
                            onChange={() => {
                              if (submitError) setSubmitError("");
                            }}
                            onSubmit={ProjectForm.handleSubmit(onProjectSubmit)}
                            className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                          >
                            <div className="flex flex-col  w-full">
                              <Label htmlFor="title">Title*</Label>
                              <FormField
                                disabled={isProjectLoading}
                                control={ProjectForm.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2  bg-white w-full"
                                        placeholder="Ex: Full Stack Instagram Clone"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="description">Description*</Label>
                              <FormField
                                disabled={isProjectLoading}
                                control={ProjectForm.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: Created a full-stack replica of the popular discussion platform 'Threads' , enabling users to post an engage in threaded conversations."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="github_link">Github Link*</Label>
                              <FormField
                                disabled={isProjectLoading}
                                control={ProjectForm.control}
                                name="github_link"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: https://github.com/profile/thread_clone"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex flex-col  w-full">
                              <Label htmlFor="live_link">Live Link*</Label>
                              <FormField
                                disabled={isProjectLoading}
                                control={ProjectForm.control}
                                name="live_link"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        className=" text-black  mt-2 bg-white w-full"
                                        placeholder="Ex: https://threads_clone.com"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <DialogFooter>
                              <Button
                                type="submit"
                                variant="ghost"
                                className="border-2 border-black hover:bg-gray-300 w-full"
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </div>
                    )}
                  </DialogContent>
                </div>
              </div>
            </Dialog>

            {(
              state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
            )?.projects?.map((project, index) => (
              <Dialog key={index}>
                <div
                  className="flex flex-col  border-2 p-3 m-3 mx-7 rounded-[4px] "
                  key={index}
                >
                  <div className="flex   w-full items-center">
                    <div className="font-semibold text-lg mx-3 flex-1">
                      {project.title}
                    </div>
                    <div className="font-semibold text-sm flex  rounded-[4px] cursor-pointer">
                      <DialogTrigger
                        asChild
                        className="bg-white text-black border-2 p-1 mx-1 hover:bg-white"
                      >
                        <Button
                          onClick={() => {
                            setProjectId(project.id);
                            ProjectForm.reset({
                              title: project.title,
                              description: project.description,
                              github_link: project.github_link,
                              live_link: project.live_link,
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
                    <div className="  text-md ">{project.description}</div>
                  </div>
                </div>

                <div className="flex  justify-center  ">
                  <div className="flex flex-col  w-full mx-7">
                    <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                      {isProjectLoading ? (
                        <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                          <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                          <p className="text-xs text-black  ">Loading ...</p>
                        </div>
                      ) : (
                        <div>
                          <DialogHeader>
                            <DialogTitle>Add Projects</DialogTitle>
                            <hr />
                            <h1 className="text-lg font-bold mx-2 text-black">
                              Info:
                            </h1>
                            <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                              <ul className="mx-3 py-2 text-black">
                                <li className="my-2">
                                  Make sure you have a valid github link of your
                                  project pushed to the github account
                                  associated with your email.
                                </li>
                                <li className="my-2">
                                  Make sure you have a valid live link of the
                                  same project pushed to the github account
                                  associated with your email.
                                </li>

                                <li className="my-2">
                                  Until the links associated with project is
                                  verified by the Ai , it will not consider
                                  valid project.
                                </li>
                              </ul>
                            </div>
                          </DialogHeader>
                          <Form {...ProjectForm}>
                            <form
                              onChange={() => {
                                if (submitError) setSubmitError("");
                              }}
                              onSubmit={ProjectForm.handleSubmit(
                                onProjectSubmit
                              )}
                              className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                            >
                              <div className="flex flex-col  w-full">
                                <Label htmlFor="title">Title*</Label>
                                <FormField
                                  disabled={isProjectLoading}
                                  control={ProjectForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2  bg-white w-full"
                                          placeholder="Ex: Full Stack Instagram Clone"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="description">
                                  Description*
                                </Label>
                                <FormField
                                  disabled={isProjectLoading}
                                  control={ProjectForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: Created a full-stack replica of the popular discussion platform 'Threads' , enabling users to post an engage in threaded conversations."
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="github_link">
                                  Github Link*
                                </Label>
                                <FormField
                                  disabled={isProjectLoading}
                                  control={ProjectForm.control}
                                  name="github_link"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: https://github.com/profile/thread_clone"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="live_link">Live Link*</Label>
                                <FormField
                                  disabled={isProjectLoading}
                                  control={ProjectForm.control}
                                  name="live_link"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2 bg-white w-full"
                                          placeholder="Ex: https://threads_clone.com"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <DialogFooter>
                                <Button
                                  type="submit"
                                  variant="ghost"
                                  className="border-2 border-black hover:bg-gray-300 w-full"
                                >
                                  Save changes
                                </Button>
                              </DialogFooter>
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

            <Dialog>
              <div className="flex  justify-center  ">
                <div className="flex flex-col  w-full mx-7">
                  <Label className="font-semibold"> Skills </Label>
                  <div className="flex  border-2 p-3 mt-3 rounded-[4px] ">
                    <div className="flex   w-full mx-7  items-center">
                      <div className="font-semibold text-lg flex-1">
                        {" "}
                        Add Skills{" "}
                      </div>
                      <div className="font-semibold text-lg border-2 p-2 rounded-[4px] cursor-pointer">
                        {" "}
                        <DialogTrigger
                          asChild
                          className="bg-white text-black hover:bg-white"
                        >
                          <Button
                            onClick={() => {
                              setSkillId("");
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
                <div className="flex flex-col  w-full mx-7">
                  <DialogContent className="sm:max-w-[425px] bg-white text-black overflow-auto h-[600px]">
                    {isSkillLoading ? (
                      <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                        <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                        <p className="text-xs text-black  ">Loading ...</p>
                      </div>
                    ) : (
                      <div>
                        <DialogHeader>
                          <DialogTitle>Add Skills</DialogTitle>
                          <hr />
                          <h1 className="text-lg font-bold mx-2 text-black">
                            Info:
                          </h1>
                          <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                            <ul className="mx-3 py-2 text-black">
                              <li className="my-2">
                                You can add skills by only adding projects and
                                Qualifications.
                              </li>

                              <li className="my-2">
                                Skills associated with your projects and
                                qualifications will be considered valid.
                              </li>

                              <li className="my-2">
                                Until the skill is verified by Ai , you won't be
                                able to apply to any projects
                              </li>
                            </ul>
                          </div>
                        </DialogHeader>

                        {((
                          state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                        ).qualifications.length > 0 ||
                          (
                            state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                          ).projects.length > 0) && (
                          <Form {...SkillsForm}>
                            <form
                              onChange={() => {
                                if (submitError) setSubmitError("");
                              }}
                              onSubmit={SkillsForm.handleSubmit(onSkillSubmit)}
                              className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                            >
                              <div className="flex flex-col  w-full">
                                <Label htmlFor="skill">Skill*</Label>
                                <FormField
                                  disabled={isSkillLoading}
                                  control={SkillsForm.control}
                                  name="skill"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          className=" text-black  mt-2  bg-white w-full"
                                          placeholder="Ex: Nextjs"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex  flex-col w-full">
                                <Label htmlFor="level" className="flex">
                                  Level*
                                </Label>
                                <FormField
                                  disabled={isSkillLoading}
                                  control={SkillsForm.control}
                                  name="Level"
                                  render={({ field }) => (
                                    <FormItem className="flex mt-2 w-full">
                                      <FormControl>
                                        <Select
                                          onValueChange={field.onChange}
                                          {...field}
                                        >
                                          <SelectTrigger className="w-full bg-white">
                                            <SelectValue
                                              placeholder="Select your level"
                                              className="text-black  mt-2 bg-white w-full"
                                            />
                                          </SelectTrigger>
                                          <SelectContent className="bg-white text-black w-full">
                                            <SelectGroup>
                                              <SelectLabel className="font-bold ">
                                                Levels
                                              </SelectLabel>
                                              <SelectItem value={"Beginner"}>
                                                Beginner
                                              </SelectItem>
                                              <SelectItem
                                                value={"Intermediate"}
                                              >
                                                Intermediate
                                              </SelectItem>
                                              <SelectItem value={"Advanced"}>
                                                Advanced
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

                              <div className="flex flex-col  w-full">
                                <Label htmlFor="github_link">Project</Label>
                                <span className="text-xs mt-2">
                                  *Choose the any one of the project associated
                                  with the skill
                                </span>
                                <span className="text-xs my-1">
                                  *We will use this infomation to verify your
                                  skill
                                </span>

                                <FormField
                                  disabled={isSkillLoading}
                                  control={SkillsForm.control}
                                  name="project_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger className="w-full bg-white">
                                            <SelectValue
                                              placeholder="Select the project"
                                              className="text-black  mt-2 bg-white w-full"
                                            />
                                          </SelectTrigger>
                                          <SelectContent className="bg-white text-black w-full">
                                            <SelectGroup>
                                              <SelectLabel className="font-bold ">
                                                Your Projects
                                              </SelectLabel>
                                              {(
                                                state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                                              )?.projects.map(
                                                (project, index) => (
                                                  <SelectItem
                                                    value={project.id}
                                                    key={index}
                                                  >
                                                    {project.title}
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
                                <Label htmlFor="github_link">
                                  Qualification
                                </Label>
                                <span className="text-xs mt-2">
                                  *Choose the any one of the qualification
                                  associated with the skill
                                </span>
                                <span className="text-xs ">
                                  *We will use this infomation to verify your
                                  skill
                                </span>

                                <span className="text-xs mb-1">
                                  *If the document your provide doesn't
                                  resembles with skill then your skill will not
                                  be considered valid
                                </span>

                                <FormField
                                  disabled={isSkillLoading}
                                  control={SkillsForm.control}
                                  name="qualification_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Select
                                          onValueChange={field.onChange}
                                          value={field.value}
                                        >
                                          <SelectTrigger className="w-full bg-white">
                                            <SelectValue
                                              placeholder="Select the qualification"
                                              className="text-black  mt-2 bg-white w-full"
                                            />
                                          </SelectTrigger>
                                          <SelectContent className="bg-white text-black w-full">
                                            <SelectGroup>
                                              <SelectLabel className="font-bold ">
                                                Your Qualifications
                                              </SelectLabel>
                                              {(
                                                state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                                              )?.qualifications.map(
                                                (qualification, index) => (
                                                  <SelectItem
                                                    value={qualification.id}
                                                    key={index}
                                                  >
                                                    {
                                                      qualification.qualification
                                                    }
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

                              <DialogFooter>
                                <Button
                                  type="submit"
                                  variant="ghost"
                                  className="border-2 border-black hover:bg-gray-300 w-full"
                                >
                                  Save changes
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </div>
              </div>
            </Dialog>

            {(
              state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
            )?.skills?.map((skill, index) => (
              <Dialog key={index}>
                <div
                  className="flex flex-col  border-2 p-3 m-3 mx-7 rounded-[4px] "
                  key={index}
                >
                  <div className="flex   w-full items-center">
                    <div className="font-semibold flex items-center text-lg mx-3 flex-1">
                      <div className="mr-2">{skill.skill} </div>
                      <div>
                        {skill.isVerified ? (
                          <ToolTip
                            content={
                              <div className="flex text-sm border-2 rounded-[20px] p-2 ">
                                <Check className="text-white h-5 w-5 font-bold rounded-full bg-green-600" />
                                <div className="text-black font-semibold mx-2 ">
                                  Verified
                                </div>{" "}
                              </div>
                            }
                            tooltip="Your skill is verified by the ai."
                          />
                        ) : (
                          <ToolTip
                            content={
                              <div className="flex text-sm border-2 rounded-[20px] p-2 ">
                                <X className="text-white h-5 w-5 font-bold rounded-full bg-red-600" />
                                <div className="text-black font-semibold mx-2 ">
                                  UnVerified
                                </div>{" "}
                              </div>
                            }
                            tooltip="Ai is in process of verifying your skill..."
                          />
                        )}
                      </div>
                    </div>
                    <div className="font-semibold text-sm flex  rounded-[4px] cursor-pointer">
                      <DialogTrigger
                        asChild
                        className="bg-white text-black border-2 p-1 mx-1 hover:bg-white"
                      >
                        <Button
                          onClick={() => {
                            setSkillId(skill.id);
                            SkillsForm.reset({
                              skill: skill.skill,
                              Level: skill.Level,
                              project_id: skill.project_id
                                ? skill.project_id
                                : undefined,
                              qualification_id: skill.qualification_id
                                ? skill.qualification_id
                                : undefined,
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
                    <div className="  text-md ">{skill.Level}</div>
                  </div>
                </div>

                <div className="flex  justify-center  ">
                  <div className="flex flex-col  w-full mx-7">
                    <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                      {isSkillLoading ? (
                        <div className="flex text-black flex-1 justify-center items-center h-[300px]">
                          <Loader2 className="h-7 w-7 text-black  animate-spin my-4" />
                          <p className="text-xs text-black  ">Loading ...</p>
                        </div>
                      ) : (
                        <div>
                          <DialogHeader>
                            <DialogTitle>Add Skills</DialogTitle>
                            <hr />
                            <h1 className="text-lg font-bold mx-2 text-black">
                              Info:
                            </h1>
                            <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                              <ul className="mx-3 py-2 text-black">
                                <li className="my-2">
                                  You can add skills by only adding projects and
                                  Qualifications.
                                </li>

                                <li className="my-2">
                                  Skills associated with your projects and
                                  qualifications will be considered valid.
                                </li>

                                <li className="my-2">
                                  Until the skill is verified by Ai , you won't
                                  be able to apply to any projects
                                </li>
                              </ul>
                            </div>
                          </DialogHeader>
                          {((
                            state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                          ).qualifications.length > 0 ||
                            (
                              state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                            ).projects.length > 0) && (
                            <Form {...SkillsForm}>
                              <form
                                onChange={() => {
                                  if (submitError) setSubmitError("");
                                }}
                                onSubmit={SkillsForm.handleSubmit(
                                  onSkillSubmit
                                )}
                                className="w-full text-black my-6 mx-0 space-y-4 flex flex-col "
                              >
                                <div className="flex flex-col  w-full">
                                  <Label htmlFor="skill">Skill*</Label>
                                  <FormField
                                    disabled={isSkillLoading}
                                    control={SkillsForm.control}
                                    name="skill"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="text"
                                            className=" text-black  mt-2  bg-white w-full"
                                            placeholder="Ex: Nextjs"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="flex  flex-col w-full">
                                  <Label htmlFor="level" className="flex">
                                    Level*
                                  </Label>
                                  <FormField
                                    disabled={isSkillLoading}
                                    control={SkillsForm.control}
                                    name="Level"
                                    render={({ field }) => (
                                      <FormItem className="flex mt-2 w-full">
                                        <FormControl>
                                          <Select
                                            onValueChange={field.onChange}
                                            {...field}
                                          >
                                            <SelectTrigger className="w-full bg-white">
                                              <SelectValue
                                                placeholder="Select your level"
                                                className="text-black  mt-2 bg-white w-full"
                                              />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white text-black w-full">
                                              <SelectGroup>
                                                <SelectLabel className="font-bold ">
                                                  Levels
                                                </SelectLabel>
                                                <SelectItem value={"Beginner"}>
                                                  Beginner
                                                </SelectItem>
                                                <SelectItem
                                                  value={"Intermediate"}
                                                >
                                                  Intermediate
                                                </SelectItem>
                                                <SelectItem value={"Advanced"}>
                                                  Advanced
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

                                <div className="flex flex-col  w-full">
                                  <Label htmlFor="github_link">Project</Label>
                                  <span className="text-xs mt-2">
                                    *Choose the any one of the project
                                    associated with the skill
                                  </span>
                                  <span className="text-xs my-1">
                                    *We will use this infomation to verify your
                                    skill
                                  </span>

                                  <FormField
                                    disabled={isSkillLoading}
                                    control={SkillsForm.control}
                                    name="project_id"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger className="w-full bg-white">
                                              <SelectValue
                                                placeholder="Select the project"
                                                className="text-black  mt-2 bg-white w-full"
                                              />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white text-black w-full">
                                              <SelectGroup>
                                                <SelectLabel className="font-bold ">
                                                  Your Projects
                                                </SelectLabel>
                                                {(
                                                  state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                                                )?.projects.map(
                                                  (project, index) => (
                                                    <SelectItem
                                                      value={project.id}
                                                      key={index}
                                                    >
                                                      {project.title}
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
                                  <Label htmlFor="github_link">
                                    Qualification
                                  </Label>
                                  <span className="text-xs mt-2">
                                    *Choose the any one of the qualification
                                    associated with the skill
                                  </span>
                                  <span className="text-xs ">
                                    *We will use this infomation to verify your
                                    skill
                                  </span>

                                  <span className="text-xs mb-1">
                                    *If the document your provide doesn't
                                    resembles with skill then your skill will
                                    not be considered valid
                                  </span>

                                  <FormField
                                    disabled={isSkillLoading}
                                    control={SkillsForm.control}
                                    name="qualification_id"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <SelectTrigger className="w-full bg-white">
                                              <SelectValue
                                                placeholder="Select the qualification"
                                                className="text-black  mt-2 bg-white w-full"
                                              />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white text-black w-full">
                                              <SelectGroup>
                                                <SelectLabel className="font-bold ">
                                                  Your Qualifications
                                                </SelectLabel>
                                                {(
                                                  state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                                                )?.qualifications.map(
                                                  (qualification, index) => (
                                                    <SelectItem
                                                      value={qualification.id}
                                                      key={index}
                                                    >
                                                      {
                                                        qualification.qualification
                                                      }
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

                                <DialogFooter>
                                  <Button
                                    type="submit"
                                    variant="ghost"
                                    className="border-2 border-black hover:bg-gray-300 w-full"
                                  >
                                    Save changes
                                  </Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          )}
                        </div>
                      )}
                    </DialogContent>
                  </div>
                </div>
              </Dialog>
            ))}

            <hr className="m-3" />

            <span className="m-3">
              * You can now create Environment to collaborate with developers.{" "}
            </span>
            <Link
              href={`/create-environment`}
              className="w-full flex items-center"
            >
              <Button className="m-3 bg-black text-white w-full mx-1 mb-10  hover:bg-gray-700">
                Create Environment
              </Button>
            </Link>
            <span className="m-3">
              * To follow other environments you need to completed your profile
              with qualification, projects and experience(if you have){" "}
            </span>
            <Link
              href={"/join-environments"}
              className="w-full flex items-center"
            >
              <Button className=" bg-black text-white w-full mx-1 mb-10  hover:bg-gray-700">
                Join Environment
              </Button>
            </Link>
          </div>
        )}

        <div
          className={`flex  flex-col ${
            isEditing ? " md:w-[500px]" : "md:w-[700px]"
          }  mx-10 items-center justify-start shadow-lg max-h-[1200px] `}
        >
          <Card className=" h-auto  bg-white text-black mb-10">
            <CardHeader className="font-bold text-3xl px-9">
              <div className="flex items-center gap-2">
                <Dialog>
                  <div className="relative  h-auto overflow-hidden ">
                    <DialogTrigger className="absolute inset-0 flex opacity-0 hover:opacity-90 items-center  z-10 justify-center text-center">
                      <h1 className="text-3xl font-bold text-black ">
                        <Edit />
                      </h1>
                    </DialogTrigger>
                    {profile_picture && (
                      <Image
                        alt="profile_picture"
                        className="rounded-full object-contain relative flex items-center justify-center left-0 top-0"
                        src={profile_picture}
                        width={50}
                        height={50}
                      />
                    )}
                    <DialogContent className="bg-white text-black">
                      <DialogHeader>
                        <DialogTitle>Upload your profile picture</DialogTitle>
                      </DialogHeader>
                      <ImageUpload setUploadingImage={setUploadingImage} fetchData={fetchData} />
                    </DialogContent>
                  </div>
                </Dialog>
                <div className="flex-1">
                  {form.getValues("firstname")
                    ? form.getValues("firstname")
                    : "FirstName"}{" "}
                  {form.getValues("lastname")
                    ? form.getValues("lastname")
                    : "LastName"}
                </div>
                <div className=" flex text-black border-2 rounded-[10px] hover:bg-white">
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <div className="h-[1px] w-[90%] mx-auto bg-slate-500"></div>
            <CardContent className="px-9 mx-auto">
              <div>
                <div className="mt-2 text-xs flex flex-wrap gap-x-2 text-slate-500">
                  {form.getValues("email") && (
                    <div className="flex ">
                      <span className="ml-1 underline">
                        <Link href={`mailto:${form.getValues("email")}`}>
                          {form.getValues("email")}
                        </Link>
                      </span>
                    </div>
                  )}
                  {form.getValues("github_url") && (
                    <div className="flex ">
                      <span className="ml-1 underline">
                        <Link href={`${form.getValues("github_url")}`}>
                          Github
                        </Link>
                      </span>
                    </div>
                  )}

                  {form.getValues("linkedin_url") && (
                    <div className="flex ">
                      <span className="ml-1 underline">
                        <Link href={`${form.getValues("linkedin_url")}`}>
                          Linkedin
                        </Link>
                      </span>
                    </div>
                  )}

                  {form.getValues("x_url") && (
                    <div className="flex ">
                      <span className="ml-1 underline">
                        <Link href={`${form.getValues("x_url")}`}>
                          x(Twitter)
                        </Link>
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mt-4">
                    <div>
                      <h1 className="text-lg font-semibold">Summary</h1>
                      <div className="h-[0.25px] bg-slate-500 w-full"></div>
                      <div className="mt-2 text-xs">
                        <h1 className="font-semibold mb-2">
                          {form.getValues("profile_headline")
                            ? form.getValues("profile_headline")
                            : "Profile Headline"}
                        </h1>
                        <p>
                          {form.getValues("about")
                            ? form.getValues("about")
                            : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit facere distinctio vel aspernatur veritatis enim voluptate nisi assumenda delectus ipsum, esse ad pariatur, qui natus tempora, saepe facilis ut sapiente."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}

                <>
                  <div className="mt-4 text-lg font-semibold">
                    <h1>Education</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                  </div>

                  <div>
                    {(
                      state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                    )?.qualifications?.map((qualification, index) => (
                      <div className="mt-4" key={index}>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-semibold">
                            • {qualification.school}{" "}
                          </h3>
                          <div className="items-center flex text-xs text-slate-500">
                            {formatDate(
                              new Date(qualification.start_date)
                                .toISOString()
                                .substring(0, 10)
                            )}{" "}
                            -{" "}
                            {new Date(qualification.end_date)
                              .toISOString()
                              .substring(0, 10) ===
                            new Date(qualification.createdAt)
                              .toISOString()
                              .substring(0, 10)
                              ? "Present"
                              : formatDate(
                                  new Date(qualification.end_date)
                                    .toISOString()
                                    .substring(0, 10)
                                )}
                          </div>
                        </div>
                        <p className="text-xs ml-4 mt-2">
                          {qualification.qualification} -{" "}
                          {qualification.field_of_study}
                        </p>
                      </div>
                    ))}
                  </div>
                </>

                {/* Professional experience */}

                <>
                  <div className="mt-4 text-lg font-semibold">
                    <h1>Professional Experience</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                  </div>

                  <div>
                    {(
                      state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                    ).experiences?.map((experience, index) => (
                      <div className="mt-4" key={index}>
                        <div className="flex flex-col justify-between">
                          <div className="text-lg font-semibold">
                            • {experience.company}, {experience.type}
                          </div>
                          <div className="flex w-full mt-2">
                            <div className="flex  flex-1 ml-3 text-xs items-start font-semibold ">
                              {experience.title}
                            </div>
                            <div className="flex  items-start text-xs text-slate-500">
                              {formatDate(
                                new Date(experience.start_date)
                                  .toISOString()
                                  .substring(0, 10)
                              )}{" "}
                              -{" "}
                              {new Date(experience.end_date)
                                .toISOString()
                                .substring(0, 10) ===
                              new Date(experience.createdAt)
                                .toISOString()
                                .substring(0, 10)
                                ? "Present"
                                : formatDate(
                                    new Date(experience.end_date)
                                      .toISOString()
                                      .substring(0, 10)
                                  )}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs ml-3 mt-2">
                          {experience.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </>

                {/* Projects */}

                <div className="mt-4">
                  <div>
                    <h1 className="text-lg font-semibold">Projects</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                    <div className="mt-2 text-xs">
                      {(
                        state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                      ).projects.map((project, index) => (
                        <div className="mb-4" key={index}>
                          <div className="flex">
                            <div className=" flex-1 text-sm font-semibold">
                              • {project.title}
                            </div>
                            <div className="flex flex-wrap gap-1 ml-3 text-xs">
                              {
                                <Link
                                  className="underline"
                                  href={project.live_link}
                                >
                                  Live
                                </Link>
                              }

                              {
                                <Link
                                  className="underline"
                                  href={project.github_link}
                                >
                                  Github Link
                                </Link>
                              }
                            </div>
                          </div>
                          <div className="mt-1 ml-3">{project.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills */}

                <div className="mt-4">
                  <div>
                    <h1 className="text-lg font-semibold">Skills</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                  </div>
                  <div className="mt-2 text-xs">
                    <ul className="flex flex-wrap gap-2">
                      {(
                        state.profile as ProfileWithQualificationWithExperienceWithSkillsWithProjects
                      )?.skills.map((skill, index) => (
                        <li key={index}>• {skill.skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-[8px] text-end">
                &copy; Powered by{" "}
                <span className="text-orange-500 font-semibold">Apex</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
