import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST( req: Request) {

    const event = req.body;
    console.log("This is the req.body", event)

    return new NextResponse("Event recieved", {status: 200 });
}

