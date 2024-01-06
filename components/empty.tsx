import Image from "next/image";
import { Badge } from "./ui/badge";
import axios from "axios";
import toast from "react-hot-toast";

interface EmptyProps {
    label: string;
    isPro: boolean;
}

export const Empty = ({
    label, isPro
}: EmptyProps) => {
    return ( 
        <div className="h-full p-10 flex flex-col items-center justify-center">
            <div className="text-sm text-center">
            {isPro ?<p> {label} </p>: <Badge className="uppercase text-sm py-1" variant="premium">For Pro Users</Badge>} 
            </div>
            <div className="relative h-72 w-72">
                <Image
                alt="Empty"
                fill
                src="/empty.png"
                />
            </div>
            
        </div>
     );
}