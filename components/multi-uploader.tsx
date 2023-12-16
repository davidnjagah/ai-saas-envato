"use client";

import type { FileWithPath } from "@uploadthing/react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useCallback, useEffect, useState } from "react";
import { UploadFileResponse, generateClientDropzoneAccept } from "uploadthing/client";
import "@uploadthing/react/styles.css";
import { Loader } from "./loader";


interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: "passportImage"
  }
  
const { useUploadThing, uploadFiles } = generateReactHelpers();


export function MultiUploader({
    onChange,
    endpoint
  }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: (res) => {
        setImages(res);
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    },
  );
// @refresh reset
  const [images, setImages] = useState<UploadFileResponse<{ uploadedBy: string; fileUrl: string; }>[]>([]);
  
  // const filterOut = ( images: any[], count: number) => {
  //   const index = images.indexOf(count);
  //   const x = images.filter(index, count);
  //   console.log("This is copy ");
  //   console.log("x "+x);
  //   setImages(x);
  // }
  useEffect(() => {
    console.log(images);
  }, [images])
  
  let count = 0;

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
  
  

  return (
    <>
    {isUploading && (
          <div className="p-20">
              <Loader />
          </div>
    )}
    {images.length > 0 && (
        images.map((image)=>(
          <div key = {image.key} className="relative h-20 w-20">
          <Image
            fill
            src={image.url}
            alt="Upload"
            className="rounded-full"
          />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
          {count++}
        </div>
          ))
      )}
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && (
        <>
          <button onClick={() => startUpload(files)}>
            Upload {files.length} files
          </button>
        </>
        )}
      </div>
      Drop files here!
    </div>
    {console.log(files)}
    </>
  );
}