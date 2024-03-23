"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { chapterSchema } from "@/lib/FormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { randomUUID } from "crypto";
import { Cross, Edit, Ghost, Pencil, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoExit } from "react-icons/io5";
import { z } from "zod";

interface CourseChapterFormProps {
  data: any; //Change it later
  courseId: string;
  environmentId: string;
}

const logoStyle = "h-4 w-4";

const CourseChapterForm = ({
  data,
  courseId,
  environmentId,
}: CourseChapterFormProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // mock chapters
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Chapter1",
      isPublished: false,
    },
    {
      id: 2,
      title: "Chapter2",
      isPublished: false,
    },
    {
      id: 3,
      title: "Chapter3",
      isPublished: true,
    },
  ]);

  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof chapterSchema>) => {
    // add the chapter title to the db
    console.log({ ...values });
    values.title &&
      setChapters([
        ...chapters,
        { ...values, id: chapters.length + 1, isPublished: true },
      ]);
    setIsEditable(false);
  };

  useEffect(() => {
    console.log(chapters);
  }, [chapters]);

  return (
    <div className="dark:bg-black/20 px-4 py-2 rounded-xl border-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Course chapters</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsEditable((prev) => !prev);
          }}
        >
          {isEditable ? (
            <Plus className={`${logoStyle} rotate-45`} />
          ) : (
            <PlusCircle className={logoStyle} />
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mt-6">
        {!isEditable && (
          <div className="min-h-[60px]">
            {chapters.length == 0 ? (
              <div>
                <Ghost />
              </div>
            ) : (
              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={clsx(
                      "flex justify-between items-center px-2 border py-1.5 rounded-lg",
                      chapter.isPublished
                        ? "border-brand/yellow/20 bg-brand/yellow/10"
                        : "border-slate-700 bg-slate-800/50"
                    )}
                  >
                    <h6>{chapter.title}</h6>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={chapter.isPublished ? "success" : "default"}
                      >
                        <p className="text-xs truncate">
                          {chapter.isPublished ? "Published" : "Draft"}
                        </p>
                      </Badge>
                      <Link
                        href={`/${environmentId}/create-course/${courseId}/chapter/${chapter.id}`}
                      >
                        <Edit className={logoStyle} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {isEditable && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Chapter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="sm">
                Submit
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CourseChapterForm;
