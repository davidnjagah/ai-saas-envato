import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";


interface SessionResponse {
    message: string;
    status: string;
    data: {
        link: string;
    }
}

export async function GET () {
try {
    const { userId } = auth();
    const user = await currentUser();
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!userId || !user) {
        return new NextResponse("Unathorized", {status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress

    const options = {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
    };
    
    const paystackSession = await axios.get('https://api.paystack.co/subscription/:code/manage/link', options);

    const res: SessionResponse = paystackSession.data.data;

    console.log("This is the settings url", res.data.link);

    return new NextResponse(JSON.stringify({ url: res.data.link }));

} catch (error) {
    console.log("[PAYSTACK_ERROR]", error);
    return new NextResponse("Internal error", {status: 500});
    }
}
