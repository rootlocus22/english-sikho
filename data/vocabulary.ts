export interface VocabularyWord {
    word: string;
    meaning: string;
    example: string;
    hindiMeaning: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface VocabularyCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    words: VocabularyWord[];
}

export const vocabularyCategories: VocabularyCategory[] = [
    {
        id: 'general-business',
        name: 'General Business',
        icon: '💼',
        description: 'Common terms used in all business contexts',
        words: [
            {
                word: 'Agenda',
                meaning: 'A list of items to be discussed in a meeting',
                example: 'Let me share the agenda for today\'s meeting.',
                hindiMeaning: 'बैठक में चर्चा के मुद्दों की सूची',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Stakeholder',
                meaning: 'A person or group with an interest in a company\'s success',
                example: 'We need to keep all stakeholders informed about the project status.',
                hindiMeaning: 'हितधारक - जो व्यक्ति या समूह कंपनी की सफलता में रुचि रखता है',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Benchmark',
                meaning: 'A standard or point of reference for measuring performance',
                example: 'Our sales exceeded the benchmark by 20%.',
                hindiMeaning: 'मानक - प्रदर्शन मापने का आधार',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Brainstorm',
                meaning: 'To generate creative ideas in a group discussion',
                example: 'Let\'s brainstorm some solutions for this problem.',
                hindiMeaning: 'विचार-मंथन - समूह में विचारों का आदान-प्रदान',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Deadline',
                meaning: 'The latest time or date by which something must be completed',
                example: 'The project deadline is Friday at 5 PM.',
                hindiMeaning: 'अंतिम तिथि',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Deliverable',
                meaning: 'A tangible or intangible item to be provided to a client',
                example: 'The final deliverable will be a detailed report.',
                hindiMeaning: 'सुपुर्दगी योग्य वस्तु',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Milestone',
                meaning: 'A significant stage or event in a project',
                example: 'We reached an important milestone by completing the first phase.',
                hindiMeaning: 'मील का पत्थर - परियोजना में महत्वपूर्ण चरण',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Followup',
                meaning: 'To check on the progress of something previously discussed',
                example: 'I will follow up with you next week about the proposal.',
                hindiMeaning: 'अनुवर्ती कार्यवाही करना',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Leverage',
                meaning: 'To use something to maximum advantage',
                example: 'We can leverage this technology to improve efficiency.',
                hindiMeaning: 'लाभ उठाना',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Proactive',
                meaning: 'Taking action in advance to prevent problems',
                example: 'We need to be proactive about addressing customer concerns.',
                hindiMeaning: 'सक्रिय - पहले से कार्यवाही करना',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Accountability',
                meaning: 'Responsibility for outcomes and actions',
                example: 'Team members must take accountability for their tasks.',
                hindiMeaning: 'जवाबदेही',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Initiative',
                meaning: 'The ability to take action without being told',
                example: 'She showed great initiative by starting the project early.',
                hindiMeaning: 'पहल करना',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Collaborate',
                meaning: 'To work together with others',
                example: 'Let us collaborate on this presentation.',
                hindiMeaning: 'सहयोग करना - मिलकर काम करना',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Feedback',
                meaning: 'Comments or information about how well someone is doing',
                example: 'I would appreciate your feedback on my presentation.',
                hindiMeaning: 'प्रतिक्रिया - सुझाव या टिप्पणी',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Optimize',
                meaning: 'To make something as effective as possible',
                example: 'We need to optimize our workflow for better productivity.',
                hindiMeaning: 'अनुकूलित करना',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Prioritize',
                meaning: 'To arrange tasks in order of importance',
                example: 'Let us prioritize the urgent tasks first.',
                hindiMeaning: 'प्राथमिकता देना',
                category: 'general-business',
                difficulty: 'beginner'
            },
            {
                word: 'Revenue',
                meaning: 'Income generated from business activities',
                example: 'Our revenue increased by 25% this quarter.',
                hindiMeaning: 'राजस्व - आय',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Streamline',
                meaning: 'To make a process more efficient by simplifying it',
                example: 'We streamlined the approval process to save time.',
                hindiMeaning: 'सुव्यवस्थित करना',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Bottleneck',
                meaning: 'A point where flow is restricted, causing delays',
                example: 'The approval process has become a bottleneck.',
                hindiMeaning: 'अड़चन - बाधा',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Consensus',
                meaning: 'General agreement among a group',
                example: 'We reached consensus on the new policy.',
                hindiMeaning: 'सहमति - आम सहमति',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Delegate',
                meaning: 'To assign responsibility to someone else',
                example: 'I will delegate this task to my team member.',
                hindiMeaning: 'प्रतिनिधि बनाना - जिम्मेदारी सौंपना',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Implementation',
                meaning: 'The process of putting a plan into action',
                example: 'The implementation phase will begin next month.',
                hindiMeaning: 'क्रियान्वयन',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Bandwidth',
                meaning: 'Available capacity or resources to handle tasks',
                example: 'I do not have the bandwidth to take on another project right now.',
                hindiMeaning: 'क्षमता - उपलब्ध समय और संसाधन',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Synergy',
                meaning: 'The combined power of a group working together',
                example: 'The synergy between our teams led to great results.',
                hindiMeaning: 'तालमेल - मिलकर काम करने की शक्ति',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Scalable',
                meaning: 'Capable of being enlarged or expanded',
                example: 'We need a scalable solution that can grow with the company.',
                hindiMeaning: 'बढ़ाने योग्य',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Actionable',
                meaning: 'Something that can be acted upon',
                example: 'We need actionable recommendations, not just observations.',
                hindiMeaning: 'कार्यशील - जिस पर अमल किया जा सके',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Feasibility',
                meaning: 'How practical or possible something is',
                example: 'We need to check the feasibility of this project.',
                hindiMeaning: 'व्यवहार्यता - संभवता',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Alignment',
                meaning: 'Agreement or coordination between parties',
                example: 'We need better alignment between sales and marketing teams.',
                hindiMeaning: 'संरेखण - तालमेल',
                category: 'general-business',
                difficulty: 'advanced'
            },
            {
                word: 'Insights',
                meaning: 'Deep understanding or perspective gained from data or experience',
                example: 'The analytics provided valuable insights into customer behavior.',
                hindiMeaning: 'अंतर्दृष्टि - गहरी समझ',
                category: 'general-business',
                difficulty: 'intermediate'
            },
            {
                word: 'Transparent',
                meaning: 'Open and honest in communication',
                example: 'We maintain transparent communication with all stakeholders.',
                hindiMeaning: 'पारदर्शी - खुला और स्पष्ट',
                category: 'general-business',
                difficulty: 'intermediate'
            }
        ]
    },
    {
        id: 'it-technology',
        name: 'IT & Technology',
        icon: '💻',
        description: 'Terms for software developers and IT professionals',
        words: [
            {
                word: 'Deploy',
                meaning: 'To release software to production environment',
                example: 'We will deploy the new feature tomorrow.',
                hindiMeaning: 'तैनात करना - सॉफ्टवेयर को लाइव करना',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Bug',
                meaning: 'An error or defect in software',
                example: 'I found a critical bug in the payment module.',
                hindiMeaning: 'कीड़ा - सॉफ्टवेयर में गड़बड़ी',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Sprint',
                meaning: 'A time-boxed period for completing work (usually 1-4 weeks)',
                example: 'Our sprint ends next Friday.',
                hindiMeaning: 'स्प्रिंट - काम पूरा करने की निर्धारित अवधि',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Repository',
                meaning: 'A storage location for software code',
                example: 'Please push your code to the repository.',
                hindiMeaning: 'भंडार - कोड रखने की जगह',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'API',
                meaning: 'Application Programming Interface - allows different software to communicate',
                example: 'We need to integrate the payment API.',
                hindiMeaning: 'एपीआई - सॉफ्टवेयर्स के बीच संवाद का माध्यम',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Legacy Code',
                meaning: 'Old code that is difficult to maintain or modify',
                example: 'We need to refactor this legacy code.',
                hindiMeaning: 'पुराना कोड - जो बदलना मुश्किल हो',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Frontend',
                meaning: 'The client-side of an application that users interact with',
                example: 'I am working on the frontend design.',
                hindiMeaning: 'फ्रंटएंड - यूजर को दिखने वाला हिस्सा',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Backend',
                meaning: 'The server-side of an application that handles logic and data',
                example: 'The backend team is optimizing the database queries.',
                hindiMeaning: 'बैकएंड - सर्वर की तरफ का काम',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Database',
                meaning: 'An organized collection of data',
                example: 'We store user information in the database.',
                hindiMeaning: 'डेटाबेस - डेटा का संग्रह',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Cloud',
                meaning: 'Remote servers accessed over the internet for storage and computing',
                example: 'We migrated our application to the cloud.',
                hindiMeaning: 'क्लाउड - इंटरनेट पर सर्वर',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'DevOps',
                meaning: 'Practices combining software development and IT operations',
                example: 'Our DevOps team automates the deployment process.',
                hindiMeaning: 'डेवऑप्स - डेवलपमेंट और ऑपरेशन का संयोजन',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Microservices',
                meaning: 'Architecture where application is built as small independent services',
                example: 'We are breaking our monolith into microservices.',
                hindiMeaning: 'माइक्रोसर्विसेज - छोटी स्वतंत्र सेवाओं का समूह',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Refactor',
                meaning: 'Restructuring code without changing its behavior',
                example: 'We should refactor this module for better readability.',
                hindiMeaning: 'रिफैक्टर - कोड को सुधारना',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Scalability',
                meaning: 'Ability of a system to handle growing workload',
                example: 'Scalability is a key requirement for this application.',
                hindiMeaning: 'स्केलेबिलिटी - बढ़ती मांग को संभालने की क्षमता',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Authentication',
                meaning: 'Process of verifying user identity',
                example: 'We need to implement two-factor authentication.',
                hindiMeaning: 'प्रमाणीकरण - पहचान की जांच',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Encryption',
                meaning: 'Converting data into code to prevent unauthorized access',
                example: 'All passwords are stored using encryption.',
                hindiMeaning: 'एन्क्रिप्शन - डेटा को सुरक्षित कोड में बदलना',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Cache',
                meaning: 'Temporary storage to speed up data access',
                example: 'We cache frequently accessed data.',
                hindiMeaning: 'कैश - तेज़ी के लिए अस्थायी संग्रहण',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Load Balancer',
                meaning: 'Distributes traffic across multiple servers',
                example: 'The load balancer ensures high availability.',
                hindiMeaning: 'लोड बैलेंसर - ट्रैफिक को सर्वरों में बांटना',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Continuous Integration',
                meaning: 'Automatically testing code changes',
                example: 'We use continuous integration to catch bugs early.',
                hindiMeaning: 'सतत एकीकरण - कोड की स्वचालित जांच',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Version Control',
                meaning: 'System for tracking changes in code',
                example: 'We use Git for version control.',
                hindiMeaning: 'संस्करण नियंत्रण - कोड के बदलावों को ट्रैक करना',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Framework',
                meaning: 'Pre-built software foundation for development',
                example: 'React is a popular JavaScript framework.',
                hindiMeaning: 'फ्रेमवर्क - पहले से बना सॉफ्टवेयर ढांचा',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Debugging',
                meaning: 'Finding and fixing errors in code',
                example: 'I spent the morning debugging the login issue.',
                hindiMeaning: 'डीबगिंग - कोड में गड़बड़ी ढूंढना और ठीक करना',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Deployment',
                meaning: 'The process of making software available for use',
                example: 'The deployment is scheduled for Saturday night.',
                hindiMeaning: 'डिप्लॉयमेंट - सॉफ्टवेयर को लाइव करना',
                category: 'it-technology',
                difficulty: 'beginner'
            },
            {
                word: 'Rollback',
                meaning: 'Reverting to a previous version of software',
                example: 'We had to rollback due to critical bugs.',
                hindiMeaning: 'रोलबैक - पुराने वर्शन पर वापस जाना',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Latency',
                meaning: 'Delay in data transmission',
                example: 'We need to reduce API latency.',
                hindiMeaning: 'विलंबता - डेटा में देरी',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Throughput',
                meaning: 'Amount of data processed in a given time',
                example: 'We increased system throughput by 50%.',
                hindiMeaning: 'थ्रूपुट - एक समय में प्रोसेस होने वाला डेटा',
                category: 'it-technology',
                difficulty: 'advanced'
            },
            {
                word: 'Unit Test',
                meaning: 'Testing individual components of code',
                example: 'Please write unit tests for this function.',
                hindiMeaning: 'यूनिट टेस्ट - कोड के छोटे हिस्सों की जांच',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Integration',
                meaning: 'Combining different systems or components',
                example: 'We completed the payment gateway integration.',
                hindiMeaning: 'एकीकरण - अलग सिस्टम को जोड़ना',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Agile',
                meaning: 'Iterative development methodology',
                example: 'Our team follows Agile methodology.',
                hindiMeaning: 'एजाइल - तेज़ और लचीला विकास तरीका',
                category: 'it-technology',
                difficulty: 'intermediate'
            },
            {
                word: 'Sandbox',
                meaning: 'Testing environment isolated from production',
                example: 'Please test the changes in sandbox first.',
                hindiMeaning: 'सैंडबॉक्स - टेस्टिंग के लिए अलग वातावरण',
                category: 'it-technology',
                difficulty: 'intermediate'
            }
        ]
    },
    {
        id: 'finance',
        name: 'Finance & Accounting',
        icon: '💰',
        description: 'Financial terms for accounting and finance professionals',
        words: [
            {
                word: 'Invoice',
                meaning: 'A document requesting payment for goods or services',
                example: 'Please send me the invoice for last month\'s services.',
                hindiMeaning: 'बिल - भुगतान मांगने का दस्तावेज',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Revenue',
                meaning: 'Total income generated from business operations',
                example: 'Our revenue increased by 30% this quarter.',
                hindiMeaning: 'आय - व्यवसाय से कुल कमाई',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Profit Margin',
                meaning: 'The percentage of revenue that exceeds costs',
                example: 'We need to improve our profit margin.',
                hindiMeaning: 'लाभ मार्जिन - कमाई में से खर्च घटाने के बाद बचा प्रतिशत',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Forecast',
                meaning: 'A prediction of future financial performance',
                example: 'The forecast shows growth in the next quarter.',
                hindiMeaning: 'भविष्यवाणी - आने वाले समय का अनुमान',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Asset',
                meaning: 'A resource owned by a company with economic value',
                example: 'The company\'s assets include machinery and real estate.',
                hindiMeaning: 'संपत्ति - कंपनी की मूल्यवान चीजें',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Liability',
                meaning: 'A company\'s financial debts or obligations',
                example: 'We need to reduce our liabilities.',
                hindiMeaning: 'देनदारी - कंपनी का कर्ज या दायित्व',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Budget',
                meaning: 'A plan for spending and saving money',
                example: 'We need to stay within the allocated budget.',
                hindiMeaning: 'बजट - खर्च की योजना',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Expense',
                meaning: 'Money spent on business operations',
                example: 'Travel expenses will be reimbursed.',
                hindiMeaning: 'खर्च - व्यय',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Cash Flow',
                meaning: 'Movement of money in and out of business',
                example: 'We need to improve our cash flow management.',
                hindiMeaning: 'नकदी प्रवाह - पैसों का आना जाना',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Quarterly',
                meaning: 'Happening every three months',
                example: 'We have quarterly financial reviews.',
                hindiMeaning: 'त्रैमासिक - हर तीन महीने में',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Audit',
                meaning: 'Official examination of financial records',
                example: 'The annual audit will begin next month.',
                hindiMeaning: 'लेखा परीक्षा - वित्तीय रिकॉर्ड की जांच',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Accounts Payable',
                meaning: 'Money owed by company to suppliers',
                example: 'Accounts payable has increased this month.',
                hindiMeaning: 'देय खाते - कंपनी को जो पैसे देने हैं',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Accounts Receivable',
                meaning: 'Money owed to company by customers',
                example: 'We need to collect accounts receivable faster.',
                hindiMeaning: 'प्राप्य खाते - कंपनी को जो पैसे मिलने हैं',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Reimbursement',
                meaning: 'Repayment of money spent on behalf of company',
                example: 'Submit your travel expenses for reimbursement.',
                hindiMeaning: 'प्रतिपूर्ति - खर्च की वापसी',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Depreciation',
                meaning: 'Decrease in asset value over time',
                example: 'We calculate depreciation on all equipment.',
                hindiMeaning: 'मूल्यह्रास - संपत्ति की कीमत में कमी',
                category: 'finance',
                difficulty: 'advanced'
            },
            {
                word: 'Equity',
                meaning: 'Ownership value in a company',
                example: 'The founders hold 60% equity.',
                hindiMeaning: 'इक्विटी - कंपनी में मालिकाना हिस्सा',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Balance Sheet',
                meaning: 'Statement of assets, liabilities, and equity',
                example: 'The balance sheet looks healthy.',
                hindiMeaning: 'बैलेंस शीट - संपत्ति और देनदारी का विवरण',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Profit and Loss',
                meaning: 'Statement showing income and expenses',
                example: 'Review the profit and loss statement.',
                hindiMeaning: 'लाभ और हानि - आय और खर्च का विवरण',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Write-off',
                meaning: 'Removing bad debt from accounts',
                example: 'We had to write-off some uncollectable debts.',
                hindiMeaning: 'राइट-ऑफ - बुरे कर्ज को हटाना',
                category: 'finance',
                difficulty: 'advanced'
            },
            {
                word: 'Capital',
                meaning: 'Financial assets or resources',
                example: 'We need more capital to expand.',
                hindiMeaning: 'पूंजी - वित्तीय संसाधन',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Dividend',
                meaning: 'Payment to shareholders from profits',
                example: 'The company declared a dividend of Rs. 10 per share.',
                hindiMeaning: 'लाभांश - शेयरधारकों को लाभ से भुगतान',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Fiscal Year',
                meaning: 'A one-year period for financial reporting',
                example: 'Our fiscal year ends in March.',
                hindiMeaning: 'वित्तीय वर्ष - वित्त रिपोर्टिंग के लिए एक साल',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Liquidity',
                meaning: 'Ability to convert assets to cash quickly',
                example: 'The company has good liquidity.',
                hindiMeaning: 'तरलता - संपत्ति को नकद में बदलने की क्षमता',
                category: 'finance',
                difficulty: 'advanced'
            },
            {
                word: 'Overhead',
                meaning: 'Ongoing business expenses',
                example: 'We need to reduce overhead costs.',
                hindiMeaning: 'ओवरहेड - व्यवसाय के नियमित खर्च',
                category: 'finance',
                difficulty: 'intermediate'
            },
            {
                word: 'Payroll',
                meaning: 'List of employees and their salaries',
                example: 'Payroll is processed on the last day of each month.',
                hindiMeaning: 'पेरोल - कर्मचारियों के वेतन की सूची',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Tax Deduction',
                meaning: 'Amount subtracted from income before calculating tax',
                example: 'Check your tax deductions on the salary slip.',
                hindiMeaning: 'कर कटौती - टैक्स के लिए आय से घटाई गई रकम',
                category: 'finance',
                difficulty: 'beginner'
            },
            {
                word: 'Variance',
                meaning: 'Difference between planned and actual figures',
                example: 'There is a variance in the budget numbers.',
                hindiMeaning: 'प्रसरण - योजना और वास्तविकता में अंतर',
                category: 'finance',
                difficulty: 'advanced'
            },
            {
                word: 'Amortization',
                meaning: 'Gradual repayment of debt or spreading cost',
                example: 'The loan amortization is over 5 years.',
                hindiMeaning: 'परिशोधन - कर्ज या खर्च का धीरे-धीरे भुगतान',
                category: 'finance',
                difficulty: 'advanced'
            },
            {
                word: 'Accrual',
                meaning: 'Recording expenses when incurred, not when paid',
                example: 'We use accrual accounting method.',
                hindiMeaning: 'उपार्जन - खर्च को होते ही रिकॉर्ड करना',
                category: 'finance',
                difficulty: 'advanced'
            }
        ]
    },
    {
        id: 'hr',
        name: 'HR & Recruitment',
        icon: '👥',
        description: 'Human resources and hiring terminology',
        words: [
            {
                word: 'Onboarding',
                meaning: 'The process of integrating a new employee',
                example: 'The onboarding process takes two weeks.',
                hindiMeaning: 'नए कर्मचारी को कंपनी में शामिल करना',
                category: 'hr',
                difficulty: 'beginner'
            },
            {
                word: 'Performance Review',
                meaning: 'An evaluation of an employee\'s work performance',
                example: 'Your annual performance review is scheduled for next month.',
                hindiMeaning: 'कर्मचारी के काम का मूल्यांकन',
                category: 'hr',
                difficulty: 'beginner'
            },
            {
                word: 'Notice Period',
                meaning: 'Time between resignation and last working day',
                example: 'My notice period is 30 days.',
                hindiMeaning: 'नोटिस की अवधि - इस्तीफे और आखिरी दिन के बीच का समय',
                category: 'hr',
                difficulty: 'beginner'
            },
            {
                word: 'Probation',
                meaning: 'A trial period for new employees',
                example: 'You will be on probation for the first three months.',
                hindiMeaning: 'परिवीक्षा काल - नए कर्मचारी की परीक्षा अवधि',
                category: 'hr',
                difficulty: 'intermediate'
            },
            {
                word: 'Attrition',
                meaning: 'The rate at which employees leave a company',
                example: 'We need to reduce our attrition rate.',
                hindiMeaning: 'कर्मचारियों के जाने की दर',
                category: 'hr',
                difficulty: 'advanced'
            },
            {
                word: 'Retention',
                meaning: 'Keeping employees from leaving the company',
                example: 'Employee retention is our top priority.',
                hindiMeaning: 'कर्मचारियों को रोके रखना',
                category: 'hr',
                difficulty: 'intermediate'
            }
        ]
    },
    {
        id: 'marketing',
        name: 'Marketing & Sales',
        icon: '📢',
        description: 'Marketing and sales terminology',
        words: [
            {
                word: 'Campaign',
                meaning: 'A coordinated series of marketing activities',
                example: 'Our email campaign generated 500 leads.',
                hindiMeaning: 'अभियान - मार्केटिंग गतिविधियों की श्रृंखला',
                category: 'marketing',
                difficulty: 'beginner'
            },
            {
                word: 'Lead',
                meaning: 'A potential customer who has shown interest',
                example: 'We generated 100 qualified leads this month.',
                hindiMeaning: 'संभावित ग्राहक',
                category: 'marketing',
                difficulty: 'beginner'
            },
            {
                word: 'Conversion Rate',
                meaning: 'Percentage of visitors who take desired action',
                example: 'Our conversion rate improved by 15%.',
                hindiMeaning: 'रूपांतरण दर - कितने विज़िटर ग्राहक बने',
                category: 'marketing',
                difficulty: 'intermediate'
            },
            {
                word: 'ROI',
                meaning: 'Return on Investment - profit relative to cost',
                example: 'The ROI of our ad campaign was 300%.',
                hindiMeaning: 'निवेश पर लाभ',
                category: 'marketing',
                difficulty: 'intermediate'
            },
            {
                word: 'Target Audience',
                meaning: 'The specific group of people a campaign aims to reach',
                example: 'Our target audience is professionals aged 25-35.',
                hindiMeaning: 'लक्षित दर्शक - जिन लोगों के लिए अभियान है',
                category: 'marketing',
                difficulty: 'beginner'
            },
            {
                word: 'Outreach',
                meaning: 'Efforts to connect with potential customers',
                example: 'Our sales outreach resulted in 50 meetings.',
                hindiMeaning: 'पहुंच - संभावित ग्राहकों से संपर्क',
                category: 'marketing',
                difficulty: 'intermediate'
            }
        ]
    },
    {
        id: 'office-communication',
        name: 'Office Communication',
        icon: '💬',
        description: 'Common workplace communication terms',
        words: [
            {
                word: 'Follow up',
                meaning: 'To check on the status or continue a discussion',
                example: 'I will follow up with you tomorrow on this.',
                hindiMeaning: 'अनुवर्ती कार्रवाई - बाद में फिर से संपर्क करना',
                category: 'office-communication',
                difficulty: 'beginner'
            },
            {
                word: 'Loop in',
                meaning: 'To include someone in a conversation or email',
                example: 'Please loop in the manager on this email.',
                hindiMeaning: 'शामिल करना - किसी को बातचीत में जोड़ना',
                category: 'office-communication',
                difficulty: 'intermediate'
            },
            {
                word: 'Touch base',
                meaning: 'To briefly connect or communicate',
                example: 'Let\'s touch base next week about the project.',
                hindiMeaning: 'संक्षिप्त बातचीत करना',
                category: 'office-communication',
                difficulty: 'intermediate'
            },
            {
                word: 'Circle back',
                meaning: 'To return to a topic later',
                example: 'Let me circle back to you on this tomorrow.',
                hindiMeaning: 'बाद में वापस आना - विषय पर फिर से चर्चा करना',
                category: 'office-communication',
                difficulty: 'intermediate'
            },
            {
                word: 'Bandwidth',
                meaning: 'Available time or capacity to work on something',
                example: 'I don\'t have the bandwidth for this task right now.',
                hindiMeaning: 'उपलब्ध समय या क्षमता',
                category: 'office-communication',
                difficulty: 'advanced'
            },
            {
                word: 'Sync up',
                meaning: 'To align or coordinate with someone',
                example: 'Let\'s sync up before the client meeting.',
                hindiMeaning: 'तालमेल बिठाना',
                category: 'office-communication',
                difficulty: 'intermediate'
            }
        ]
    }
];

export function getVocabularyCategoryById(id: string): VocabularyCategory | undefined {
    return vocabularyCategories.find(cat => cat.id === id);
}

export function getAllVocabularyWords(): VocabularyWord[] {
    return vocabularyCategories.flatMap(cat => cat.words);
}

export function getTotalVocabularyCount(): number {
    return getAllVocabularyWords().length;
}
