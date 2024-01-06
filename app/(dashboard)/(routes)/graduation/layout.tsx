import GraduationPage from "./page";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const GraduationPageLayout = async () => {
      
    const isPro = await checkSubscription();

    return ( 
        <div>
            <GraduationPage isPro = {isPro}/>
        </div>
     );
}
 
export default GraduationPageLayout;