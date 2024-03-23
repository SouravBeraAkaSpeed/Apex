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
import { courseSchema } from "@/lib/FormSchemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { Cross, Pencil, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoExit } from "react-icons/io5";
import { z } from "zod";

interface CoursePriceFormProps {
  data: any; //Change it later
}

const logoStyle = "h-4 w-4";

const CoursePriceForm = ({ data }: CoursePriceFormProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      price: data.price,
    },
  });

  const onSubmit = () => {
    // add data to db
  };

  return (
    <div className="dark:bg-black/20 px-4 py-2 rounded-xl border-2">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Course price</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsEditable((prev) => !prev);
          }}
        >
          {isEditable ? (
            <Plus className={`${logoStyle} rotate-45`} />
          ) : data.price ? (
            <Pencil className={logoStyle} />
          ) : (
            <PlusCircle className={logoStyle} />
          )}
        </div>
      </div>

      {/* Form */}
      <div className="mt-6">
        {!isEditable && (
          <div>{data.price ?? <p className="italic ">Add course price</p>}</div>
        )}
        {isEditable && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Course price"
                        type="number"
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
      </div>
    </div>
  );
};

export default CoursePriceForm;