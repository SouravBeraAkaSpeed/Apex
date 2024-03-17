"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { USER_ONBOARDING_DETAILS } from "@/mockdata";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileFormSchema } from "@/lib/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";

const Page = () => {
  const user = USER_ONBOARDING_DETAILS;
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      qualifications: [],
      projects: [],
      experiences: [],
      skills: [],
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof ProfileFormSchema>> = async (
    formData
  ) => {};

  if (!isMounted) return <Loader />;

  return (
    <div className="z-10 h-full">
      <div className="mt-10 text-black dark:text-white flex flex-col items-center justify-center">
        <div className=" flex text-[40px] font-semibold">Create Profile</div>
        <span className="flex text-sm dark:text-gray-400 text-black">
          *By completing the full profile you can access to all features.
        </span>
      </div>

      <div className="flex gap-y-10 md:gap-y-0 flex-col md:flex-row justify-center px-10 mt-10 ">
        <div className="flex  md:w-[650px] mx-10 bg-black dark:bg-white rounded-[10px] ">
          <Form {...form}>
            <form
              onChange={() => {
                if (submitError) setSubmitError("");
              }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full text-white dark:text-black  m-2 mt-6 space-y-4 flex flex-col "
            >
              <FormDescription className="p-3">
                <h1 className="text-xl font-bold text-white dark:text-black">
                  Create your profile{" "}
                </h1>
                <hr />
              </FormDescription>
              <div className="flex  justify-center ">
                <div className="flex flex-col mx-7 w-full">
                  <Label className="font-semibold">First Name</Label>
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            className=" text-black  mt-2"
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
                  <Label className="font-semibold">Last Name</Label>
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            className=" text-black mt-2"
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
                  <Label className="font-semibold">Email</Label>
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            className=" text-black mt-2"
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
                  <Label className="font-semibold">Github Url</Label>
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="github_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="url"
                            className=" text-black  mt-2"
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
                <div className="flex flex-col  w-full mx-7">
                  <Label className="font-semibold"> Profile Headline</Label>
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="profile_headline"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            className=" text-black  mt-2"
                            placeholder="Full Stack Web Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex  flex-col md:w-[500px] mx-10 items-center justify-center ">
          <Card className=" h-full  bg-white text-black ">
            <CardHeader className="font-bold text-3xl px-9">
              <div className="flex items-center gap-2">
                <div>
                  {form.getValues("firstname")
                    ? form.getValues("firstname")
                    : "FirstName"}{" "}
                  {form.getValues("lastname")
                    ? form.getValues("lastname")
                    : "LastName"}
                </div>
              </div>
            </CardHeader>
            <div className="h-[1px] w-[90%] mx-auto bg-slate-500"></div>
            <CardContent className="px-9 mx-auto">
              <div>
                {/* headers */}
                <div className="mt-2 text-xs flex flex-wrap gap-x-2 text-slate-500">
                  <div>
                    {form.getValues("email")
                      ? form.getValues("email")
                      : "email"}
                  </div>
                  <div className="flex ">
                    <span className="ml-1 underline">
                      <Link href={`${form.getValues("github_url")}`}>
                        Github
                      </Link>
                    </span>
                  </div>
                  {/* {user.links.map((link) =>
                    Object.entries(link).map(([key, value]) => (
                      <div className="flex ">
                        <span className="ml-1 underline">
                          <Link href={value}>{value}</Link>
                        </span>
                      </div>
                    ))
                  )} */}
                </div>

                {/* Bio */}

                <div>
                  <div className="mt-4">
                    <div>
                      <h1 className="text-lg font-semibold">Summary</h1>
                      <div className="h-[0.25px] bg-slate-500 w-full"></div>
                      <div className="mt-2 text-xs">
                        <h1 className="font-semibold">
                          {form.getValues("profile_headline")
                            ? form.getValues("profile_headline")
                            : "Profile Headline"}
                        </h1>
                        <p>{user.about}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional experience */}
                {user.hasExperience && (
                  <>
                    <div className="mt-4 text-lg font-semibold">
                      <h1>Professional Experience</h1>
                      <div className="h-[0.25px] bg-slate-500 w-full"></div>
                    </div>

                    <div>
                      {user.experience.map((exp, index) => (
                        <div className="mt-4">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-semibold">
                              • {exp.position}, {exp.company}
                            </h3>
                            <div className="text-xs text-slate-500">
                              {exp.from} - {exp.to}
                            </div>
                          </div>
                          <p className="text-xs ml-4 mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Projects */}

                <div className="mt-4">
                  <div>
                    <h1 className="text-lg font-semibold">Projects</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                    <div className="mt-2 text-xs">
                      {user.projectsList.map((project, index) => (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold">
                            • {project.name}
                          </h3>
                          <div className="flex flex-wrap gap-1 ml-3 text-xs">
                            <span className="font-semibold">Live: </span>
                            {
                              <Link className="underline" href={project.live}>
                                {project.live}
                              </Link>
                            }
                            ,<span className="font-semibold">GitHub:</span>
                            {
                              <Link className="underline" href={project.github}>
                                {project.github}
                              </Link>
                            }
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
                    {user.skills.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                          <li>• {skill}</li>
                        ))}
                      </ul>
                    )}
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
