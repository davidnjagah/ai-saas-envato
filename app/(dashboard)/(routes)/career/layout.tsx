import CareerPage from "./page";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const CareerPageLayout = async () => {
      
    const isPro = await checkSubscription();

    return ( 
        <div>
            <CareerPage isPro = {isPro}/>
        </div>
     );
}
 
export default CareerPageLayout;