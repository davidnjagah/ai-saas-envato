/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
    userMaxApiCount: number;
}

export const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false,
    userMaxApiCount = 1
}:FreeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {

        setMounted(true);

    }, []);

    if (!mounted) {
        return null;
    }

  return (
    <div className="px-3">
        <Card className="bg-white/10 border-0">
            <CardContent className="py-6">
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    {apiLimitCount < userMaxApiCount ? 
                    <p>
                        {apiLimitCount} / {userMaxApiCount} Generation Tokens
                    </p>
                    :
                    <p>
                        You have reached your max tokens, please upgrade.
                    </p>
                    }
                    <Progress
                        className="h-3"
                        value={(apiLimitCount / userMaxApiCount) * 100}
                    />
                </div>
                <Button onClick={proModal.onOpen} className="w-full" variant="premium">
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white"/>
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}
