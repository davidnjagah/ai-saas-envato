import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import Replicate from "replicate";
import prismadb from "./prismadb";
import { utapi } from "@/lib/uploadthing";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


export const maxDuration = 200; // This function can run for a maximum of 5 seconds

export async function POST(
    req: Request
)   {
    try {
        const { userId } = auth();
        const body = await req.json();
        const user = await currentUser();
        const { template, imageUrl, email, token } = body;
        const MJ_SERVER: any = process.env.MIDJOURNEY_SERVER;

        console.log(template);

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!imageUrl) {
            return new NextResponse("Image upload is required", { status: 400 });
        }

        new NextResponse('Vercel', {
            status: 200,
        });
        
        const userEmail = user.emailAddresses[0].emailAddress

        const freeTrail = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrail && !isPro) {
            return new NextResponse("Tokens have expired.", { status: 403 });
        }

        const data = {
            email: email,
            template: template,
            imageUrl: imageUrl,
            userId: userId,
            userEmail: userEmail
        }

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          };
    
          const output = await replicate.run(
            "catio-apps/photoaistudio-generate:1ed8b5810e1e4291699e6a43ef9c641196d660eae7cba314d83519a898a409da",
            {
                  input: {
                    seed: 1,
                    steps: 8,
                    width: 1080,
                    prompt: template.prompt,
                    n_prompt: "ugly, bad hair, baggy, blurry",
                    face_image: imageUrl,
                    pose_image: template.uri,
                    num_samples: 1,
                    face_resemblance: 0.5,
                    pose_resemblance: 0.8,
                    face_expanding_bbox: 0.5
                  }
                }
          );

        const uploadedFile = await utapi.uploadFilesFromUrl(output);

        let uploaded = ""

        const myObject = uploadedFile;

        if (Array.isArray(myObject)) {
          // It's an array
          if(myObject[0].data){
          uploaded = myObject[0].data?.url; // You might want to handle the array case differently
        }
        } else {
          // It's a single object
          if(myObject.data){
          uploaded = myObject.data.url;
          }
        }

        const outputdb= await prismadb.generations.create({
            data: {
                userId,
                email,
                output: uploaded,
                prompt: template.prompt,
                prompturi: template.uri,
                upload: imageUrl
            }
          });

        await increaseApiLimit();
        
        console.log("Succeeded");

        return NextResponse.json(uploaded);

    } catch (error) {
        console.log("[HEADSHOT_ERROR]", error);
        return new NextResponse("internal error", {status: 500 });
    }
}