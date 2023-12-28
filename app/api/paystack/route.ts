import * as https from 'https';
import { NextResponse } from "next/server";
import axios from "axios";

interface PageParams {
  email: string;
  amount: string;
}


export async function POST ( req: Request ) {
    const params: PageParams = {
        "email": "customer@email.com",
        "amount": "20000"
    };

    const options = {
        headers: {
            Authorization: 'Bearer sk_test_7f5e2eb42f733ec9506845419816bcb61d56e62a',
            'Content-Type': 'application/json'
        }
    };

    axios.post('https://api.paystack.co/transaction/initialize', params, options)
        .then(response => {
        console.log(response.data);
        })
        .catch(error => {
        console.error(error);
    });

}
