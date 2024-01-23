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
import { Input } from "@/components/ui/input";

import { formSchema, templateOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { FileUpload } from "@/components/file-upload";
import { Card, CardFooter } from "@/components/ui/card";
import { Empty } from "@/components/empty";

interface Template {
    name: string,
    prompt: string,
    uri: string
};

const HeadshotAiPage = () => {
    const { getToken } = useAuth();
    const proModal = useProModal();
    const router = useRouter();
    const [image, setImage] = useState<string[]>();
    const [selectedImage, setSelectedImage] = useState<Template>({name: "", prompt: "", uri: ""});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: "",
            template: selectedImage,
            email: "john@example.com"
        }
    })

    useEffect(() => {
        if (selectedImage) {
            form.setValue('template', selectedImage);
        }
    }, [selectedImage, form])

    const upload = form.getValues('imageUrl');
    const email = form.getValues('email');
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const token = await getToken({ template: 'ai-saas' });

        console.log(values);

        const response = await axios.post("/api/headshot",{
            template: values.template,
            imageUrl: values.imageUrl,
            email: values.email,
            token: token,
        });

        toast.success("Image has been generated.", ({duration: 5000}));

        setImage(response.data);

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
            else {
                toast.error("Something went wrong, Please try again in a few.");
            }
        } finally {
            router.refresh();
        }
    }

    const handleImageSelect = (image: Template) => {
      setSelectedImage(image);
    };
    

    function handleForm() {
        
        if (!selectedImage.uri) {
            toast.error("Please choose one of the professional headshot image.");
        }

        if (!upload) {
            toast.error("Please upload your image.");
        }

        if (!email) {
            toast.error("Please input an email.");
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
                        <p className="text-sm text-center pb-2">
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
                        name="template"
                        render={({ field }) => (
                            <FormItem className="col-span-12">
                                <p className="text-sm text-center pb-2">
                                    Please choose one image below
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                                    {templateOptions.map((image) => (
                                    <div
                                        key={image.uri}
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
                        <Button className="col-span-12 w-full focus:outline-none" disabled={isLoading} onClick={()=>{handleForm()}}>
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
                    {image.length === 0 && !isLoading &&(
                       <Empty  label="No images generated" v = "placement"/>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gird-cols-2 gap-4 mt-8">
                        {image.map((src) => (
                        <Card 
                            key={src}
                            className="rounded-lg overflow-hidden"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    alt="Image"
                                    fill
                                    src={src}
                                />
                            </div>
                            <CardFooter className="p-2">
                                <Button 
                                onClick={() => window.open(src)}
                                variant="secondary" 
                                className="w-full"
                                >
                                    <Download className="h-4 w-4 mr-2"/>
                                    Download
                                </Button>
                            </CardFooter>
                        </Card>
                        ))}
                    </div>
                </div>
                <div className="space-y-4 my-36">
                </div>
            </div>
        </div>
     );
}
 
export default HeadshotAiPage;