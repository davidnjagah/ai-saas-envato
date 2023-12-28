import * as z from "zod";


export const formSchema = z.object({
    imageUrl: z.string().min(1),
    templateUri: z.string().min(1)
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
        name: "African Male black business suit",
        prompt: "an east african kenyan man who is a little bit buff with east african hair that is neatily shaven into a fade haircut and he has on a black business suit with black shirt and black tie.",
        uri:"https://cdn.discordapp.com/attachments/1183359810947784748/1186350735835807824/dwashie_an_east_african_kenyan_man_who_is_a_little_bit_buff_wit_ae2621af-81ff-43d9-b916-f3755148020a.png"
    },
    {
        name: "African female black business suit",
        prompt: "an east african kenyan female who is very beautiful and her hair is black and braided, wearing black business suit with black shirt and black tie.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187281287044673618/dwashie_an_east_african_kenyan_female_who_is_very_beautiful_and_2a23aa05-a124-4d2f-8a6e-85dbef55b364.png"
    },
    {
        name: "White female business suit",
        prompt: "a caucasian woman who is very beautiful with blonde hair and she is wearing a fomral womens pants suit with a white shirt and no blazer.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187281854370414592/dwashie_a_caucasian_woman_who_is_very_beautiful_with_blonde_hai_a83221bb-1c0b-413c-af9b-2f1e434ea965.png"
    },
    {
        name: "White man business suit",
        prompt: "a caucasian man who is a little bit buff with neatily shaven hair and he has on a blue business suit with black shirt and black tie.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187282567578271874/dwashie_a_caucasian_man_who_is_a_little_bit_buff_with_neatily_s_74fa5105-8c9c-4995-a7b0-265eb1ba6ded.png"
    },
    {
        name: "Asian man in a business suit",
        prompt: "an asain man who is a little bit buff with well gelled hair that is neatily shaven into a fade haircut and he has on a brown business suit with biege shirt and black tie.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187283123545845820/dwashie_an_asain_man_who_is_a_little_bit_buff_with_well_gelled__f9489b92-7687-443e-8053-c35df0baa1c5.png"
    },
    {
        name: "Asain woman business suit",
        prompt: "an asain woman who is very beautiful with brunette asain hair and she is wearing a fomral womens pants suit with a white shirt and no blazer.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187283487833735198/dwashie_an_asain_woman_who_is_very_beautiful_with_brunette_asai_0a07b332-b153-4fff-bd61-3535cb7c4f38.png"
    },
    {
        name: "Indian male business suit",
        prompt: "an Indian man who is a little bit buff with hair that is neatily shaven and he has on a black business suit with black shirt and black tie.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187283934506139648/dwashie_an_Indian_man_who_is_a_little_bit_buff_with_hair_that_i_0b94a401-d519-4281-b5db-5ea27766ee59.png"
    },
    {
        name: "Indian woman business suit",
        prompt: "an Indian woman who is very beautiful with brunette asain hair and she is wearing a fomral womens pants suit with a white shirt and a black blazer.",
        uri: "https://cdn.discordapp.com/attachments/1183359810947784748/1187284438011346974/dwashie_an_Indian_woman_who_is_very_beautiful_with_brunette_asa_ef19a418-f4a2-4f5d-ab65-95a6bc829621.png"
    }
    ];