import FantasyPage from "./page";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const FantasyPageLayout = async () => {
      
    const isPro = await checkSubscription();

    return ( 
        <div>
            <FantasyPage isPro = {isPro}/>
        </div>
     );
}
 
export default FantasyPageLayout;