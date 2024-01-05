import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import Replicate from "replicate";

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
    
        axios.post(
            MJ_SERVER+'/replicate', data, options
        );

        await increaseApiLimit();
        
        console.log("Succeeded");

        return new NextResponse(null, {
            status: 200,
        });

    } catch (error) {
        console.log("[HEADSHOT_ERROR]", error);
        return new NextResponse("internal error", {status: 500 });
    }
}