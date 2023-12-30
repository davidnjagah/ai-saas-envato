import { Heading } from "@/components/heading"
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription"
import { Settings } from "lucide-react"


const SettingsPage = async () => {
    const isPro = await checkSubscription();

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
                {isPro ? "Thank you for Subscribing to Genius Ai" : "You are currently on a free plan."}
            </div>
             {!isPro &&<SubscriptionButton isPro={isPro}/>}
            <div className="text-muted-foreground text-sm">
                {isPro && "You are currently on a pro plan"}
            </div>
            <div className="text-muted-foreground text-sm">
                {isPro && "You account will not autorenew. "}
            </div>
            <div className="text-muted-foreground text-sm">
                {isPro && "When you subscription period ends you can initiate a new payment."}
            </div>
        </div>
    </div>
  )
}

export default SettingsPage