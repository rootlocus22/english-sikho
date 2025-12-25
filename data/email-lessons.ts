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
    },
    {
        id: 'cold-outreach',
        title: 'Cold Outreach Emails',
        description: 'Learn to write effective cold emails that get responses',
        duration: 15,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Cold outreach is contacting someone you don\'t know. Keys to success:\\n• Personalize (mention something specific about them)\\n• Be concise (get to the point quickly)\\n• Offer value (how can you help them?)\\n• Clear call-to-action (what do you want?)'
            },
            {
                type: 'template',
                text: 'Cold Email Structure:\\n\\nSubject: Brief, specific, intriguing\\n\\n1. Opening: Who you are (one line)\\n2. Why you\'re reaching out (connection/common interest)\\n3. Value proposition (what\'s in it for them)\\n4. Clear ask (specific and easy to say yes to)\\n5. Professional closing'
            },
            {
                type: 'example',
                text: 'Subject: Quick question about [their recent achievement]\\n\\nHi [Name],\\n\\nI noticed you recently [specific achievement]. Congratulations!\\n\\nI work at [Company] where we help [relevant benefit]. I thought you might be interested in [specific value].\\n\\nWould you have 15 minutes next week for a quick call?\\n\\nBest regards,\\n[Your name]'
            },
            {
                type: 'tip',
                text: 'Tip: Research before sending. A personalized email gets 3x more responses than a generic one. Keep it under 150 words.'
            }
        ],
        practice: {
            scenario: 'You want to connect with a potential mentor in your industry. Write a cold email introducing yourself and requesting a brief informational interview.',
            hints: [
                'Mention how you found them',
                'Show genuine interest in their work',
                'Be specific about what you want to learn',
                'Make it easy to say yes'
            ],
            sampleEmail: 'Subject: Inspired by your work in AI development\\n\\nDear Ms. Sharma,\\n\\nI came across your article on TechCrunch about AI in healthcare and was genuinely inspired. Your perspective on ethical AI resonated deeply with me.\\n\\nI\'m a software developer transitioning into AI, and I would love to learn from your experience. Would you have 20 minutes for a quick coffee or virtual chat? I\'m happy to work around your schedule.\\n\\nI promise to be respectful of your time and come prepared with specific questions.\\n\\nThank you for considering this request.\\n\\nBest regards,\\nRahul Kumar\\nSoftware Developer | XYZ Corp'
        }
    },
    {
        id: 'client-onboarding',
        title: 'Client Onboarding Emails',
        description: 'Welcome new clients professionally',
        duration: 12,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Onboarding emails set the tone for your client relationship. They should:\\n• Welcome warmly\\n• Set clear expectations\\n• Provide next steps\\n• Establish point of contact\\n• Include important resources'
            },
            {
                type: 'template',
                text: 'Onboarding Email Structure:\\n\\n1. Warm welcome\\n2. Appreciation for choosing you\\n3. What to expect next\\n4. Timeline and milestones\\n5. How to reach you\\n6. Attached resources\\n7. Invitation to ask questions'
            },
            {
                type: 'example',
                text: 'Subject: Welcome to [Company Name]!\\n\\nDear [Client Name],\\n\\nWelcome to [Company]! We\'re thrilled to have you on board.\\n\\nHere\'s what happens next:\\n• This week: Kickoff meeting (calendar invite attached)\\n• Next week: Initial deliverables and review\\n• Week 3: Implementation begins\\n\\nI\'ll be your main point of contact. Feel free to reach me at [email] or [phone].\\n\\nI\'ve attached our onboarding guide for your reference.\\n\\nLooking forward to a successful partnership!\\n\\nBest regards,\\n[Name]'
            },
            {
                type: 'tip',
                text: 'Tip: Send onboarding emails within 24 hours of client signing. Include a clear timeline and set expectations early.'
            }
        ],
        practice: {
            scenario: 'A new client just signed a contract for your services. Write an onboarding email welcoming them and outlining next steps.',
            hints: [
                'Express genuine excitement',
                'Provide clear timeline',
                'Set expectations',
                'Make yourself available'
            ],
            sampleEmail: 'Subject: Welcome to ABC Solutions! Let\'s get started\\n\\nDear Mr. Patel,\\n\\nWelcome to ABC Solutions! Thank you for choosing us for your digital transformation project.\\n\\nWe\'re excited to get started. Here\'s your onboarding roadmap:\\n\\n• This Friday (Dec 29): Kickoff call at 10 AM\\n• Next Monday: We\'ll share our initial analysis\\n• Jan 5: Project implementation begins\\n\\nYour dedicated project manager is Priya Sharma (priya@abc.com). She\'ll be your primary contact throughout this journey.\\n\\nI\'ve attached:\\n• Project timeline\\n• Communication guidelines\\n• Onboarding checklist\\n\\nPlease review these before our kickoff call. If you have any questions, don\'t hesitate to reach out.\\n\\nHere\'s to a successful partnership!\\n\\nWarm regards,\\nRahul Mehta\\nClient Success Manager\\nABC Solutions'
        }
    },
    {
        id: 'status-updates',
        title: 'Project Status Update Emails',
        description: 'Keep stakeholders informed with clear updates',
        duration: 12,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Status updates keep everyone aligned. Include:\\n• Progress summary\\n• What was completed\\n• What\'s in progress\\n• What\'s coming next\\n• Any blockers or risks\\n• Clear action items'
            },
            {
                type: 'template',
                text: 'Status Update Structure:\\n\\nSubject: [Project Name] - Status Update [Date/Week]\\n\\nOverall Status: [On Track/At Risk/Delayed]\\n\\nCompleted This Week:\\n• Item 1\\n• Item 2\\n\\nIn Progress:\\n• Item 1\\n• Item 2\\n\\nComing Next Week:\\n• Item 1\\n• Item 2\\n\\nBlockers:\\n• Issue 1\\n\\nAction Items:\\n• [Name] - [Task] - [Deadline]'
            },
            {
                type: 'example',
                text: 'Subject: Website Redesign - Weekly Update (Week 3)\\n\\nHi Team,\\n\\nStatus: On Track\\n\\nCompleted:\\n• Finalized homepage mockups\\n• Client approved color scheme\\n• Set up staging environment\\n\\nIn Progress:\\n• Developing responsive navigation\\n• Creating content for About page\\n\\nNext Week:\\n• Complete homepage development\\n• Begin internal pages\\n\\nBlockers: Waiting for logo files from client\\n\\nActions:\\n• Priya: Follow up for logo by Friday\\n• Team: Review staging site by Monday\\n\\nQuestions welcome!\\n\\nBest,\\nRahul'
            },
            {
                type: 'tip',
                text: 'Tip: Use emojis or bullets for scannability. Busy stakeholders should understand the status in 30 seconds.'
            }
        ],
        practice: {
            scenario: 'Send a weekly status update to your manager about your ongoing project. The project is slightly delayed due to resource constraints.',
            hints: [
                'Be honest about delays',
                'Highlight achievements',
                'Propose solutions for blockers',
                'Use clear formatting'
            ],
            sampleEmail: 'Subject: Customer Portal - Status Update (Week 5)\\n\\nHi Ms. Kumar,\\n\\nStatus: Slightly Delayed (1 week behind)\\n\\nCompleted This Week:\\n• User authentication module (100%)\\n• Database schema finalized\\n• API endpoints for user management\\n\\nIn Progress:\\n• Dashboard UI development (70%)\\n• Payment integration (30%)\\n\\nNext Week Target:\\n• Complete dashboard\\n• Begin payment gateway testing\\n\\nBlocker Alert:\\nOur UX designer is on leave, delaying dashboard refinements. I\'ve requested temporary support from the design team.\\n\\nAction Items:\\n• Me: Complete dashboard by Wednesday\\n• Design Team: Review by Thursday\\n• Client: Payment gateway credentials by Friday\\n\\nRevised delivery: Jan 15 (was Jan 8)\\n\\nI\'m confident we can recover the week with focused effort. Happy to discuss in our 1:1.\\n\\nBest regards,\\nRahul'
        }
    },
    {
        id: 'meeting-minutes',
        title: 'Meeting Minutes & Follow-ups',
        description: 'Document meetings and ensure action items are tracked',
        duration: 13,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Meeting minutes ensure accountability and alignment. Include:\\n• Meeting basics (date, time, attendees)\\n• Key discussion points\\n• Decisions made\\n• Action items (who, what, when)\\n• Next steps'
            },
            {
                type: 'template',
                text: 'Meeting Minutes Format:\\n\\nSubject: Meeting Notes: [Topic] - [Date]\\n\\nDate: [Date]\\nTime: [Time]\\nAttendees: [Names]\\n\\nAgenda\\n\\nKey Discussion Points:\\n1. Topic 1\\n   - Discussion summary\\n2. Topic 2\\n   - Discussion summary\\n\\nDecisions Made:\\n• Decision 1\\n• Decision 2\\n\\nAction Items:\\n• [Person] - [Task] - Due: [Date]\\n• [Person] - [Task] - Due: [Date]\\n\\nNext Meeting: [Date/Time]'
            },
            {
                type: 'example',
                text: 'Subject: Meeting Notes: Q1 Planning - Dec 20\\n\\nHi team,\\n\\nThanks for the productive meeting today.\\n\\nDec 20, 2024 | 10:00 AM\\nAttendees: Priya, Rahul, Neha, Amit\\n\\nKey Points:\\n1. Budget Allocation\\n   - Agreed on 40% marketing, 30% product, 30% ops\\n2. Hiring Plan\\n   - Approved 3 new positions\\n\\nDecisions:\\n• Launch date: Feb 15\\n• Weekly check-ins every Monday\\n\\nAction Items:\\n• Priya - Draft marketing plan - Due: Dec 27\\n• Rahul - Create hiring JDs - Due: Jan 3\\n• Neha - Set up project tracker - Due: Dec 22\\n\\nNext Meeting: Jan 3, 10 AM\\n\\nPlease review and let me know if I missed anything.\\n\\nBest,\\nRahul'
            },
            {
                type: 'tip',
                text: 'Tip: Send meeting notes within 24 hours while everything is fresh. Always specify action item owners and deadlines.'
            }
        ],
        practice: {
            scenario: 'You just had a client meeting discussing their website redesign. Write meeting minutes documenting the discussion and next steps.',
            hints: [
                'Include all attendees',
                'Summarize key points clearly',
                'Make action items specific',
                'Set clear deadlines'
            ],
            sampleEmail: 'Subject: Meeting Notes: ABC Website Redesign Kickoff - Dec 23\\n\\nDear Mr. Shah,\\n\\nThank you for the excellent kickoff meeting today. Here\'s a summary:\\n\\nDecember 23, 2024 | 2:00 PM\\nAttendees: Mr. Shah (ABC Corp), Rahul Kumar, Priya Sharma (XYZ Agency)\\n\\nAgenda: Website redesign project kickoff\\n\\nKey Discussion:\\n1. Project Goals\\n   - Modern, mobile-first design\\n   - Improve conversion rate by 25%\\n   - Launch by March 1\\n\\n2. Brand Guidelines\\n   - Use existing color palette\\n   - Update logo (minor refresh)\\n   - Professional yet approachable tone\\n\\n3. Key Features\\n   - Product catalog with filters\\n   - Blog section\\n   - Contact form with CRM integration\\n\\nDecisions Made:\\n• Design style: Clean, minimalist\\n• CMS Platform: WordPress\\n• Weekly status calls: Fridays at 3 PM\\n\\nAction Items:\\n• XYZ Agency (Priya) - Initial wireframes - Due: Jan 3\\n• ABC Corp (Mr. Shah) - Provide logo files - Due: Dec 27\\n• ABC Corp (Marketing) - Content for About page - Due: Jan 5\\n• XYZ Agency (Rahul) - Technical requirements doc - Due: Dec 28\\n\\nNext Meeting: Friday, Jan 3 at 3 PM (calendar invite sent)\\n\\nAttachments:\\n• Project timeline\\n• Asset collection checklist\\n\\nPlease review and confirm. Excited to bring your vision to life!\\n\\nBest regards,\\nRahul Kumar\\nProject Manager | XYZ Agency'
        }
    },
    {
        id: 'escalation-emails',
        title: 'Escalation Emails',
        description: 'Raise issues professionally without burning bridges',
        duration: 14,
        difficulty: 'advanced',
        content: [
            {
                type: 'explanation',
                text: 'Escalation emails require diplomacy and clarity:\\n• Stay professional, never emotional\\n• State facts, not opinions\\n• Document previous attempts to resolve\\n• Suggest solutions\\n• Be respectful but firm'
            },
            {
                type: 'template',
                text: 'Escalation Structure:\\n\\n1. Context (what\'s the issue)\\n2. Impact (why it matters)\\n3. Previous attempts (what you\'ve tried)\\n4. Specific ask (what you need)\\n5. Timeline (when you need it)\\n6. Professional tone throughout'
            },
            {
                type: 'example',
                text: 'Subject: Urgent: Project Timeline Concerns\\n\\nDear [Manager],\\n\\nI wanted to bring a concern to your attention regarding the XYZ project.\\n\\nSituation: We\'re facing a 2-week delay due to missing client approvals. I\'ve sent 3 follow-up emails (Dec 1, 8, 15) but haven\'t received responses.\\n\\nImpact: This delay will push our launch to Feb 15, potentially affecting Q1 revenue targets.\\n\\nI\'ve tried:\\n• Direct emails to the client\\n• Calls (went to voicemail)\\n• Reaching out to their team\\n\\nRequest: Could you help escalate this with their senior management? We need approvals by Dec 28 to stay on track.\\n\\nI\'m happy to provide more details in our 1:1.\\n\\nThank you,\\nRahul'
            },
            {
                type: 'tip',
                text: 'Tip: Always escalate in writing (creates documentation). Focus on business impact, not personal frustration. Suggest solutions.'
            }
        ],
        practice: {
            scenario: 'A cross-functional team member consistently misses deadlines, affecting your project. Write an escalation email to your manager.',
            hints: [
                'Document the pattern',
                'Show business impact',
                'Remain professional',
                'Suggest solutions'
            ],
            sampleEmail: 'Subject: Request for Support: Project Delta Timeline Concerns\\n\\nDear Ms. Patel,\\n\\nI need your guidance on a challenge affecting Project Delta\'s timeline.\\n\\nSituation:\\nOur project depends on deliverables from the Design team (via Amit). We\'ve experienced delays in the last 3 sprints:\\n• Sprint 12: Mockups delayed 4 days (due Dec 5, received Dec 9)\\n• Sprint 13: Icons delayed 3 days (due Dec 12, received Dec 15)\\n• Sprint 14: Final designs not yet received (due Dec 19)\\n\\nI\'ve addressed this directly with Amit and his manager, but the pattern continues.\\n\\nBusiness Impact:\\n• Our development team is blocked\\n• Project is now 1.5 weeks behind schedule\\n• Risk of missing client demo on Jan 10\\n\\nActions Taken:\\n• Daily check-ins with Amit\\n• Offered to help with workload\\n• Escalated to design manager\\n\\nRequest:\\nCould we discuss this in our 1:1? I\'m considering:\\n1. Bringing in additional design resource\\n2. Adjusting project scope\\n3. Formal cross-team escalation\\n\\nI value Amit\'s work quality, but we need reliability to meet our commitments. What do you suggest?\\n\\nThank you for your support.\\n\\nBest regards,\\nRahul Kumar'
        }
    },
    {
        id: 'ooo-delegation',
        title: 'Out-of-Office & Delegation Emails',
        description: 'Manage expectations when unavailable',
        duration: 10,
        difficulty: 'beginner',
        content: [
            {
                type: 'explanation',
                text: 'OOO emails set expectations and prevent bottlenecks:\\n• State when you\'ll be away\\n• Provide alternative contact\\n• Set response time expectations\\n• Handle urgent matters\\n• Professional but friendly tone'
            },
            {
                type: 'template',
                text: 'OOO Auto-Reply Format:\\n\\nSubject: Out of Office: [Your Name]\\n\\nThank you for your email.\\n\\nI am out of office from [Date] to [Date] with limited access to email.\\n\\nFor urgent matters, please contact:\\n• [Name] - [Email] - [Topic]\\n• [Name] - [Email] - [Topic]\\n\\nI will respond to all emails upon my return on [Date].\\n\\nThank you for your patience.\\n\\nBest regards,\\n[Your Name]'
            },
            {
                type: 'example',
                text: 'OOO Example:\\n\\nThank you for your email.\\n\\nI am on vacation from Dec 24-31 with no email access.\\n\\nFor urgent project matters:\\n• Priya Sharma - priya@company.com (Project Delta)\\n• Amit Patel - amit@company.com (Client XYZ)\\n\\nFor HR inquiries: hr@company.com\\n\\nI\'ll respond to all messages after Jan 2.\\n\\nHappy Holidays!\\n\\nBest,\\nRahul'
            },
            {
                type: 'tip',
                text: 'Tip: Set OOO before you leave, not after. Delegate work clearly. Don\'t say "limited access" if you have none - be honest.'
            }
        ],
        practice: {
            scenario: 'You\'re going on vacation for 2 weeks. Write an OOO message and a delegation email to your team.',
            hints: [
                'Be clear about dates',
                'Provide specific contacts',
                'Set expectations',
                'Brief your team beforehand'
            ],
            sampleEmail: 'OOO AUTO-REPLY:\\n\\nThank you for reaching out.\\n\\nI am on vacation from January 10-24 without email access.\\n\\nFor immediate assistance:\\n\\n• Project Matters: Neha Gupta (neha@company.com)\\n• Client Escalations: Rohit Shah (rohit@company.com)\\n• HR/Leave Requests: hr@company.com\\n\\nI will respond to all emails upon my return on January 25.\\n\\nBest regards,\\nRahul\\n\\n---\\n\\nDELEGATION EMAIL (sent before leaving):\\n\\nSubject: Handover Notes - My Leave (Jan 10-24)\\n\\nHi Team,\\n\\nI\'ll be on vacation Jan 10-24. Here\'s the handover:\\n\\nNeha - You\'re handling:\\n• Daily standups (run them as usual)\\n• Client ABC status calls (Fridays at 2 PM)\\n• Code reviews for Sprint 15\\n\\nRohit - You\'re the escalation point for:\\n• Any client emergencies\\n• Production issues\\n• Urgent approvals\\n\\nPending Items:\\n• Q1 report (80% done, saved in shared drive)\\n• Interview feedback for candidates (submitted)\\n\\nIf Something Urgent Comes Up:\\n1. Check if it can wait till Jan 25\\n2. If not, contact Rohit\\n3. For technical questions, ping the #dev-team channel\\n\\nI\'ve updated all project docs and left comments where needed.\\n\\nThanks for covering! I\'ll bring back some good coffee\\n\\nBest,\\nRahul'
        }
    },
    {
        id: 'thank-you-appreciation',
        title: 'Thank You & Appreciation Emails',
        description: 'Build relationships through genuine gratitude',
        duration: 10,
        difficulty: 'beginner',
        content: [
            {
                type: 'explanation',
                text: 'Appreciation emails strengthen relationships:\\n• Be specific (what are you thanking for?)\\n• Be timely (send soon after the event)\\n• Be genuine (mean what you say)\\n• Keep it concise\\n• Acknowledge the effort and impact'
            },
            {
                type: 'template',
                text: 'Thank You Structure:\\n\\n1. Clear subject line\\n2. Express gratitude immediately\\n3. Be specific about what you\'re thankful for\\n4. Mention the impact or benefit\\n5. Offer reciprocation (if appropriate)\\n6. Warm closing'
            },
            {
                type: 'example',
                text: 'Subject: Thank you for your help!\\n\\nHi Priya,\\n\\nI wanted to thank you for jumping in to help with the client presentation yesterday.\\n\\nYour insights on the pricing strategy were exactly what we needed. The client loved it, and we closed the deal!\\n\\nI really appreciate you making time despite your busy schedule. If you ever need help with your projects, I\'m happy to return the favor.\\n\\nThanks again!\\n\\nBest,\\nRahul'
            },
            {
                type: 'tip',
                text: 'Tip: The best thank you emails are specific and heartfelt. Don\'t just say "thanks" - explain why and what it meant to you.'
            }
        ],
        practice: {
            scenario: 'A colleague stayed late to help you fix a critical bug before a deadline. Write a thank you email.',
            hints: [
                'Be specific about what they did',
                'Acknowledge the sacrifice',
                'Express genuine gratitude',
                'Offer to reciprocate'
            ],
            sampleEmail: 'Subject: Huge thanks for last night!\\n\\nHi Amit,\\n\\nI just wanted to send a quick note to thank you for staying until 9 PM last night to help me debug that payment gateway issue.\\n\\nI know you had plans, and your willingness to cancel them and help me out really means a lot. Because of your expertise, we caught the bug before it hit production and saved us from a potential disaster.\\n\\nYour knowledge of the payment systems is incredible, and I learned so much watching you troubleshoot.\\n\\nI owe you one (or several)! Next time you need backup on anything, I\'m your person.\\n\\nSeriously, thank you!\\n\\nBest,\\nRahul\\n\\nP.S. Coffee\'s on me this week'
        }
    },
    {
        id: 'networking-intros',
        title: 'Networking & Introduction Emails',
        description: 'Connect with professionals and request introductions',
        duration: 12,
        difficulty: 'intermediate',
        content: [
            {
                type: 'explanation',
                text: 'Networking emails should:\\n• Have a clear subject line\\n• Explain the connection or context\\n• Be brief and respectful of time\\n• Offer value, not just ask for favors\\n• Make it easy to respond'
            },
            {
                type: 'template',
                text: 'Introduction Request (to connector):\\n\\nSubject: Introduction to [Person]?\\n\\nHi [Name],\\n\\nHope you\'re doing well!\\n\\nI\'m reaching out because I saw you\'re connected with [Person] on LinkedIn. I\'m really interested in [topic/company], and would love to learn from their experience.\\n\\nWould you be comfortable making an introduction? I promise to be respectful of their time.\\n\\nNo worries if not - I totally understand!\\n\\nBest,\\n[Your Name]\\n\\n[Optional: Include a blurb about yourself they can forward]'
            },
            {
                type: 'example',
                text: 'Subject: Introduction to Priya Sharma?\\n\\nHi Rohit,\\n\\nI hope you\'re doing well!\\n\\nI noticed you\'re connected with Priya Sharma, who leads the AI team at XYZ Corp. I\'m very interested in AI applications in healthcare and would love to learn from her experience.\\n\\nWould you be comfortable making an introduction? I\'d love a brief chat to learn about her career path.\\n\\nI promise to be respectful of her time and come prepared with specific questions.\\n\\nNo pressure if you\'d prefer not to - I completely understand!\\n\\nFor your reference, here\'s a quick blurb you can use:\\n\\n\"Rahul is a software engineer at ABC Corp exploring AI in healthcare. He\'s genuinely curious about the field and would love 15-20 minutes of your time to learn from your experience.\"\\n\\nThank you for considering!\\n\\nBest,\\nRahul'
            },
            {
                type: 'tip',
                text: 'Tip: Make it easy for the connector - provide a short bio they can forward. Always give them an easy out (\"no worries if not\").'
            }
        ],
        practice: {
            scenario: 'You want to connect with someone who works at your dream company. Ask your mutual connection for an introduction.',
            hints: [
                'Be specific about why',
                'Make it easy for connector',
                'Give them an out',
                'Provide forwardable blurb'
            ],
            sampleEmail: 'Subject: Quick favor: Intro to Neha from Google?\\n\\nHey Priya,\\n\\nHope all is well with you!\\n\\nI saw you\'re connected with Neha Gupta who works on the Maps team at Google. I\'m really interested in learning more about product management at Google, and her career transition from engineering to PM is exactly the path I\'m considering.\\n\\nWould you feel comfortable making an introduction? I\'d love to ask her a few questions about her journey (15-20 min chat).\\n\\nTotally understand if you\'d rather not - no pressure at all!\\n\\nIf you\'re open to it, here\'s a quick intro you can use:\\n\\n---\\n\"Hi Neha,\\n\\nI\'d like to introduce you to Rahul Kumar. He\'s a senior software engineer at ABC Corp who\'s exploring a transition into product management. He\'s particularly interested in learning from your engineering-to-PM journey.\\n\\nWould you have 15-20 minutes for a quick virtual coffee? He\'s respectful of time and will come prepared with specific questions.\\n\\nOf course, no pressure if you\'re too busy!\\n\\nBest,\\nPriya\"\\n---\\n\\nThank you so much for considering! I really appreciate it.\\n\\nBest,\\nRahul'
        }
    },
    {
        id: 'email-etiquette',
        title: 'Email Etiquette & Best Practices',
        description: 'Master professional email dos and don\'ts',
        duration: 15,
        difficulty: 'beginner',
        content: [
            {
                type: 'explanation',
                text: 'Email Etiquette Rules:\\n\\n1. Subject Lines: Clear, specific, actionable\\n   Good: \"Q4 Budget Approval Needed by Friday\"\\n   Bad: \"Question\"\\n\\n2. CC vs BCC:\\n   • CC: Keep people in the loop\\n   • BCC: Hide recipients (use sparingly)\\n   • Don\'t CC your boss to intimidate someone'
            },
            {
                type: 'explanation',
                text: '3. Reply vs Reply All:\\n   • Reply All: When everyone needs to see\\n   • Reply: For one-on-one responses\\n   • Don\'t Reply All for \"Thanks!\"\\n\\n4. Tone:\\n   • Professional but friendly\\n   • No ALL CAPS (looks like shouting)\\n   • Use exclamation marks sparingly\\n   • Re-read before sending\\n\\n5. Response Time:\\n   • Urgent: Within 2 hours\\n   • Normal: Within 24 hours\\n   • Set expectations if delayed'
            },
            {
                type: 'example',
                text: 'Bad Practices:\\n• \"HI EVERYONE THIS IS URGENT!!!\"\\n• Marking every email as high priority\\n• Sending emails at 2 AM expecting immediate response\\n• Using Reply All for private responses\\n• No subject line\\n\\nGood Practices:\\n• Clear subject: \"Action Required: Approve Budget by Dec 25\"\\n• Appropriate urgency marking\\n• Respectful of time zones\\n• Reply only to relevant people\\n• Descriptive subjects'
            },
            {
                type: 'tip',
                text: 'Tip: The \"Reply All\" disaster is real. Always double-check recipients before sending, especially for sensitive topics.'
            }
        ],
        practice: {
            scenario: 'Review this email and identify the etiquette mistakes:\\n\\n\"HEY EVERYONE!!! I NEED THE REPORTS ASAP. WHY HASNT ANYONE RESPONDED TO MY EMAIL FROM 2 HOURS AGO??? THIS IS CRITICAL!!! RESPOND IMMEDIATELY!!!\"',
            hints: [
                'ALL CAPS is unprofessional',
                'Too many exclamation marks',
                'No greeting or closing',
                'Aggressive tone',
                'No clear deadline'
            ],
            sampleEmail: 'BETTER VERSION:\\n\\nSubject: Action Required: Q4 Reports Needed by EOD\\n\\nHi team,\\n\\nI hope this email finds you well.\\n\\nI sent a request for Q4 reports earlier today and wanted to follow up as I need these for tomorrow\'s board meeting.\\n\\nCould you please send your reports by end of day today (6 PM)?\\n\\nIf you\'re facing any challenges completing this, please let me know so we can work out a solution.\\n\\nThank you for your prompt attention to this.\\n\\nBest regards,\\nRahul\\n\\n---\\n\\nIMPROVEMENTS MADE:\\n• Clear, specific subject line\\n• Professional greeting\\n• Polite tone throughout\\n• Specific deadline (EOD, 6 PM)\\n• Acknowledged potential issues\\n• Offered help\\n• No aggressive language\\n• No ALL CAPS or excessive punctuation\\n• Professional closing'
        }
    }
];

export function getEmailLessonById(id: string): EmailLesson | undefined {
    return emailLessons.find(lesson => lesson.id === id);
}

export function getTotalEmailLessons(): number {
    return emailLessons.length;
}
