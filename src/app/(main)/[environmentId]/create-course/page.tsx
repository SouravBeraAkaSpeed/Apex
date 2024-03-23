"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { courseSchema } from "@/lib/FormSchemas";

const Page = ({
  params,
}: {
  params: {
    environmentId: string;
  };
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof courseSchema>) {
    // create a new course on db and get the id back and push
    router.push(`/${params.environmentId}/create-course/${values.title}`);
  }

  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center">
      <div className="">
        <h1 className="text-3xl font-bold text-brand/yellow">
          Create a new course
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-white/50 w-full"
                      placeholder="E.g. Machine Learning course "
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
