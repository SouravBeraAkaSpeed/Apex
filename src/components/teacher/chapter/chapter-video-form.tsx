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
// import VideoPlayer from "@/components/video-player";
import { chapterSchema } from "@/lib/FormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross, Pencil, Plus, PlusCircle, VideoIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoExit } from "react-icons/io5";
import { z } from "zod";

interface ChapterVideoFormProps {
  data: any; //Change it later
}

const logoStyle = "h-4 w-4";

const ChapterVideoForm = ({ data }: ChapterVideoFormProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      video: data.video ?? "",
    },
  });

  const onSubmit = () => {
    // add data to db
  };

  return (
    <div className="dark:bg-black/20 px-4 py-2 rounded-xl border-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Chapter video</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsEditable((prev) => !prev);
          }}
        >
          {isEditable ? (
            <Plus className={`${logoStyle} rotate-45`} />
          ) : data.video ? (
            <Pencil className={logoStyle} />
          ) : (
            <PlusCircle className={logoStyle} />
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mt-6">
        {!isEditable && (
          <div className="aspect-video relative">
            {!isEditable && (
              <div className="relative aspect-video">
                {data.video ? (
                  <div>
                    {/* <VideoPlayer videoUrl={data.video} className="rounded-xl" /> */}
                  </div>
                ) : (
                  <div
                    className="p-3 border border-dashed h-full border-brand/yellow/20 rounded-xl flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => setIsEditable(true)}
                  >
                    <VideoIcon className={logoStyle} />
                    <p className="text-sm">Upload video</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {isEditable && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Chapter title"
                        {...field}
                      />
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
        <p className="text-muted-foreground text-xs italic mt-2">Video may take some time to render.</p>
      </div>
    </div>
  );
};

export default ChapterVideoForm;