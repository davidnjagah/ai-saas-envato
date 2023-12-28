"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: "David",
        avatar: "D",
        title: "Actor",
        description: "I needed full-body shots for auditions, and this app delivered stunning results. It boosted my portfolio big time!"
    },
    {
        name: "Mary",
        avatar: "M",
        title: "Air Hostess",
        description: "I was able to get good professionsal headshot photos to help me apply and start my career as an air hostess"
    },
    {
        name: "Sarah",
        avatar: "S",
        title: "Marketing Manager",
        description: "The professional headshot feature made my LinkedIn profile stand out. It's a game-changer for personal branding."
    },
    {
        name: "Kevin",
        avatar: "K",
        title: "Hopsitality Employee",
        description: "I was able to generate good photos to help me with my job hunting abroad!"
    },
    {
        name: "Emily",
        avatar: "E",
        title: "Software Engineer",
        description: "Career photo generation helped me create a polished image for my tech conference presentations. Impressive!"
    },
    {
        name: "James",
        avatar: "J",
        title: "Real Estate Agent",
        description: "The app's headshot generator gave me an edge in a competitive market. Clients now trust me more."
    },
    {
        name: "Maria",
        avatar: "M",
        title: "Fashion Designer",
        description:  "This app is a lifesaver for creating professional photos for my fashion line. It's a fashionista's dream!"
    },
    {
        name: "Daniel",
        avatar: "Dn",
        title: " Consultant",
        description:  "The career photo option gave my consulting website a professional touch. Clients take me seriously now."
    },
]
export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) => (
                <Card key={item.description} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2">
                            <div>
                                <p className="text-lg">{item.name}</p>
                                <p className="text-zinc-400 text-sm">{item.title}</p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>
  )
}
