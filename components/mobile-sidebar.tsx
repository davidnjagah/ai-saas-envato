"use client";
import { useState, useEffect } from 'react'

import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const MobileSidebar = ({
    apiLimitCount = 0,
    isPro = false
}: MobileSidebarProps) => {
    const [domLoaded, setDomLoaded] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
      }, []);

      if (!domLoaded) {
        return null;
      }


    return ( 
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
            {domLoaded && (<Button variant="ghost" size="icon"
            className="md:hidden">
                <Menu/>
            </Button>)}
            </SheetTrigger>
            <SheetContent side="left" className="p-0" onClick={() => (setOpen(false))}>
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
     );
}
 
export default MobileSidebar;