import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export const maxDuration = 200; // This function can run for a maximum of 5 seconds

interface IncomingResponse {
    id: string,
    rid: string,
    flags: string,
    content: string,
}

export async function POST ( req: Request ) {
 try {

    new NextResponse('Vercel', {
        status: 200,
    });

    const { userId } = auth();
    
    const body = await req.json();
    const { templateUri, imageUrl, token } = body;
    const MJ_SERVER: any = process.env.MIDJOURNEY_SERVER;

    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      };

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const freeTrail = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrail && !isPro) {
        return new NextResponse("Free trail has expired.", { status: 403 });
    }

    const saveid = await axios.post(
        MJ_SERVER+'/uploadimage', {url: imageUrl }, options
    );

    if (!saveid) {
        return new NextResponse("Please try to upload your image again", { status: 500 });
    }

    const savedImage: IncomingResponse = saveid.data;

    const data = {
        rid: savedImage.rid,
        templateUri: templateUri
    }

    const response = await axios.post(
        MJ_SERVER+'/fetchimages', data, options
    );

    const res = response.data;

    if (!res) {
        return new NextResponse("Please try again", { status: 500 });
    }

    axios.post(
        MJ_SERVER+'/deleteid', { rid: savedImage.rid }, options
    );

    if (!isPro){
        await increaseApiLimit();
    }

    return NextResponse.json(res);

    } catch (error) {
        console.log("[FETCHIMAGES_ERROR]", error);
        return new NextResponse("internal error", {status: 500 });
    }
}