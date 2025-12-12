// Mock data creation script for testing Pro features
// Run this in browser console while logged in

async function createMockActivityData() {
    const { getFirestore, collection, addDoc, doc, updateDoc } = await import('firebase/firestore');
    const { auth } = await import('./lib/firebase');

    const db = getFirestore();
    const userId = auth.currentUser?.uid;

    if (!userId) {
        console.error('Please login first!');
        return;
    }

    console.log('Creating mock activity data for user:', userId);

    // Create activity entries for the last 30 days
    const features = ['translator', 'tone-rewrite', 'roleplay-chat', 'speech-coach', 'interview-coach'];
    const activitiesCreated = [];

    for (let i = 0; i < 50; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const randomFeature = features[Math.floor(Math.random() * features.length)];

        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - daysAgo);
        timestamp.setHours(Math.floor(Math.random() * 24));
        timestamp.setMinutes(Math.floor(Math.random() * 60));

        try {
            const activityRef = await addDoc(collection(db, 'users', userId, 'activity'), {
                feature: randomFeature,
                timestamp: timestamp,
                creditsUsed: 1,
                metadata: {
                    mockData: true
                }
            });
            activitiesCreated.push(activityRef.id);
            console.log(`Created activity ${i + 1}/50: ${randomFeature} on ${timestamp.toLocaleDateString()}`);
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    }

    // Update user document with session count
    try {
        await updateDoc(doc(db, 'users', userId), {
            totalSessionsUsed: 50,
            lastSessionAt: new Date().toISOString()
        });
        console.log('✅ Updated user document with 50 sessions');
    } catch (error) {
        console.error('Error updating user doc:', error);
    }

    console.log('✅ Mock data creation complete!');
    console.log(`Created ${activitiesCreated.length} activity entries`);
    console.log('You can now test:');
    console.log('- /dashboard/analytics - See charts and trends');
    console.log('- /dashboard/certificates - 2 achievements unlocked (10 & 50 sessions)');
    console.log('- /dashboard/interview-prep - Test interview questions');

    return activitiesCreated;
}

// Instructions:
// 1. Open browser console
// 2. Run: createMockActivityData()
// 3. Wait for completion
// 4. Navigate to analytics and certificates pages

console.log('Mock data script loaded!');
console.log('Run: createMockActivityData() to create test data');
