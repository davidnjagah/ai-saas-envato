"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, GraduationCap, PersonStanding, QrCode, Stethoscope, User, VenetianMask} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Professional Headshot Generation",
    icon: User,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/headshotai"
  },
  {
    label: "Full Body Generation",
    icon: PersonStanding,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/fullbody"
  },
  {
    label: "Graduation Pics Generation",
    icon: GraduationCap,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/graduation"
  },
  {
    label: "Fantasy Pics",
    icon: VenetianMask,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/fantasy"
  },
  {
    label: "Career Pics Generation",
    icon: Stethoscope,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/career"
  },
  {
    label: "QR Code Ai Genrator",
    icon: QrCode,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/qrcode"
  },
]


export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
    <div className="mb-8 space-y-4">
      <h2 className="tect-2xl md:text-4xl font-bold text-center">
          Explore the Power of AI
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Generate images with the smartest AI - Experince the power of AI
      </p>
    </div>
    <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
            <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)}/>
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
        ))}
    </div>
    </div>
  )
}
