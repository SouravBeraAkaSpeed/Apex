"use client";

import { FileIcon, X } from "lucide-react";

import { Input } from "./ui/input";
import { useSupabaseUser } from "./providers/supabase-user-provider";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string | undefined;
  setUploadingdocument: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FileUpload = ({
  onChange,
  value,
  setUploadingdocument,
}: FileUploadProps) => {
  const { user } = useSupabaseUser();
  const [profileId, setProfileId] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (user) setProfileId(user.id);
  }, [user]);

  interface onQualificationDocumentUploadProps {
    e: React.ChangeEvent<HTMLInputElement>;
  }
  const onQualificationDocumentUpload = async ({
    e,
  }: onQualificationDocumentUploadProps) => {
    console.log("called");
    if (!profileId) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const uuid = v4();
    setUploadingdocument(true);
    const { data, error } = await supabase.storage
      .from("qualification-docs")
      .upload(`qualificationDocs.${profileId}.${uuid}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (!error) {
      console.log(data);
      const path = supabase.storage
        .from("qualification-docs")
        .getPublicUrl(`qualificationDocs.${profileId}.${uuid}`)?.data.publicUrl;
      onChange(path);
      setUploadingdocument(false);
    }
  };

  if (value) {
    return (
      <div className="relative flex items-center p-4  rounded-md bg-background/10 border-2 mt-3 ">
        <FileIcon className="h-12 w-10 ml-10 fill-indigo-200 stroke-indigo-400" />
        <span className="text-blue-600">{value.substring(0, 18)}file</span>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-1 right-1 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <Input
      type="file"
      accept="application/pdf,application/vnd.ms-excel"
      placeholder="Ex: Graduation Certificate, Diploma, Cource Certificate etc."
      className="text-black  mt-2 bg-white w-full"
      onChange={(e) => {
        onQualificationDocumentUpload({ e });
      }}
      value={value}
    />
  );
};
