
export interface PhraseData {
    slug: string;
    hindi_phrase: string;
    intent_category: string;
    pro_option_1: string;
    pro_option_2: string;
    cultural_context: string;
    meta_title?: string;
    meta_description?: string;
}

export const PHRASES: PhraseData[] = [
    {
        slug: "how-to-say-kaam-ho-jayega-professionally",
        hindi_phrase: "Kaam ho jayega",
        intent_category: "Commitments",
        pro_option_1: "I will ensure the task is completed by the agreed deadline.",
        pro_option_2: "I'm on it. I'll share an update shortly.",
        cultural_context: "Direct translations like 'Work will happen' sound passive. Using 'I will ensure' shows ownership.",
        meta_title: "How to say 'Kaam ho jayega' in English Professionally - EnglishGyani",
        meta_description: "Learn how to say 'Kaam ho jayega' professionally. Avoid passive language and show ownership with these corporate English alternatives."
    },
    {
        slug: "how-to-say-main-beemar-hoon-professionally",
        hindi_phrase: "Meri tabiyat kharab hai",
        intent_category: "Leave Request",
        pro_option_1: "I am writing to inform you that I am unwell and will be unable to attend work today.",
        pro_option_2: "Feeling a bit under the weather today. Taking the day off to recover.",
        cultural_context: "Avoid 'unhealthy.' 'Unwell' or 'under the weather' is the standard corporate vocabulary.",
        meta_title: "How to say 'Meri tabiyat kharab hai' in English Professionally",
        meta_description: "Professional ways to say 'I am sick' in a corporate email or chat. Learn the right vocabulary for leave requests."
    },
    {
        slug: "how-to-say-salary-kab-aayegi-professionally",
        hindi_phrase: "Salary kab tak aayegi?",
        intent_category: "Finance",
        pro_option_1: "Could you please provide an update on the expected disbursement date for this month's salary?",
        pro_option_2: "Any update on when the salaries will be credited?",
        cultural_context: "Direct questions about money can feel rude. Using 'disbursement' and 'update' softens the tone.",
        meta_title: "How to ask 'Salary kab aayegi' professionally in English",
        meta_description: "Don't sound desperate when asking about salary. Use these professional phrases to ask HR about salary disbursement."
    },
    {
        slug: "how-to-say-samajh-nahi-aaya-professionally",
        hindi_phrase: "Mujhe samajh nahi aaya",
        intent_category: "Clarification",
        pro_option_1: "Could you please elaborate further on this point to ensure we are aligned?",
        pro_option_2: "I'm not sure I follow. Could you clarify that last part?",
        cultural_context: "Saying 'I didn't understand' makes you look slow. 'Could you elaborate' makes it about the quality of the explanation."
    },
    {
        slug: "how-to-say-deri-ho-jayegi-professionally",
        hindi_phrase: "Thoda time lagega / Deri hogi",
        intent_category: "Deadlines",
        pro_option_1: "I anticipate a slight delay in delivery due to unforeseen technical challenges.",
        pro_option_2: "Running a bit behind on this. Will need an extra hour.",
        cultural_context: "'Time lagega' is vague. 'Anticipate a slight delay' sounds professional and planned."
    },
    {
        slug: "how-to-say-kya-aap-free-ho-professionally",
        hindi_phrase: "Kya aap free ho?",
        intent_category: "Meeting Request",
        pro_option_1: "Do you have a few minutes for a quick discussion regarding the project?",
        pro_option_2: "Got a quick minute to sync on something?",
        cultural_context: "'Are you free?' can be intrusive. 'Do you have a few minutes' respects the other person's time."
    },
    {
        slug: "how-to-say-aapka-shukriya-professionally",
        hindi_phrase: "Aapka bohot shukriya",
        intent_category: "Appreciation",
        pro_option_1: "I would like to express my sincere gratitude for your support in this matter.",
        pro_option_2: "Really appreciate your help with this!",
        cultural_context: "'Thank you very much' is fine, but 'Express my sincere gratitude' carries more weight in formal emails."
    },
    {
        slug: "how-to-thank-for-opportunity",
        hindi_phrase: "Mauka dene ke liye shukriya",
        intent_category: "Appreciation",
        pro_option_1: "Thank you for giving me the opportunity to work on this project. I look forward to contributing.",
        pro_option_2: "Thanks for the opportunity! Excited to get started.",
        cultural_context: "Show enthusiasm along with gratitude when thanking for opportunities."
    },
    {
        slug: "how-to-thank-team-for-support",
        hindi_phrase: "Team ko support ke liye thanks",
        intent_category: "Appreciation",
        pro_option_1: "I want to thank the entire team for their support and collaboration on this initiative.",
        pro_option_2: "Big thanks to the team for all the support!",
        cultural_context: "Acknowledge team effort publicly to build morale."
    },
    {
        slug: "how-to-appreciate-feedback",
        hindi_phrase: "Feedback ke liye dhanyavaad",
        intent_category: "Appreciation",
        pro_option_1: "Thank you for the valuable feedback. I will incorporate your suggestions in the next iteration.",
        pro_option_2: "Thanks for the feedback! Will work on these points.",
        cultural_context: "Show you'll act on feedback, not just acknowledge it."
    },
    {
        slug: "how-to-thank-for-guidance",
        hindi_phrase: "Guidance ke liye shukriya",
        intent_category: "Appreciation",
        pro_option_1: "I truly appreciate your guidance throughout this project. Your insights have been invaluable.",
        pro_option_2: "Thanks for all the guidance - it really helped!",
        cultural_context: "Be specific about what guidance helped to make it more meaningful."
    },
    {
        slug: "how-to-thank-for-time",
        hindi_phrase: "Time dene ke liye thanks",
        intent_category: "Appreciation",
        pro_option_1: "Thank you for taking the time to meet with me. I found our discussion very productive.",
        pro_option_2: "Thanks for making time to chat - really appreciate it!",
        cultural_context: "Acknowledge that their time is valuable."
    },
    {
        slug: "how-to-appreciate-mentor",
        hindi_phrase: "Mentor ko appreciate kaise karun",
        intent_category: "Appreciation",
        pro_option_1: "I'm grateful for your mentorship and the time you've invested in my professional development.",
        pro_option_2: "Really appreciate your mentorship - learning a lot from you!",
        cultural_context: "Mentors appreciate knowing their impact on your growth."
    },
    {
        slug: "how-to-thank-for-recommendation",
        hindi_phrase: "Recommendation ke liye thanks",
        intent_category: "Appreciation",
        pro_option_1: "Thank you so much for providing the recommendation. Your support means a great deal to me.",
        pro_option_2: "Thanks for the recommendation - means a lot!",
        cultural_context: "Express how much the endorsement matters to you."
    },
    {
        slug: "how-to-thank-after-promotion",
        hindi_phrase: "Promotion ke baad thanks",
        intent_category: "Appreciation",
        pro_option_1: "I'm grateful for the trust you've placed in me with this promotion. I'm committed to exceeding expectations.",
        pro_option_2: "Thank you for the promotion! Looking forward to the new challenges.",
        cultural_context: "Commit to delivering results, not just celebrating the promotion."
    },
    {
        slug: "how-to-thank-for-raise",
        hindi_phrase: "Increment ke liye thanks",
        intent_category: "Appreciation",
        pro_option_1: "Thank you for recognizing my contributions with the salary increase. I appreciate the acknowledgment.",
        pro_option_2: "Thanks for the raise - really appreciate the recognition!",
        cultural_context: "Acknowledge the recognition aspect, not just the money."
    },
    // More Clarification phrases
    {
        slug: "how-to-ask-for-more-details",
        hindi_phrase: "Aur details chahiye",
        intent_category: "Clarification",
        pro_option_1: "Could you provide more details on this aspect? I want to ensure I have all the information needed.",
        pro_option_2: "Can you share more details about this?",
        cultural_context: "Be specific about what details you need."
    },
    {
        slug: "how-to-ask-for-examples",
        hindi_phrase: "Example de sakte hain?",
        intent_category: "Clarification",
        pro_option_1: "Could you provide an example to help me better understand the expected outcome?",
        pro_option_2: "Can you give an example?",
        cultural_context: "Examples often clarify better than lengthy explanations."
    },
    {
        slug: "how-to-confirm-understanding",
        hindi_phrase: "Meri samajh sahi hai?",
        intent_category: "Clarification",
        pro_option_1: "Just to confirm my understanding: Are you suggesting that we [restate]? Please let me know if I've understood correctly.",
        pro_option_2: "Just confirming - you mean [restate], right?",
        cultural_context: "Paraphrasing shows active listening and prevents mistakes."
    },
    {
        slug: "how-to-ask-about-priority",
        hindi_phrase: "Kya priority hai?",
        intent_category: "Clarification",
        pro_option_1: "Could you clarify the priority order for these tasks so I can allocate my time accordingly?",
        pro_option_2: "Which one should I prioritize?",
        cultural_context: "Understanding priorities helps you deliver what matters most first."
    },
    {
        slug: "how-to-ask-about-scope",
        hindi_phrase: "Scope kya hai?",
        intent_category: "Clarification",
        pro_option_1: "Could you clarify the scope of this project? Specifically, what's included and excluded?",
        pro_option_2: "What's in and out of scope for this?",
        cultural_context: "Clear scope prevents scope creep and misaligned expectations."
    },
    {
        slug: "how-to-ask-about-expectations",
        hindi_phrase: "Aap kya expect kar rahe hain?",
        intent_category: "Clarification",
        pro_option_1: "Could you clarify your expectations for this deliverable in terms of format and depth?",
        pro_option_2: "What are you expecting from this?",
        cultural_context: "Understand expectations upfront to avoid rework."
    },
    {
        slug: "how-to-ask-who-is-responsible",
        hindi_phrase: "Kis ka kaam hai yeh?",
        intent_category: "Clarification",
        pro_option_1: "Could you clarify who is responsible for this task to avoid any overlap?",
        pro_option_2: "Who's handling this?",
        cultural_context: "Clear ownership prevents tasks from falling through cracks."
    },
    {
        slug: "how-to-ask-for-deadline-clarity",
        hindi_phrase: "Exact deadline kya hai?",
        intent_category: "Clarification",
        pro_option_1: "Could you specify the exact deadline? Is it end of day or a specific time?",
        pro_option_2: "What's the hard deadline on this?",
        cultural_context: "Be precise about deadlines to manage time effectively."
    },
    {
        slug: "how-to-ask-which-version",
        hindi_phrase: "Kaun sa version use karun?",
        intent_category: "Clarification",
        pro_option_1: "Could you clarify which version of the document I should be working from?",
        pro_option_2: "Which version should I use?",
        cultural_context: "Version confusion leads to wasted effort."
    },
    // More Commitments phrases
    {
        slug: "how-to-commit-to-deadline",
        hindi_phrase: "Deadline tak kar dunga",
        intent_category: "Commitments",
        pro_option_1: "I commit to delivering this by the deadline of [date]. I have allocated sufficient time for quality work.",
        pro_option_2: "I'll have it done by [deadline].",
        cultural_context: "State commitment clearly with specific date."
    },
    {
        slug: "how-to-commit-to-quality",
        hindi_phrase: "Achha kaam karunga",
        intent_category: "Commitments",
        pro_option_1: "I will ensure this deliverable meets our quality standards before submission.",
        pro_option_2: "I'll make sure it's high quality.",
        cultural_context: "Quality commitment shows professionalism."
    },
    {
        slug: "how-to-promise-update",
        hindi_phrase: "Update dunga",
        intent_category: "Commitments",
        pro_option_1: "I will provide regular updates on the progress every [frequency].",
        pro_option_2: "I'll keep you updated as I go.",
        cultural_context: "Specify frequency of updates for accountability."
    },
    {
        slug: "how-to-commit-to-learning",
        hindi_phrase: "Seekh lunga",
        intent_category: "Commitments",
        pro_option_1: "I will take the time to learn this skill/tool to become proficient by [timeframe].",
        pro_option_2: "I'll learn it soon.",
        cultural_context: "Show commitment to growth and development."
    },
    {
        slug: "how-to-commit-to-availability",
        hindi_phrase: "Available rahunga",
        intent_category: "Commitments",
        pro_option_1: "I will remain available during [hours] to address any urgent matters.",
        pro_option_2: "I'll be available if you need me.",
        cultural_context: "Specify when you'll be available."
    },
    {
        slug: "how-to-commit-to-follow-up",
        hindi_phrase: "Follow-up kar lunga",
        intent_category: "Commitments",
        pro_option_1: "I will follow up with [person/team] and get back to you by [date].",
        pro_option_2: "I'll follow up on this.",
        cultural_context: "Commit to action with timeline."
    },
    {
        slug: "how-to-commit-to-improvement",
        hindi_phrase: "Improve karunga",
        intent_category: "Commitments",
        pro_option_1: "I acknowledge the areas for improvement and will work on them systematically.",
        pro_option_2: "I'll work on getting better at this.",
        cultural_context: "Show you take feedback seriously."
    },
    {
        slug: "how-to-commit-to-support",
        hindi_phrase: "Support karunga",
        intent_category: "Commitments",
        pro_option_1: "I'm committed to supporting the team in achieving this goal.",
        pro_option_2: "I'll help out however I can.",
        cultural_context: "Team commitment builds collaboration."
    },
    {
        slug: "how-to-commit-to-meeting-prep",
        hindi_phrase: "Taiyaar hokar aaunga",
        intent_category: "Commitments",
        pro_option_1: "I will come prepared with the necessary data and analysis for our discussion.",
        pro_option_2: "I'll be prepared for the meeting.",
        cultural_context: "Meeting prep shows respect for others' time."
    },
    // More Deadlines phrases
    {
        slug: "how-to-request-deadline",
        hindi_phrase: "Deadline kya hai?",
        intent_category: "Deadlines",
        pro_option_1: "Could you please confirm the deadline for this deliverable?",
        pro_option_2: "When do you need this by?",
        cultural_context: "Always clarify deadlines upfront."
    },
    {
        slug: "how-to-negotiate-deadline",
        hindi_phrase: "Deadline negotiate kar sakte hain?",
        intent_category: "Deadlines",
        pro_option_1: "Given the scope of work, would it be possible to extend the deadline to [date] to ensure quality?",
        pro_option_2: "Can we push the deadline a bit?",
        cultural_context: "Justify why you need more time with quality/scope reasons."
    },
    {
        slug: "how-to-communicate-deadline-risk",
        hindi_phrase: "Deadline miss ho sakti hai",
        intent_category: "Deadlines",
        pro_option_1: "I wanted to flag early that the current deadline may be at risk due to [reason]. Can we discuss options?",
        pro_option_2: "Heads up - might miss the deadline because of [issue].",
        cultural_context: "Alert early, not at the last minute."
    },
    {
        slug: "how-to-confirm-deadline-met",
        hindi_phrase: "Deadline se pehle ho jayega",
        intent_category: "Deadlines",
        pro_option_1: "I'm on track to deliver this ahead of the [date] deadline.",
        pro_option_2: "Should have this done before the deadline.",
        cultural_context: "Managing upward - let them know you're on track."
    },
    {
        slug: "how-to-ask-for-urgent-deadline",
        hindi_phrase: "Kitni jaldi chahiye?",
        intent_category: "Deadlines",
        pro_option_1: "What is the urgency level for this? Do we need it today or can it wait until [date]?",
        pro_option_2: "How urgent is this?",
        cultural_context: "Understand true urgency to prioritize correctly."
    },
    {
        slug: "how-to-propose-phased-delivery",
        hindi_phrase: "Parts mein de sakta hoon",
        intent_category: "Deadlines",
        pro_option_1: "Would a phased delivery work? I can share [Part 1] by [date] and remainder by [later date].",
        pro_option_2: "Can I deliver this in phases?",
        cultural_context: "Phased delivery shows progress while buying time."
    },
    {
        slug: "how-to-acknowledge-tight-deadline",
        hindi_phrase: "Deadline bohot tight hai",
        intent_category: "Deadlines",
        pro_option_1: "I understand this is a tight deadline. I'll prioritize this and may need to defer other tasks temporarily.",
        pro_option_2: "This deadline is tight, but I'll make it work.",
        cultural_context: "Acknowledge challenge while committing to deliver."
    },
    {
        slug: "how-to-set-interim-milestones",
        hindi_phrase: "Beech mein checkpoints rakhun?",
        intent_category: "Deadlines",
        pro_option_1: "For this timeline, I propose interim milestones on [dates] for early feedback.",
        pro_option_2: "Should we set some checkpoints along the way?",
        cultural_context: "Milestones enable course correction."
    },
    // More Finance phrases
    {
        slug: "how-to-ask-about-payroll-issue",
        hindi_phrase: "Salary mein problem hai",
        intent_category: "Finance",
        pro_option_1: "I noticed a discrepancy in my salary this month. Could someone from payroll please review this?",
        pro_option_2: "There's an issue with my salary - can you check?",
        cultural_context: "Be factual, not emotional, about payroll issues."
    },
    {
        slug: "how-to-ask-about-bonus",
        hindi_phrase: "Bonus kab milega?",
        intent_category: "Finance",
        pro_option_1: "Could you provide an update on when the annual bonus will be disbursed?",
        pro_option_2: "Any update on bonus payout?",
        cultural_context: "Frame as process question, not demand."
    },
    {
        slug: "how-to-ask-about-tax-deductions",
        hindi_phrase: "Tax deduction samajh nahi aaya",
        intent_category: "Finance",
        pro_option_1: "Could you please explain the tax deductions in my payslip? I want to ensure I understand them correctly.",
        pro_option_2: "Can you clarify the tax deductions?",
        cultural_context: "Financial literacy is important - ask when unclear."
    },
    {
        slug: "how-to-request-salary-slip",
        hindi_phrase: "Salary slip chahiye",
        intent_category: "Finance",
        pro_option_1: "Could you please provide my salary slips for [months] for loan documentation purposes?",
        pro_option_2: "Need salary slips for [months].",
        cultural_context: "Mention why you need them if for external purposes."
    },
    {
        slug: "how-to-ask-about-reimbursement",
        hindi_phrase: "Reimbursement kab tak aayega?",
        intent_category: "Finance",
        pro_option_1: "I submitted reimbursement for [expense] on [date]. Could you please share the expected processing timeline?",
        pro_option_2: "When will my reimbursement come through?",
        cultural_context: "Reference submission date for follow-up."
    },
    {
        slug: "how-to-request-form16",
        hindi_phrase: "Form 16 chahiye",
        intent_category: "Finance",
        pro_option_1: "Could you please share my Form 16 for FY [year] for tax filing purposes?",
        pro_option_2: "Need Form 16 for [year].",
        cultural_context: "Form 16 is typically issued by June - ask accordingly."
    },
    {
        slug: "how-to-ask-about-arrears",
        hindi_phrase: "Arrears ka status",
        intent_category: "Finance",
        pro_option_1: "Could you provide an update on the pending arrears from [period/reason]?",
        pro_option_2: "Any update on the arrears?",
        cultural_context: "Be patient but persistent about money owed."
    },
    {
        slug: "how-to-report-payroll-error",
        hindi_phrase: "Salary galat aayi hai",
        intent_category: "Finance",
        pro_option_1: "I believe there may be an error in my salary calculation this month. The amount is [X] instead of expected [Y].",
        pro_option_2: "My salary seems wrong this month - it's [amount].",
        cultural_context: "State expected vs. actual clearly."
    },
    {
        slug: "how-to-ask-about-provident-fund",
        hindi_phrase: "PF balance kaise check karun?",
        intent_category: "Finance",
        pro_option_1: "Could you guide me on how to check my provident fund balance and contribution history?",
        pro_option_2: "How do I check my PF balance?",
        cultural_context: "Most companies use UAN - they can guide you."
    },
    {
        slug: "how-to-ask-about-benefits",
        hindi_phrase: "Benefits ke baare mein janna hai",
        intent_category: "Finance",
        pro_option_1: "Could you please share details about the benefits package, including insurance and allowances?",
        pro_option_2: "What benefits am I eligible for?",
        cultural_context: "Ask during onboarding or policy change announcements."
    },
    {
        slug: "how-to-request-salary-breakup",
        hindi_phrase: "Salary breakup chahiye",
        intent_category: "Finance",
        pro_option_1: "Could you provide a detailed breakup of my salary structure including fixed and variable components?",
        pro_option_2: "Can I get my salary breakup?",
        cultural_context: "Important to understand CTC vs. in-hand."
    },
    {
        slug: "how-to-ask-about-increment-timeline",
        hindi_phrase: "Increment kab hota hai?",
        intent_category: "Finance",
        pro_option_1: "Could you share the typical timeline for annual increments in the organization?",
        pro_option_2: "When do increments usually happen?",
        cultural_context: "Understand company's appraisal cycle."
    },
    {
        slug: "how-to-ask-about-advance-repayment",
        hindi_phrase: "Advance kaise repay hoga?",
        intent_category: "Finance",
        pro_option_1: "Could you clarify the repayment schedule for the salary advance I received?",
        pro_option_2: "How will the advance be deducted?",
        cultural_context: "Understand repayment terms to plan finances."
    },
    // More Leave Request phrases
    {
        slug: "how-to-request-emergency-leave",
        hindi_phrase: "Emergency leave chahiye",
        intent_category: "Leave Request",
        pro_option_1: "Due to an urgent personal matter, I need to take emergency leave today. I will be available on call if anything critical comes up.",
        pro_option_2: "Need emergency leave today - urgent situation.",
        cultural_context: "For true emergencies, inform and then handle formalities."
    },
    {
        slug: "how-to-request-planned-leave",
        hindi_phrase: "Chutti plan kar raha hoon",
        intent_category: "Leave Request",
        pro_option_1: "I would like to plan leave from [dates] for [reason]. I will ensure all my tasks are either completed or delegated.",
        pro_option_2: "Want to take leave from [dates].",
        cultural_context: "Plan leaves well in advance for manager's convenience."
    },
    {
        slug: "how-to-request-half-day",
        hindi_phrase: "Half day chahiye",
        intent_category: "Leave Request",
        pro_option_1: "I would like to request a half day on [date] for [reason]. I will be available until [time].",
        pro_option_2: "Can I take a half day on [date]?",
        cultural_context: "Specify which half - first or second."
    },
    {
        slug: "how-to-request-paternity-leave",
        hindi_phrase: "Paternity leave chahiye",
        intent_category: "Leave Request",
        pro_option_1: "I would like to apply for paternity leave from [dates] as per company policy.",
        pro_option_2: "Applying for paternity leave for [dates].",
        cultural_context: "Reference company policy and typical duration."
    },
    {
        slug: "how-to-request-bereavement-leave",
        hindi_phrase: "Bereavement leave chahiye",
        intent_category: "Leave Request",
        pro_option_1: "I need to request bereavement leave due to the passing of [relation]. I will need [X] days.",
        pro_option_2: "Need bereavement leave - family emergency.",
        cultural_context: "Most companies have compassionate leave policies."
    },
    {
        slug: "how-to-extend-leave",
        hindi_phrase: "Leave extend karni hai",
        intent_category: "Leave Request",
        pro_option_1: "I need to extend my current leave by [X] days until [new date] due to [reason].",
        pro_option_2: "Need to extend leave until [date].",
        cultural_context: "Inform as early as possible about extension needs."
    },
    {
        slug: "how-to-check-leave-balance",
        hindi_phrase: "Leave balance kya hai?",
        intent_category: "Leave Request",
        pro_option_1: "Could you please share my current leave balance?",
        pro_option_2: "What's my leave balance?",
        cultural_context: "Check before planning long vacations."
    },
    {
        slug: "how-to-request-unpaid-leave",
        hindi_phrase: "Unpaid leave le sakta hoon?",
        intent_category: "Leave Request",
        pro_option_1: "I understand I have exhausted my leave quota. Would it be possible to take unpaid leave from [dates]?",
        pro_option_2: "Can I take unpaid leave for [dates]?",
        cultural_context: "Explain situation and propose plan for work coverage."
    },
    {
        slug: "how-to-cancel-planned-leave",
        hindi_phrase: "Leave cancel karni hai",
        intent_category: "Leave Request",
        pro_option_1: "I need to cancel my approved leave for [dates] due to [work priority/personal reason].",
        pro_option_2: "Need to cancel my leave on [dates].",
        cultural_context: "Give reason for cancellation to avoid confusion."
    },
    // More Meeting Request phrases
    {
        slug: "how-to-request-one-on-one",
        hindi_phrase: "One-on-one meeting chahiye",
        intent_category: "Meeting Request",
        pro_option_1: "Could we schedule a one-on-one meeting to discuss [topic]? I have some questions about [specific aspect].",
        pro_option_2: "Can we have a quick 1:1 about [topic]?",
        cultural_context: "Be specific about what you want to discuss."
    },
    {
        slug: "how-to-request-urgent-meeting",
        hindi_phrase: "Urgent meeting chahiye",
        intent_category: "Meeting Request",
        pro_option_1: "We need to meet urgently to address [critical issue]. Are you available for a call today?",
        pro_option_2: "Need an urgent meeting about [issue] - can you talk today?",
        cultural_context: "Explain why it's urgent to get priority."
    },
    {
        slug: "how-to-request-skip-level-meeting",
        hindi_phrase: "Skip-level meeting kaise request karun?",
        intent_category: "Meeting Request",
        pro_option_1: "I would like to request a skip-level meeting to share feedback and discuss my career development.",
        pro_option_2: "Can we schedule a skip-level meeting?",
        cultural_context: "Some companies encourage these; check culture first."
    },
    {
        slug: "how-to-request-team-meeting",
        hindi_phrase: "Team meeting rakhte hain",
        intent_category: "Meeting Request",
        pro_option_1: "I'd like to call a team meeting to align on [topic]. Would [day/time] work for everyone?",
        pro_option_2: "Let's have a team sync on [topic]. [Day] work?",
        cultural_context: "Propose time and check team availability."
    },
    {
        slug: "how-to-request-client-call",
        hindi_phrase: "Client call set up karni hai",
        intent_category: "Meeting Request",
        pro_option_1: "Could we schedule a call with [client] to discuss [agenda]? I'd like to align internally first.",
        pro_option_2: "Need to set up a client call about [topic].",
        cultural_context: "Internal alignment before client calls prevents confusion."
    },
    {
        slug: "how-to-request-feedback-session",
        hindi_phrase: "Feedback session chahiye",
        intent_category: "Meeting Request",
        pro_option_1: "I would appreciate a feedback session to understand how I can improve my performance in [area].",
        pro_option_2: "Can we schedule time for feedback on my work?",
        cultural_context: "Proactive feedback seeking shows growth mindset."
    },
    {
        slug: "how-to-request-brainstorming-session",
        hindi_phrase: "Brainstorming session karte hain",
        intent_category: "Meeting Request",
        pro_option_1: "Could we organize a brainstorming session with the team to generate ideas for [challenge]?",
        pro_option_2: "Let's brainstorm on [topic] together.",
        cultural_context: "Collaborative problem-solving builds team engagement."
    },
    {
        slug: "how-to-request-status-update-meeting",
        hindi_phrase: "Status update meeting set karun?",
        intent_category: "Meeting Request",
        pro_option_1: "Can we schedule a weekly status update meeting to track progress on [project]?",
        pro_option_2: "Should we have weekly check-ins on [project]?",
        cultural_context: "Regular updates prevent surprises."
    },
    {
        slug: "how-to-request-exit-interview",
        hindi_phrase: "Exit interview kab hoga?",
        intent_category: "Meeting Request",
        pro_option_1: "As part of my exit process, could we schedule the exit interview at your convenience?",
        pro_option_2: "When can we do the exit interview?",
        cultural_context: "Exit interviews are standard - HR will usually initiate."
    },
    // Interview Room
    {
        slug: "how-to-introduce-myself-in-interview",
        hindi_phrase: "Mera introduction kaise doon?",
        intent_category: "Interview Preparation",
        pro_option_1: "Good morning. My name is [Name], and I have [X] years of experience in [field]. I specialize in [key skills], and I'm excited about the opportunity to contribute to your team.",
        pro_option_2: "Hi, I'm [Name]. I've been working in [industry] for [X] years, focusing on [area of expertise].",
        cultural_context: "Start with a greeting, state your name, highlight relevant experience, and express enthusiasm. Avoid rambling about personal details."
    },
    {
        slug: "how-to-discuss-salary-expectation-professionally",
        hindi_phrase: "Main itni salary expect kar raha hoon",
        intent_category: "Interview Preparation",
        pro_option_1: "Based on my experience and industry standards, I am looking for a compensation package in the range of [X-Y] lakhs per annum.",
        pro_option_2: "I'm expecting something around [X] LPA, but I'm open to discussing the overall package.",
        cultural_context: "Always give a range, not a fixed number. Research market rates beforehand and justify your expectation with skills."
    },
    {
        slug: "how-to-explain-why-leaving-current-company",
        hindi_phrase: "Purani company kyu chhodi?",
        intent_category: "Interview Preparation",
        pro_option_1: "I'm seeking new challenges and opportunities for professional growth that align more closely with my career goals.",
        pro_option_2: "Looking for better growth opportunities and a role that matches my skill set.",
        cultural_context: "Never badmouth your previous employer. Focus on growth, learning, and positive reasons for the move."
    },
    {
        slug: "how-to-explain-career-gap-professionally",
        hindi_phrase: "Mera 1 saal ka gap tha",
        intent_category: "Interview Preparation",
        pro_option_1: "I took a career break to upskill in [technology/skill] and also to address some personal commitments. During this time, I completed [certification/project].",
        pro_option_2: "I had a gap year where I focused on learning new skills and handling some personal matters.",
        cultural_context: "Be honest but brief. Highlight what you learned or accomplished during the gap. Show you stayed productive."
    },
    {
        slug: "how-to-discuss-strengths-and-weaknesses",
        hindi_phrase: "Meri khoobi aur kami kya hai?",
        intent_category: "Interview Preparation",
        pro_option_1: "My key strength is my ability to adapt quickly to new technologies. As for areas of improvement, I'm working on enhancing my public speaking skills through workshops.",
        pro_option_2: "I'm great at problem-solving, but I'm working on being more assertive in meetings.",
        cultural_context: "For strengths, be specific with examples. For weaknesses, mention something real but show you're working to improve it."
    },
    {
        slug: "how-to-discuss-notice-period-professionally",
        hindi_phrase: "Mera notice period 2 mahine ka hai",
        intent_category: "Interview Preparation",
        pro_option_1: "I am currently serving a two-month notice period. However, I can explore the possibility of an early release if required.",
        pro_option_2: "My notice period is 2 months, but I can check with my current employer about reducing it.",
        cultural_context: "Be upfront about your notice period. Show flexibility if possible, but don't promise what you can't deliver."
    },
    {
        slug: "how-to-discuss-joining-date-professionally",
        hindi_phrase: "Main kab se join kar sakta hoon?",
        intent_category: "Interview Preparation",
        pro_option_1: "I will be available to join from [specific date], subject to the completion of my notice period and any transition activities.",
        pro_option_2: "I can start from [date], once I wrap up my current commitments.",
        cultural_context: "Give a realistic date. Factor in notice period, paperwork, and any personal commitments. Don't overpromise."
    },
    {
        slug: "how-to-answer-why-should-we-hire-you",
        hindi_phrase: "Aap mujhe select kyu karein?",
        intent_category: "Interview Preparation",
        pro_option_1: "You should hire me because my [X years] of experience in [domain], combined with my proven track record in [achievement], makes me an ideal fit for this role.",
        pro_option_2: "I bring solid experience in [skill] and have successfully delivered [result] in my previous roles.",
        cultural_context: "Focus on what you bring to the table. Highlight achievements, skills, and how you can solve their problems."
    },
    // Salary & Appraisals
    {
        slug: "how-to-ask-about-hike-percentage",
        hindi_phrase: "Mujhe kitne percent hike milega?",
        intent_category: "Salary & Appraisal",
        pro_option_1: "Could you please share the expected percentage increase for this appraisal cycle based on my performance rating?",
        pro_option_2: "What's the hike percentage for this year?",
        cultural_context: "Frame it as a question about the process, not a demand. Show you understand it's tied to performance."
    },
    {
        slug: "how-to-discuss-promotion-timeline",
        hindi_phrase: "Mera promotion kab tak hoga?",
        intent_category: "Salary & Appraisal",
        pro_option_1: "I would like to understand the timeline and criteria for promotion to the next level. Could we discuss my progress towards that goal?",
        pro_option_2: "Can we talk about the promotion timeline and what I need to work on?",
        cultural_context: "Don't ask 'when will I get promoted.' Instead, ask about the process and what you need to achieve."
    },
    {
        slug: "how-to-ask-about-variable-pay",
        hindi_phrase: "Variable pay kitna milega?",
        intent_category: "Salary & Appraisal",
        pro_option_1: "Could you please clarify the variable pay component for this quarter based on the performance metrics?",
        pro_option_2: "What's the variable pay payout for this cycle?",
        cultural_context: "Variable pay depends on metrics. Ask about the calculation method or criteria, not just the amount."
    },
    {
        slug: "how-to-negotiate-using-market-standards",
        hindi_phrase: "Market mein is role ki zyada salary hai",
        intent_category: "Salary & Appraisal",
        pro_option_1: "Based on my research, similar roles in the industry are offering [X-Y]% higher compensation. I would like to discuss aligning my package with market standards.",
        pro_option_2: "I've noticed the market rate for this role is higher. Can we discuss adjusting my compensation?",
        cultural_context: "Come prepared with data. Don't just say 'others are paying more.' Show specific benchmarks and your value."
    },
    {
        slug: "how-to-address-negative-feedback",
        hindi_phrase: "Mera feedback positive nahi hai",
        intent_category: "Salary & Appraisal",
        pro_option_1: "I understand there are areas where I need to improve. Could you provide specific examples so I can create an action plan to address them?",
        pro_option_2: "I'd like to understand the feedback better. Can you share specific instances?",
        cultural_context: "Don't be defensive. Ask for specifics, show willingness to improve, and request clear action items."
    },
    {
        slug: "how-to-question-performance-rating",
        hindi_phrase: "Mujhe 'Meet Expectations' kyu mila?",
        intent_category: "Salary & Appraisal",
        pro_option_1: "I would appreciate understanding the evaluation criteria better. Could you help me identify what I need to do to achieve an 'Exceeds Expectations' rating?",
        pro_option_2: "I'd like to know what I can improve to get a better rating next time.",
        cultural_context: "Focus on understanding the gap and future improvement, not challenging the current rating defensively."
    },
    {
        slug: "how-to-request-raise-after-upskilling",
        hindi_phrase: "Maine naye skills seekhe hain, pay badhao",
        intent_category: "Salary & Appraisal",
        pro_option_1: "I have recently acquired certifications in [skill] and have been applying them to deliver [specific results]. I would like to discuss a compensation review reflecting my expanded skill set.",
        pro_option_2: "I've upskilled in [area] and am now handling more complex tasks. Can we talk about adjusting my pay?",
        cultural_context: "Connect new skills to business impact. Show ROI on your learning through measurable contributions."
    },
    // Resignation & Exit
    {
        slug: "how-to-submit-resignation-professionally",
        hindi_phrase: "Main resign karna chahta hoon",
        intent_category: "Resignation & Exit",
        pro_option_1: "I am writing to formally submit my resignation from my position as [title], effective [date]. I will ensure a smooth transition of my responsibilities.",
        pro_option_2: "I'd like to resign from my role. My last working day will be [date].",
        cultural_context: "Be formal in writing. State your intention clearly, provide effective date, and offer to help with transition."
    },
    {
        slug: "how-to-request-relieving-letter",
        hindi_phrase: "Mujhe mera relieving letter chahiye",
        intent_category: "Resignation & Exit",
        pro_option_1: "Could you please provide my relieving letter and experience certificate at the earliest? I need them for my new employment.",
        pro_option_2: "I need my relieving letter and experience certificate. When can I expect them?",
        cultural_context: "Be polite but clear about the urgency. Mention if you need it for joining formalities."
    },
    {
        slug: "how-to-follow-up-on-full-and-final-settlement",
        hindi_phrase: "Mera full and final kab tak hoga?",
        intent_category: "Resignation & Exit",
        pro_option_1: "Could you please provide an update on my full and final settlement? I would appreciate a breakdown of the pending dues and the expected timeline.",
        pro_option_2: "When will my F&F be processed? Can I get a timeline?",
        cultural_context: "Companies typically take 45-60 days. Ask politely for a timeline and what's included in the settlement."
    },
    {
        slug: "how-to-request-notice-period-buyout",
        hindi_phrase: "Main notice period buyout karna chahta hoon",
        intent_category: "Resignation & Exit",
        pro_option_1: "Due to urgent commitments with my new employer, I would like to explore the option of buying out my notice period. Please let me know the process and amount.",
        pro_option_2: "I need to leave earlier. Can I buy out my notice period? What's the cost?",
        cultural_context: "Be prepared to pay 1-2 months' salary. Explain the urgency professionally without sounding desperate."
    },
    {
        slug: "how-to-explain-leaving-for-better-opportunity",
        hindi_phrase: "Mujhe doosri achhi opportunity mili hai",
        intent_category: "Resignation & Exit",
        pro_option_1: "I have received an opportunity that aligns better with my long-term career goals and offers new challenges that I believe will accelerate my professional growth.",
        pro_option_2: "I got an offer that's better aligned with my career plans.",
        cultural_context: "Keep it positive. Don't overshare details about the new role. Focus on growth and alignment with goals."
    },
    // Client & Stakeholder Management
    {
        slug: "how-to-confirm-alignment-with-client",
        hindi_phrase: "Kya hum dono same cheez samajh rahe hain?",
        intent_category: "Client Management",
        pro_option_1: "Just to ensure we're on the same page, let me summarize our discussion: [summary]. Please confirm if my understanding is correct.",
        pro_option_2: "Let me confirm – are we aligned on [key points]?",
        cultural_context: "Summarize and ask for confirmation. This shows professionalism and prevents miscommunication."
    },
    {
        slug: "how-to-promise-follow-up-after-research",
        hindi_phrase: "Main ispe thoda research karke batata hoon",
        intent_category: "Client Management",
        pro_option_1: "That's a great question. Let me research this further and circle back to you with detailed insights by [timeframe].",
        pro_option_2: "Let me look into this and get back to you by EOD.",
        cultural_context: "'Circle back' is professional. Always give a timeline so the client knows when to expect a response."
    },
    {
        slug: "how-to-decline-additional-work-politely",
        hindi_phrase: "Mere paas abhi aur kaam lene ka time nahi hai",
        intent_category: "Client Management",
        pro_option_1: "I appreciate you thinking of me for this. However, I'm currently at full bandwidth with [current projects]. I can take this up starting [date], or we can explore redistributing priorities.",
        pro_option_2: "I'm swamped right now. Can we push this to next week, or should someone else handle it?",
        cultural_context: "Don't just say no. Explain your current load, offer alternatives, and show willingness to help when possible."
    },
    {
        slug: "how-to-commit-to-eod-delivery",
        hindi_phrase: "Main aaj din khatam hone tak bhej dunga",
        intent_category: "Client Management",
        pro_option_1: "I will have this ready and shared with you by end of day today.",
        pro_option_2: "I'll send it over by EOD.",
        cultural_context: "'By EOD' or 'by end of day' is standard. Be specific about the timezone if you're working with global teams."
    },
    {
        slug: "how-to-request-meeting-professionally",
        hindi_phrase: "Ek meeting rakhte hain ispe baat karne ke liye",
        intent_category: "Client Management",
        pro_option_1: "I believe a brief meeting would help us align on this matter. Would you be available for a 30-minute discussion this week?",
        pro_option_2: "Can we set up a quick call to discuss this?",
        cultural_context: "Specify duration and propose time options. Respect their calendar by asking for availability first."
    },
    // Office Politics & Boundaries
    {
        slug: "how-to-express-work-overload",
        hindi_phrase: "Mere paas bohot zyada kaam hai",
        intent_category: "Work-Life Balance",
        pro_option_1: "I'm currently managing multiple high-priority tasks. Could we discuss reprioritizing my workload to ensure quality delivery?",
        pro_option_2: "I'm quite loaded right now. Can we review my task list and prioritize?",
        cultural_context: "Don't just complain. Quantify your workload and propose solutions like prioritization or deadline extension."
    },
    {
        slug: "how-to-address-credit-not-given",
        hindi_phrase: "Ye idea mera tha but boss ne credit le liya",
        intent_category: "Work-Life Balance",
        pro_option_1: "In the last meeting, the [idea/solution] that was discussed was something I had proposed in [context]. I wanted to ensure this is documented for future reference.",
        pro_option_2: "Just wanted to clarify – the idea we discussed was originally mine from [when].",
        cultural_context: "Politely reclaim credit with evidence. Do it privately first. If ignored, document in writing (email)."
    },
    {
        slug: "how-to-address-rude-colleague",
        hindi_phrase: "Wo bohot badtameezi se baat karta hai",
        intent_category: "Work-Life Balance",
        pro_option_1: "I've noticed some communication challenges in our recent interactions. I'd appreciate if we could maintain a more collaborative and respectful tone going forward.",
        pro_option_2: "I feel our recent conversations have been a bit tense. Can we start fresh?",
        cultural_context: "Address behavior, not the person. Use 'I feel' statements. If it continues, escalate to HR with documented examples."
    },
    {
        slug: "how-to-address-micromanagement",
        hindi_phrase: "Boss bohot zyada interfere kar rahe hain",
        intent_category: "Work-Life Balance",
        pro_option_1: "I value your guidance, but I believe I could deliver better results with more autonomy on [specific tasks]. Could we establish clear checkpoints instead of frequent updates?",
        pro_option_2: "I work best with some independence. Can we set up weekly check-ins instead of daily ones?",
        cultural_context: "Frame it as a productivity improvement, not a complaint. Propose structured check-ins to build trust."
    },
    {
        slug: "how-to-address-frequent-late-hours",
        hindi_phrase: "Main roz der tak rukta hoon",
        intent_category: "Work-Life Balance",
        pro_option_1: "I've been working beyond regular hours consistently to meet project deadlines. I'd like to discuss workload management or resource allocation to maintain sustainable productivity.",
        pro_option_2: "I've been staying late a lot. Can we talk about balancing the workload?",
        cultural_context: "Don't brag about overwork. Present it as a sustainability issue and propose solutions like better planning or hiring support."
    },
    // Email Writing & Communication (30 phrases)
    {
        slug: "how-to-write-email-to-boss",
        hindi_phrase: "Boss ko email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "Dear [Name], I am writing to [purpose]. [Details]. Please let me know your thoughts. Best regards, [Your Name]",
        pro_option_2: "Hi [Name], Quick note on [topic]. [Brief details]. Let me know if you need anything else!",
        cultural_context: "Use formal salutations for first-time emails. Maintain professional tone while being concise."
    },
    {
        slug: "how-to-write-follow-up-email",
        hindi_phrase: "Follow-up email kaise bhejun?",
        intent_category: "Email Writing",
        pro_option_1: "I wanted to follow up on my previous email sent on [date] regarding [topic]. I would appreciate your feedback at your earliest convenience.",
        pro_option_2: "Just checking in on my last email about [topic]. Any updates?",
        cultural_context: "Wait at least 2-3 days before following up. Be polite and reference the original email."
    },
    {
        slug: "how-to-cc-someone-in-email",
        hindi_phrase: "Email mein CC kaise karun?",
        intent_category: "Email Writing",
        pro_option_1: "I'm copying [Name] on this email to keep them in the loop on our discussion regarding [topic].",
        pro_option_2: "Looping in [Name] for visibility.",
        cultural_context: "Always mention why you're CCing someone. Use 'looping in' for informal, 'copying' for formal."
    },
    {
        slug: "how-to-request-feedback-via-email",
        hindi_phrase: "Email mein feedback kaise maangun?",
        intent_category: "Email Writing",
        pro_option_1: "I would greatly appreciate your feedback on [document/project] at your earliest convenience. Specifically, I'm looking for input on [areas].",
        pro_option_2: "Could you review [item] and share your thoughts? Mainly interested in feedback on [specific aspect].",
        cultural_context: "Be specific about what feedback you need. Give a deadline if urgent."
    },
    {
        slug: "how-to-write-apology-email-for-delay",
        hindi_phrase: "Delay ke liye sorry email likhen",
        intent_category: "Email Writing",
        pro_option_1: "I sincerely apologize for the delay in delivering [item]. Due to [reason], I needed additional time. I will have this completed by [new date].",
        pro_option_2: "Sorry for the delay on [task]. Had some challenges with [reason]. Will have it ready by [date].",
        cultural_context: "Acknowledge the delay, explain briefly, and commit to a new deadline."
    },
    {
        slug: "how-to-write-email-requesting-meeting",
        hindi_phrase: "Meeting request email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "I would like to schedule a meeting to discuss [topic]. Would you be available for a [duration] call this week? Please let me know your preferred time.",
        pro_option_2: "Can we schedule a quick call to discuss [topic]? Let me know when you're free this week.",
        cultural_context: "State the purpose clearly. Propose time options or ask for their availability."
    },
    {
        slug: "how-to-decline-request-politely-via-email",
        hindi_phrase: "Email mein politely kaise mana karun?",
        intent_category: "Email Writing",
        pro_option_1: "Thank you for thinking of me for this. Unfortunately, I won't be able to take this on due to my current commitments. I'd be happy to revisit this in [timeframe].",
        pro_option_2: "I appreciate the opportunity, but I'm at capacity right now. Can we touch base on this next month?",
        cultural_context: "Thank them first, decline politely, offer an alternative if possible."
    },
    {
        slug: "how-to-write-thank-you-email-after-interview",
        hindi_phrase: "Interview ke baad thank you email",
        intent_category: "Email Writing",
        pro_option_1: "Thank you for taking the time to interview me for the [position] role. I enjoyed learning about [company/project] and I'm excited about the opportunity to contribute.",
        pro_option_2: "Thanks for the interview today! Really enjoyed our discussion about [topic]. Looking forward to hearing from you.",
        cultural_context: "Send within 24 hours. Reference something specific from the interview."
    },
    {
        slug: "how-to-write-out-of-office-email",
        hindi_phrase: "Out of office email kaise set karun?",
        intent_category: "Email Writing",
        pro_option_1: "I am currently out of office from [start date] to [end date] with limited access to email. For urgent matters, please contact [backup person] at [email].",
        pro_option_2: "Out of office until [date]. For urgent issues, reach out to [backup name].",
        cultural_context: "Mention return date, alternative contact, and set expectations about response time."
    },
    {
        slug: "how-to-write-email-to-hr",
        hindi_phrase: "HR ko email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "Dear HR Team, I am writing to inquire about [topic - payroll/benefits/policy]. Could you please provide clarification on [specific question]?",
        pro_option_2: "Hi HR, I have a question about [topic]. Can you help me understand [specific issue]?",
        cultural_context: "Be clear and specific about your query. Attach relevant documents if needed."
    },
    {
        slug: "how-to-write-email-with-attachment",
        hindi_phrase: "Attachment ke saath email kaise bhejun?",
        intent_category: "Email Writing",
        pro_option_1: "Please find attached [document name] for your review. The document contains [brief description]. Let me know if you have any questions.",
        pro_option_2: "Attached is [document]. Let me know if you need any changes!",
        cultural_context: "Always mention what's attached. Use 'Please find attached' for formal emails."
    },
    {
        slug: "how-to-write-urgent-email",
        hindi_phrase: "Urgent email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "URGENT: [Subject]. I need your immediate attention on [matter] as [reason]. Could you please respond by [time/date]?",
        pro_option_2: "Urgent - need your help with [issue] ASAP. Can you respond by [time]?",
        cultural_context: "Use URGENT sparingly. Explain why it's urgent and give a clear deadline."
    },
    {
        slug: "how-to-introduce-yourself-in-email",
        hindi_phrase: "Email mein apna introduction kaise dun?",
        intent_category: "Email Writing",
        pro_option_1: "My name is [Name], and I am the [title] at [company]. I am reaching out to discuss [purpose].",
        pro_option_2: "Hi, I'm [Name] from [company/team]. I wanted to connect about [topic].",
        cultural_context: "Keep it brief. State your role and purpose in the first 1-2 sentences."
    },
    {
        slug: "how-to-close-professional-email",
        hindi_phrase: "Email kaise khatam karun professionally?",
        intent_category: "Email Writing",
        pro_option_1: "Thank you for your time and consideration. I look forward to hearing from you. Best regards, [Name]",
        pro_option_2: "Thanks! Let me know if you need anything. Cheers, [Name]",
        cultural_context: "Match the closing to the tone. 'Best regards' is safest. 'Cheers' is casual."
    },
    {
        slug: "how-to-write-email-requesting-leave-approval",
        hindi_phrase: "Leave approval email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "I would like to request leave from [start date] to [end date] for [reason]. I have ensured coverage for my responsibilities during this period.",
        pro_option_2: "Requesting leave from [dates] for [reason]. [Colleague] will cover for me.",
        cultural_context: "Give dates, reason (if comfortable), and mention handover plan."
    },
    {
        slug: "how-to-write-email-asking-for-clarification",
        hindi_phrase: "Clarification maangne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "Could you please provide additional clarification on [specific point]? I want to ensure I understand [aspect] correctly before proceeding.",
        pro_option_2: "Can you clarify [point]? Want to make sure I'm on the right track.",
        cultural_context: "Be specific about what's unclear. Show you've tried to understand first."
    },
    {
        slug: "how-to-write-email-with-multiple-requests",
        hindi_phrase: "Ek email mein multiple requests kaise karun?",
        intent_category: "Email Writing",
        pro_option_1: "I have a few items that need your attention: 1) [Request 1] 2) [Request 2] 3) [Request 3]. Please let me know the timeline for each.",
        pro_option_2: "Quick asks: 1) [Item 1] 2) [Item 2]. Let me know when you can get to these!",
        cultural_context: "Use numbered lists for clarity. Prioritize if some are more urgent."
    },
    {
        slug: "how-to-write-email-to-colleague",
        hindi_phrase: "Colleague ko email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "Hi [Name], I wanted to touch base on [project/topic]. Could we align on [specific aspect]?",
        pro_option_2: "Hey [Name], quick question about [topic]. Got a minute?",
        cultural_context: "Tone can be friendlier with peers, but keep it professional in writing."
    },
    {
        slug: "how-to-write-email-announcing-resignation",
        hindi_phrase: "Resignation announce karne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "I am writing to formally announce my resignation from [position], effective [date]. I am grateful for the opportunities and look forward to ensuring a smooth transition.",
        pro_option_2: "I'm resigning from my role, last day being [date]. Happy to help with the handover!",
        cultural_context: "Send to your manager first, then team. Keep it positive and professional."
    },
    {
        slug: "how-to-write-congratulations-email",
        hindi_phrase: "Congratulations email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "Congratulations on [achievement/promotion]! This is well-deserved, and I'm excited to see your continued success.",
        pro_option_2: "Congrats on [achievement]! Well deserved!",
        cultural_context: "Be genuine and specific. Mention what they achieved."
    },
    {
        slug: "how-to-write-email-requesting-information",
        hindi_phrase: "Information request email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "Could you please provide information regarding [topic]? Specifically, I need details on [aspect] by [date].",
        pro_option_2: "Need some info on [topic]. Can you share details about [specific aspect]?",
        cultural_context: "Be specific about what information you need and when you need it."
    },
    {
        slug: "how-to-write-email-to-multiple-recipients",
        hindi_phrase: "Multiple logo ko ek saath email kaise bhejun?",
        intent_category: "Email Writing",
        pro_option_1: "Dear Team, I am writing to update everyone on [topic]. [Key points]. Please feel free to reach out with questions.",
        pro_option_2: "Hi all, Quick update on [topic]: [details]. Let me know if questions!",
        cultural_context: "Use 'Dear Team' or 'Hi all' for groups. Keep it concise since multiple people will read."
    },
    {
        slug: "how-to-write-email-with-deadline",
        hindi_phrase: "Deadline ke saath email kaise likhun?",
        intent_category: "Email Writing",
        pro_option_1: "I need [deliverable] by [date] to ensure we meet the project timeline. Please confirm if this is feasible.",
        pro_option_2: "Can you get [item] to me by [date]? Need it for [reason].",
        cultural_context: "State the deadline clearly and explain why it's important."
    },
    {
        slug: "how-to-write-email-asking-for-extension",
        hindi_phrase: "Extension maangne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "I would like to request an extension on [task/project] until [new date] due to [valid reason]. I apologize for any inconvenience.",
        pro_option_2: "Can I get an extension on [task] until [date]? Running into [issue].",
        cultural_context: "Ask early, explain the reason, and propose a realistic new date."
    },
    {
        slug: "how-to-write-email-acknowledging-receipt",
        hindi_phrase: "Email receive hone ka acknowledgment kaise dun?",
        intent_category: "Email Writing",
        pro_option_1: "Thank you for your email. I have received [document/information] and will review it by [date].",
        pro_option_2: "Got it, thanks! Will review and get back to you by [date].",
        cultural_context: "Acknowledge receipt promptly, especially for important documents."
    },
    {
        slug: "how-to-write-email-with-suggestions",
        hindi_phrase: "Suggestions dene ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "I would like to propose the following suggestions for [project/process]: [List]. I believe these could improve [outcome].",
        pro_option_2: "Have some ideas for [topic]: [suggestions]. Thoughts?",
        cultural_context: "Frame suggestions positively. Focus on benefits, not criticisms."
    },
    {
        slug: "how-to-write-email-reporting-issue",
        hindi_phrase: "Issue report karne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "I wanted to bring to your attention an issue with [system/process]: [description]. This is impacting [consequence]. Can we prioritize a fix?",
        pro_option_2: "Facing an issue with [thing]: [problem]. Can someone look into this?",
        cultural_context: "Describe the issue clearly, state impact, and suggest urgency level."
    },
    {
        slug: "how-to-write-email-accepting-offer",
        hindi_phrase: "Job offer accept karne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "I am delighted to accept the offer for the position of [title] at [company]. I look forward to joining on [date] and contributing to the team.",
        pro_option_2: "I'm happy to accept the [position] offer! Excited to start on [date].",
        cultural_context: "Express enthusiasm, confirm key details (position, start date, salary if discussed)."
    },
    {
        slug: "how-to-write-email-declining-offer",
        hindi_phrase: "Job offer decline karne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "Thank you for the offer for the [position] role. After careful consideration, I have decided to decline as [brief reason]. I appreciate the opportunity.",
        pro_option_2: "Thanks for the offer, but I've decided to decline. Appreciate the opportunity!",
        cultural_context: "Be gracious, brief reason optional. Don't burn bridges."
    },
    {
        slug: "how-to-write-email-requesting-recommendation",
        hindi_phrase: "Recommendation letter maangne ke liye email",
        intent_category: "Email Writing",
        pro_option_1: "I am applying for [position/program] and would be honored if you could provide a letter of recommendation highlighting my work in [area].",
        pro_option_2: "Would you be willing to write me a recommendation letter for [opportunity]?",
        cultural_context: "Ask politely, give context about what you're applying for, and provide deadline."
    },
    // Daily Office Communication (25 phrases)
    {
        slug: "how-to-say-i-will-check-and-get-back",
        hindi_phrase: "Main check karke batata hoon",
        intent_category: "Daily Communication",
        pro_option_1: "Let me verify this and get back to you by end of day.",
        pro_option_2: "I'll check and circle back to you shortly.",
        cultural_context: "Always give a timeframe. 'Circle back' is common corporate jargon."
    },
    {
        slug: "how-to-say-lets-discuss-this-offline",
        hindi_phrase: "Isko offline discuss karte hain",
        intent_category: "Daily Communication",
        pro_option_1: "This might require a more detailed discussion. Can we take this offline?",
        pro_option_2: "Let's discuss this separately, offline.",
        cultural_context: "'Offline' means outside the current meeting/chat. Shows respect for others' time."
    },
    {
        slug: "how-to-say-i-am-working-on-it",
        hindi_phrase: "Main iss par kaam kar raha hoon",
        intent_category: "Daily Communication",
        pro_option_1: "I am currently working on this and expect to complete it by [timeframe].",
        pro_option_2: "Working on it, should have it done by [time].",
        cultural_context: "Always add expected completion time to manage expectations."
    },
    {
        slug: "how-to-say-i-need-some-time",
        hindi_phrase: "Mujhe thoda time chahiye",
        intent_category: "Daily Communication",
        pro_option_1: "I need some additional time to review this thoroughly. Can I get back to you by [date/time]?",
        pro_option_2: "Need a bit more time on this. Can we reconnect [when]?",
        cultural_context: "Specify how much time and why. Shows you're being thoughtful, not lazy."
    },
    {
        slug: "how-to-say-i-will-look-into-it",
        hindi_phrase: "Main isko dekhta hoon",
        intent_category: "Daily Communication",
        pro_option_1: "I will look into this matter and provide an update by [timeframe].",
        pro_option_2: "Let me look into this and get back to you.",
        cultural_context: "Commit to a follow-up timeline so they know when to expect an update."
    },
    {
        slug: "how-to-say-noted-with-thanks",
        hindi_phrase: "Noted, thank you",
        intent_category: "Daily Communication",
        pro_option_1: "Noted with thanks. I will proceed accordingly.",
        pro_option_2: "Got it, thanks!",
        cultural_context: "'Noted with thanks' is formal. 'Got it' is casual but acceptable among peers."
    },
    {
        slug: "how-to-say-please-advise",
        hindi_phrase: "Aap bataiye kya karun?",
        intent_category: "Daily Communication",
        pro_option_1: "Could you please advise on the best approach for [situation]?",
        pro_option_2: "What do you suggest we do here?",
        cultural_context: "'Please advise' is professional. Use it when you need guidance."
    },
    {
        slug: "how-to-say-as-discussed",
        hindi_phrase: "Jaise humne discuss kiya tha",
        intent_category: "Daily Communication",
        pro_option_1: "As discussed in our meeting, I will proceed with [action].",
        pro_option_2: "As we talked about, I'll [action].",
        cultural_context: "References previous conversation. Good for email follow-ups after meetings."
    },
    {
        slug: "how-to-say-for-your-reference",
        hindi_phrase: "Aapke reference ke liye",
        intent_category: "Daily Communication",
        pro_option_1: "For your reference, I've attached the document we discussed.",
        pro_option_2: "FYI - attached is the doc we mentioned.",
        cultural_context: "'FYI' (For Your Information) is casual. Use full form in formal emails."
    },
    {
        slug: "how-to-say-please-revert",
        hindi_phrase: "Please reply kijiye",
        intent_category: "Daily Communication",
        pro_option_1: "Please revert at your earliest convenience.",
        pro_option_2: "Let me know when you can.",
        cultural_context: "'Revert' means 'reply' in Indian English. 'Get back to me' is more universal."
    },
    {
        slug: "how-to-say-kindly-do-the-needful",
        hindi_phrase: "Kripya needful karein",
        intent_category: "Daily Communication",
        pro_option_1: "Could you please take the necessary action on this?",
        pro_option_2: "Can you handle this?",
        cultural_context: "'Do the needful' is Indian English. Globally, say 'take necessary action' or be specific."
    },
    {
        slug: "how-to-say-as-per-our-conversation",
        hindi_phrase: "Jaise humne baat ki thi",
        intent_category: "Daily Communication",
        pro_option_1: "As per our conversation on [date], here are the next steps.",
        pro_option_2: "Following up on what we discussed - here's the plan.",
        cultural_context: "Good for email documentation. References the conversation for context."
    },
    {
        slug: "how-to-say-i-am-copying-my-manager",
        hindi_phrase: "Main apne manager ko bhi add kar raha hoon",
        intent_category: "Daily Communication",
        pro_option_1: "I am copying my manager [Name] for visibility on this matter.",
        pro_option_2: "Looping in my manager for awareness.",
        cultural_context: "Always explain why you're CCing someone, especially your manager."
    },
    {
        slug: "how-to-say-awaiting-your-response",
        hindi_phrase: "Aapke response ka intezaar hai",
        intent_category: "Daily Communication",
        pro_option_1: "I am awaiting your response to proceed with the next steps.",
        pro_option_2: "Waiting to hear from you before I move forward.",
        cultural_context: "Polite way to nudge for a reply without sounding pushy."
    },
    {
        slug: "how-to-say-please-prioritize-this",
        hindi_phrase: "Isko priority dijiye",
        intent_category: "Daily Communication",
        pro_option_1: "Could you please prioritize this task as it's blocking other deliverables?",
        pro_option_2: "Can you prioritize this? It's urgent.",
        cultural_context: "Explain why it needs priority. Show impact on other work."
    },
    {
        slug: "how-to-say-moving-you-to-bcc",
        hindi_phrase: "Aapko BCC mein move kar raha hoon",
        intent_category: "Daily Communication",
        pro_option_1: "Moving you to BCC to reduce email clutter, but keeping you informed.",
        pro_option_2: "BCCing you to keep you in the loop without flooding your inbox.",
        cultural_context: "BCC is for people who need to know but don't need to respond."
    },
    {
        slug: "how-to-say-thanks-for-quick-response",
        hindi_phrase: "Jaldi reply karne ke liye dhanyavaad",
        intent_category: "Daily Communication",
        pro_option_1: "Thank you for your prompt response. I appreciate your quick turnaround.",
        pro_option_2: "Thanks for getting back so quickly!",
        cultural_context: "Acknowledge fast responses. Encourages continued responsiveness."
    },
    {
        slug: "how-to-say-i-will-keep-you-posted",
        hindi_phrase: "Main aapko update deta rahunga",
        intent_category: "Daily Communication",
        pro_option_1: "I will keep you posted on any developments.",
        pro_option_2: "I'll keep you in the loop.",
        cultural_context: "Promises ongoing updates. Good for long-running tasks."
    },
    {
        slug: "how-to-say-at-your-earliest-convenience",
        hindi_phrase: "Jab aapko samay mile",
        intent_category: "Daily Communication",
        pro_option_1: "Please review this at your earliest convenience.",
        pro_option_2: "When you get a chance, please review this.",
        cultural_context: "Polite way to request action without being pushy about timing."
    },
    {
        slug: "how-to-say-this-is-time-sensitive",
        hindi_phrase: "Yeh time-sensitive hai",
        intent_category: "Daily Communication",
        pro_option_1: "This is time-sensitive and requires your attention by [date/time].",
        pro_option_2: "This is urgent - need your input by [time].",
        cultural_context: "Use sparingly. Explain why it's time-sensitive."
    },
    {
        slug: "how-to-say-i-am-out-sick-today",
        hindi_phrase: "Aaj main beemar hoon",
        intent_category: "Daily Communication",
        pro_option_1: "I am unwell today and will be taking sick leave. I will catch up on pending items tomorrow.",
        pro_option_2: "Not feeling well today, taking sick leave. Back tomorrow!",
        cultural_context: "Brief is fine. No need to over-explain your illness."
    },
    {
        slug: "how-to-say-i-will-be-late-today",
        hindi_phrase: "Aaj main late aaunga",
        intent_category: "Daily Communication",
        pro_option_1: "I will be arriving late today due to [brief reason]. I expect to be in by [time].",
        pro_option_2: "Running late today, will be in by [time].",
        cultural_context: "Inform as early as possible. Give expected arrival time."
    },
    {
        slug: "how-to-say-i-am-on-leave-tomorrow",
        hindi_phrase: "Main kal leave par hoon",
        intent_category: "Daily Communication",
        pro_option_1: "I will be on leave tomorrow, [date]. For any urgent matters, please contact [backup].",
        pro_option_2: "Taking leave tomorrow. [Name] will cover for me.",
        cultural_context: "Announce in advance, mention backup contact."
    },
    {
        slug: "how-to-say-please-find-attached",
        hindi_phrase: "Attachment dekh lijiye",
        intent_category: "Daily Communication",
        pro_option_1: "Please find attached the requested document.",
        pro_option_2: "Attached is the file you asked for.",
        cultural_context: "'Please find attached' is formal. 'Attached' alone is fine for casual emails."
    },
    {
        slug: "how-to-say-hope-this-helps",
        hindi_phrase: "Umeed hai yeh help karega",
        intent_category: "Daily Communication",
        pro_option_1: "I hope this information helps. Please let me know if you need further clarification.",
        pro_option_2: "Hope this helps! Let me know if you need more info.",
        cultural_context: "Good closing when providing information or solutions."
    },
    // Apologies & Excuses (15 phrases)
    {
        slug: "how-to-apologize-for-missing-deadline",
        hindi_phrase: "Deadline miss hone par sorry kaise kahun?",
        intent_category: "Apologies",
        pro_option_1: "I sincerely apologize for missing the deadline for [task]. Due to [valid reason], I needed more time. The deliverable will be ready by [new date].",
        pro_option_2: "Sorry for missing the deadline. Had [issue]. Will have it done by [date].",
        cultural_context: "Acknowledge the miss, briefly explain, commit to new date."
    },
    {
        slug: "how-to-apologize-for-mistake",
        hindi_phrase: "Galti ke liye maafi kaise maangun?",
        intent_category: "Apologies",
        pro_option_1: "I apologize for the error in [document/process]. I have corrected it and implemented measures to prevent recurrence.",
        pro_option_2: "My bad on [mistake]. I've fixed it now.",
        cultural_context: "Own the mistake, show you've fixed it, mention prevention steps."
    },
    {
        slug: "how-to-apologize-for-confusion",
        hindi_phrase: "Confusion create karne ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for any confusion my previous email may have caused. To clarify: [correct information].",
        pro_option_2: "Sorry for the confusion. Let me clarify: [details].",
        cultural_context: "Acknowledge confusion, immediately provide correct info."
    },
    {
        slug: "how-to-apologize-for-late-reply",
        hindi_phrase: "Late reply ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for my delayed response. I was tied up with [reason]. Regarding your query: [response].",
        pro_option_2: "Sorry for the late reply! Here's the info you needed: [details].",
        cultural_context: "Acknowledge delay briefly, then focus on answering their question."
    },
    {
        slug: "how-to-apologize-for-inconvenience",
        hindi_phrase: "Inconvenience ke liye maafi",
        intent_category: "Apologies",
        pro_option_1: "I apologize for any inconvenience this may have caused. We are working to resolve [issue] by [timeline].",
        pro_option_2: "Sorry for the hassle. We're fixing [issue] ASAP.",
        cultural_context: "Standard corporate apology. Follow with solution or timeline."
    },
    {
        slug: "how-to-apologize-for-oversight",
        hindi_phrase: "Oversight ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for the oversight. I should have included [missed item] in my previous communication. Here it is now.",
        pro_option_2: "My apologies for missing [item]. Here's the updated info.",
        cultural_context: "Own the oversight, provide what was missing immediately."
    },
    {
        slug: "how-to-apologize-for-canceling-meeting",
        hindi_phrase: "Meeting cancel karne par sorry",
        intent_category: "Apologies",
        pro_option_1: "I sincerely apologize for the short notice in canceling our meeting. Due to [reason], I need to reschedule. Would [alternative time] work for you?",
        pro_option_2: "Sorry to cancel last minute. Can we reschedule for [time]?",
        cultural_context: "Apologize, explain briefly, immediately propose alternative."
    },
    {
        slug: "how-to-apologize-for-miscommunication",
        hindi_phrase: "Miscommunication ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for the miscommunication. What I meant to convey was [correct message]. I'll ensure clearer communication going forward.",
        pro_option_2: "Sorry for the mix-up. What I actually meant was [clarification].",
        cultural_context: "Clarify the correct message immediately after apologizing."
    },
    {
        slug: "how-to-apologize-for-technical-issue",
        hindi_phrase: "Technical issue ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for the technical difficulties during [meeting/presentation]. The issue has been resolved, and I'm happy to reconvene if needed.",
        pro_option_2: "Sorry about the tech issues. Everything's working now - want to reconnect?",
        cultural_context: "Acknowledge the issue, confirm it's fixed, offer to continue."
    },
    {
        slug: "how-to-apologize-for-interrupting",
        hindi_phrase: "Interrupt karne ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for interrupting. Please continue with your point.",
        pro_option_2: "Sorry, didn't mean to interrupt. Go ahead!",
        cultural_context: "Quick apology, give them the floor back immediately."
    },
    {
        slug: "how-to-apologize-for-being-unprepared",
        hindi_phrase: "Unprepared aane ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for not being as prepared as I should have been for this discussion. Let me gather the necessary information and follow up by [time].",
        pro_option_2: "Sorry, I'm not fully prepared. Can I get back to you with details by [time]?",
        cultural_context: "Admit it, commit to coming back prepared with a timeline."
    },
    {
        slug: "how-to-apologize-for-misunderstanding",
        hindi_phrase: "Misunderstanding ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for the misunderstanding. I now understand that [correct understanding]. I'll proceed accordingly.",
        pro_option_2: "Sorry for the confusion. I get it now - [clarification].",
        cultural_context: "Show you now understand correctly, commit to correct action."
    },
    {
        slug: "how-to-apologize-for-tone",
        hindi_phrase: "Galat tone ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize if my previous message came across as [harsh/dismissive]. That was not my intention. I value our collaboration.",
        pro_option_2: "Sorry if I sounded [rude/short]. Didn't mean it that way!",
        cultural_context: "Acknowledge how it may have come across, reaffirm respect."
    },
    {
        slug: "how-to-apologize-on-behalf-of-team",
        hindi_phrase: "Team ki taraf se sorry",
        intent_category: "Apologies",
        pro_option_1: "On behalf of the team, I apologize for [issue]. We are taking steps to rectify this and prevent future occurrences.",
        pro_option_2: "Sorry from our team for [issue]. We're fixing this now.",
        cultural_context: "Take ownership as team representative, outline corrective action."
    },
    {
        slug: "how-to-apologize-for-bothering-someone",
        hindi_phrase: "Disturb karne ke liye sorry",
        intent_category: "Apologies",
        pro_option_1: "I apologize for reaching out on short notice, but I need your input on [urgent matter].",
        pro_option_2: "Sorry to bother you, but need quick help with [issue].",
        cultural_context: "Acknowledge the interruption, quickly state the urgent need."
    },
    // Requests & Permissions (20 phrases)
    {
        slug: "how-to-request-time-off",
        hindi_phrase: "Time off kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to request time off from [start] to [end] for [reason]. I will ensure all my responsibilities are covered.",
        pro_option_2: "Requesting time off [dates] for [reason]. Will coordinate handover.",
        cultural_context: "Give advance notice, mention coverage plan."
    },
    {
        slug: "how-to-request-work-from-home",
        hindi_phrase: "Work from home request kaise karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to work from home on [date] due to [reason]. I will remain fully available during business hours.",
        pro_option_2: "Can I WFH on [date]? [Brief reason]. Will be online as usual.",
        cultural_context: "State date, brief reason, confirm availability."
    },
    {
        slug: "how-to-request-flexible-hours",
        hindi_phrase: "Flexible hours kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to discuss the possibility of flexible working hours to accommodate [reason]. I can shift my schedule to [proposed hours].",
        pro_option_2: "Can we discuss flexible hours? Thinking [time range] would work better for me.",
        cultural_context: "Propose specific alternative, show how work won't be impacted."
    },
    {
        slug: "how-to-request-training",
        hindi_phrase: "Training request kaise karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to request approval to attend [training/course] on [topic]. This will help me [benefit to role/company].",
        pro_option_2: "Can I sign up for [training]? It covers [skill] which would help with [project].",
        cultural_context: "Link training to job benefit or company goals."
    },
    {
        slug: "how-to-request-resources",
        hindi_phrase: "Resources kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to request [resource - software/equipment] to improve productivity on [project/task].",
        pro_option_2: "Need [resource] for [project]. Would really help with [specific task].",
        cultural_context: "Justify the request with clear benefit or necessity."
    },
    {
        slug: "how-to-request-budget-approval",
        hindi_phrase: "Budget approval kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I am requesting budget approval of [amount] for [purpose]. This investment will result in [ROI/benefit].",
        pro_option_2: "Need approval for [amount] to spend on [item]. Will give us [benefit].",
        cultural_context: "State amount clearly, justify with expected return/benefit."
    },
    {
        slug: "how-to-request-early-leaving",
        hindi_phrase: "Jaldi jaane ki permission kaise maangun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I need to leave early today at [time] due to [reason]. I will complete my pending tasks before leaving.",
        pro_option_2: "Need to head out early today around [time] for [reason]. Will finish my work first.",
        cultural_context: "Give notice as early as possible, confirm work completion."
    },
    {
        slug: "how-to-request-additional-help",
        hindi_phrase: "Madad kaise maangun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would appreciate additional support on [project] as the workload has increased. Could we bring in [resource/person]?",
        pro_option_2: "Could use some help on [project]. Can [person] assist?",
        cultural_context: "Explain why you need help, suggest specific resource."
    },
    {
        slug: "how-to-request-deadline-extension",
        hindi_phrase: "Deadline extension kaise maangun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to request an extension on [deliverable] from [old date] to [new date] due to [valid reason].",
        pro_option_2: "Can we extend the deadline for [task] to [new date]? [Reason].",
        cultural_context: "Ask early, give valid reason, propose realistic new date."
    },
    {
        slug: "how-to-request-salary-advance",
        hindi_phrase: "Salary advance kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "Due to [emergency/personal situation], I would like to request a salary advance of [amount]. I understand this can be adjusted from my upcoming paychecks.",
        pro_option_2: "Need a salary advance of [amount] due to [reason]. Can repay over next [X] months.",
        cultural_context: "Be honest about need, propose repayment plan."
    },
    {
        slug: "how-to-request-transfer",
        hindi_phrase: "Transfer request kaise karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to request a transfer to [department/location] due to [reason]. I believe my skills in [area] would be valuable there.",
        pro_option_2: "Interested in transferring to [team/location]. Think my [skill] would be a good fit.",
        cultural_context: "State reason professionally, highlight how you'll add value."
    },
    {
        slug: "how-to-request-promotion-consideration",
        hindi_phrase: "Promotion consideration kaise maangun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to discuss the possibility of being considered for a promotion to [role]. Over the past [time], I have [achievements].",
        pro_option_2: "Can we talk about promotion opportunities? I've been [accomplishments].",
        cultural_context: "Back it with achievements, ask for discussion not guarantee."
    },
    {
        slug: "how-to-request-role-change",
        hindi_phrase: "Role change kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to explore opportunities to transition into [role/area] as I've developed interest and skills in [domain].",
        pro_option_2: "Interested in moving to [area]. Have been learning about [skill/topic].",
        cultural_context: "Show genuine interest and relevant preparation."
    },
    {
        slug: "how-to-request-remote-work-permanently",
        hindi_phrase: "Permanent remote work kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to discuss transitioning to a permanent remote work arrangement. I have maintained [performance metrics] while working remotely.",
        pro_option_2: "Can we discuss going fully remote? My productivity has been [evidence].",
        cultural_context: "Prove it works with data/results from trial period."
    },
    {
        slug: "how-to-request-conference-attendance",
        hindi_phrase: "Conference attend karne ki permission",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to attend [conference name] on [dates]. This would provide valuable insights on [topic relevant to work].",
        pro_option_2: "Can I attend [conference]? Would be great for learning about [topic].",
        cultural_context: "Link conference to job/company benefits, mention cost if company pays."
    },
    {
        slug: "how-to-request-certification-reimbursement",
        hindi_phrase: "Certification ke paise wapas kaise maangun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I have completed [certification] at a cost of [amount]. Could you please process the reimbursement as per company policy?",
        pro_option_2: "Completed [certification] - cost was [amount]. Can I submit for reimbursement?",
        cultural_context: "Reference company policy if applicable, provide receipts."
    },
    {
        slug: "how-to-request-laptop-upgrade",
        hindi_phrase: "Laptop upgrade kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "My current laptop is experiencing performance issues affecting my productivity. Could I request an upgrade to [specs]?",
        pro_option_2: "My laptop is slowing down work. Can I get an upgrade?",
        cultural_context: "Explain how current equipment is limiting work."
    },
    {
        slug: "how-to-request-team-change",
        hindi_phrase: "Team change kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I would like to discuss the possibility of joining [team name] as I'm interested in [domain] and believe I can contribute effectively.",
        pro_option_2: "Interested in moving to [team]. My skills in [area] would fit well.",
        cultural_context: "Focus on positive reasons (growth, interest), not negative ones (current team issues)."
    },
    {
        slug: "how-to-request-project-assignment",
        hindi_phrase: "Project mein kaam karne ki request",
        intent_category: "Requests & Permissions",
        pro_option_1: "I am interested in contributing to [project name]. Given my experience in [relevant area], I believe I could add value.",
        pro_option_2: "Would love to work on [project]. Have experience in [relevant skill].",
        cultural_context: "Show enthusiasm and relevant capability."
    },
    {
        slug: "how-to-request-mentorship",
        hindi_phrase: "Mentorship kaise request karun?",
        intent_category: "Requests & Permissions",
        pro_option_1: "I greatly admire your expertise in [area]. Would you be open to mentoring me in [specific aspect]?",
        pro_option_2: "Would you be willing to mentor me in [area]? Really value your expertise.",
        cultural_context: "Be specific about what you want to learn, respect their time."
    },
    // Meeting & Presentation (20 phrases)
    {
        slug: "how-to-start-a-presentation",
        hindi_phrase: "Presentation kaise shuru karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Good morning everyone. Thank you for joining. Today I'll be presenting [topic], and we'll cover [key points].",
        pro_option_2: "Hi all! Today's presentation is about [topic]. We'll go through [agenda].",
        cultural_context: "Greet, thank attendees, state topic and agenda clearly."
    },
    {
        slug: "how-to-end-a-presentation",
        hindi_phrase: "Presentation kaise end karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "To summarize, [key points]. Thank you for your attention. I'm happy to take questions now.",
        pro_option_2: "That's it! Quick recap: [points]. Any questions?",
        cultural_context: "Summarize key points, thank audience, open for Q&A."
    },
    {
        slug: "how-to-present-data",
        hindi_phrase: "Data kaise present karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "As you can see from this chart, [insight]. This represents a [X%] increase/decrease in [metric].",
        pro_option_2: "This chart shows [data point]. We're seeing [trend].",
        cultural_context: "Point out key insights, not just numbers. Tell the story."
    },
    {
        slug: "how-to-transition-between-slides",
        hindi_phrase: "Slides ke beech transition kaise karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Moving on to the next point, let's discuss [topic].",
        pro_option_2: "Next up - [topic].",
        cultural_context: "Use transition phrases to guide audience through your flow."
    },
    {
        slug: "how-to-handle-questions-during-presentation",
        hindi_phrase: "Presentation ke beech questions kaise handle karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "That's a great question. I'll address that point in the next section, or we can discuss it now if you prefer.",
        pro_option_2: "Good question! I'll cover that in a bit, or we can discuss now.",
        cultural_context: "Acknowledge question, either answer or note to address later."
    },
    {
        slug: "how-to-open-a-meeting",
        hindi_phrase: "Meeting kaise shuru karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Thank you all for joining. Let's get started. Today's agenda includes [items]. We aim to finish by [time].",
        pro_option_2: "Thanks for coming! Here's what we'll cover: [agenda]. Should take about [duration].",
        cultural_context: "State agenda upfront, set time expectation."
    },
    {
        slug: "how-to-close-a-meeting",
        hindi_phrase: "Meeting kaise close karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "To recap, we've decided on [decisions]. Next steps are [actions]. Thank you everyone for your input.",
        pro_option_2: "So we're doing [decision]. Next steps: [actions]. Thanks all!",
        cultural_context: "Summarize decisions and action items clearly."
    },
    {
        slug: "how-to-facilitate-discussion",
        hindi_phrase: "Discussion kaise facilitate karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I'd like to open this up for discussion. What are your thoughts on [topic]?",
        pro_option_2: "Let's discuss - what do you all think about [topic]?",
        cultural_context: "Invite participation, ask open-ended questions."
    },
    {
        slug: "how-to-redirect-off-topic-discussion",
        hindi_phrase: "Off-topic discussion ko kaise redirect karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "That's an important point. Let's table that for now and revisit it separately so we can stay on track with today's agenda.",
        pro_option_2: "Good point, but let's park that for now and get back to [agenda item].",
        cultural_context: "'Table it' or 'park it' means postpone. Acknowledge but redirect."
    },
    {
        slug: "how-to-call-for-break",
        hindi_phrase: "Break kaise suggest karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Let's take a 10-minute break and reconvene at [time].",
        pro_option_2: "Quick 10-min break? Back at [time].",
        cultural_context: "State duration and specific return time."
    },
    {
        slug: "how-to-introduce-speaker",
        hindi_phrase: "Speaker ko kaise introduce karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I'd like to invite [Name], our [title], to share insights on [topic]. [Name], over to you.",
        pro_option_2: "[Name] will now talk about [topic]. [Name]?",
        cultural_context: "State who they are, what they'll cover, hand over clearly."
    },
    {
        slug: "how-to-take-meeting-notes",
        hindi_phrase: "Meeting notes kaise lun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I'll be documenting key points and action items. Please flag if I miss anything important.",
        pro_option_2: "Taking notes on this - let me know if I miss something.",
        cultural_context: "Announce you're taking notes, invite corrections."
    },
    {
        slug: "how-to-share-meeting-minutes",
        hindi_phrase: "Meeting minutes kaise share karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Here are the minutes from today's meeting. Please review and let me know if any corrections are needed.",
        pro_option_2: "Meeting notes attached. Let me know if anything's missing!",
        cultural_context: "Send within 24 hours, invite feedback on accuracy."
    },
    {
        slug: "how-to-schedule-recurring-meeting",
        hindi_phrase: "Recurring meeting kaise schedule karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I'd like to set up a recurring [frequency] meeting to discuss [topic]. Would [day/time] work for everyone?",
        pro_option_2: "Can we do a weekly/bi-weekly meeting on [topic]? [Day/time] work?",
        cultural_context: "State frequency and purpose, propose time."
    },
    {
        slug: "how-to-cancel-meeting",
        hindi_phrase: "Meeting kaise cancel karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I need to cancel our meeting scheduled for [time] due to [reason]. Can we reschedule for [alternative]?",
        pro_option_2: "Need to cancel [time] meeting. Can we do [alternative time] instead?",
        cultural_context: "Give as much notice as possible, propose alternative."
    },
    {
        slug: "how-to-reschedule-meeting",
        hindi_phrase: "Meeting kaise reschedule karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Due to a conflict, I need to reschedule our [day/time] meeting. Would [alternative options] work better?",
        pro_option_2: "Can we move our [day] meeting? How about [alternative]?",
        cultural_context: "Explain briefly, give multiple alternatives."
    },
    {
        slug: "how-to-join-meeting-late",
        hindi_phrase: "Meeting mein late kaise join karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Apologies for joining late. Could someone quickly brief me on what I've missed?",
        pro_option_2: "Sorry I'm late! What did I miss?",
        cultural_context: "Apologize briefly, ask for quick catch-up."
    },
    {
        slug: "how-to-leave-meeting-early",
        hindi_phrase: "Meeting se jaldi kaise niklu?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I apologize, but I need to leave at [time] for another commitment. Please share minutes, and I'll catch up.",
        pro_option_2: "Heads up - need to drop off at [time] for another meeting. Send me the notes?",
        cultural_context: "Announce early in meeting, request minutes."
    },
    {
        slug: "how-to-mute-unmute-etiquette",
        hindi_phrase: "Meeting mein mute/unmute kab karun?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "Please keep yourself on mute when not speaking to minimize background noise.",
        pro_option_2: "Everyone on mute unless speaking, please!",
        cultural_context: "Standard virtual meeting etiquette."
    },
    {
        slug: "how-to-share-screen-in-meeting",
        hindi_phrase: "Screen share kaise karun meeting mein?",
        intent_category: "Meetings & Presentations",
        pro_option_1: "I'm going to share my screen now to walk you through [content].",
        pro_option_2: "Sharing my screen - you should see [content].",
        cultural_context: "Announce before sharing, confirm others can see."
    }
];

export function getAllPhrases(): PhraseData[] {
    return PHRASES;
}

export function getPhraseBySlug(slug: string): PhraseData | undefined {
    return PHRASES.find(p => p.slug === slug);
}

export function getRelatedPhrases(category: string, currentSlug: string): PhraseData[] {
    return PHRASES.filter(p => p.intent_category === category && p.slug !== currentSlug);
}
