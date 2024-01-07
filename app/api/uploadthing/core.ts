import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

interface IncomingResponse {
    id: string,
    rid: string,
    flags: string,
    content: string,
}
 
const handleAuth = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
}

export const ourFileRouter = {
  passportImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;