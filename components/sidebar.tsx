"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, User, GraduationCap, PersonStanding, QrCode, Stethoscope, VenetianMask } from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";
const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Headshot Generation",
        icon: User,
        href: "/headshotai",
        color: "text-pink-700"
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
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: SidebarProps) => {
    const pathname = usePathname();
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-4 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                        fill
                        alt="Logo"
                        src="/logo.png"
                        />
                    </div>
                    <h1 className= {cn("text-2xl font-bold", montserrat.className)}>
                        Genius Ai
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white  hover:bg-white/10 rounded-lg transition", 
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                        )}
                        >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                            {route.label}
                        </div>  
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
            isPro={isPro}
            apiLimitCount={apiLimitCount}
            />
        </div>
     );
}
 
export default Sidebar
