"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { courseSchema } from "@/lib/FormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross, ImageIcon, Pencil, Plus, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoExit } from "react-icons/io5";
import { z } from "zod";

interface CourseImageFormProps {
  data: any; //Change it later
}

const logoStyle = "h-4 w-4";

const CourseImageForm = ({ data }: CourseImageFormProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      image: data.image ? data.image : "",
    },
  });

  const onSubmit = () => {
    // add data to db
  };

  return (
    <div className="dark:bg-black/20 px-4 py-2 rounded-xl border-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Course image</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsEditable((prev) => !prev);
          }}
        >
          {isEditable ? (
            <Plus className={`${logoStyle} rotate-45`} />
          ) : data.image ? (
            <Pencil className={logoStyle} />
          ) : (
            <PlusCircle className={logoStyle} />
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mt-6">
        {!isEditable && (
          <div className="relative aspect-video">
            {data.image ? (
              <Image
                src={"/auth-bg.png"}
                alt="course-image"
                fill
                className="object-cover object-center"
              />
            ) : (
              <div
                className="p-3 border border-dashed h-full border-brand/yellow/20 rounded-xl flex flex-col justify-center items-center cursor-pointer"
                onClick={() => setIsEditable(true)}
              >
                <ImageIcon />
                <p className="text-sm">Add image</p>
              </div>
            )}
          </div>
        )}
        {isEditable && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" accept="image/*" {...field} />
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

export default CourseImageForm;
