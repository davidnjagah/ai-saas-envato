"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { VenetianMask } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { OtherPageProps } from "@/lib/interfaces";


const FantasyPage = ({ isPro }: OtherPageProps) => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
    }

    return ( 
        <div>
            <Heading
            title="Fantasy Pics Generation"
            description="Generate fanstatic Fantasy and explore endless possibilities of what you could look like in different realities."
            Icon={VenetianMask}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading &&(
                       <Empty label="Coming soon" isPro= {isPro}/>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default FantasyPage;