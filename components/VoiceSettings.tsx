"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings2 } from "lucide-react";
import { useUserStore } from "@/lib/store";

export default function VoiceSettings() {
    const { voicePreferences, setVoicePreferences } = useUserStore();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    <Settings2 className="w-4 h-4" />
                    Voice Settings
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-sm mb-3">Voice Preferences</h4>
                        <p className="text-xs text-slate-600 mb-4">
                            Customize how AI speaks to you
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Gender</Label>
                        <RadioGroup
                            value={voicePreferences.gender}
                            onValueChange={(value) =>
                                setVoicePreferences({ gender: value as any })
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female" className="text-sm cursor-pointer">
                                    Female Voice
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male" className="text-sm cursor-pointer">
                                    Male Voice
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="any" id="any-gender" />
                                <Label htmlFor="any-gender" className="text-sm cursor-pointer">
                                    Any (Best Available)
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Accent</Label>
                        <RadioGroup
                            value={voicePreferences.accent}
                            onValueChange={(value) =>
                                setVoicePreferences({ accent: value as any })
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="us" id="us" />
                                <Label htmlFor="us" className="text-sm cursor-pointer">
                                    🇺🇸 American English
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="uk" id="uk" />
                                <Label htmlFor="uk" className="text-sm cursor-pointer">
                                    🇬🇧 British English
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="in" id="in" />
                                <Label htmlFor="in" className="text-sm cursor-pointer">
                                    🇮🇳 Indian English
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="any" id="any-accent" />
                                <Label htmlFor="any-accent" className="text-sm cursor-pointer">
                                    Any (Best Available)
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="pt-3 border-t">
                        <p className="text-xs text-slate-500">
                            💡 Changes apply to all audio playback
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
