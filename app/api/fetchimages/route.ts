
import fetch from 'isomorphic-unfetch';
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST ( req: Response, res: Request) {
 try {
    
    const cookieStore = cookies();
    const sessToken = cookieStore.get('__session');

    //console.log("this is the sesssToken ", sessToken);
    
    //return NextResponse.json(sessToken);

    } catch (error) {
        
    }
}