"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useMemo, useState } from "react";
import { FormSchema, SignUpFormSchema } from "@/lib/FormSchemas";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Loader from "@/components/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import {
  actionLoginUser,
  actionSignUpUser,
} from "@/lib/server-actions/auth-sections";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );

  const Signupform = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    } else {
      router.replace("/onboarding/create-profile");
    }
  };

  const onSignUpSubmit = async ({
    email,
    password,
  }: z.infer<typeof FormSchema>) => {
    const { error } = await actionSignUpUser({ email, password });
    if (error) {
      setSubmitError(error.message);
      router.push(`/login?error_description=${error.message}`);
      form.reset();
      return;
    }
    setConfirmation(true);
    form.reset();
  };
  return (
    <div className="z-10 flex flex-col items-center justify-center h-[550px]    bg-slate-900/50 w-[450px] min-h-20 rounded-[20px] border border-white/10 backdrop-blur-md relative">
      <div className="absolute left-0 right-0 flex items-center justify-center -top-20">
        <div className="flex flex-col items-center top-[40px] relative justify-center h-32 w-32 rounded-full ">
          <Link href="/">
            <Badge className=" flex items-center justify-center w-16   bg-transparent py-0.5 mb-[-25px] z-10 font-bold text-purple-800">
              Apexians
            </Badge>
            <Image
              src="/boardApe.png"
              alt="profile"
              width={631}
              height={631}
              className=" flex rounded-md rounded-t-[30px] rounded-b-[60px]"
            />
          </Link>
        </div>
      </div>
      <div className="mt-[140px]">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 rounded-xl ">
            <TabsTrigger className=" text-white rounded-xl " value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className=" text-white rounded-xl " value="signup">
              Sign up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <Form {...form}>
              <form
                onChange={() => {
                  if (submitError) setSubmitError("");
                }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full sm:justify-center sm:w-[400px] space-y-4 flex flex-col"
              >
                <Label>Email</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          className="shadow-lg"
                          placeholder="neomodeostudio@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Label>Password</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          className="shadow-lg"
                          placeholder="**************"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="items-end flex justify-end w-full">
                  <span> Forget Password?</span>
                </div>
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button
                  type="submit"
                  className="w-full p-6 rounded-[15px] bg-[#3f3f5b] border-4 border-[#50506f] text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {!isLoading ? "LOGIN TO ACCOUNT" : <Loader />}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <Form {...Signupform}>
              <form
                onChange={() => {
                  if (submitError) setSubmitError("");
                }}
                onSubmit={Signupform.handleSubmit(onSignUpSubmit)}
                className="w-full sm:justify-center sm:w-[400px] space-y-4 flex flex-col"
              >
                <Label>Email</Label>
                <FormField
                  disabled={isLoading}
                  control={Signupform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          className="shadow-lg"
                          placeholder="neomodeostudio@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Label>Password</Label>
                <FormField
                  disabled={isLoading}
                  control={Signupform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          className="shadow-lg"
                          placeholder="**************"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label>Confirm Password</Label>
                <FormField
                  disabled={isLoading}
                  control={Signupform.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="**************"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button
                  type="submit"
                  className="w-full p-6 rounded-[15px] bg-[#3f3f5b] border-4 border-[#50506f] text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  {!isLoading ? "REGISTER AN ACCOUNT" : <Loader />}
                </Button>
                {(confirmation || codeExchangeError) && (
                  <>
                    <Alert className={`${confirmationAndErrorStyles} bg-black`}>
                      {!codeExchangeError && <MailCheck className=" text-white h-4 w-4" />}
                      <AlertTitle className="text-white font-semibold">
                        {codeExchangeError
                          ? "Invalid Link"
                          : "Check your email."}
                      </AlertTitle>
                      <AlertDescription className="text-white font-semibold">
                        {codeExchangeError ||
                          "An email confirmation has been sent."}
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
