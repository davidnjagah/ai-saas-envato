
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST ( req: Request ) {
 try {
    
    const body = await req.json();
    const { values, token } = body;
    const MJ_SERVER: any = process.env.MIDJOURNEY_SERVER;

    const response = await axios.post(
        MJ_SERVER, values,
        { 
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        }
    );
    console.log("This is response in the api folder", response);
    return NextResponse.json(response.data);

    } catch (error) {
        console.log("[FETCHIMAGES_ERROR]", error);
        return new NextResponse("internal error", {status: 500 });
    }
}