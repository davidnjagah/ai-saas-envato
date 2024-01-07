import * as z from "zod";


export const formSchema = z.object({
    imageUrl: z.string().min(1),
    email: z.string().min(1),
    template: z.object({
        name: z.string().min(1),
        prompt: z.string().min(1),
        uri: z.string().min(1)
    })
});

export const amountOptions = [
    {
        value: "1",
        label: "1 Photo",
    },
    {
        value: "1 2",
        label: "2 Photos",
    },
    {
        value: "1 2 3",
        label: "3 Photos",
    },
    {
        value: "1 2 3 4",
        label: "4 Photos",
    }

];

    
export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    },
];

export const templateOptions = [
    {
        name: "African Male black business suit close up face",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri: "https://utfs.io/f/16d310a1-b97a-4412-bc7c-9447f23f058e-90mz5w.png"
    },
    {
        name: "African Male black business suit",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri:"https://cdn.discordapp.com/attachments/1183359810947784748/1186350735835807824/dwashie_an_east_african_kenyan_man_who_is_a_little_bit_buff_wit_ae2621af-81ff-43d9-b916-f3755148020a.png"
    },
    {
        name: "African female black business suit",
        prompt: "an east african kenyan female who is very beautiful, wearing black business suit with black shirt and black tie.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187281287044673618/dwashie_an_east_african_kenyan_female_who_is_very_beautiful_and_2a23aa05-a124-4d2f-8a6e-85dbef55b364.png"
    },
    {
        name: "African female black business suit 2",
        prompt: "an east african kenyan female who is very beautiful, wearing black business suit with black shirt and black tie.",
        uri: "https://utfs.io/f/ef63f5bb-0314-4468-9976-c9bbe8183571-kpppk1.png"
    },
    {
        name: "African Male black business suit hands in pockets 2",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri: "https://utfs.io/f/90fc2500-42f9-49a9-b995-5b6ff66007ee-g4iu0l.png"
    },
    {
        name: "African Male black business suit hands in pockets",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri: "https://utfs.io/f/7b236215-a3b7-4bd1-83d5-10f55bbaa810-9af6b4.png"
    },
    {
        name: "African Male black business suit hands in pockets with pointy hair",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri: "https://utfs.io/f/6221bfb1-e9a4-44ea-8f6b-30016efa285f-ao3kdw.png"
    },
    {
        name: "African Male black business suit hands in pockets with red tie",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri: "https://utfs.io/f/0dd5b760-fb08-4a2d-b41d-359698dd3fcc-deli1p.png"
    },
    ];