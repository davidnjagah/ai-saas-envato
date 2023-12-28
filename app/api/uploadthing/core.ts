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
 
const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
}

export const ourFileRouter = {
  passportImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async (value) => {

    const data = {
      url: value.file.url
    }

    console.log(value);

    const userId = value.metadata.userId;

    const prev = await prismadb.uploads.findUnique({ 
      where: {
          userId,
      }
    });

    if(prev){
    axios.post(
        MJ_SERVER+'/deleteid', { rid: prev.saveid }
    );
    }

    const response = await axios.post(
        MJ_SERVER+'/uploadimage', data
    );

    const res: IncomingResponse = response.data;

    const userUpload = await prismadb.uploads.findUnique({ 
      where: {
          userId,
      }
    });

    if(!userUpload){
      await prismadb.uploads.create({
        data: {
            userId,
            imageurl: data.url,
            saveid: res.rid
        },
    });}

    if(userUpload){
      await prismadb.uploads.update({
        where: {
            userId,
        },
          data: {
              imageurl: data.url,
              saveid: res.rid
          },
      });}
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;