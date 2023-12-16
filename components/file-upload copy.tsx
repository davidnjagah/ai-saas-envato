"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

import "@uploadthing/react/styles.css";
import { useEffect, useState } from "react";
import { UploadFileResponse } from "uploadthing/client";
import { string } from "zod";


interface FileUploadProps {
  onChange: (url?: string | UploadFileResponse<null>[]) => void;
  endpoint: "passportImage";
  value?: string[];
}


export const FileUpload = ({
  onChange,
  endpoint,
  value = []
}: FileUploadProps) => {

  const router = useRouter();

  const id = Math.trunc(Math.random()*100000000);

  useEffect(() => {
    //console.log(images);
    //console.log(id);

  }, [id])

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const imagearray:any = [];
        res.map((r)=>{
          return imagearray.push(r.url)
        })
        const newres = value.concat(imagearray);
        router.push(`/headshotai/${id}?images=${newres}`);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  )
}

