
import CourseChapterForm from "@/components/teacher/course/course-chapter-form";
import CourseDescriptionForm from "@/components/teacher/course/course-description-form";
import CourseImageForm from "@/components/teacher/course/course-image-form";
import CoursePriceForm from "@/components/teacher/course/course-price-form";
import CourseTitleForm from "@/components/teacher/course/course-title-form";
import { Button } from "@/components/ui/button";
import { TEACHER_DETAILS } from "@/mockdata";

import { Trash } from "lucide-react";
import React from "react";

const page = ({ params }: { params: { courseId: string } }) => {
  const details = TEACHER_DETAILS[0].courses[0];

  return (
    <div className="">
      <div className="px-4">
        <div className="flex justify-between">
          <h1 className="text-2xl md:text-4xl font-bold">Create Course</h1>
          <div className="flex items-center gap-4">
            <Button className="" variant="brand" size="sm">
              Publish
            </Button>
            <Button variant="brand_purple" size="sm">
              <Trash className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-6 lg:gap-0">
          {/* column 1 */}
          <div className="max-w-[500px] space-y-4 md:space-y-12">
            <div>
              <h1 className="text-xl font-semibold text-brand/yellow mb-6">
                Customize your course
              </h1>
              <CourseTitleForm data={details} />
            </div>
            <CourseDescriptionForm data={details} />
            <CourseImageForm data={details} />
          </div>

          {/* Column 2 */}
          <div className="max-w-[500px] space-y-4 mt-4 md:mt-0 md:space-y-12">
            <div>
              <h1 className="text-xl font-semibold text-brand/yellow mb-6">
                Course chapters
              </h1>
              <CourseChapterForm data={details} courseId={params.courseId} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-brand/yellow mb-6">
                Course pricing
              </h1>
              <CoursePriceForm data={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
