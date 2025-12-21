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
    },
    // 100 More Common Business Words
    {
        word: "Acknowledge",
        slug: "acknowledge",
        hindiMeaning: "Sweekar karna (स्वीकार करना)",
        tamilMeaning: "Oppukolluthal (ஒப்புக்கொள்ளுதல்)",
        pronunciation: "ak-nol-ij",
        exampleSentence: "Please acknowledge receipt of this email.",
        businessContext: "Confirming that you received or understood something.",
        type: "verb"
    },
    {
        word: "Leverage",
        slug: "leverage",
        hindiMeaning: "Istemaal karna (इस्तेमाल करना) / Fayda uthana",
        tamilMeaning: "Payanpaduthuthal (பயன்படுத்துதல்)",
        pronunciation: "lev-er-ij",
        exampleSentence: "We can leverage our existing network to grow.",
        businessContext: "Using something to maximum advantage.",
        type: "verb"
    },
    {
        word: "Align",
        slug: "align",
        hindiMeaning: "Taal-mel baithana (ताल-मेल बैठाना)",
        tamilMeaning: "Ottrumaippaduthal (ஒத்துமைப்படுத்தல்)",
        pronunciation: "uh-line",
        exampleSentence: "Let's align our goals before proceeding.",
        businessContext: "Making sure everyone is on the same page.",
        type: "verb"
    },
    {
        word: "Prioritize",
        slug: "prioritize",
        hindiMeaning: "Prathamikta dena (प्राथमिकता देना)",
        tamilMeaning: "Munnurai Tharuthuthal (முன்னுரை தருதுதல்)",
        pronunciation: "pri-or-i-tize",
        exampleSentence: "We need to prioritize urgent tasks first.",
        businessContext: "Arranging by importance or urgency.",
        type: "verb"
    },
    {
        word: "Coordinate",
        slug: "coordinate",
        hindiMeaning: "Samanvay karna (समन्वय करना)",
        tamilMeaning: "Oppanai Seithal (ஒப்பனை செய்தல்)",
        pronunciation: "ko-or-di-nate",
        exampleSentence: "I will coordinate with the marketing team.",
        businessContext: "Organizing different parts to work together.",
        type: "verb"
    },
    {
        word: "Execute",
        slug: "execute",
        hindiMeaning: "Karya karna (कार्य करना) / Execute karna",
        tamilMeaning: "Seyalpaduthal (செயல்படுத்தல்)",
        pronunciation: "ek-si-kyoot",
        exampleSentence: "Let's execute the plan immediately.",
        businessContext: "Putting a plan into action.",
        type: "verb"
    },
    {
        word: "Optimize",
        slug: "optimize",
        hindiMeaning: "Sudharna (सुधारना) / Best banana",
        tamilMeaning: "Menmaipaduthal (மேன்மைப்படுத்தல்)",
        pronunciation: "op-ti-mize",
        exampleSentence: "We need to optimize the workflow.",
        businessContext: "Making something as effective as possible.",
        type: "verb"
    },
    {
        word: "Streamline",
        slug: "streamline",
        hindiMeaning: "Saral banana (सरल बनाना)",
        tamilMeaning: "Elitaakkuthal (எளிதாக்குதல்)",
        pronunciation: "stream-line",
        exampleSentence: "Let's streamline this process to save time.",
        businessContext: "Making a process simpler and more efficient.",
        type: "verb"
    },
    {
        word: "Consolidate",
        slug: "consolidate",
        hindiMeaning: "Ekatrit karna (एकत्रित करना)",
        tamilMeaning: "Ottrumaippaduthal (ஒற்றுமைப்படுத்தல்)",
        pronunciation: "kon-sol-i-date",
        exampleSentence: "We will consolidate all reports into one document.",
        businessContext: "Combining multiple things into one.",
        type: "verb"
    },
    {
        word: "Clarify",
        slug: "clarify",
        hindiMeaning: "Spasht karna (स्पष्ट करना)",
        tamilMeaning: "Thelivupaduthal (தெளிவுபடுத்தல்)",
        pronunciation: "klar-i-fy",
        exampleSentence: "Can you clarify what you mean?",
        businessContext: "Making something clearer or easier to understand.",
        type: "verb"
    },
    {
        word: "Approve",
        slug: "approve",
        hindiMeaning: "Anumodan karna (अनुमोदन करना)",
        tamilMeaning: "Anumathithal (அனுமதித்தல்)",
        pronunciation: "uh-proov",
        exampleSentence: "My manager approved my leave request.",
        businessContext: "Officially agreeing to something.",
        type: "verb"
    },
    {
        word: "Revise",
        slug: "revise",
        hindiMeaning: "Sanshodhan karna (संशोधन करना)",
        tamilMeaning: "Thiruththuthal (திருத்துதல்)",
        pronunciation: "ri-vize",
        exampleSentence: "Please revise the document based on feedback.",
        businessContext: "Making changes to improve something.",
        type: "verb"
    },
    {
        word: "Monitor",
        slug: "monitor",
        hindiMeaning: "Nigrani karna (निगरानी करना)",
        tamilMeaning: "Kaankaanippu Seithal (கண்காணிப்பு செய்தல்)",
        pronunciation: "mon-i-tor",
        exampleSentence: "We need to monitor the progress daily.",
        businessContext: "Keeping track of something over time.",
        type: "verb"
    },
    {
        word: "Analyze",
        slug: "analyze",
        hindiMeaning: "Vishleshan karna (विश्लेषण करना)",
        tamilMeaning: "Aayvu Seithal (ஆய்வு செய்தல்)",
        pronunciation: "an-uh-lize",
        exampleSentence: "Let's analyze the data before making a decision.",
        businessContext: "Examining something in detail.",
        type: "verb"
    },
    {
        word: "Forecast",
        slug: "forecast",
        hindiMeaning: "Bhavishyavani (भविष्यवाणी)",
        tamilMeaning: "Munnurai (முன்னுரை)",
        pronunciation: "for-kast",
        exampleSentence: "Our sales forecast for next quarter is positive.",
        businessContext: "Predicting future trends or outcomes.",
        type: "verb"
    },
    {
        word: "Suggest",
        slug: "suggest",
        hindiMeaning: "Sujhav dena (सुझाव देना)",
        tamilMeaning: "Parindurai Seithal (பரிந்துரை செய்தல்)",
        pronunciation: "suhg-jest",
        exampleSentence: "I suggest we meet tomorrow to discuss this.",
        businessContext: "Proposing an idea for consideration.",
        type: "verb"
    },
    {
        word: "Recommend",
        slug: "recommend",
        hindiMeaning: "Sipharish karna (सिफारिश करना)",
        tamilMeaning: "Parindurai (பரிந்துரை)",
        pronunciation: "rek-uh-mend",
        exampleSentence: "I recommend using this approach.",
        businessContext: "Advising a particular course of action.",
        type: "verb"
    },
    {
        word: "Postpone",
        slug: "postpone",
        hindiMeaning: "Sthagit karna (स्थगित करना) / Delay karna",
        tamilMeaning: "Pothivaithal (பொதிவைத்தல்)",
        pronunciation: "post-pone",
        exampleSentence: "We need to postpone the meeting to next week.",
        businessContext: "Delaying something to a later time.",
        type: "verb"
    },
    {
        word: "Reschedule",
        slug: "reschedule",
        hindiMeaning: "Samay badalna (समय बदलना)",
        tamilMeaning: "Maatru Nerarn Ethuthal (மாற்று நேரம் எடுத்தல்)",
        pronunciation: "ree-sked-yool",
        exampleSentence: "Can we reschedule our call to 3 PM?",
        businessContext: "Changing the time of a planned event.",
        type: "verb"
    },
    {
        word: "Comply",
        slug: "comply",
        hindiMeaning: "Palan karna (पालन करना)",
        tamilMeaning: "Kanippidippaduthal (கணிப்பிடிப்படுத்தல்)",
        pronunciation: "kom-ply",
        exampleSentence: "We must comply with all regulations.",
        businessContext: "Following rules or policies.",
        type: "verb"
    },
    {
        word: "Exceed",
        slug: "exceed",
        hindiMeaning: "Adhik hona (अधिक होना) / Paar karna",
        tamilMeaning: "Meera Seithal (மீற செய்தல்)",
        pronunciation: "ik-seed",
        exampleSentence: "We exceeded our sales target this month.",
        businessContext: "Going beyond a limit or expectation.",
        type: "verb"
    },
    {
        word: "Achieve",
        slug: "achieve",
        hindiMeaning: "Prapt karna (प्राप्त करना)",
        tamilMeaning: "Adaithal (அடைதல்)",
        pronunciation: "uh-cheev",
        exampleSentence: "We achieved all our quarterly goals.",
        businessContext: "Successfully reaching a goal.",
        type: "verb"
    },
    {
        word: "Milestone",
        slug: "milestone",
        hindiMeaning: "Mahatvapoorn lakshya (महत्वपूर्ण लक्ष्य)",
        tamilMeaning: "Mukiya Nirkaal (முக்கிய நிர்கால்)",
        pronunciation: "mile-stone",
        exampleSentence: "Completing the prototype is a major milestone.",
        businessContext: "An important stage or event in a process.",
        type: "noun"
    },
    {
        word: "Threshold",
        slug: "threshold",
        hindiMeaning: "Seema (सीमा) / Dehri",
        tamilMeaning: "Nilai (நிலை)",
        pronunciation: "thresh-old",
        exampleSentence: "We've crossed the profitability threshold.",
        businessContext: "A minimum level or starting point.",
        type: "noun"
    },
    {
        word: "Capacity",
        slug: "capacity",
        hindiMeaning: "Kshamata (क्षमता)",
        tamilMeaning: "Thiran (திறன்)",
        pronunciation: "kuh-pas-i-tee",
        exampleSentence: "The team is working at full capacity.",
        businessContext: "The maximum amount something can handle.",
        type: "noun"
    },
    {
        word: "Redundancy",
        slug: "redundancy",
        hindiMeaning: "Anavashyakta (अनावश्यकता) / Naukri khatam",
        tamilMeaning: "Thenavaiyillaamai (தேவையில்லாமை)",
        pronunciation: "rih-dun-duhn-see",
        exampleSentence: "The company announced redundancies due to budget cuts.",
        businessContext: "Being let go from a job (UK term).",
        type: "noun"
    },
    {
        word: "Compensation",
        slug: "compensation",
        hindiMeaning: "Mukavza (मुकाव्ज़ा) / Salary Package",
        tamilMeaning: "Eeridu (ஈடு)",
        pronunciation: "kom-pen-say-shun",
        exampleSentence: "The compensation package includes benefits.",
        businessContext: "Payment and benefits for work.",
        type: "noun"
    },
    {
        word: "Onboarding",
        slug: "onboarding",
        hindiMeaning: "Naye karmachari ko shamil karna (नये कर्मचारी को शामिल करना)",
        tamilMeaning: "Puthiya Velaikaarai Seruthal (புதிய வேலைக்காரை சேர்த்தல்)",
        pronunciation: "on-bor-ding",
        exampleSentence: "The onboarding process takes one week.",
        businessContext: "Integrating new employees into a company.",
        type: "noun"
    },
    {
        word: "Offboarding",
        slug: "offboarding",
        hindiMeaning: "Naukri chodne ki prakriya (नौकरी छोड़ने की प्रक्रिया)",
        tamilMeaning: "Velai Vittu Pogum Murai (வேலை விட்டு போகும் முறை)",
        pronunciation: "off-bor-ding",
        exampleSentence: "Offboarding includes returning company assets.",
        businessContext: "Process when employee leaves company.",
        type: "noun"
    },
    {
        word: "Handover",
        slug: "handover",
        hindiMeaning: "Soampna (सौंपना) / Transfer karna",
        tamilMeaning: "Oppuduthal (ஒப்புடுதல்)",
        pronunciation: "hand-oh-ver",
        exampleSentence: "Please complete the handover before your last day.",
        businessContext: "Transferring responsibilities to someone else.",
        type: "noun"
    },
    {
        word: "Stakeholder",
        slug: "stakeholder-meeting",
        hindiMeaning: "Hitdharak baithak (हितधारक बैठक)",
        tamilMeaning: "Pangudharar Kootam (பங்குதாரர் கூட்டம்)",
        pronunciation: "stake-hold-er mee-ting",
        exampleSentence: "We have a stakeholder meeting on Friday.",
        businessContext: "Meeting with interested parties.",
        type: "noun"
    },
    {
        word: "Feedback",
        slug: "feedback",
        hindiMeaning: "Pratikriya (प्रतिक्रिया)",
        tamilMeaning: "Pinnottu (பின்னோட்டு)",
        pronunciation: "feed-bak",
        exampleSentence: "I need your feedback on this proposal.",
        businessContext: "Comments or suggestions for improvement.",
        type: "noun"
    },
    {
        word: "Actionable",
        slug: "actionable",
        hindiMeaning: "Karya yogya (कार्य योग्य)",
        tamilMeaning: "Seyalbaada Koodiya (செயல்படக்கூடிய)",
        pronunciation: "ak-shun-uh-bul",
        exampleSentence: "Please provide actionable insights.",
        businessContext: "Something that can be acted upon.",
        type: "adjective"
    },
    {
        word: "Transparent",
        slug: "transparent",
        hindiMeaning: "Padarshi (पारदर्शी) / Khula",
        tamilMeaning: "Thelivu (தெளிவு)",
        pronunciation: "trans-pair-ent",
        exampleSentence: "We believe in transparent communication.",
        businessContext: "Open and honest, no hiding.",
        type: "adjective"
    },
    {
        word: "Accountable",
        slug: "accountable",
        hindiMeaning: "Jimmedar (जिम्मेदार)",
        tamilMeaning: "Pothuppu Ulla (பொறுப்புள்ள)",
        pronunciation: "uh-kown-tuh-bul",
        exampleSentence: "You are accountable for meeting the deadline.",
        businessContext: "Being responsible for results.",
        type: "adjective"
    },
    {
        word: "Sustainable",
        slug: "sustainable",
        hindiMeaning: "Tikau (टिकाऊ)",
        tamilMeaning: "Niranthara (நிரந்தர)",
        pronunciation: "suh-stay-nuh-bul",
        exampleSentence: "We need a sustainable business model.",
        businessContext: "Able to continue long-term.",
        type: "adjective"
    },
    {
        word: "Feasible",
        slug: "feasible",
        hindiMeaning: "Sambhav (संभव) / Practical",
        tamilMeaning: "Thiranarukulla (திறனறுகுள்ள)",
        pronunciation: "fee-zuh-bul",
        exampleSentence: "Is this timeline feasible?",
        businessContext: "Possible to do or achieve.",
        type: "adjective"
    },
    {
        word: "Viable",
        slug: "viable",
        hindiMeaning: "Vyavaharik (व्यवहारिक)",
        tamilMeaning: "Seyalpadakoodiya (செயல்படக்கூடிய)",
        pronunciation: "vy-uh-bul",
        exampleSentence: "This is a viable solution.",
        businessContext: "Capable of working successfully.",
        type: "adjective"
    },
    {
        word: "Efficient",
        slug: "efficient",
        hindiMeaning: "Kushal (कुशल)",
        tamilMeaning: "Virivanalla (விரிவணல்ல)",
        pronunciation: "ih-fish-unt",
        exampleSentence: "We need a more efficient process.",
        businessContext: "Doing things without wasting time/resources.",
        type: "adjective"
    },
    {
        word: "Effective",
        slug: "effective",
        hindiMeaning: "Prabhavshali (प्रभावशाली)",
        tamilMeaning: "Vilaivatra (விளைவாற்ற)",
        pronunciation: "ih-fek-tiv",
        exampleSentence: "This strategy is very effective.",
        businessContext: "Producing the desired result.",
        type: "adjective"
    },
    {
        word: "Crucial",
        slug: "crucial",
        hindiMeaning: "Mahatvapoorn (महत्वपूर्ण) / Atyanth jaruri",
        tamilMeaning: "Miga Mukiyam (மிக முக்கியம்)",
        pronunciation: "kroo-shul",
        exampleSentence: "This meeting is crucial for our project.",
        businessContext: "Extremely important.",
        type: "adjective"
    },
    {
        word: "Tentative",
        slug: "tentative",
        hindiMeaning: "Astitvik (अस्थायी) / Pakka nahi",
        tamilMeaning: "Nirayan Illatha (நிரயன் இல்லாத)",
        pronunciation: "ten-tuh-tiv",
        exampleSentence: "This is a tentative date, not confirmed yet.",
        businessContext: "Not certain or fixed.",
        type: "adjective"
    },
    {
        word: "Urgent",
        slug: "urgent",
        hindiMeaning: "Tatkaal (तत्काल) / Zaruri",
        tamilMeaning: "Athiviraivu (அதிவிரைவு)",
        pronunciation: "ur-junt",
        exampleSentence: "This is an urgent matter.",
        businessContext: "Requiring immediate attention.",
        type: "adjective"
    },
    {
        word: "Confidential",
        slug: "confidential-info",
        hindiMeaning: "Gupniya jaankari (गोपनीय जानकारी)",
        tamilMeaning: "Ragasiya Thagaval (ரகசிய தகவல்)",
        pronunciation: "kon-fi-den-shul",
        exampleSentence: "This document is confidential.",
        businessContext: "Private information not to be shared.",
        type: "adjective"
    },
    {
        word: "Preliminary",
        slug: "preliminary",
        hindiMeaning: "Prarambhik (प्रारंभिक)",
        tamilMeaning: "Munnorai (முன்னோரை)",
        pronunciation: "prih-lim-ih-ner-ee",
        exampleSentence: "This is just a preliminary meeting.",
        businessContext: "Initial or preparatory.",
        type: "adjective"
    },
    {
        word: "Comprehensive",
        slug: "comprehensive",
        hindiMeaning: "Vyapak (व्यापक) / Poora",
        tamilMeaning: "Mithantha (மிதந்த)",
        pronunciation: "kom-prih-hen-siv",
        exampleSentence: "We need a comprehensive report.",
        businessContext: "Complete and including everything.",
        type: "adjective"
    },
    {
        word: "Initiative",
        slug: "initiative",
        hindiMeaning: "Pahal (पहल)",
        tamilMeaning: "Munmozhivu (முன்னோரை)",
        pronunciation: "ih-nish-uh-tiv",
        exampleSentence: "Taking initiative is crucial for leadership.",
        businessContext: "Ability to start things on your own.",
        type: "noun"
    },
    {
        word: "Accountability",
        slug: "accountability",
        hindiMeaning: "Zimmedari (जिम्मेदारी)",
        tamilMeaning: "Pothuppu (பொறுப்பு)",
        pronunciation: "uh-kown-tuh-bil-i-tee",
        exampleSentence: "There's a lack of accountability in the team.",
        businessContext: "Being responsible for outcomes.",
        type: "noun"
    },
    {
        word: "Transparency",
        slug: "transparency",
        hindiMeaning: "Pardarsita (पारदर्शिता)",
        tamilMeaning: "Thelivuthanmai (தெளிவுத்தன்மை)",
        pronunciation: "trans-pair-en-see",
        exampleSentence: "We value transparency in all our dealings.",
        businessContext: "Openness and honesty in communication.",
        type: "noun"
    },
    {
        word: "Productivity",
        slug: "productivity",
        hindiMeaning: "Utpaadakta (उत्पादकता)",
        tamilMeaning: "Uthiravi Thiran (உற்பத்தி திறன்)",
        pronunciation: "pro-duk-tiv-i-tee",
        exampleSentence: "Remote work has increased productivity.",
        businessContext: "Amount of work accomplished.",
        type: "noun"
    },
    {
        word: "Flexibility",
        slug: "flexibility",
        hindiMeaning: "Lamcheelpan (लचीलापन)",
        tamilMeaning: "Velithiran (வேளித்திறன்)",
        pronunciation: "flek-suh-bil-i-tee",
        exampleSentence: "The company offers flexibility in work hours.",
        businessContext: "Ability to adapt or change.",
        type: "noun"
    },
    {
        word: "Consistency",
        slug: "consistency",
        hindiMeaning: "Niyamit (नियमित) / Same standard",
        tamilMeaning: "Ottrumai (ஒத்துமை)",
        pronunciation: "kun-sis-ten-see",
        exampleSentence: "Consistency in quality is important.",
        businessContext: "Maintaining the same standard.",
        type: "noun"
    },
    {
        word: "Diversity",
        slug: "diversity",
        hindiMeaning: "Vividhata (विविधता)",
        tamilMeaning: "Palhagavu (பல்வகைவு)",
        pronunciation: "dih-vur-si-tee",
        exampleSentence: "Our company values diversity and inclusion.",
        businessContext: "Having people from different backgrounds.",
        type: "noun"
    },
    {
        word: "Inclusion",
        slug: "inclusion",
        hindiMeaning: "Samaavesh (समावेश)",
        tamilMeaning: "Serththal (சேர்த்தல்)",
        pronunciation: "in-kloo-zhun",
        exampleSentence: "Inclusion means everyone feels valued.",
        businessContext: "Making everyone feel welcome and valued.",
        type: "noun"
    },
    {
        word: "Innovation",
        slug: "innovation",
        hindiMeaning: "Navik (नवीक) / Naya tareeka",
        tamilMeaning: "Pudhuma (புதுமை)",
        pronunciation: "in-uh-vay-shun",
        exampleSentence: "Our company encourages innovation.",
        businessContext: "Introducing new ideas or methods.",
        type: "noun"
    },
    {
        word: "Disruption",
        slug: "disruption",
        hindiMeaning: "Vyavadhaan (व्यवधान)",
        tamilMeaning: "Thuvakku (துவக்கு)",
        pronunciation: "dis-rup-shun",
        exampleSentence: "Sorry for the disruption during the call.",
        businessContext: "An interruption or disturbance.",
        type: "noun"
    },
    {
        word: "Synergy",
        slug: "synergy",
        hindiMeaning: "Sahakaarita (सहकारिता) / Combined effect",
        tamilMeaning: "Ottrumaippoga (ஒற்றுமைப்போக)",
        pronunciation: "sin-er-jee",
        exampleSentence: "The merger will create synergy between both companies.",
        businessContext: "Combined effort producing better results.",
        type: "noun"
    },
    {
        word: "Compliance",
        slug: "compliance",
        hindiMeaning: "Anupalan (अनुपालन)",
        tamilMeaning: "Ottikolluthal (ஒத்திக்கொள்ளுதல்)",
        pronunciation: "kum-ply-uns",
        exampleSentence: "All employees must follow compliance guidelines.",
        businessContext: "Following rules and regulations.",
        type: "noun"
    },
    {
        word: "Retention",
        slug: "retention",
        hindiMeaning: "Dharan (धारण) / Employees ko rokna",
        tamilMeaning: "Niruthuthal (நிறுத்துதல்)",
        pronunciation: "rih-ten-shun",
        exampleSentence: "Employee retention is a priority.",
        businessContext: "Keeping employees from leaving.",
        type: "noun"
    },
    {
        word: "Acquisition",
        slug: "acquisition",
        hindiMeaning: "Adhigrahan (अधिग्रहण) / Company khareedna",
        tamilMeaning: "Vaanguthal (வாங்குதல்)",
        pronunciation: "ak-wih-zish-un",
        exampleSentence: "The acquisition was announced yesterday.",
        businessContext: "Buying another company.",
        type: "noun"
    },
    {
        word: "Merger",
        slug: "merger",
        hindiMeaning: "Vilan (विलीन) / Companies ka jodna",
        tamilMeaning: "Iraivu (இரைவு)",
        pronunciation: "mur-jer",
        exampleSentence: "The merger created a larger company.",
        businessContext: "Two companies joining to form one.",
        type: "noun"
    },
    {
        word: "Downsizing",
        slug: "downsizing",
        hindiMeaning: "Choti karna (छोटी करना) / Employees ko hatana",
        tamilMeaning: "Sirithuppaduthal (சிறிதுப்படுத்தல்)",
        pronunciation: "down-size-ing",
        exampleSentence: "The company is downsizing due to losses.",
        businessContext: "Reducing number of employees.",
        type: "noun"
    },
    {
        word: "Outsource",
        slug: "outsource",
        hindiMeaning: "Bahar se kaam karana (बाहर से काम करना)",
        tamilMeaning: "Veliyil Velaiseiya (வெளியில் வேலைசெய்ய)",
        pronunciation: "out-sors",
        exampleSentence: "We outsource our customer support.",
        businessContext: "Hiring external people/companies for work.",
        type: "verb"
    },
    {
        word: "Benchmark",
        slug: "benchmarking",
        hindiMeaning: "Standard se tulana (स्टैंडर्ड से तुलना)",
        tamilMeaning: "Thara Oppeediyai (தர ஒப்பீட்டை)",
        pronunciation: "bench-mark-ing",
        exampleSentence: "We are benchmarking against industry leaders.",
        businessContext: "Comparing against a standard.",
        type: "noun"
    },
    {
        word: "Projection",
        slug: "projection",
        hindiMeaning: "Pravartan (प्रवर्तन) / Future estimate",
        tamilMeaning: "Ethirpaarppu (எதிர்பார்ப்பு)",
        pronunciation: "pruh-jek-shun",
        exampleSentence: "Our revenue projection for next year is optimistic.",
        businessContext: "Estimated future outcome.",
        type: "noun"
    },
    {
        word: "Turnover",
        slug: "turnover",
        hindiMeaning: "Bikhri (बिक्री) / Total revenue",
        tamilMeaning: "Muga Virpanai (மொத்த விற்பனை)",
        pronunciation: "turn-oh-ver",
        exampleSentence: "Our annual turnover is 10 crores.",
        businessContext: "Total sales or revenue in a period.",
        type: "noun"
    },
    {
        word: "Revenue",
        slug: "revenue",
        hindiMeaning: "Aay (आय) / Kamai",
        tamilMeaning: "Varumaanam (வருமானம்)",
        pronunciation: "rev-uh-noo",
        exampleSentence: "The company's revenue has increased by 20%.",
        businessContext: "Total income from business activities.",
        type: "noun"
    },
    {
        word: "Expenditure",
        slug: "expenditure",
        hindiMeaning: "Vyay (व्यय) / Kharcha",
        tamilMeaning: "Selvavu (செலவு)",
        pronunciation: "iks-pen-di-chur",
        exampleSentence: "We need to reduce our expenditure.",
        businessContext: "Money spent.",
        type: "noun"
    },
    {
        word: "Budget",
        slug: "budget",
        hindiMeaning: "Baajat (बजट)",
        tamilMeaning: "Selvuthittam (செலவுத்திட்டம்)",
        pronunciation: "buj-it",
        exampleSentence: "We're working within a tight budget.",
        businessContext: "Planned spending for a period.",
        type: "noun"
    },
    {
        word: "Quota",
        slug: "quota",
        hindiMeaning: "Nirnaya (निर्धारण) / Fixed target",
        tamilMeaning: "Nirainthu (நிரைந்து)",
        pronunciation: "kwoh-tuh",
        exampleSentence: "The sales team met their quarterly quota.",
        businessContext: "A fixed minimum or maximum amount.",
        type: "noun"
    },
    {
        word: "Target",
        slug: "target",
        hindiMeaning: "Lakshya (लक्ष्य)",
        tamilMeaning: "Kuruppu (குறிப்பு)",
        pronunciation: "tar-get",
        exampleSentence: "We exceeded our sales target this month.",
        businessContext: "A goal to be achieved.",
        type: "noun"
    },
    {
        word: "Objective",
        slug: "objective",
        hindiMeaning: "Uddeshy (उद्देश्य)",
        tamilMeaning: "Nehokku (நோக்கு)",
        pronunciation: "ub-jek-tiv",
        exampleSentence: "Our main objective is customer satisfaction.",
        businessContext: "A specific goal or aim.",
        type: "noun"
    },
    {
        word: "Strategy",
        slug: "strategy",
        hindiMeaning: "Ranneeti (रणनीति)",
        tamilMeaning: "Illai (இலாய்)",
        pronunciation: "strat-uh-jee",
        exampleSentence: "We need a clear marketing strategy.",
        businessContext: "A plan to achieve a goal.",
        type: "noun"
    },
    {
        word: "Tactic",
        slug: "tactic",
        hindiMeaning: "Yukthi (युक्ति)",
        tamilMeaning: "Uththi (உத்தி)",
        pronunciation: "tak-tik",
        exampleSentence: "This is just a short-term tactic.",
        businessContext: "A method to achieve something.",
        type: "noun"
    },
    {
        word: "Roadmap",
        slug: "roadmap",
        hindiMeaning: "Yojana (योजना) / Plan",
        tamilMeaning: "Vazhithittam (வழித்திட்டம்)",
        pronunciation: "rohd-map",
        exampleSentence: "Here's our product roadmap for this year.",
        businessContext: "A plan showing steps to reach a goal.",
        type: "noun"
    },
    {
        word: "Framework",
        slug: "framework",
        hindiMeaning: "Dhanchaa (ढांचा)",
        tamilMeaning: "Kadaamaipu (கடாமைபு)",
        pronunciation: "fraym-wurk",
        exampleSentence: "We're using an agile framework.",
        businessContext: "A basic structure or set of guidelines.",
        type: "noun"
    },
    {
        word: "Proposal",
        slug: "proposal",
        hindiMeaning: "Prastav (प्रस्ताव)",
        tamilMeaning: "Parindurai (பரிந்துரை)",
        pronunciation: "pruh-poh-zul",
        exampleSentence: "Submit your proposal by Friday.",
        businessContext: "A formal suggestion or plan.",
        type: "noun"
    },
    {
        word: "Pitch",
        slug: "pitch",
        hindiMeaning: "Prastuti (प्रस्तुति) / Idea present karna",
        tamilMeaning: "Karuththu Solhuthal (கருத்து சொல்லுதல்)",
        pronunciation: "pitch",
        exampleSentence: "We're pitching to investors next week.",
        businessContext: "Presenting an idea to get support/funding.",
        type: "verb"
    },
    {
        word: "Demo",
        slug: "demo",
        hindiMeaning: "Pradarshan (प्रदर्शन)",
        tamilMeaning: "Kaatchippaduthal (காட்சிப்படுத்தல்)",
        pronunciation: "dem-oh",
        exampleSentence: "Let me show you a quick demo.",
        businessContext: "A demonstration of how something works.",
        type: "noun"
    },
    {
        word: "Prototype",
        slug: "prototype",
        hindiMeaning: "Aadhaar model (आधार मॉडल) / Sample",
        tamilMeaning: "Munnoru (முன்னோரு)",
        pronunciation: "proh-tuh-type",
        exampleSentence: "We built a prototype to test the concept.",
        businessContext: "An early sample or model.",
        type: "noun"
    },
    {
        word: "Launch",
        slug: "launch",
        hindiMeaning: "Shuruwat karna (शुरुआत करना)",
        tamilMeaning: "Thodakkuthal (தொடக்குதல்)",
        pronunciation: "lawnch",
        exampleSentence: "We'll launch the product next month.",
        businessContext: "Introducing something new to the market.",
        type: "verb"
    },
    {
        word: "Rollout",
        slug: "rollout",
        hindiMeaning: "Kramik prarambh (क्रमिक प्रारंभ)",
        tamilMeaning: "Padippadiyaaga Arumugiyam (படிப்படியாக அறுமுகம்)",
        pronunciation: "rohl-owt",
        exampleSentence: "The rollout will happen in three phases.",
        businessContext: "Gradual introduction of something new.",
        type: "noun"
    },
    {
        word: "Adoption",
        slug: "adoption",
        hindiMeaning: "Sweekar (स्वीकार)",
        tamilMeaning: "Eerukkondududhal (ஏற்றுக்கொள்ளுதல்)",
        pronunciation: "uh-dop-shun",
        exampleSentence: "User adoption of the new tool is slow.",
        businessContext: "People starting to use something new.",
        type: "noun"
    },
    {
        word: "Migration",
        slug: "migration",
        hindiMeaning: "Prayagman (प्रवासमान) / Ek system se doosre mein jaana",
        tamilMeaning: "Idam Pereyarthal (இடம் பெரயர்த்தல்)",
        pronunciation: "my-gray-shun",
        exampleSentence: "We're planning a cloud migration.",
        businessContext: "Moving from one system to another.",
        type: "noun"
    },
    {
        word: "Integration",
        slug: "integration",
        hindiMeaning: "Ekatrikaran (एकात्रीकरण) / जोड़ना",
        tamilMeaning: "Serththal (சேர்த்தல்)",
        pronunciation: "in-tih-gray-shun",
        exampleSentence: "We need better integration between systems.",
        businessContext: "Combining different systems/parts.",
        type: "noun"
    }
];
