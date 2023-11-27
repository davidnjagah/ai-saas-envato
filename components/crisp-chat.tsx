"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
      Crisp.configure("8b2aacdd-a1c9-4c24-b551-6692bfb33fe1"); 
    }, []);
    
    return null;
}