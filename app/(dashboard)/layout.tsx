
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
}:{
    children: React.ReactNode;
}) => {
      
    const apiLimitCount =  await getApiLimitCount();
    const isPro = await checkSubscription();
    const userMaxApiCount = await getUserMaxApiCount();

    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar isPro={isPro} apiLimitCount = {apiLimitCount} userMaxApiCount={userMaxApiCount}/>
            </div>
            <main className="md:pl-72 pb-10">
                <Navbar/>
                {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;