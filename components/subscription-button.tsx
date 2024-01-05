"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
    apiLimitCount: number;
    isPro: boolean;
    userMaxApiCount: number;
}

export const SubscriptionButton = ({
    apiLimitCount = 0,
    isPro = false,
    userMaxApiCount = 1
}: SubscriptionButtonProps ) => {
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true);
                const response = await axios.get("/api/paystack");

                window.location.href = response.data.url;           

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button 
            disabled={loading} 
            variant={"premium"}
            onClick={onClick}
        >
            {isPro || apiLimitCount < userMaxApiCount ? "Purchase More Tokens" : "Upgrade"}
            <Zap className="w-4 h-4 ml-2 fill-white"/>
        </Button>
    )
}