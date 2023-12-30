"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

import { formSchema, templateOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { FileUpload } from "@/components/file-upload";

interface Template {
    name: string,
    prompt: string,
    uri: string
};

const HeadshotAiPage = () => {
    const { getToken } = useAuth();
    let [count, setCount] = useState(0);
    const proModal = useProModal();
    const router = useRouter();
    const [image, setImage] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<Template>({name: "", prompt: "", uri: ""});

  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: "",
            templateUri: selectedImage.uri
        }
    })


    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (selectedImage) {
            form.setValue('templateUri', selectedImage.uri);
        }
    
    }, [selectedImage, form])
    


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const token = await getToken({ template: 'ai-saas' });

        const response = await axios.post("/api/fetchimages",{
            templateUri: values.templateUri,
            imageUrl: values.imageUrl,
            token: token,
        });

        form.setValue('imageUrl', "");

        setImage(response.data);

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong, Please try again.");
            }
        } finally {
            router.refresh();
        }
    }
    const handleImageSelect = (image: Template) => {
      setSelectedImage(image);
    };

    function handleForm() {
        const template = form.getValues('templateUri');
        const upload = form.getValues('imageUrl');

        if (!template) {
            toast.error("Please choose one of the professional headshot image.");
        }

        if (!upload) {
            toast.error("Please upload your image.");
        }
    }

    return ( 
        <div>
            <Heading
            title="Professional Headshot Generation"
            description="Create a profesional headshot photo just by uploading one of your image."
            Icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8 ">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <p className="text-muted-foreground text-sm text-center pb-2">
                            Please upload one of your photos with great lighting and framing of your face.
                        </p>
                        <div className="flex items-center justify-center text-center p-5">
                        <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <FileUpload
                                    endpoint="passportImage"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        </div>
                        <div className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-4                        
                        ">
                        <FormField
                        control={form.control}
                        name="templateUri"
                        render={({ field }) => (
                            <FormItem className="col-span-12">
                                <p className="text-muted-foreground text-sm text-center pb-2">
                                    Please choose one image below
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                                    {templateOptions.map((image) => (
                                    <div
                                        key={image.name}
                                        className={`cursor-pointer ${selectedImage.name === image.name ? 'ring-2 ring-blue-500' : ''}`}
                                        onClick={() => handleImageSelect(image)}
                                        onChange={field.onChange}
                                    >
                                        <Image
                                        alt={image.name}
                                        width={500}
                                        height={500}
                                        src={image.uri}
                                        />
                                    </div>
                                    ))}
                                </div>
                            </FormItem>
                        )}
                        />                        
                        <Button className="my-3 col-span-12 w-full focus:outline-none" disabled={isLoading} onClick={()=>{handleForm()}}>
                            Generate
                        </Button>
                        </div>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {image === "" && !isLoading &&(
                       <Empty label="No image generated"/>
                    )}
                    {image !== "" && (
                    <Card 
                        key={image}
                        className="rounded-lg overflow-hidden"
                    >
                            <div className="relative aspect-square">
                                <Image
                                    alt="Image"
                                    fill
                                    src={image}
                                />
                            </div>
                            <CardFooter className="p-2">
                                <Button 
                                onClick={() => window.open(image)}
                                variant="secondary" 
                                className="w-full"
                                >
                                    <Download className="h-4 w-4 mr-2"/>
                                    Download
                                </Button>
                            </CardFooter>
                    </Card>)}
                </div>
            </div>
        </div>
     );
}
 
export default HeadshotAiPage;