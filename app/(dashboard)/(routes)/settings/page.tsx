import { Heading } from "@/components/heading"
import { SubscriptionButton } from "@/components/subscription-button";
import { getApiLimitCount, getUserMaxApiCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription"
import { Settings } from "lucide-react"


const SettingsPage = async () => {
    const isPro = await checkSubscription();
    const apiLimitCount = await getApiLimitCount();
    const userMaxApiCount = await getUserMaxApiCount();

  return (
    <div>
        <Heading
            title="Settings"
            description="Manage account settings."
            Icon={Settings}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
        />
        <div className="px-4 lg:px-8 space-y-4">
            <div className="text-muted-foreground text-sm">
                {isPro || apiLimitCount < userMaxApiCount ? "Thank you for using Genius Ai. To get more tokens you can purchase them below" : "You token are over please upgrade below."}
            </div>
            <div className="text-muted-foreground text-sm">
                {isPro && "Your subscription will not auto renew so no need to cancel your card but you can still easily purchase more tokens as needed."}
            </div>
            {/*<div className="text-muted-foreground text-sm">
                {isPro && "Your tokens will expire after a month but if you purchase more before then they'll be added to your next batch of tokens."}
            </div> */}
            <SubscriptionButton isPro={isPro} apiLimitCount={apiLimitCount} userMaxApiCount={userMaxApiCount} />
        </div>
    </div>
  )
}

export default SettingsPage