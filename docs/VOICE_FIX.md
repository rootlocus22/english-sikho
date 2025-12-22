# Quick Voice Fix Guide

## Issue
You're getting "Rishi" (male voice) instead of a female voice.

## Instant Fix

**Option 1: Use Voice Selector (Recommended)**
1. Look for the **microphone icon** in the dashboard header
2. Click on the voice dropdown
3. Select a voice with a female name (like "Neerja" or one marked as female)
4. The app will remember your choice

**Option 2: Use Developer Console**
1. Open browser console (F12)
2. Paste this code:
```javascript
localStorage.setItem('english-sikho-storage', JSON.stringify({
  "state": {
    "voicePreferences": {
      "gender": "female",
      "accent": "in",
      "voiceName": null
    }
  },
  "version": 0
}));
location.reload();
```
3. This will reset voice preferences and the app will auto-select a female voice

## Why This Happened
- Your system has "Rishi" (male) as the first available Indian English voice
- The voice selection logic will now properly filter out male voices
- After I just updated the code, refresh the page and it should select a female voice

## Next Steps
1. **Refresh the page** (the code was just updated)
2. The app should now skip "Rishi" and find a female voice
3. Check console for: `🔊 Using voice: [should be female name] | en-IN`

## Available Female Voices (Common)
- **Neerja** - Indian English Female
- **Kavya** - Indian English Female  
- **Google हिन्दी (India)** - If no explicit female Indian English, this is often female

If you still get a male voice after refresh, use Option 1 above to manually select.
