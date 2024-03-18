"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { USER_ONBOARDING_DETAILS } from "@/mockdata";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileFormSchema, QualificationsSchema } from "@/lib/FormSchemas";
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
import { CalendarIcon, Plus } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  // const user = USER_ONBOARDING_DETAILS;
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [uploadingdocument, setUploadingdocument] = useState(false);
  const router = useRouter();

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
  const isQualificationLoading = Qualificationform.formState.isSubmitting;

  const isLoading = form.formState.isSubmitting;

  // interface onQualificationDocumentUploadProps {
  //   e: React.ChangeEvent<HTMLInputElement>;
  //   onChange: (url?: string) => void;
  // }
  // const onQualificationDocumentUpload = async ({
  //   e,
  //   onChange,
  // }: onQualificationDocumentUploadProps) => {
  //   console.log("called");
  //   if (!profileId) return;
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   const uuid = v4();
  //   setUploadingdocument(true);
  //   const { data, error } = await supabase.storage
  //     .from("qualification-docs")
  //     .upload(`qualificationDocs.${profileId}.${uuid}`, file, {
  //       cacheControl: "3600",
  //       upsert: true,
  //     });

  //   if (!error) {
  //     console.log(data);
  //     onChange(data.path);
  //     setUploadingdocument(false);
  //   }
  // };

  const onSubmit: SubmitHandler<z.infer<typeof ProfileFormSchema>> = async (
    formData
  ) => {
    console.log(formData);
  };

  const onQualificationSubmit: SubmitHandler<
    z.infer<typeof QualificationsSchema>
  > = async (formData) => {
    console.log(formData.start_date.toISOString().toLocaleString());

    try {
      const qualification=await axios.post("/api/qualifications", formData);
      console.log(qualification)
      Qualificationform.reset();
      router.refresh();
    } catch (error) {
      console.log("Error at axios: ", error);
    }
  };

  if (!isMounted) return <Loader />;

  return (
    <div className="z-10 h-full">
      <div className="mt-10 text-black dark:text-white flex flex-col items-center justify-center">
        <div className=" flex text-[40px] font-semibold">Create Profile</div>
        <span className="flex text-sm dark:text-gray-400 text-black">
          *By completing the full profile you can access to all features.
        </span>
      </div>

      <div className="flex gap-y-10 md:gap-y-0 flex-col md:flex-row justify-center px-10 mt-10 md:mb-10 ">
        <div className="flex flex-col md:w-[650px] mx-10  text-black bg-white rounded-[10px] border-2 shadow-lg ">
          {isLoading ? (
            <Loader />
          ) : (
            <Form {...form}>
              <form
                onChange={() => {
                  if (submitError) setSubmitError("");
                }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full text-black  m-2 mt-6 space-y-4 flex flex-col "
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
                        <Button>
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
                <DialogContent className="sm:max-w-[425px]  bg-white text-black overflow-auto h-[600px]">
                  {isQualificationLoading ? (
                    <Loader />
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
                              is verified by the Ai , it will not consider valid
                              qualification.
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
                        <Button>
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
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>Add Projects</DialogTitle>
                    <hr />
                    <h1 className="text-lg font-bold mx-2 text-black">Info:</h1>
                    <div className="text-sm border-2 p-2 m-2 border-black rounded-[4px] bg-gray-300">
                      <ul className="mx-3 py-2 text-black">
                        <li className="my-2">
                          Make sure you have a valid github link of your project
                          pushed to the github account associated with your
                          email.
                        </li>
                        <li className="my-2">
                          Make sure you have a valid live link of the same
                          project pushed to the github account associated with
                          your email.
                        </li>

                        <li className="my-2">
                          Until the links associated with project is verified by
                          the Ai , it will not consider valid project.
                        </li>
                      </ul>
                    </div>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3 bg-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="border-2 border-black"
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </div>
            </div>
          </Dialog>

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
                        <Button>
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
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>Add Experiences</DialogTitle>
                    <hr />
                    <h1 className="text-lg font-bold mx-2 text-black">Info:</h1>
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
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3 bg-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="ghost" className="border-2">
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </div>
            </div>
          </Dialog>

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
                        <Button>
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
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                  <DialogHeader>
                    <DialogTitle>Add Skills</DialogTitle>
                    <hr />
                    <h1 className="text-lg font-bold mx-2 text-black">Info:</h1>
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
                      </ul>
                    </div>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3 bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3 bg-white"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="ghost" className="border-2">
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </div>
            </div>
          </Dialog>
        </div>

        <div className="flex  flex-col md:w-[500px] mx-10 items-center justify-center shadow-lg ">
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
                        <h1 className="font-semibold">
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
                {/* {user.hasExperience && (
                  <>
                    <div className="mt-4 text-lg font-semibold">
                      <h1>Education</h1>
                      <div className="h-[0.25px] bg-slate-500 w-full"></div>
                    </div>

                    <div>
                      {user.experience.map((exp, index) => (
                        <div className="mt-4" key={index}>
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
                )} */}

                {/* Professional experience */}
                {/* {user.hasExperience && (
                  <>
                    <div className="mt-4 text-lg font-semibold">
                      <h1>Professional Experience</h1>
                      <div className="h-[0.25px] bg-slate-500 w-full"></div>
                    </div>

                    <div>
                      {user.experience.map((exp, index) => (
                        <div className="mt-4" key={index}>
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
                )} */}

                {/* Projects */}

                <div className="mt-4">
                  <div>
                    <h1 className="text-lg font-semibold">Projects</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                    {/* <div className="mt-2 text-xs">
                      {user.projectsList.map((project, index) => (
                        <div className="mb-4" key={index}>
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
                    </div> */}
                  </div>
                </div>

                {/* Skills */}

                <div className="mt-4">
                  <div>
                    <h1 className="text-lg font-semibold">Skills</h1>
                    <div className="h-[0.25px] bg-slate-500 w-full"></div>
                  </div>
                  {/* <div className="mt-2 text-xs">
                    {user.skills.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <li key={index}>• {skill}</li>
                        ))}
                      </ul>
                    )}
                  </div> */}
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
