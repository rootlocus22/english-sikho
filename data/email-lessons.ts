export interface EmailLesson {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    content: {
        type: 'explanation' | 'template' | 'tip' | 'example';
        text: string;
    }[];
    practice: {
        scenario: string;
        hints: string[];
        sampleEmail: string;
    };
}

export const emailLessons: EmailLesson[] = [
    {
        id: 'professional-greetings',
        title: 'Professional Email Greetings',
        description: 'Learn how to start emails professionally',
        duration: 10,
        difficulty: 'beginner',
        content: [
            {
                type: 'explanation',
                text: 'Email greetings set the tone for your message. The right greeting depends on:\n• Your relationship with the recipient\n• The formality level needed\n• Whether you know their name'
            },
            {
                type: 'template',
                text: 'Formal (Don\'t know the person):\n• Dear Sir/Madam,\n• Dear Hiring Manager,\n• To Whom It May Concern,\n\nSemi-Formal (Know the name):\n• Dear Mr. Sharma,\n• Dear Ms. Patel,\n• Dear Dr. Kumar,\n\nInformal/Colleagues:\n• Hi Raj,\n• Hello team,\n• Hey everyone,'
            },
            {
                type: 'tip',
                text: 'Tip: Use "Hi" for colleagues you work with regularly. Use "Dear" for clients, senior management, or first-time contacts.'
            },
            {
                type: 'example',
                text: '✅ Dear Mr. Sharma,\n✅ Hi Priya,\n✅ Hello team,\n\n❌ Hey boss, (Too casual)\n❌ Respected sir, (Too old-fashioned)\n❌ Hii!!! (Unprofessional)'
            }
        ],
        practice: {
            scenario: 'You need to email your client, Mr. Agarwal, about a project update. Write a professional opening.',
            hints: [
                'Use "Dear" for clients',
                'Include their name with title (Mr./Ms.)',
                'Keep it simple and professional'
            ],
            sampleEmail: 'Dear Mr. Agarwal,\n\nI hope this email finds you well. I am writing to update you on the progress of our project.'
        }
    },
    {
        id: 'request-emails',
        title: 'Making Polite Requests',
        description: 'Learn to ask for things professionally',
        duration: 15,
        difficulty: 'beginner',
        content: [
            {
                type: 'explanation',
                text: 'When requesting something, be polite, clear, and specific. Use these phrases:\n• Could you please...\n• Would you mind...\n• I would appreciate if you could...\n• May I request...'
            },
            {
                type: 'template',
                text: 'Basic Structure:\n\n1. Greeting\n2. Context (why you\'re writing)\n3. Clear request\n4. Reason/benefit\n5. Thank you + closing\n\nExample:\n"Could you please share the Q4 report by Friday? I need it to prepare for Monday\'s client meeting."'
            },
            {
                type: 'example',
                text: '✅ Could you please send me the updated file?\n✅ Would you mind reviewing this document?\n✅ I would appreciate your feedback on this.\n\n❌ Send me the file. (Too direct)\n❌ I want the report now. (Demanding)\n❌ Kindly do the needful. (Outdated phrase)'
            },
            {
                type: 'tip',
                text: 'Tip: Avoid "Kindly do the needful" - it\'s old-fashioned and unclear. Be specific about what you need.'
            }
        ],
        practice: {
            scenario: 'You need your colleague to review your presentation before tomorrow\'s meeting. Write a polite request email.',
            hints: [
                'Start with a friendly greeting',
                'Be specific about what you need',
                'Mention the deadline',
                'Explain why it\'s important'
            ],
            sampleEmail: 'Hi Rahul,\n\nI hope you\'re doing well. Could you please review my presentation for tomorrow\'s client meeting? I would really appreciate your feedback on the pricing slides.\n\nI need it by 5 PM today so I can make any necessary changes before the meeting.\n\nThank you for your help!\n\nBest regards,\nPriya'
        }
    },
    {
        id: 'follow-up-emails',
        title: 'Follow-up Emails',
        description: 'Learn to follow up professionally without being pushy',
        duration: 12,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Follow-up emails remind someone about your previous message without being annoying. Key points:\n• Wait 3-5 days before following up\n• Reference your previous email\n• Be polite and understanding\n• Add value or new information if possible'
            },
            {
                type: 'template',
                text: 'Follow-up Structure:\n\n"Hi [Name],\n\nI wanted to follow up on my email from [date] regarding [topic].\n\n[Add context or new info if relevant]\n\nI understand you must be busy, but I would appreciate an update when you get a chance.\n\nThank you!\n[Your name]"'
            },
            {
                type: 'example',
                text: '✅ I wanted to follow up on my previous email about the project timeline.\n✅ Just checking in to see if you had a chance to review my proposal.\n✅ Following up on my application submitted last week.\n\n❌ You didn\'t reply to my email. (Accusatory)\n❌ This is the 5th time I\'m emailing you. (Aggressive)\n❌ Why haven\'t you responded? (Rude)'
            },
            {
                type: 'tip',
                text: 'Tip: Add a clear subject line like "Follow-up: Project Proposal" to make it easy to find.'
            }
        ],
        practice: {
            scenario: 'You sent a job application 5 days ago but haven\'t heard back. Write a professional follow-up email.',
            hints: [
                'Reference your previous application',
                'Show continued interest',
                'Be polite and patient',
                'Keep it brief'
            ],
            sampleEmail: 'Dear Ms. Sharma,\n\nI hope this email finds you well. I wanted to follow up on my application for the Software Developer position that I submitted on December 17th.\n\nI remain very interested in this opportunity and would welcome the chance to discuss how my skills align with your team\'s needs.\n\nI understand the hiring process takes time, but I would appreciate any update you could share.\n\nThank you for your consideration.\n\nBest regards,\nRahul Kumar'
        }
    },
    {
        id: 'saying-no-politely',
        title: 'Declining Requests Politely',
        description: 'Learn to say no professionally',
        duration: 12,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Sometimes you need to decline requests. Do it professionally:\n• Thank them first\n• Give a brief reason (optional)\n• Suggest alternatives if possible\n• Keep the door open for future'
            },
            {
                type: 'template',
                text: 'Polite Decline Structure:\n\n"Thank you for thinking of me/reaching out.\n\nUnfortunately, I won\'t be able to [request] because [brief reason].\n\n[Offer alternative if possible]\n\nI hope you understand. Thank you for your understanding."'
            },
            {
                type: 'example',
                text: '✅ Thank you for the invitation, but I won\'t be able to attend due to a prior commitment.\n✅ I appreciate you thinking of me, but I don\'t have the bandwidth right now.\n✅ Unfortunately, this doesn\'t align with my current priorities.\n\n❌ No, I can\'t do that. (Too blunt)\n❌ I\'m too busy for this. (Dismissive)\n❌ That\'s not my job. (Unprofessional)'
            },
            {
                type: 'tip',
                text: 'Tip: You don\'t need to over-explain. A brief, honest reason is enough.'
            }
        ],
        practice: {
            scenario: 'Your colleague asks you to join a project, but you\'re already overloaded with work. Decline politely.',
            hints: [
                'Thank them for asking',
                'Explain you\'re at capacity',
                'Suggest checking back later',
                'Be warm but firm'
            ],
            sampleEmail: 'Hi Neha,\n\nThank you so much for thinking of me for this project. I really appreciate it.\n\nUnfortunately, I won\'t be able to join this time as I\'m currently working on two high-priority projects with tight deadlines.\n\nHowever, I\'d love to collaborate in the future when my schedule opens up. Please feel free to reach out for upcoming projects.\n\nBest of luck with this one!\n\nRahul'
        }
    },
    {
        id: 'closing-emails',
        title: 'Professional Email Closings',
        description: 'Learn to end emails appropriately',
        duration: 10,
        difficulty: 'beginner',
        content: [
            {
                type: 'explanation',
                text: 'Email closings are as important as greetings. They leave a lasting impression:\n• Match the formality level of your greeting\n• Include a closing phrase and your name\n• Add signature if formal'
            },
            {
                type: 'template',
                text: 'Formal:\n• Best regards,\n• Sincerely,\n• Kind regards,\n• Respectfully,\n\nSemi-Formal:\n• Best,\n• Regards,\n• Thank you,\n\nInformal/Colleagues:\n• Thanks,\n• Cheers,\n• Talk soon,'
            },
            {
                type: 'example',
                text: '✅ Best regards,\nRahul Kumar\n\n✅ Thank you,\nPriya\n\n✅ Cheers,\nRaj\n\n❌ Yours faithfully, (Too formal for emails)\n❌ Rgds, (Unprofessional abbreviation)\n❌ (No closing at all)'
            },
            {
                type: 'tip',
                text: 'Tip: "Best regards" is safe for almost any professional email.'
            }
        ],
        practice: {
            scenario: 'End a formal email to a client thanking them for their time.',
            hints: [
                'Use a formal closing',
                'Include a thank you if appropriate',
                'Add your full name'
            ],
            sampleEmail: 'Thank you for taking the time to discuss this opportunity. I look forward to working with you.\n\nBest regards,\nRahul Kumar\nSenior Consultant\nXYZ Solutions'
        }
    },
    {
        id: 'apology-emails',
        title: 'Apologizing Professionally',
        description: 'Learn to apologize and fix mistakes',
        duration: 15,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'When you make a mistake, apologize professionally:\n• Acknowledge the mistake\n• Take responsibility (no excuses)\n• Explain what went wrong (briefly)\n• State how you\'ll fix it\n• Commit to preventing it in future'
            },
            {
                type: 'template',
                text: 'Apology Structure:\n\n"I apologize for [specific mistake].\n\nThis happened because [brief explanation].\n\nI am taking the following steps to fix this:\n• [Action 1]\n• [Action 2]\n\nI will ensure this doesn\'t happen again by [prevention step].\n\nThank you for your understanding."'
            },
            {
                type: 'example',
                text: '✅ I apologize for missing the deadline. I underestimated the complexity.\n✅ I take full responsibility for the error in the report.\n✅ I sincerely apologize for any inconvenience this may have caused.\n\n❌ Sorry but it wasn\'t really my fault. (Deflecting)\n❌ Mistakes happen. (Dismissive)\n❌ I\'m sorry you feel that way. (Not taking responsibility)'
            },
            {
                type: 'tip',
                text: 'Tip: Don\'t make excuses. Own the mistake, fix it, and move forward.'
            }
        ],
        practice: {
            scenario: 'You missed an important team meeting because you forgot about it. Write an apology email to your manager.',
            hints: [
                'Acknowledge the mistake directly',
                'Take responsibility',
                'Ask how you can catch up',
                'Commit to not repeating it'
            ],
            sampleEmail: 'Dear Ms. Kapoor,\n\nI sincerely apologize for missing this morning\'s team meeting. I made an error in my calendar and completely forgot about it.\n\nI understand this was unprofessional and I take full responsibility. Could you please share the meeting notes so I can catch up on what I missed?\n\nI have set up calendar reminders to ensure this doesn\'t happen again.\n\nThank you for your understanding.\n\nBest regards,\nRahul'
        }
    }
];

export function getEmailLessonById(id: string): EmailLesson | undefined {
    return emailLessons.find(lesson => lesson.id === id);
}

export function getTotalEmailLessons(): number {
    return emailLessons.length;
}
