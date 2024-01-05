import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "./prismadb";

export const increaseApiLimit = async () => {
    const { userId } = auth();
    const user = await currentUser();
    
    if (!userId || !user){
        return;
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userEmail
        }
    });
    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: { userEmail },
            data: { count: userApiLimit.count + 1 },
        });
    } else {
        await prismadb.userApiLimit.create({
            data: { userEmail: userEmail, count: 1}
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        return false;
    }
    const userEmail = user.emailAddresses[0].emailAddress;

    // const periodEnd = await prismadb.paystackSubscription.findUnique({
    //     where: {
    //         userEmail
    //     }
    // })

    // if (periodEnd) {
    //     const currentDate = new Date();
    //     const endDate = new Date(periodEnd.paystackCurrentPeriodEnd);

    //     if (currentDate > endDate){
    //         await prismadb.userApiLimit.update({
    //             where: {
    //                 userEmail
    //             },
    //             data: {
    //                 count: 0,
    //                 userMaxCount: 0
    //             }
    //         })
    //     }
    // }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userEmail
        }
    });

    const userMaxApiCount = await getUserMaxApiCount();

    if (!userApiLimit || userApiLimit.count < userMaxApiCount){
        return true;
    } else {
        return false;
    }
};

export const getApiLimitCount = async () => {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        return 0;
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    await delay(500);

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userEmail
        }
    });

    if (!userApiLimit){
        return 0;
    }

    return userApiLimit.count;

}

export const getUserMaxApiCount = async () => {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        return 0;
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userEmail
        }
    });

    if (!userApiLimit){
        return 1;
    }

    return userApiLimit.userMaxCount;

}

export const getUserId = async () => {
    const { userId } = auth();

    if (!userId) {
        return 0;
    }

    return userId;
} 