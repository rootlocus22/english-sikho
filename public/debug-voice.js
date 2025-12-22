// Voice Debug Helper - Run this in browser console to see available voices
console.log('=== Available Indian English Voices ===');
speechSynthesis.getVoices()
    .filter(v => v.lang.includes('IN') || v.lang.includes('en'))
    .forEach(v => {
        console.log(`${v.name} | ${v.lang} | ${v.localService ? 'Local' : 'Remote'}`);
    });

// Force select best female voice
const voices = speechSynthesis.getVoices();
const femaleVoice = voices.find(v =>
    v.lang.includes('IN') &&
    (v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('neerja') ||
        v.name.toLowerCase().includes('kavya'))
);

if (femaleVoice) {
    console.log('✅ Found female voice:', femaleVoice.name);
    // Update store
    const store = JSON.parse(localStorage.getItem('english-sikho-storage') || '{}');
    store.state = store.state || {};
    store.state.voicePreferences = {
        gender: 'female',
        accent: 'in',
        voiceName: femaleVoice.name,
        rate: 1.0,
        volume: 1.0
    };
    localStorage.setItem('english-sikho-storage', JSON.stringify(store));
    console.log('💾 Saved female voice to preferences');
    alert('Female voice selected! Refresh the page.');
} else {
    console.warn('❌ No female Indian voice found. Available voices:');
    voices.filter(v => v.lang.includes('IN')).forEach(v => console.log(v.name));
}
