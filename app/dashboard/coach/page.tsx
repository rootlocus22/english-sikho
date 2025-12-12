import SpeakingCoach from "@/components/SpeakingCoach";
import { FeatureGate } from "@/components/FeatureGate";
import { FEATURES } from "@/lib/features";

export default function SpeakingCoachPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <FeatureGate feature={FEATURES.SPEAKING_COACH_BASIC}>
                <SpeakingCoach />
            </FeatureGate>
        </div>
    );
}
