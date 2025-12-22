export interface WorkplaceScenario {
    id: string;
    title: string;
    description: string;
    category: 'introductions' | 'meetings' | 'small-talk' | 'requests' | 'feedback';
    difficulty: 'beginner' | 'intermediate';
    situation: string;
    yourRole: string;
    objective: string;
    conversation: {
        speaker: string;
        text: string;
        isUser: boolean;
        tips?: string;
    }[];
    keyPhrases: string[];
    commonMistakes: string[];
}

export const workplaceScenarios: WorkplaceScenario[] = [
    {
        id: 'introducing-yourself',
        title: 'Introducing Yourself to the Team',
        description: 'Learn how to introduce yourself professionally on your first day',
        category: 'introductions',
        difficulty: 'beginner',
        situation: 'It\'s your first day at ABC Technologies. Your manager is introducing you to your team in a meeting room.',
        yourRole: 'New Software Developer',
        objective: 'Introduce yourself professionally and make a good first impression',
        conversation: [
            {
                speaker: 'Manager',
                text: 'Team, I\'d like you to meet Rahul. He\'s joining us as a Software Developer. Rahul, would you like to introduce yourself?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Hi everyone! I\'m Rahul Kumar. I\'m really excited to join the team. I recently graduated from IIT Delhi with a degree in Computer Science. During my internship at XYZ Corp, I worked on developing mobile applications. I\'m looking forward to learning from all of you and contributing to our projects.',
                isUser: true,
                tips: 'Keep it brief (30-60 seconds), mention your background, show enthusiasm, and express eagerness to learn.'
            },
            {
                speaker: 'Team Member',
                text: 'Welcome, Rahul! Which programming languages are you most comfortable with?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'I\'m most comfortable with Python and JavaScript. I\'ve also worked with React for frontend development. I\'m eager to pick up any new technologies the team uses.',
                isUser: true,
                tips: 'Be honest about your skills. It\'s okay to mention you\'re willing to learn new things.'
            }
        ],
        keyPhrases: [
            'I\'m excited to join the team',
            'I look forward to learning from you',
            'I\'m eager to contribute',
            'I recently graduated from...',
            'During my previous role/internship...',
            'I\'m most comfortable with...'
        ],
        commonMistakes: [
            '❌ Talking for too long (more than 2 minutes)',
            '❌ Being too modest: "I don\'t know much"',
            '❌ Oversharing personal information',
            '❌ Using informal language: "Hey guys, what\'s up?"',
            '❌ Not showing enthusiasm'
        ]
    },
    {
        id: 'first-team-meeting',
        title: 'Attending Your First Team Meeting',
        description: 'Learn meeting etiquette and how to participate professionally',
        category: 'meetings',
        difficulty: 'beginner',
        situation: 'You\'re attending your first team standup meeting. Team members are sharing their daily updates.',
        yourRole: 'New Team Member',
        objective: 'Share your update professionally and ask relevant questions',
        conversation: [
            {
                speaker: 'Manager',
                text: 'Good morning everyone! Let\'s start our daily standup. Rahul, since you\'re new, why don\'t you go first? What are you working on today?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Good morning! Today I\'m planning to complete the onboarding tasks and set up my development environment. I\'ll also go through the project documentation to understand our current codebase. I don\'t have any blockers at the moment.',
                isUser: true,
                tips: 'In standups, mention: What you did yesterday (or will do today for day 1), what you\'ll do today, and any blockers.'
            },
            {
                speaker: 'Manager',
                text: 'Great! If you need any help with the setup, Priya can assist you.',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Thank you! I\'ll reach out to Priya if I run into any issues.',
                isUser: true,
                tips: 'Always acknowledge help offered and show you\'re taking initiative.'
            }
        ],
        keyPhrases: [
            'I\'m planning to...',
            'I\'ll be working on...',
            'I don\'t have any blockers',
            'I might need help with...',
            'Thank you, I\'ll reach out if needed',
            'Could you clarify...?'
        ],
        commonMistakes: [
            '❌ Saying "I didn\'t do anything" (say what you plan to do)',
            '❌ Going into too much technical detail',
            '❌ Not speaking up when stuck',
            '❌ Interrupting others',
            '❌ Using phone during the meeting'
        ]
    },
    {
        id: 'coffee-break-chat',
        title: 'Making Small Talk at Coffee Break',
        description: 'Learn to have casual workplace conversations',
        category: 'small-talk',
        difficulty: 'beginner',
        situation: 'You\'re at the office cafeteria and a colleague approaches you during coffee break.',
        yourRole: 'New Employee',
        objective: 'Engage in friendly small talk and build rapport',
        conversation: [
            {
                speaker: 'Colleague',
                text: 'Hey Rahul! How\'s your first day going?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Hi Neha! It\'s going well, thanks for asking. Everyone has been really welcoming. I\'m still trying to remember everyone\'s names though!',
                isUser: true,
                tips: 'Be friendly and honest. It\'s okay to admit you\'re still learning.'
            },
            {
                speaker: 'Colleague',
                text: 'Don\'t worry, it takes time! Are you from Bangalore?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'No, I\'m from Delhi actually. I moved here last week for this job. The city seems exciting so far. How long have you been with the company?',
                isUser: true,
                tips: 'Answer questions and ask follow-up questions to keep the conversation going.'
            },
            {
                speaker: 'Colleague',
                text: 'Almost two years now. Let me know if you need any recommendations for places to eat or things to do around here!',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'That would be great, thank you! I\'d really appreciate that.',
                isUser: true,
                tips: 'Accept friendly offers graciously.'
            }
        ],
        keyPhrases: [
            'It\'s going well, thanks for asking',
            'Everyone has been very welcoming',
            'How long have you been here?',
            'That\'s really helpful, thank you',
            'I\'d love to hear more about...',
            'What do you usually work on?'
        ],
        commonMistakes: [
            '❌ One-word answers: "Fine"',
            '❌ Complaining on first day: "It\'s overwhelming"',
            '❌ Talking only about yourself',
            '❌ Getting too personal too quickly',
            '❌ Discussing sensitive topics (politics, religion)'
        ]
    },
    {
        id: 'asking-for-help',
        title: 'Asking a Colleague for Help',
        description: 'Learn to request help professionally without looking incompetent',
        category: 'requests',
        difficulty: 'beginner',
        situation: 'You\'re stuck on a task and need to ask your senior colleague for guidance.',
        yourRole: 'Junior Developer',
        objective: 'Ask for help clearly while showing you\'ve tried to solve it yourself',
        conversation: [
            {
                speaker: 'You',
                text: 'Hi Priya, do you have a few minutes? I need some help with the authentication module.',
                isUser: true,
                tips: 'Always check if they have time before jumping into your question.'
            },
            {
                speaker: 'Senior Colleague',
                text: 'Sure, Rahul. What seems to be the issue?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'I\'m trying to implement the login feature, but I\'m getting an error when connecting to the database. I\'ve checked the connection string and it looks correct. I also tried searching the error online, but I couldn\'t find a solution that works.',
                isUser: true,
                tips: 'Explain what you\'ve already tried. This shows you\'re not just asking without effort.'
            },
            {
                speaker: 'Senior Colleague',
                text: 'Let me take a look. Can you share your screen?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Of course, thank you for taking the time to help me.',
                isUser: true,
                tips: 'Always thank people for their time and help.'
            }
        ],
        keyPhrases: [
            'Do you have a few minutes?',
            'I need some help with...',
            'I\'ve tried... but...',
            'I\'m not sure how to proceed',
            'Could you point me in the right direction?',
            'Thank you for your time'
        ],
        commonMistakes: [
            '❌ Interrupting without checking if they\'re busy',
            '❌ Asking without trying to solve it first',
            '❌ Being vague: "Something is not working"',
            '❌ Not taking notes when they explain',
            '❌ Asking the same question repeatedly'
        ]
    },
    {
        id: 'receiving-feedback',
        title: 'Receiving Feedback from Your Manager',
        description: 'Learn to accept constructive criticism professionally',
        category: 'feedback',
        difficulty: 'intermediate',
        situation: 'Your manager is giving you feedback on your first week\'s work.',
        yourRole: 'New Employee',
        objective: 'Accept feedback gracefully and show willingness to improve',
        conversation: [
            {
                speaker: 'Manager',
                text: 'Rahul, can we have a quick chat about your first week?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Of course! I\'d love to hear your thoughts.',
                isUser: true,
                tips: 'Show openness to feedback. Don\'t be defensive.'
            },
            {
                speaker: 'Manager',
                text: 'You\'re doing well with the technical work. However, I noticed you\'re quite quiet in team meetings. It would be great to hear your ideas and questions.',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Thank you for the feedback. You\'re right, I have been hesitant to speak up. I wanted to observe and learn first, but I understand the importance of participating. I\'ll make an effort to contribute more actively in our next meetings.',
                isUser: true,
                tips: 'Acknowledge the feedback, explain briefly (without making excuses), and commit to improvement.'
            },
            {
                speaker: 'Manager',
                text: 'That sounds good. Remember, there\'s no such thing as a silly question, especially when you\'re new.',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'I appreciate that. Thank you for bringing this to my attention.',
                isUser: true,
                tips: 'Thank your manager for the feedback.'
            }
        ],
        keyPhrases: [
            'Thank you for the feedback',
            'I appreciate you bringing this to my attention',
            'You\'re right, I...',
            'I\'ll work on improving...',
            'Could you give me specific examples?',
            'What would you recommend I do differently?'
        ],
        commonMistakes: [
            '❌ Getting defensive: "But I was just..."',
            '❌ Making excuses',
            '❌ Blaming others',
            '❌ Saying "Okay" without acknowledging',
            '❌ Not asking for clarification if confused'
        ]
    },
    {
        id: 'lunch-invitation',
        title: 'Accepting a Lunch Invitation',
        description: 'Navigate social workplace situations',
        category: 'small-talk',
        difficulty: 'beginner',
        situation: 'A few colleagues invite you to join them for lunch.',
        yourRole: 'New Employee',
        objective: 'Accept gracefully and participate in casual conversation',
        conversation: [
            {
                speaker: 'Colleague',
                text: 'Hey Rahul, a few of us are going to the food court for lunch. Want to join?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'I\'d love to! Thanks for inviting me.',
                isUser: true,
                tips: 'Accept warmly. Lunch is a great opportunity to build relationships.'
            },
            {
                speaker: 'Colleague',
                text: 'Great! We usually go around 1 PM. Meet you at the elevator?',
                isUser: false
            },
            {
                speaker: 'You',
                text: 'Perfect, I\'ll see you there at 1.',
                isUser: true,
                tips: 'Confirm the time and place.'
            }
        ],
        keyPhrases: [
            'I\'d love to!',
            'Thanks for inviting me',
            'That sounds great',
            'What time works for everyone?',
            'I\'m flexible',
            'See you then'
        ],
        commonMistakes: [
            '❌ Always declining: "I\'m busy"',
            '❌ Being on phone during lunch',
            '❌ Only talking about work',
            '❌ Complaining about the company',
            '❌ Not contributing to conversation'
        ]
    }
];

export function getWorkplaceScenarioById(id: string): WorkplaceScenario | undefined {
    return workplaceScenarios.find(scenario => scenario.id === id);
}

export function getScenariosByCategory(category: WorkplaceScenario['category']): WorkplaceScenario[] {
    return workplaceScenarios.filter(scenario => scenario.category === category);
}

export function getTotalScenarios(): number {
    return workplaceScenarios.length;
}
