"use client";

import axios from "axios";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { 
    Check, 
    User, 
    Zap,
    GraduationCap, 
    PersonStanding, 
    QrCode, 
    Stethoscope, 
    VenetianMask
} from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import toast from "react-hot-toast";


const tools = [
    {
        label: "Professional Headshot Generation",
        icon: User,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10"
    },
    {
        label: "Full Body Generation",
        icon: PersonStanding,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
      },
      {
        label: "Graduation Pics Generation",
        icon: GraduationCap,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10"
      },
      {
        label: "Fantasy Pics Generation",
        icon: VenetianMask,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10"
      },
      {
        label: "Career Pics Generation",
        icon: Stethoscope,
        color: "text-green-700",
        bgColor: "bg-green-700/10"
      },
      {
        label: "QR Code Art Generator",
        icon: QrCode,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
      },
  ]

export const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false)

    const onSubscribe = async () => {
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
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to Genius Ai
                        <Badge className="uppercase text-sm py-1" variant="premium">
                            pro
                        </Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                    {tools.map((tool) => (
                        <Card
                            key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5"/>
                        </Card>
                    ))}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                disabled={loading} 
                onClick={onSubscribe}
                className="w-full focus:outline-none"
                size="lg"
                variant="premium"
                >
                    Upgrade
                    <Zap className="w-4 h-4 ml-2 fill-white"/>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
