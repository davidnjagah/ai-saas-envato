import QrCodePage from "./page";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const QrCodePageLayout = async () => {
      
    const isPro = await checkSubscription();

    return ( 
        <div>
            <QrCodePage isPro = {isPro}/>
        </div>
     );
}
 
export default QrCodePageLayout;