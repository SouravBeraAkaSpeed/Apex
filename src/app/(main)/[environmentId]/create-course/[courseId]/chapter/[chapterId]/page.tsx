import ChapterDescriptionForm from "@/components/teacher/chapter/chapter-description-form";
import ChapterTitleForm from "@/components/teacher/chapter/chapter-title-form";
import ChapterVideoForm from "@/components/teacher/chapter/chapter-video-form";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player";
import { TEACHER_DETAILS } from "@/mockdata";
import { ChevronLeft, Trash } from "lucide-react";
import Link from "next/link";

const logoStyle = "h-4 w-4";

const page = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const details = TEACHER_DETAILS[0].courses[0].chapters[0];

  return (
    <div className="">
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <Link
            href={`/teach/create/${params.courseId}`}
            className="flex justify-between items-center"
          >
            <ChevronLeft className={logoStyle} />
            Back to course page
          </Link>
        </div>
        <div className="flex justify-between">
          <h1 className="text-2xl md:text-4xl font-bold">Create chapter</h1>
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
                Customize your chapter
              </h1>
              <ChapterTitleForm data={details} />
            </div>
            <ChapterDescriptionForm data={details} />
          </div>

          {/* Column 2 */}
          <div className="max-w-[500px] space-y-4 mt-4 md:mt-0 md:space-y-12">
            <div>
              <h1 className="text-xl font-semibold text-brand/yellow mb-6">
                Chapter video
              </h1>
              <ChapterVideoForm data={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;