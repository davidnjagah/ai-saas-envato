import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
  }
  
  export const ourFileRouter = {
    passportImage: f({ image: { maxFileSize: "4MB", maxFileCount: 10} })
      .middleware(() => handleAuth())
      .onUploadComplete(({ metadata, file}) => {
        // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata);
 
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      // return { 
      //   uploadedBy: metadata.userId,
      //   fileUrl: file.url
      //   };
      }),
  } satisfies FileRouter;
   
  export type OurFileRouter = typeof ourFileRouter;