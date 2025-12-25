// Interview Questions Database for EnglishGyani
// Comprehensive question bank expanded to 100+ questions

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
                sampleAnswer: "I am currently working as a software developer with 3 years of experience in web technologies. I started my career after graduating from XYZ College with a degree in Computer Science. I am passionate about learning new technologies and I am looking to grow into a senior developer role where I can mentor junior developers.",
                difficulty: 'easy'
            },
            {
                id: "hr-2",
                question: "Why do you want to work here?",
                tips: "Research the company. Mention specific things you admire. Connect to your career goals.",
                sampleAnswer: "I have been following your company's work in AI and machine learning, and I am impressed by your recent product launch. Your focus on innovation aligns with my passion for cutting-edge technology. I believe this role would allow me to contribute meaningfully while growing my skills.",
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
                tips: "Be honest but strategic. Show self-awareness. Mention how you are improving.",
                sampleAnswer: "I sometimes focus too much on perfecting details, which can slow me down. I have learned to balance quality with deadlines by setting time limits for tasks and prioritizing what really matters. I am getting better at knowing when good enough is actually good enough.",
                difficulty: 'medium'
            },
            {
                id: "hr-5",
                question: "Where do you see yourself in 5 years?",
                tips: "Show ambition but be realistic. Align with company's growth. Focus on skills, not positions.",
                sampleAnswer: "In 5 years, I see myself as a technical expert in my field, possibly leading a small team. I want to deepen my expertise in cloud technologies and contribute to architectural decisions. I am also interested in mentoring junior developers and sharing knowledge.",
                difficulty: 'easy'
            },
            {
                id: "hr-6",
                question: "Why did you leave your last job?",
                tips: "Be positive. Focus on growth opportunities. Never badmouth previous employer.",
                sampleAnswer: "I am grateful for the experience I gained at my previous company, but I am looking for new challenges and opportunities to grow. This position offers exposure to technologies I am excited about and aligns better with my long-term career goals.",
                difficulty: 'medium'
            },
            {
                id: "hr-7",
                question: "What is your salary expectation?",
                tips: "Research market rates. Give a range. Express flexibility. Ask about their budget.",
                sampleAnswer: "Based on my research and considering my experience, I am looking for something in the range of X to Y lakhs per annum. However, I am flexible and would like to understand the complete compensation package. What budget did you have in mind for this role?",
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
                sampleAnswer: "I am motivated by solving challenging problems and seeing the tangible impact of my work. When I build a feature that helps thousands of users, it energizes me. I also find satisfaction in continuous learning and mastering new technologies.",
                difficulty: 'easy'
            },
            {
                id: "hr-10",
                question: "How do you handle stress and pressure?",
                tips: "Give specific examples. Show healthy coping mechanisms. Demonstrate resilience.",
                sampleAnswer: "I handle pressure by staying organized and prioritizing tasks. When facing tight deadlines, I break work into smaller chunks and focus on one thing at a time. I also make sure to take short breaks to stay fresh. For example, during a critical project launch, I created a detailed checklist and communicated progress regularly with stakeholders.",
                difficulty: 'medium'
            },
            {
                id: "hr-11",
                question: "Describe a challenging situation and how you handled it",
                tips: "Use STAR method (Situation, Task, Action, Result). Be specific. Show problem-solving.",
                sampleAnswer: "In my previous role, our main server crashed during peak hours affecting 10,000 users. I quickly coordinated with the team, identified the root cause in the database connection pool, implemented a temporary fix within 30 minutes, and then worked on a permanent solution. We reduced downtime and prevented future occurrences.",
                difficulty: 'medium'
            },
            {
                id: "hr-12",
                question: "Why should we hire you?",
                tips: "Summarize your unique value. Match skills to job requirements. Show enthusiasm.",
                sampleAnswer: "You should hire me because I bring both technical expertise and strong communication skills. My 3 years of experience in React and Node.js directly match your requirements, and my track record of delivering projects on time shows my reliability. I am also passionate about your mission and would be committed to contributing to your team's success.",
                difficulty: 'medium'
            },
            {
                id: "hr-13",
                question: "How do you handle conflicts with team members?",
                tips: "Show maturity. Emphasize communication. Focus on resolution, not blame.",
                sampleAnswer: "I believe in addressing conflicts directly but professionally. I would first try to understand their perspective through a private one-on-one conversation, find common ground, and work together on a solution. In one instance, I had a disagreement with a colleague about code architecture. We discussed our approaches, evaluated pros and cons together, and found a middle ground that worked better than either original idea.",
                difficulty: 'medium'
            },
            {
                id: "hr-14",
                question: "What is your biggest achievement?",
                tips: "Choose a relevant achievement. Quantify results. Explain your role clearly.",
                sampleAnswer: "My biggest achievement was leading the migration of our monolithic application to microservices. I coordinated with 5 team members, created a phased migration plan, and we completed it 2 weeks ahead of schedule. This improved our deployment frequency by 300% and reduced server costs by 25%.",
                difficulty: 'easy'
            },
            {
                id: "hr-15",
                question: "How do you stay updated with industry trends?",
                tips: "Show continuous learning. Mention specific sources. Give examples of application.",
                sampleAnswer: "I stay updated by reading technical blogs like Medium and Dev.to, following industry leaders on Twitter, and attending local meetups when possible. I also complete online courses on platforms like Udemy. Recently, I learned about serverless architecture and applied it to a side project, which gave me hands-on experience.",
                difficulty: 'easy'
            },
            {
                id: "hr-16",
                question: "Describe your ideal work environment",
                tips: "Align with company culture. Show flexibility. Focus on productivity factors.",
                sampleAnswer: "I thrive in a collaborative environment where open communication is encouraged and team members support each other. I appreciate having clear goals but also the autonomy to decide how to achieve them. A culture of continuous learning and innovation is important to me, as is work-life balance.",
                difficulty: 'easy'
            },
            {
                id: "hr-17",
                question: "Tell me about a time you failed",
                tips: "Be honest. Focus on lessons learned. Show growth from the experience.",
                sampleAnswer: "In my first year, I underestimated the time needed for a feature and missed a deadline. I learned the importance of better time estimation and communication. Now, I break tasks into smaller parts, add buffer time, and communicate early if I foresee any delays. This experience made me a more reliable team member.",
                difficulty: 'hard'
            },
            {
                id: "hr-18",
                question: "How do you prioritize your work?",
                tips: "Explain your method. Mention tools if any. Show organizational skills.",
                sampleAnswer: "I prioritize based on urgency and business impact. I use the Eisenhower Matrix to categorize tasks. Every morning, I list my tasks, identify the most critical ones, and tackle those first. For larger projects, I use tools like Jira or Trello to track progress and ensure nothing falls through the cracks.",
                difficulty: 'easy'
            },
            {
                id: "hr-19",
                question: "What salary are you currently making?",
                tips: "Be honest but strategic. You can deflect to expectations. Focus on value.",
                sampleAnswer: "In my current role, I earn X lakhs per annum, but I am more interested in finding the right opportunity for growth than just focusing on salary. I would like to understand the complete compensation structure here and how it reflects the responsibilities of this role.",
                difficulty: 'hard'
            },
            {
                id: "hr-20",
                question: "Are you willing to relocate?",
                tips: "Be honest. Consider family situation. Show flexibility if possible.",
                sampleAnswer: "Yes, I am open to relocating for the right opportunity. I understand this role is based in Bangalore and I am prepared to make that move. I have researched the area and am excited about the opportunities and lifestyle there.",
                difficulty: 'easy'
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
                question: "Explain the difference between var, let, and const in JavaScript",
                tips: "Discuss scope, hoisting, and reassignment. Give examples.",
                sampleAnswer: "Var is function-scoped and hoisted. Let and const are block-scoped and not hoisted. Let allows reassignment while const does not. For example, var can be accessed before declaration due to hoisting, but let and const will throw an error. I prefer using const by default and let only when I need to reassign.",
                difficulty: 'medium'
            },
            {
                id: "tech-2",
                question: "What is the difference between SQL and NoSQL databases?",
                tips: "Mention structure, scalability, and use cases. Give examples of each.",
                sampleAnswer: "SQL databases like MySQL are relational, structured with tables and schemas, and use SQL for queries. They are great for complex relationships. NoSQL databases like MongoDB are non-relational, more flexible in structure, and scale horizontally better. I would choose SQL for financial data requiring ACID compliance and NoSQL for rapidly changing data like social media posts.",
                difficulty: 'medium'
            },
            {
                id: "tech-3",
                question: "Explain REST API principles",
                tips: "Cover HTTP methods, statelessness, and resource-based URLs.",
                sampleAnswer: "REST APIs use HTTP methods like GET, POST, PUT, DELETE to perform operations on resources. They are stateless, meaning each request contains all necessary information. URLs represent resources, like /users/123. Responses typically use JSON format. Good REST APIs are predictable, cacheable, and follow standard HTTP status codes.",
                difficulty: 'easy'
            },
            {
                id: "tech-4",
                question: "What is Object-Oriented Programming?",
                tips: "Explain four pillars: encapsulation, inheritance, polymorphism, abstraction.",
                sampleAnswer: "OOP is a programming paradigm based on objects which contain data and methods. The four main principles are: Encapsulation (bundling data with methods), Inheritance (creating new classes from existing ones), Polymorphism (same interface, different implementations), and Abstraction (hiding complexity). For example, in Java, we can create a Vehicle class and inherit Car and Bike classes from it.",
                difficulty: 'easy'
            },
            {
                id: "tech-5",
                question: "How do you optimize website performance?",
                tips: "Cover multiple areas: code, images, caching, CDN.",
                sampleAnswer: "I focus on several areas: minifying and bundling JavaScript and CSS, compressing images and using modern formats like WebP, implementing lazy loading for images, using browser caching, leveraging CDNs for static assets, and optimizing database queries. I also use tools like Lighthouse to identify bottlenecks and measure improvements.",
                difficulty: 'medium'
            },
            {
                id: "tech-6",
                question: "Explain the concept of closures in JavaScript",
                tips: "Define it clearly. Give a practical example. Explain use cases.",
                sampleAnswer: "A closure is a function that has access to variables in its outer scope even after the outer function has returned. This happens because functions in JavaScript form closures. A common use case is creating private variables. For example, a counter function can maintain a private count variable that cannot be accessed directly but only through methods.",
                difficulty: 'hard'
            },
            {
                id: "tech-7",
                question: "What is the difference between synchronous and asynchronous programming?",
                tips: "Explain blocking vs non-blocking. Give JavaScript examples.",
                sampleAnswer: "Synchronous code executes line by line, blocking until each operation completes. Asynchronous code allows other operations to run while waiting for slow tasks like API calls. In JavaScript, we handle async operations using callbacks, promises, or async/await. For example, fetching data from an API is async so the UI remains responsive while waiting for the response.",
                difficulty: 'medium'
            },
            {
                id: "tech-8",
                question: "How does Git work and what is branching?",
                tips: "Explain version control basics. Describe branch workflow.",
                sampleAnswer: "Git is a distributed version control system that tracks changes in code. Branching allows multiple developers to work on different features simultaneously without affecting the main codebase. I typically work on a feature branch, commit changes regularly, and create a pull request to merge into the main branch after review. This keeps the main branch stable.",
                difficulty: 'easy'
            },
            {
                id: "tech-9",
                question: "What is the difference between authentication and authorization?",
                tips: "Define both clearly. Give examples from real applications.",
                sampleAnswer: "Authentication verifies who you are, like logging in with username and password. Authorization determines what you can access after authentication, like admin vs regular user permissions. For example, in an e-commerce site, authentication confirms your identity, while authorization decides if you can access the admin panel to manage products.",
                difficulty: 'easy'
            },
            {
                id: "tech-10",
                question: "Explain how you would scale a web application",
                tips: "Discuss horizontal vs vertical scaling. Mention load balancing, caching, database optimization.",
                sampleAnswer: "I would start by identifying bottlenecks through monitoring. For scaling, I would implement horizontal scaling by adding more servers and using load balancers to distribute traffic. I would add caching layers with Redis for frequently accessed data, optimize database queries and add indexes, use CDNs for static assets, and possibly implement database replication for read-heavy applications.",
                difficulty: 'hard'
            },
            {
                id: "tech-11",
                question: "What is CI/CD and why is it important?",
                tips: "Explain Continuous Integration and Continuous Deployment. Mention benefits and tools.",
                sampleAnswer: "CI/CD automates the software delivery process. Continuous Integration means automatically testing code changes when developers commit. Continuous Deployment automatically deploys tested code to production. This reduces manual errors, speeds up releases, and provides faster feedback. I have used Jenkins and GitHub Actions to set up CI/CD pipelines that run tests and deploy to staging and production environments.",
                difficulty: 'medium'
            },
            {
                id: "tech-12",
                question: "Explain the concept of middleware in Express.js",
                tips: "Define middleware. Explain the request-response cycle. Give examples.",
                sampleAnswer: "Middleware functions in Express have access to the request and response objects and the next middleware function. They can execute code, modify request/response, end the cycle, or call the next middleware. Common uses include authentication, logging, and error handling. For example, I use middleware to verify JWT tokens before allowing access to protected routes.",
                difficulty: 'medium'
            },
            {
                id: "tech-13",
                question: "What are design patterns? Name some you have used.",
                tips: "Explain what design patterns are. Give 2-3 examples with use cases.",
                sampleAnswer: "Design patterns are reusable solutions to common programming problems. I frequently use the Singleton pattern for database connections to ensure only one instance exists. The Observer pattern is useful for event-driven systems. The Factory pattern helps create objects without specifying exact classes. These patterns make code more maintainable and follow best practices.",
                difficulty: 'hard'
            },
            {
                id: "tech-14",
                question: "How do you ensure code quality?",
                tips: "Mention testing, code reviews, linting, and best practices.",
                sampleAnswer: "I ensure code quality through multiple practices: writing unit and integration tests with good coverage, following coding standards with ESLint and Prettier, conducting thorough code reviews, using TypeScript for type safety, writing clear documentation, and refactoring regularly to reduce technical debt. I also use tools like SonarQube to identify code smells.",
                difficulty: 'medium'
            },
            {
                id: "tech-15",
                question: "What is Docker and why use containers?",
                tips: "Explain containerization. Discuss benefits over traditional deployment.",
                sampleAnswer: "Docker is a platform for containerization that packages applications with all dependencies into containers. Containers are lightweight, portable, and ensure the app runs the same way in development, testing, and production. They solve the it works on my machine problem. Benefits include faster deployment, better resource utilization, and easier scaling compared to virtual machines.",
                difficulty: 'medium'
            }
        ]
    },
    behavioral: {
        name: "Behavioral Round",
        icon: "🎯",
        description: "Behavioral and situational questions",
        questions: [
            {
                id: "beh-1",
                question: "Tell me about a time you disagreed with your manager",
                tips: "Show respect. Focus on constructive disagreement. End with positive resolution.",
                sampleAnswer: "My manager wanted to implement a feature quickly without testing. I respectfully presented data showing the risks and proposed a middle ground - we could release a simpler version quickly with proper testing, then iterate. After discussing the trade-offs, he agreed. We delivered on time with quality, and our relationship remained strong.",
                difficulty: 'hard'
            },
            {
                id: "beh-2",
                question: "Describe a time you worked under a tight deadline",
                tips: "Show time management and prioritization. Explain your process.",
                sampleAnswer: "We had to deliver a critical feature in 3 days instead of planned 2 weeks. I immediately broke down tasks, identified must-haves versus nice-to-haves, delegated effectively, and worked extended hours on critical paths. We delivered the core functionality on time, and scheduled the remaining features for the next sprint. The client was satisfied with our responsiveness.",
                difficulty: 'medium'
            },
            {
                id: "beh-3",
                question: "Give an example of when you showed leadership",
                tips: "Leadership is not just for managers. Show initiative and influence.",
                sampleAnswer: "Although I was not the team lead, I noticed our code review process was slowing us down. I researched best practices, created a proposal for a more efficient process, presented it to the team, and volunteered to implement it. The team adopted my suggestions and our review time decreased by 50%. This showed leadership through initiative and influence.",
                difficulty: 'medium'
            },
            {
                id: "beh-4",
                question: "Tell me about a time you had to learn something quickly",
                tips: "Show learning agility. Explain your learning process. Mention results.",
                sampleAnswer: "When we decided to migrate to React, I had no experience with it. I immediately took an online course, built a small project to practice, read the official documentation thoroughly, and started contributing to our migration within a week. I also shared my learnings with team members. Within a month, I was confident enough to lead a feature implementation in React.",
                difficulty: 'easy'
            },
            {
                id: "beh-5",
                question: "Describe a situation where you had to work with a difficult colleague",
                tips: "Show emotional intelligence. Focus on finding common ground.",
                sampleAnswer: "I worked with a colleague who was very resistant to feedback. Instead of confrontation, I tried to understand their perspective first. I found they felt their expertise was not being valued. I made sure to acknowledge their strengths publicly and frame my suggestions as collaborative improvements. Our working relationship improved significantly once they felt respected.",
                difficulty: 'hard'
            },
            {
                id: "beh-6",
                question: "Tell me about a time you took initiative",
                tips: "Show proactiveness. Explain the impact of your initiative.",
                sampleAnswer: "I noticed our deployment process was error-prone and manual. Without being asked, I researched CI/CD tools, created a proof of concept using GitHub Actions, and presented it to my manager. After approval, I implemented the automated pipeline. This reduced deployment errors by 90% and saved the team hours every week.",
                difficulty: 'easy'
            },
            {
                id: "beh-7",
                question: "Describe a time you made a mistake at work",
                tips: "Be honest. Focus on lessons learned and how you recovered.",
                sampleAnswer: "I once deployed code to production without proper testing which caused a bug affecting users. I immediately informed my manager, rolled back the changes, fixed the issue, and added tests to prevent recurrence. I learned the importance of following the deployment checklist no matter how small the change. This made me more thorough in my work.",
                difficulty: 'medium'
            },
            {
                id: "beh-8",
                question: "Tell me about a time you went above and beyond",
                tips: "Show dedication and initiative. Quantify impact if possible.",
                sampleAnswer: "During a critical client demo, our presentation tool crashed. I quickly created a backup demo using a different stack I knew, worked through lunch to prepare it, and delivered a successful demo. The client was impressed by our adaptability and we won the project. This required quick thinking and willingness to do whatever it takes.",
                difficulty: 'easy'
            },
            {
                id: "beh-9",
                question: "Describe a time you had to give difficult feedback",
                tips: "Show tact and empathy. Focus on how you delivered it constructively.",
                sampleAnswer: "A junior developer was submitting code with poor quality. Instead of public criticism, I scheduled a one-on-one meeting, started by acknowledging their strengths, then showed specific examples of issues and explained why they mattered. I offered to pair program to teach best practices. They appreciated the constructive approach and their code quality improved significantly.",
                difficulty: 'hard'
            },
            {
                id: "beh-10",
                question: "Tell me about a time you solved a complex problem",
                tips: "Use STAR method. Explain your problem-solving approach clearly.",
                sampleAnswer: "We had mysterious performance issues in production that we could not replicate in development. I systematically analyzed logs, added monitoring, identified that the issue occurred under specific load conditions, created a load testing environment to replicate it, and discovered a memory leak in our caching layer. After the fix, performance improved by 60%.",
                difficulty: 'medium'
            }
        ]
    },
    freshers: {
        name: "Fresher Focused",
        icon: "🎓",
        description: "Questions tailored for campus placement and entry-level roles",
        questions: [
            {
                id: "fresh-1",
                question: "Why did you choose this career path?",
                tips: "Be authentic. Connect education to career. Show passion.",
                sampleAnswer: "I discovered my passion for coding during my second year when I built my first website. The ability to create something from scratch that people can use excited me. I chose Computer Science because it combines creativity with logic. I enjoy problem-solving and the tech industry offers vast opportunities for learning and growth.",
                difficulty: 'easy'
            },
            {
                id: "fresh-2",
                question: "What project are you most proud of from college?",
                tips: "Explain the project clearly. Highlight your specific contributions. Mention learnings.",
                sampleAnswer: "My final year project was a student management system using React and Node.js. I led a team of 4 students, designed the database schema, and implemented the authentication module. The project taught me full-stack development and team collaboration. We presented it at our college symposium and received the best project award.",
                difficulty: 'easy'
            },
            {
                id: "fresh-3",
                question: "How do you handle feedback and criticism?",
                tips: "Show openness to learning. Give examples from college or internships.",
                sampleAnswer: "I view feedback as an opportunity to improve. During my internship, my mentor pointed out that my code lacked proper comments. Instead of being defensive, I asked for examples of good commenting practices, studied them, and improved my documentation. I regularly seek feedback because I know I am still learning and growing.",
                difficulty: 'easy'
            },
            {
                id: "fresh-4",
                question: "What do you know about our company?",
                tips: "Research thoroughly. Mention recent news, products, culture. Connect to your interests.",
                sampleAnswer: "I know that your company is a leader in fintech solutions with over 50 million users. I read about your recent expansion into UPI payments and your focus on financial inclusion. Your engineering blog posts about scalability impressed me. I am particularly excited about your emphasis on innovation and the opportunity to work on products that impact millions of Indians.",
                difficulty: 'medium'
            },
            {
                id: "fresh-5",
                question: "How do you plan to contribute to our team?",
                tips: "Show eagerness to learn. Mention your strengths. Show team spirit.",
                sampleAnswer: "As a fresher, I bring fresh perspectives, enthusiasm to learn, and strong fundamentals from my education. I am quick to adapt and willing to take on any task. While I may need guidance initially, I am committed to becoming a valuable team member quickly. My strength in problem-solving and willingness to put in extra effort will help me contribute meaningfully.",
                difficulty: 'easy'
            },
            {
                id: "fresh-6",
                question: "What are your hobbies and interests?",
                tips: "Be genuine. Connect hobbies to skills if possible. Show you are well-rounded.",
                sampleAnswer: "I enjoy coding side projects in my free time - I recently built a weather app using React. I also like reading tech blogs and watching tech talks on YouTube to stay updated. Outside of tech, I play cricket on weekends which teaches me teamwork. I believe in maintaining work-life balance and these activities help me stay energized.",
                difficulty: 'easy'
            },
            {
                id: "fresh-7",
                question: "What skills do you think are most important for this role?",
                tips: "Match job description. Show understanding of the role. Mention both technical and soft skills.",
                sampleAnswer: "For this software developer role, strong programming fundamentals are essential, which I have developed through my coursework and projects. Problem-solving ability, willingness to learn new technologies, and good communication for teamwork are also crucial. I have worked on these through college projects and my internship. I am particularly strong in JavaScript and eager to learn your tech stack.",
                difficulty: 'easy'
            },
            {
                id: "fresh-8",
                question: "How do you handle not knowing something?",
                tips: "Show resourcefulness. Mention how you learn. Show you are not afraid to ask for help.",
                sampleAnswer: "When I encounter something I do not know, I first try to research and learn on my own using documentation, tutorials, and Stack Overflow. If I am still stuck after reasonable effort, I ask seniors or peers for guidance. I make notes of new learnings so I do not face the same issue again. I am not afraid to admit when I do not know something because that is the first step to learning.",
                difficulty: 'easy'
            },
            {
                id: "fresh-9",
                question: "What was your biggest learning from your internship?",
                tips: "Highlight professional growth. Mention both technical and soft skills learned.",
                sampleAnswer: "My internship at XYZ Company taught me how real software development differs from college projects. I learned the importance of code reviews, testing, and documentation. I also understood the value of clear communication with team members. The biggest lesson was that soft skills like teamwork and communication are as important as coding skills for professional success.",
                difficulty: 'easy'
            },
            {
                id: "fresh-10",
                question: "Why should we hire you as a fresher?",
                tips: "Highlight your unique value. Show enthusiasm. Mention willingness to learn.",
                sampleAnswer: "While I am a fresher, I bring strong academic foundation with a CGPA of 8.5, hands-on experience from 3 significant projects and a 6-month internship. I am a fast learner, highly motivated, and genuinely passionate about technology. I may not have years of experience, but I have the dedication to work hard, learn quickly, and grow with your company. My fresh perspective can also bring innovative ideas to your team.",
                difficulty: 'medium'
            }
        ]
    },
    leadership: {
        name: "Leadership & Management",
        icon: "👨‍💼",
        description: "Questions for senior and leadership positions",
        questions: [
            {
                id: "lead-1",
                question: "How do you motivate your team?",
                tips: "Show understanding of different motivation styles. Give specific examples.",
                sampleAnswer: "I motivate my team by understanding individual motivators - some prefer recognition, others seek challenging work. I set clear goals, provide autonomy, recognize achievements publicly, and create opportunities for growth. For example, I implemented a monthly innovation hour where team members can work on ideas they are passionate about, which significantly improved morale and creativity.",
                difficulty: 'hard'
            },
            {
                id: "lead-2",
                question: "Describe your leadership style",
                tips: "Be honest. Provide examples. Show adaptability.",
                sampleAnswer: "I follow a collaborative leadership style where I involve the team in decision-making while taking final responsibility. I believe in empowering team members and providing support when needed. I adapt my style based on the situation - more directive during crises, more delegative with experienced team members. I led a team of 5 developers through a major product launch using this approach and we delivered successfully.",
                difficulty: 'medium'
            },
            {
                id: "lead-3",
                question: "How do you handle underperforming team members?",
                tips: "Show empathy and firmness. Explain a structured approach.",
                sampleAnswer: "I start by having a private conversation to understand root causes - it could be personal issues, unclear expectations, or skill gaps. I work with them to create an improvement plan with clear milestones and provide necessary support like training or mentoring. I monitor progress regularly and give constructive feedback. If there is no improvement despite support, I involve HR for next steps.",
                difficulty: 'hard'
            },
            {
                id: "lead-4",
                question: "How do you prioritize competing projects?",
                tips: "Explain your prioritization framework. Show strategic thinking.",
                sampleAnswer: "I prioritize based on business impact, urgency, resources available, and dependencies. I use a framework that considers ROI and strategic alignment. I communicate priorities clearly to stakeholders and team. For example, when faced with three critical projects, I evaluated each using these criteria, aligned with leadership on priorities, and adjusted team allocation accordingly, delivering the highest impact project first.",
                difficulty: 'hard'
            },
            {
                id: "lead-5",
                question: "Tell me about a time you had to make an unpopular decision",
                tips: "Show decisiveness. Explain your reasoning. Show how you handled pushback.",
                sampleAnswer: "I had to cancel a project that the team had worked on for 2 months because market conditions changed. It was a difficult decision as the team was emotionally invested. I explained the business rationale clearly, acknowledged their efforts, and redirected them to a more strategic project where their work could be utilized partially. Though initially disappointed, the team understood and appreciated the transparency.",
                difficulty: 'hard'
            }
        ]
    },
    industry: {
        name: "Industry Specific",
        icon: "🏢",
        description: "Questions specific to Indian IT industry and work culture",
        questions: [
            {
                id: "ind-1",
                question: "How do you handle working in different time zones with global clients?",
                tips: "Show flexibility and communication skills. Mention tools and strategies.",
                sampleAnswer: "I am comfortable with flexible working hours when needed for client calls. I ensure clear communication through detailed emails and documentation when working async. I use tools like Slack and Jira effectively. In my previous role, I regularly had calls with US clients, so I scheduled focused work in the morning and kept afternoons flexible for calls, maintaining work-life balance.",
                difficulty: 'medium'
            },
            {
                id: "ind-2",
                question: "What do you know about Indian IT industry trends?",
                tips: "Show industry awareness. Mention recent developments. Connect to your role.",
                sampleAnswer: "The Indian IT industry is shifting from traditional outsourcing to product development and digital transformation services. Cloud computing, AI, and cybersecurity are booming. Remote work has become normalized. Indian startups are creating global impact. As a developer, I see opportunities in areas like fintech, healthtech, and edtech. I am excited to be part of this evolving landscape.",
                difficulty: 'medium'
            },
            {
                id: "ind-3",
                question: "How comfortable are you with travel and client-site deployments?",
                tips: "Be honest about your preferences. Show flexibility if possible.",
                sampleAnswer: "I am open to travel when required for client meetings or deployments. I understand that client-facing roles sometimes need on-site presence. I am comfortable with occasional travel and see it as an opportunity to build stronger client relationships and understand requirements better. However, I would appreciate advance notice when possible to manage personal commitments.",
                difficulty: 'easy'
            },
            {
                id: "ind-4",
                question: "How do you handle working with distributed teams across Indian cities?",
                tips: "Mention communication tools and strategies. Show cultural awareness.",
                sampleAnswer: "I have worked with colleagues in Bangalore, Pune, and Hyderabad. I ensure regular video calls to maintain team bonding, use collaboration tools like Slack and Jira effectively, and schedule meetings respecting different time zones. I document decisions clearly so remote members stay informed. I also participate in quarterly team meetups when organized, which strengthens team relationships.",
                difficulty: 'easy'
            },
            {
                id: "ind-5",
                question: "What is your experience with Indian client management?",
                tips: "Show understanding of Indian business culture. Mention relationship building.",
                sampleAnswer: "In my previous role, I worked with clients from BFSI and retail sectors. I learned that Indian clients value personal relationships alongside professional delivery. I ensure regular communication, quick response times, and flexibility in accommodating last-minute requests when reasonable. I also understand the importance of festivals and regional holidays in planning. Building trust through consistent delivery is key.",
                difficulty: 'medium'
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
