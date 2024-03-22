"use client";

import { FileIcon, X } from "lucide-react";

import { Input } from "./ui/input";
import { useSupabaseUser } from "./providers/supabase-user-provider";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { uploadProfilePicture } from "@/lib/supabase/queries";
import { Button } from "./ui/button";
import Image from "next/image";

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
      className="text-black  mt-2 bg-white w-full"
      onChange={(e) => {
        onQualificationDocumentUpload({ e });
      }}
      value={value}
    />
  );
};

interface EnviromentLogoUploadProps {
  onChange: (url?: string) => void;
  value: string | undefined;
  setUploadinglogo: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EnvironmentLogoUpload = ({
  onChange,
  value,
  setUploadinglogo,
}: EnviromentLogoUploadProps) => {
  const { user } = useSupabaseUser();
  const [profileId, setProfileId] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (user) setProfileId(user.id);
  }, [user]);

  interface onEnvironmentLogoUploadProps {
    e: React.ChangeEvent<HTMLInputElement>;
  }
  const onEnvironmentLogoUpload = async ({
    e,
  }: onEnvironmentLogoUploadProps) => {
    console.log("called");
    if (!profileId) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const uuid = v4();
    setUploadinglogo(true);
    const { data, error } = await supabase.storage
      .from("environment-logos")
      .upload(`environmentLogos.${profileId}.${uuid}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (!error) {
      console.log(data);
      const path = supabase.storage
        .from("environment-logos")
        .getPublicUrl(`environmentLogos.${profileId}.${uuid}`)?.data.publicUrl;
      onChange(path);
      setUploadinglogo(false);
    }
  };

  if (value) {
    return (
      <div className="relative flex justify-center items-center p-4  rounded-md bg-background/10 border-2 mt-3 ">
        <Image width={50} height={50} src={value} alt="Environment Logo" className="rounded-full w-[50px] h-[50px]" />

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
    accept="image/*"
    className="text-white  mt-2  w-full "
    onChange={(e) => {
      onEnvironmentLogoUpload({ e });
    }}
    value={value}
    />
  );
};

interface ImageUploadProps {
  setUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
}

export const ImageUpload = ({
  setUploadingImage,
  fetchData,
}: ImageUploadProps) => {
  const { user } = useSupabaseUser();
  const [profileId, setProfileId] = useState("");
  const supabase = createClientComponentClient();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (user) setProfileId(user.id);
  }, [user]);

  interface onProfilePictureUploadProps {
    e: React.ChangeEvent<HTMLInputElement>;
  }
  const onProfilePictureUpload = async ({ e }: onProfilePictureUploadProps) => {
    console.log("called");
    if (!profileId) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const uuid = v4();
    setUploadingImage(true);
    const { data, error } = await supabase.storage
      .from("profile-picture")
      .upload(`profilePictures.${profileId}.${uuid}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (!error) {
      console.log(data);
      const path = supabase.storage
        .from("profile-picture")
        .getPublicUrl(`profilePictures.${profileId}.${uuid}`)?.data.publicUrl;
      setValue(path);
      setUploadingImage(false);
    }
  };

  const updateDatabaseWithProfilePicture = async () => {
    console.log("runned");
    const profile = await uploadProfilePicture({
      profile_picture: value,
      id: profileId,
    });
    console.log(profile);
    fetchData();
  };

  if (value) {
    return (
      <div>
        <div className="relative w-full flex items-center   rounded-md bg-background/10 border-2 mt-3 ">
          <FileIcon className="h-12 w-10 ml-10 fill-indigo-200 stroke-indigo-400" />
          <div className="text-blue-600 w-1/2">{value.substring(0, 40)}...</div>
          <button
            onClick={() => setValue("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-1 right-1 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Button
          className="w-full bg-white text-black border-2 mt-4"
          disabled={value === "" ? true : false}
          onClick={() => updateDatabaseWithProfilePicture()}
        >
          Upload
        </Button>
      </div>
    );
  }

  return (
    <Input
      type="file"
      accept="image/*"
      className="text-white  mt-2  w-full "
      onChange={(e) => {
        onProfilePictureUpload({ e });
      }}
      value={value}
    />
  );
};
