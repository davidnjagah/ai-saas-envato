import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

interface PageParams {
    email: string;
    amount: string;
    callback_url: string;
  }

interface Subscription {
    email: string;
    amount: string;
    plan: string,
}

interface SessionResponse {
    authorization_url: string;
    access_code: string;
    reference: string;
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
    
    const params: PageParams = {
        "email": userEmail,
        "amount": "1000",
        "callback_url": settingsUrl
    };

    const subscribe: Subscription = {
        "email": userEmail,
        "amount": "100000",
        "plan": "PLN_h2zahzoexjt4dq4",
    };

    const options = {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
    };
    
    const paystackSession = await axios.post('https://api.paystack.co/transaction/initialize',params, options);

    const res: SessionResponse = paystackSession.data.data;

    console.log("This is the authorization url", res.authorization_url);

    return new NextResponse(JSON.stringify({ url: res.authorization_url }));

} catch (error) {
    console.log("[PAYSTACK_ERROR]", error);
    return new NextResponse("Internal error", {status: 500});
}
}
