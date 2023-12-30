import { auth, currentUser } from "@clerk/nextjs";

import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const user = await currentUser();

    if (!user) {
        return false;
    }

    const userEmail = user.emailAddresses[0].emailAddress

    const userSubscription = await prismadb.paystackSubscription.findUnique({
        where: {
            userEmail
        },
        select: {
            paystackAmountPaid : true,
            paystackCurrentPeriodEnd: true,
            paystackCustomerId: true,
        },
    });

    if (!userSubscription) {
        return false;
    }

    const isValid = userSubscription.paystackAmountPaid && userSubscription.paystackCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return !!isValid;
};