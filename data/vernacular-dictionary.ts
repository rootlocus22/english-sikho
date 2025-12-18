export type DictionaryEntry = {
    word: string;
    slug: string;
    hindiMeaning: string;
    tamilMeaning: string;
    pronunciation: string;
    exampleSentence: string;
    businessContext: string;
    type: 'noun' | 'verb' | 'adjective';
};

export const VERNACULAR_DICTIONARY: DictionaryEntry[] = [
    {
        word: "Appraisal",
        slug: "appraisal",
        hindiMeaning: "Mulyankan (मूल्यांकन) / Performance Review",
        tamilMeaning: "Mathippeedu (மதிப்பீடு)",
        pronunciation: "uh-pray-zal",
        exampleSentence: "My annual appraisal is scheduled for tomorrow.",
        businessContext: "Used during yearly performance reviews to decide salary hikes and promotions.",
        type: "noun"
    },
    {
        word: "Increment",
        slug: "increment",
        hindiMeaning: "Vetan Vridhi (वेतन वृद्धि) / Salary Hike",
        tamilMeaning: "Oothiya Uyarvu (ஊதிய உயர்வு)",
        pronunciation: "in-kruh-ment",
        exampleSentence: "I received a 10% increment this year.",
        businessContext: "Refers to the increase in salary, usually given annually.",
        type: "noun"
    },
    {
        word: "Resignation",
        slug: "resignation",
        hindiMeaning: "Istifa (इस्तीफा)",
        tamilMeaning: "Rajinaama (ராஜினாமா)",
        pronunciation: "rez-ig-nay-shun",
        exampleSentence: "He submitted his resignation letter yesterday.",
        businessContext: " The formal act of leaving a job.",
        type: "noun"
    },
    {
        word: "Notice Period",
        slug: "notice-period",
        hindiMeaning: "Soochana Avadhi (सूचना अवधि)",
        tamilMeaning: "Arivippu Kaalam (அறிவிப்பு காலம்)",
        pronunciation: "noh-tis peer-ee-ud",
        exampleSentence: "My notice period is of 2 months.",
        businessContext: "The time you must work after resigning before you can leave the company.",
        type: "noun"
    },
    {
        word: "Deadline",
        slug: "deadline",
        hindiMeaning: "Antim Tithi (अंतिम तिथि)",
        tamilMeaning: "Kadaisi Thethi (கடைசி தேதி)",
        pronunciation: "ded-line",
        exampleSentence: "We need to finish this project before the deadline.",
        businessContext: "The final time or date by which a task must be completed.",
        type: "noun"
    },
    {
        word: "Hierarchy",
        slug: "hierarchy",
        hindiMeaning: "Padanukram (पदानुक्रम)",
        tamilMeaning: "Padinilai (படிநிலை)",
        pronunciation: "hy-rar-key",
        exampleSentence: "You should follow the corporate hierarchy while reporting issues.",
        businessContext: "The ranking system in an office (e.g., Junior -> Senior -> Manager).",
        type: "noun"
    },
    {
        word: "Colleague",
        slug: "colleague",
        hindiMeaning: "Sahkarmi (सहकर्मी)",
        tamilMeaning: "Sahapaniyaalar (சக பணியாளர்)",
        pronunciation: "kol-eeg",
        exampleSentence: "I am going for lunch with my colleagues.",
        businessContext: "A person you work with.",
        type: "noun"
    },
    {
        word: "Agenda",
        slug: "agenda",
        hindiMeaning: "Karyasuchi (कार्यसूची)",
        tamilMeaning: "Nikalchi Niral (நிகழ்ச்சி நிரல்)",
        pronunciation: "uh-jen-duh",
        exampleSentence: "What is the agenda for today's meeting?",
        businessContext: "A list of items to be discussed at a formal meeting.",
        type: "noun"
    },
    {
        word: "Minutes of Meeting",
        slug: "minutes-of-meeting",
        hindiMeaning: "Baithak ka vivaran (बैठक का विवरण)",
        tamilMeaning: "Koottam Kurippu (கூட்டம் குறிப்பு)",
        pronunciation: "min-its ov mee-ting",
        exampleSentence: "Please send the Moms (Minutes of Meeting) to everyone.",
        businessContext: "The written record of everything said and decided in a meeting.",
        type: "noun"
    },
    {
        word: "Reimbursement",
        slug: "reimbursement",
        hindiMeaning: "Pratipurti (प्रतिपूर्ति) / Wapas Paisa Milna",
        tamilMeaning: "Thirumpa Peruthal (திரும்ப பெறுதல்)",
        pronunciation: "ree-im-burs-ment",
        exampleSentence: "I have filed for travel reimbursement.",
        businessContext: "Getting money back for expenses you paid for work.",
        type: "noun"
    },
    {
        word: "Probation",
        slug: "probation",
        hindiMeaning: "Pariviksha (परिविक्षा) / Trial Period",
        tamilMeaning: "Pariksha Kaalam (பரீட்சை காலம்)",
        pronunciation: "pro-bay-shun",
        exampleSentence: "He is currently on a 6-month probation period.",
        businessContext: "A trial period for new employees before they become permanent.",
        type: "noun"
    },
    {
        word: "Termination",
        slug: "termination",
        hindiMeaning: "Barkhastgi (बर्खास्तगी) / Naukri se nikalna",
        tamilMeaning: "Velai Neekkam (வேலை நீக்கம்)",
        pronunciation: "tur-mi-nay-shun",
        exampleSentence: "Any violation of policy will lead to immediate termination.",
        businessContext: "The act of firing an employee.",
        type: "noun"
    },
    {
        word: "Designation",
        slug: "designation",
        hindiMeaning: "Pad (पद) / Job Title",
        tamilMeaning: "Padavi (பதவி)",
        pronunciation: "dez-ig-nay-shun",
        exampleSentence: "His designation changed from Lead to Manager.",
        businessContext: "Your official job title.",
        type: "noun"
    },
    {
        word: "Offer Letter",
        slug: "offer-letter",
        hindiMeaning: "Niyukti Patra (नियुक्ति पत्र)",
        tamilMeaning: "Velai Vaippu Kaditham (வேலை வாய்ப்பு கடிதம்)",
        pronunciation: "of-fer let-ter",
        exampleSentence: "I have accepted the offer letter.",
        businessContext: "Document confirming a job offer.",
        type: "noun"
    },
    {
        word: "Experience Letter",
        slug: "experience-letter",
        hindiMeaning: "Anubhav Praman Patra (अनुभव प्रमाण पत्र)",
        tamilMeaning: "Anubhava Sertificate (அனுபவ சான்றிதழ்)",
        pronunciation: "eks-peer-ee-ens let-ter",
        exampleSentence: "I need my experience letter to join the new company.",
        businessContext: "Document proving your past employment.",
        type: "noun"
    },
    {
        word: "Assets",
        slug: "assets",
        hindiMeaning: "Sampatti (संपत्ति) / Laptop etc.",
        tamilMeaning: "Sothugal (சொத்துக்கள்)",
        pronunciation: "as-sets",
        exampleSentence: "Please return all company assets before leaving.",
        businessContext: "Items owned by the company (Laptops, ID cards, etc.).",
        type: "noun"
    },
    {
        word: "KT (Knowledge Transfer)",
        slug: "knowledge-transfer",
        hindiMeaning: "Gyan Hastantaran (ज्ञान हस्तांतरण) / Kaam Samjhana",
        tamilMeaning: "Arivu Parimaatram (அறிவு பரிமாற்றம்)",
        pronunciation: "kay-tee",
        exampleSentence: "I will complete the KT to the new joiner by Friday.",
        businessContext: "Teaching your work to someone else before you leave.",
        type: "noun"
    },
    {
        word: "Escalate",
        slug: "escalate",
        hindiMeaning: "Upar pahunchana (ऊपर पहुँचाना)",
        tamilMeaning: "Melai Kondu Selluthal (மேலே கொண்டு செல்லுதல்)",
        pronunciation: "es-ka-late",
        exampleSentence: "I will have to escalate this issue to the manager.",
        businessContext: "Reporting a problem to a higher authority.",
        type: "verb"
    },
    {
        word: "Delegate",
        slug: "delegate",
        hindiMeaning: "Kaam saunpna (काम सौंपना)",
        tamilMeaning: "Pani Oppadaithal (பணி ஒப்படைத்தல்)",
        pronunciation: "del-i-gate",
        exampleSentence: "A good manager knows how to delegate tasks.",
        businessContext: "Assigning tasks to others.",
        type: "verb"
    },
    {
        word: "Brainstorm",
        slug: "brainstorm",
        hindiMeaning: "Vichaar-vimarsh (विचार-विमर्श)",
        tamilMeaning: "Sinthanai (சிந்தனை)",
        pronunciation: "brain-storm",
        exampleSentence: "Let's brainstorm some ideas for the campaign.",
        businessContext: "Discussing to generate creative ideas.",
        type: "verb"
    },
    {
        word: "Collaborate",
        slug: "collaborate",
        hindiMeaning: "Sahyog karna (सहयोग करना)",
        tamilMeaning: "Otrumaiyaga Irunthu (ஒற்றுமையாக இருந்து)",
        pronunciation: "kuh-lab-uh-rate",
        exampleSentence: "We need to collaborate with the design team.",
        businessContext: "Working together with others.",
        type: "verb"
    },
    {
        word: "Negotiate",
        slug: "negotiate",
        hindiMeaning: "Mol-bhaav karna (मोल-भाव करना)",
        tamilMeaning: "Peram Pesuthal (பேரம் பேசுதல்)",
        pronunciation: "nuh-go-she-ate",
        exampleSentence: "He tried to negotiate a higher salary.",
        businessContext: "Discussing to reach an agreement (salary, contract).",
        type: "verb"
    },
    {
        word: "Implement",
        slug: "implement",
        hindiMeaning: "Laagu karna (लागू करना)",
        tamilMeaning: "Seyalpaduthal (செயல்படுத்தல்)",
        pronunciation: "im-pluh-ment",
        exampleSentence: "We will implement the new policy from next month.",
        businessContext: "Putting a plan into action.",
        type: "verb"
    },
    {
        word: "Facilitate",
        slug: "facilitate",
        hindiMeaning: "Suvidha dena (सुविधा देना)",
        tamilMeaning: "Vasathi Seithu Tharuthal (வசதி செய்து தருதல்)",
        pronunciation: "fuh-sil-i-tate",
        exampleSentence: "HR will facilitate the training session.",
        businessContext: "Making a process easier.",
        type: "verb"
    },
    {
        word: "Quarterly",
        slug: "quarterly",
        hindiMeaning: "Timahi (तिमाही)",
        tamilMeaning: "Kaalandu (காலாண்டு)",
        pronunciation: "kwor-tur-lee",
        exampleSentence: "We have our quarterly results meeting today.",
        businessContext: "Happening every 3 months.",
        type: "adjective"
    },
    {
        word: "Annual",
        slug: "annual",
        hindiMeaning: "Varshik (वार्षिक)",
        tamilMeaning: "Varudaanthira (வருடாந்திர)",
        pronunciation: "an-yoo-ul",
        exampleSentence: "The company's annual turnover is 5 Crores.",
        businessContext: "Happening once a year.",
        type: "adjective"
    },
    {
        word: "Mandatory",
        slug: "mandatory",
        hindiMeaning: "Anivarya (अनिवार्य)",
        tamilMeaning: "Kattayam (கட்டாயம்)",
        pronunciation: "man-duh-tor-ee",
        exampleSentence: "This training is mandatory for all employees.",
        businessContext: "Compulsory, you have to do it.",
        type: "adjective"
    },
    {
        word: "Optional",
        slug: "optional",
        hindiMeaning: "Vaikalpik (वैकल्पिक)",
        tamilMeaning: "Viruppam (விருப்பம்)",
        pronunciation: "op-shun-ul",
        exampleSentence: "Attending the party is optional.",
        businessContext: "Not compulsory.",
        type: "adjective"
    },
    {
        word: "Confidential",
        slug: "confidential",
        hindiMeaning: "Gupt (गुप्त)",
        tamilMeaning: "Ragasiyam (ரகசியம்)",
        pronunciation: "kon-fi-den-shul",
        exampleSentence: "Keep this data confidential.",
        businessContext: "Secret, meant for limited people only.",
        type: "adjective"
    },
    {
        word: "Proactive",
        slug: "proactive",
        hindiMeaning: "Sakriya (सक्रिय)",
        tamilMeaning: "Munnecharikkai (முன்னெச்சரிக்கை)",
        pronunciation: "pro-ak-tiv",
        exampleSentence: "Be proactive and solve issues before they become big.",
        businessContext: "Taking action before a problem happens.",
        type: "adjective"
    },
    {
        word: "Attrition",
        slug: "attrition",
        hindiMeaning: "Karmachariyon ka jana (कर्मचारियों का जाना)",
        tamilMeaning: "Velai Vittu Selluthal (வேலை விட்டு செல்லுதல்)",
        pronunciation: "uh-trish-un",
        exampleSentence: "The attrition rate in our team is high.",
        businessContext: "Rate at which employees leave a company.",
        type: "noun"
    },
    {
        word: "Bandwidth",
        slug: "bandwidth",
        hindiMeaning: "Kaam karne ki shamta (काम करने की क्षमता)",
        tamilMeaning: "Velai Thiran (வேலை திறன்)",
        pronunciation: "band-width",
        exampleSentence: "I don't have the bandwidth to take on a new project.",
        businessContext: "Capacity or time available to do work.",
        type: "noun"
    },
    {
        word: "Deploy",
        slug: "deploy",
        hindiMeaning: "Tainat karna (तैनात करना) / Live karna",
        tamilMeaning: "Payanpaduthu (பயன்படுத்து)",
        pronunciation: "dih-ploy",
        exampleSentence: "We will deploy the code tonight.",
        businessContext: "To bring a resource or software into action.",
        type: "verb"
    },
    {
        word: "Sync",
        slug: "sync",
        hindiMeaning: "Taal-mail (ताल-मेल) / Discussion",
        tamilMeaning: "Inai (இணை)",
        pronunciation: "sink",
        exampleSentence: "Let's sync up later today.",
        businessContext: "A short meeting to align on updates.",
        type: "verb"
    },
    {
        word: "Deliverable",
        slug: "deliverable",
        hindiMeaning: "Parinam (परिणाम) / Output",
        tamilMeaning: "Mudivu (முடிவு)",
        pronunciation: "dih-liv-er-uh-bul",
        exampleSentence: "The report is a key deliverable for this week.",
        businessContext: "A tangible result required by the project.",
        type: "noun"
    },
    {
        word: "Scalable",
        slug: "scalable",
        hindiMeaning: "Badhane yogya (बढ़ाने योग्य)",
        tamilMeaning: "Virivakka Koodiya (விரிவாக்கக்கூடிய)",
        pronunciation: "skay-luh-bul",
        exampleSentence: "We need a scalable solution for future growth.",
        businessContext: "Able to handle growth without breaking.",
        type: "adjective"
    },
    {
        word: "Benchmark",
        slug: "benchmark",
        hindiMeaning: "Manak (मानक)",
        tamilMeaning: "Tharam (தரம்)",
        pronunciation: "bench-mark",
        exampleSentence: "This sales figure is the new benchmark.",
        businessContext: "A standard point of reference.",
        type: "noun"
    },
    {
        word: "Incentive",
        slug: "incentive",
        hindiMeaning: "Protsahan (प्रोत्साहन)",
        tamilMeaning: "Ookkuvippu (ஊக்குவிப்பு)",
        pronunciation: "in-sen-tiv",
        exampleSentence: "The sales team got a huge incentive this month.",
        businessContext: "Reward to encourage better performance.",
        type: "noun"
    },
    {
        word: "Pipeline",
        slug: "pipeline",
        hindiMeaning: "Prakriya mein (प्रक्रिया में)",
        tamilMeaning: "Kuzhai (குழாய் - Literal) / Process",
        pronunciation: "pipe-line",
        exampleSentence: "We have 3 new deals in the pipeline.",
        businessContext: "Work or deals that are in progress.",
        type: "noun"
    },
    {
        word: "Stakeholder",
        slug: "stakeholder",
        hindiMeaning: "Hitdharak (हितधारक)",
        tamilMeaning: "Pangudharar (பங்குதாரர்)",
        pronunciation: "stake-hold-er",
        exampleSentence: "We need to update all key stakeholders.",
        businessContext: "Anyone interested or affected by the project.",
        type: "noun"
    },
    {
        word: "Bottleneck",
        slug: "bottleneck",
        hindiMeaning: "Badha (बाधा)",
        tamilMeaning: "Thadai (தடை)",
        pronunciation: "bot-ul-nek",
        exampleSentence: "The approval process is a major bottleneck.",
        businessContext: "A point of congestion delaying the process.",
        type: "noun"
    }
];
