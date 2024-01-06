import FullBodyPage from "./page";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const FullBodyPageLayout = async () => {
      
    const isPro = await checkSubscription();

    return ( 
        <div>
            <FullBodyPage isPro = {isPro}/>
        </div>
     );
}
 
export default FullBodyPageLayout;