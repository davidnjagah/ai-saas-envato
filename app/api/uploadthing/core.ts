import { auth } from "@clerk/nextjs";
import axios from "axios";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import prismadb from "@/lib/prismadb";
 
const f = createUploadthing();
const MJ_SERVER: any = process.env.MIDJOURNEY_SERVER;

interface IncomingResponse {
    id: string,
    rid: string,
    flags: string,
    content: string,
}
 
const handleAuth = async () => {
  const { userId, getToken } = auth();
  if (!userId) throw new Error("Unauthorized");
  const token = await getToken({ template: 'ai-saas' });
  return { userId: userId, token: token };
}

export const ourFileRouter = {
  passportImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;