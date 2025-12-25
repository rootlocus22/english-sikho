// Interview Questions Database for EnglishGyani
// Comprehensive question bank for HR, Technical, and Behavioral interviews

export interface InterviewQuestion {
    id: string;
    question: string;
    tips: string;
    sampleAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface InterviewCategory {
    name: string;
    icon: string;
    description: string;
    questions: InterviewQuestion[];
}

export const INTERVIEW_CATEGORIES: Record<string, InterviewCategory> = {
    hr: {
        name: "HR Round",
        icon: "👔",
        description: "Common HR and general interview questions",
        questions: [
            {
                id: "hr-1",
                question: "Tell me about yourself",
                tips: "Focus on professional background. Structure: Present → Past → Future. Keep it under 2 minutes.",
                sampleAnswer: "I'm currently working as a software developer with 3 years of experience in web technologies. I started my career after graduating from XYZ College with a degree in Computer Science. I'm passionate about learning new technologies and I'm looking to grow into a senior developer role where I can mentor junior developers.",
                difficulty: 'easy'
            },
            {
                id: "hr-2",
                question: "Why do you want to work here?",
                tips: "Research the company. Mention specific things you admire. Connect to your career goals.",
                sampleAnswer: "I've been following your company's work in AI and machine learning, and I'm impressed by your recent product launch. Your focus on innovation aligns with my passion for cutting-edge technology. I believe this role would allow me to contribute meaningfully while growing my skills.",
                difficulty: 'easy'
            },
            {
                id: "hr-3",
                question: "What are your strengths?",
                tips: "Choose 2-3 relevant strengths. Provide specific examples. Link to the job requirements.",
                sampleAnswer: "My key strengths are problem-solving and teamwork. For example, in my previous role, I identified a bottleneck in our deployment process and worked with the DevOps team to reduce deployment time by 40%. I also excel at breaking down complex problems into manageable tasks.",
                difficulty: 'easy'
            },
            {
                id: "hr-4",
                question: "What are your weaknesses?",
                tips: "Be honest but strategic. Show self-awareness. Mention how you're improving.",
                sampleAnswer: "I sometimes focus too much on perfecting details, which can slow me down. I've learned to balance quality with deadlines by setting time limits for tasks and prioritizing what really matters. I'm getting better at knowing when 'good enough' is actually good enough.",
                difficulty: 'medium'
            },
            {
                id: "hr-5",
                question: "Where do you see yourself in 5 years?",
                tips: "Show ambition but be realistic. Align with company's growth. Focus on skills, not positions.",
                sampleAnswer: "In 5 years, I see myself as a technical expert in my field, possibly leading a small team. I want to deepen my expertise in cloud technologies and contribute to architectural decisions. I'm also interested in mentoring junior developers and sharing knowledge.",
                difficulty: 'easy'
            },
            {
                id: "hr-6",
                question: "Why did you leave your last job?",
                tips: "Be positive. Focus on growth opportunities. Never badmouth previous employer.",
                sampleAnswer: "I'm grateful for the experience I gained at my previous company, but I'm looking for new challenges and opportunities to grow. This position offers exposure to technologies I'm excited about and aligns better with my long-term career goals.",
                difficulty: 'medium'
            },
            {
                id: "hr-7",
                question: "What is your salary expectation?",
                tips: "Research market rates. Give a range. Express flexibility. Ask about their budget.",
                sampleAnswer: "Based on my research and considering my experience, I'm looking for something in the range of X to Y lakhs per annum. However, I'm flexible and would like to understand the complete compensation package. What budget did you have in mind for this role?",
                difficulty: 'hard'
            },
            {
                id: "hr-8",
                question: "Do you have any questions for us?",
                tips: "Always ask questions. Show genuine interest. Ask about team, growth, challenges.",
                sampleAnswer: "Yes, I have a few questions. Can you tell me about the team structure? What are the biggest challenges the team is facing right now? What does success look like in this role in the first 6 months?",
                difficulty: 'easy'
            },
            {
                id: "hr-9",
                question: "What motivates you?",
                tips: "Be authentic. Link to work. Show passion. Avoid purely monetary answers.",
                sampleAnswer: "I'm motivated by solving challenging problems and seeing the tangible impact of my work. When I build a feature that helps thousands of users, it energizes me. I also find satisfaction in continuous learning and mastering new technologies.",
                difficulty: 'easy'
            },
            {
                id: "hr-10",
                question: "How do you handle stress and pressure?",
                tips: "Give specific examples. Show healthy coping mechanisms. Demonstrate resilience.",
                sampleAnswer: "I handle pressure by staying organized and prioritizing tasks. When facing tight deadlines, I break work into smaller chunks and focus on one thing at a time. I also make sure to take short breaks to stay fresh. For example, during a critical project launch, I created a detailed checklist and communicated progress regularly with stakeholders.",
                difficulty: 'medium'
            }
        ]
    },
    technical: {
        name: "Technical Round",
        icon: "💻",
        description: "Technical and role-specific questions",
        questions: [
            {
                id: "tech-1",
                question: "Explain a complex technical concept to a non-technical person",
                tips: "Use analogies. Avoid jargon. Check for understanding. Be patient and clear.",
                sampleAnswer: "Let me explain cloud computing using a simple analogy. Think of it like electricity - you don't need to own a power plant to use electricity. Similarly, with cloud computing, you don't need to own servers. You just use computing power when you need it, and pay only for what you use, just like your electricity bill.",
                difficulty: 'medium'
            },
            {
                id: "tech-2",
                question: "Walk me through your most challenging project",
                tips: "Use STAR method (Situation, Task, Action, Result). Be specific. Highlight your role.",
                sampleAnswer: "In my previous role, we had a legacy system causing frequent crashes (Situation). I was tasked with modernizing it (Task). I analyzed the codebase, identified bottlenecks, and proposed a migration strategy. We broke the work into phases and successfully migrated 80% of users with zero downtime (Action). This reduced crashes by 95% and improved response time by 60% (Result).",
                difficulty: 'medium'
            },
            {
                id: "tech-3",
                question: "How do you stay updated with new technologies?",
                tips: "Show continuous learning. Mention specific resources. Balance learning with work.",
                sampleAnswer: "I follow several tech blogs and newsletters like Dev.to and JavaScript Weekly. I dedicate 2-3 hours weekly to online courses on platforms like Udemy. I also participate in local developer meetups and contribute to open-source projects. Recently, I completed a course on microservices architecture.",
                difficulty: 'easy'
            },
            {
                id: "tech-4",
                question: "Describe your development workflow",
                tips: "Mention tools, processes, best practices. Show organized approach.",
                sampleAnswer: "I start by understanding requirements thoroughly, then break them into smaller tasks. I use Git for version control with feature branches. I write tests before implementation (TDD when possible), do code reviews with teammates, and ensure CI/CD pipelines pass before merging. I also document important decisions and update README files.",
                difficulty: 'easy'
            },
            {
                id: "tech-5",
                question: "How do you debug a production issue?",
                tips: "Show systematic approach. Mention tools. Stress about user impact first.",
                sampleAnswer: "First, I assess the severity and user impact. I check logs and monitoring tools like Sentry or CloudWatch to identify the error. I try to reproduce the issue in a staging environment. Once identified, I implement a fix, test thoroughly, and deploy. Finally, I do a post-mortem to prevent recurrence.",
                difficulty: 'medium'
            },
            {
                id: "tech-6",
                question: "What's the difference between functional and object-oriented programming?",
                tips: "Explain clearly. Give examples. Mention use cases for each.",
                sampleAnswer: "Functional programming treats computation as mathematical functions, avoiding changing state and mutable data. It emphasizes pure functions and immutability. Object-oriented programming organizes code around objects that contain both data and methods. For example, React hooks use functional concepts while Java classes use OOP. Both have their place - FP for data transformations, OOP for modeling real-world entities.",
                difficulty: 'hard'
            },
            {
                id: "tech-7",
                question: "How would you optimize a slow-performing application?",
                tips: "Show methodical approach. Mention profiling. Prioritize bottlenecks.",
                sampleAnswer: "I'd start by profiling to identify bottlenecks - is it database queries, network calls, or CPU-intensive operations? Then I'd tackle the biggest issues first. Common fixes include: adding database indexes, implementing caching (Redis), optimizing queries, using pagination, compressing assets, and implementing lazy loading. I always measure before and after to verify improvements.",
                difficulty: 'medium'
            },
            {
                id: "tech-8",
                question: "Explain RESTful APIs",
                tips: "Cover key concepts: resources, HTTP methods, stateless. Give examples.",
                sampleAnswer: "REST is an architectural style for building web services. It uses HTTP methods meaningfully - GET to retrieve data, POST to create, PUT to update, DELETE to remove. Each resource has a unique URL. It's stateless, meaning each request contains all needed information. For example, GET /users/123 retrieves user 123, POST /users creates a new user.",
                difficulty: 'easy'
            },
            {
                id: "tech-9",
                question: "What is your experience with databases?",
                tips: "Mention both SQL and NoSQL. Give specific examples. Show understanding of trade-offs.",
                sampleAnswer: "I've worked with both SQL databases like PostgreSQL and MySQL, and NoSQL databases like MongoDB and Redis. For a recent e-commerce project, I used PostgreSQL for transactional data and Redis for caching frequently accessed products. I understand when to use each - SQL for complex queries and relationships, NoSQL for flexibility and horizontal scaling.",
                difficulty: 'medium'
            },
            {
                id: "tech-10",
                question: "How do you ensure code quality?",
                tips: "Mention testing, reviews, linting, documentation. Show multiple approaches.",
                sampleAnswer: "I ensure code quality through multiple layers: writing unit and integration tests, using linters like ESLint, conducting code reviews, following style guides, writing clear documentation, and using TypeScript for type safety. I also believe in continuous refactoring and keeping technical debt manageable. Code quality is a team responsibility, not just individual.",
                difficulty: 'easy'
            }
        ]
    },
    behavioral: {
        name: "Behavioral Round",
        icon: "🧠",
        description: "Situation-based and soft skills questions",
        questions: [
            {
                id: "beh-1",
                question: "Tell me about a time you disagreed with a teammate",
                tips: "Use STAR method. Show respect and communication. Focus on resolution.",
                sampleAnswer: "During a project, my teammate suggested using a complex framework I thought was overkill (Situation). We had differing technical opinions (Task). I scheduled a meeting to discuss both approaches, presented data on maintenance costs and learning curve, and we found a middle ground - using a lighter library that met our needs (Action). We delivered successfully and our relationship remained strong (Result).",
                difficulty: 'medium'
            },
            {
                id: "beh-2",
                question: "Describe a time you failed at something",
                tips: "Be honest. Show what you learned. Demonstrate growth and humility.",
                sampleAnswer: "In my first year, I underestimated the time needed for a feature and missed a deadline (Situation). I learned the importance of breaking work into smaller estimates and building in buffer time (Learning). Now I track my estimates vs actuals to improve accuracy. I also learned to communicate early when facing delays rather than hoping to catch up (Growth).",
                difficulty: 'hard'
            },
            {
                id: "beh-3",
                question: "Give an example of when you showed leadership",
                tips: "Leadership isn't just titles. Show initiative, influence, problem-solving.",
                sampleAnswer: "When our team's senior developer suddenly left (Situation), I volunteered to take ownership of their critical module (Task). I onboarded myself quickly, created documentation, and mentored two junior developers (Action). We delivered on time and those juniors are now confident contributors (Result). Leadership is about stepping up when needed.",
                difficulty: 'medium'
            },
            {
                id: "beh-4",
                question: "How do you handle tight deadlines?",
                tips: "Show organization skills. Mention prioritization. Demonstrate composure.",
                sampleAnswer: "When facing tight deadlines, I first clarify priorities with stakeholders (Action 1). Then I break work into must-haves and nice-to-haves (Action 2). I focus on delivering core functionality first and communicate progress daily (Action 3). For example, during a product launch, I delivered the critical path on time by deferring non-essential features to the next sprint.",
                difficulty: 'easy'
            },
            {
                id: "beh-5",
                question: "Tell me about a time you learned something new quickly",
                tips: "Show learning ability. Mention resources used. Highlight results.",
                sampleAnswer: "When our project switched to React (Situation), I had only Vue experience (Challenge). I dedicated evenings to online tutorials, built a small project, and read the official docs (Action). Within two weeks, I was contributing to our React codebase, and within a month, I was reviewing others' code (Result). I learn best by doing and building real projects.",
                difficulty: 'easy'
            },
            {
                id: "beh-6",
                question: "Describe a time you went above and beyond",
                tips: "Show initiative and passion. Quantify impact if possible.",
                sampleAnswer: "I noticed our team wasted time on repetitive deployment tasks (Observation). Without being asked, I created automation scripts during weekends (Action). This reduced deployment time from 2 hours to 15 minutes (Result). The company later adopted my scripts company-wide, saving hundreds of developer hours. I go above and beyond when I see opportunities to add value.",
                difficulty: 'medium'
            },
            {
                id: "beh-7",
                question: "How do you handle constructive criticism?",
                tips: "Show openness to feedback. Demonstrate growth mindset. Give example.",
                sampleAnswer: "I view criticism as a gift for improvement (Mindset). When a senior developer pointed out my code wasn't following best practices (Situation), I thanked them, asked for resources to learn, and implemented their suggestions (Action). Now I actively seek code reviews and feedback. I've learned that defensive reactions prevent growth, while openness accelerates it.",
                difficulty: 'easy'
            },
            {
                id: "beh-8",
                question: "Tell me about a time you had to make a difficult decision",
                tips: "Explain the dilemma. Show your thought process. Stand by your decision.",
                sampleAnswer: "I had to choose between meeting a deadline with technical debt or delaying for proper implementation (Dilemma). I analyzed the trade-offs - short-term gain vs long-term maintainability (Analysis). I chose to communicate the risks to stakeholders and advocated for a one-week extension to do it right (Decision). They agreed, and it saved us 3 weeks of bug fixes later (Outcome).",
                difficulty: 'hard'
            },
            {
                id: "beh-9",
                question: "How do you prioritize when everything is urgent?",
                tips: "Show decision-making framework. Mention stakeholder communication.",
                sampleAnswer: "When everything feels urgent, I use the Eisenhower Matrix (Important vs Urgent) (Framework). I also communicate with stakeholders to understand true business priorities (Communication). For example, when three tasks were 'urgent', I discovered one was critical for a client demo, one could wait 2 days, and one was miscommunicated. Clear communication and frameworks help cut through urgency bias.",
                difficulty: 'medium'
            },
            {
                id: "beh-10",
                question: "Describe a situation where you had to work with a difficult person",
                tips: "Focus on professionalism. Show empathy. Highlight resolution.",
                sampleAnswer: "I worked with a colleague who was constantly negative in meetings (Situation). Instead of avoiding them, I had a private conversation to understand their perspective (Action 1). I learned they felt unheard. I started actively seeking their input and acknowledging their concerns (Action 2). Over time, they became more constructive and we worked well together (Result). Understanding the 'why' behind behavior helps.",
                difficulty: 'hard'
            }
        ]
    }
};

// Helper to get all categories
export function getAllCategories() {
    return Object.keys(INTERVIEW_CATEGORIES);
}

// Helper to get category by key
export function getCategory(key: string): InterviewCategory | undefined {
    return INTERVIEW_CATEGORIES[key];
}

// Helper to get total question count
export function getTotalQuestions(): number {
    return Object.values(INTERVIEW_CATEGORIES).reduce(
        (total, category) => total + category.questions.length,
        0
    );
}

// Helper to get random question from category
export function getRandomQuestion(categoryKey: string): InterviewQuestion | null {
    const category = INTERVIEW_CATEGORIES[categoryKey];
    if (!category || category.questions.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * category.questions.length);
    return category.questions[randomIndex];
}
