export interface GrammarLesson {
    id: string;
    title: string;
    description: string;
    level: 'beginner';
    duration: number; // in minutes
    topics: string[];
    content: {
        type: 'explanation' | 'example' | 'tip';
        text: string;
    }[];
    exercises: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    }[];
}

export const grammarLessons: GrammarLesson[] = [
    {
        id: 'present-simple',
        title: 'Present Simple Tense',
        description: 'Learn how to talk about daily routines and facts',
        level: 'beginner',
        duration: 15,
        topics: ['Daily routines', 'Facts', 'Habits'],
        content: [
            {
                type: 'explanation',
                text: 'Present Simple is used for:\n• Daily routines: "I work in an office"\n• Facts: "The sun rises in the east"\n• Habits: "She drinks coffee every morning"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• I/You/We/They + verb\n• He/She/It + verb + s/es\n\nExample: I work, He works'
            },
            {
                type: 'example',
                text: '✅ I go to office daily.\n✅ She works from 9 to 5.\n✅ They speak English well.\n\n❌ I goes to office (Wrong)\n❌ She work from 9 to 5 (Wrong)'
            },
            {
                type: 'tip',
                text: 'Tip: Add "s" or "es" only with He, She, It. Not with I, You, We, They!'
            }
        ],
        exercises: [
            {
                question: 'I ____ English every day.',
                options: ['speak', 'speaks', 'speaking', 'spoke'],
                correctAnswer: 0,
                explanation: 'Use "speak" with "I". No "s" needed!'
            },
            {
                question: 'She ____ to work by bus.',
                options: ['go', 'goes', 'going', 'went'],
                correctAnswer: 1,
                explanation: 'Use "goes" with "She". Add "es" because the verb ends with "o".'
            },
            {
                question: 'They ____ meetings on Monday.',
                options: ['has', 'have', 'having', 'had'],
                correctAnswer: 1,
                explanation: 'Use "have" with "They". No "s" needed!'
            }
        ]
    },
    {
        id: 'present-continuous',
        title: 'Present Continuous Tense',
        description: 'Learn to talk about actions happening right now',
        level: 'beginner',
        duration: 15,
        topics: ['Current actions', 'Temporary situations'],
        content: [
            {
                type: 'explanation',
                text: 'Present Continuous is used for:\n• Actions happening now: "I am writing an email"\n• Temporary situations: "He is working from home this week"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• am/is/are + verb + ing\n\nI am working\nHe/She/It is working\nYou/We/They are working'
            },
            {
                type: 'example',
                text: '✅ I am attending a meeting right now.\n✅ She is preparing a presentation.\n✅ They are discussing the project.\n\n❌ I working now (Missing "am")\n❌ He are working (Wrong - use "is")'
            },
            {
                type: 'tip',
                text: 'Tip: Use "am" with I, "is" with He/She/It, "are" with You/We/They'
            }
        ],
        exercises: [
            {
                question: 'I ____ on a project right now.',
                options: ['work', 'am working', 'working', 'works'],
                correctAnswer: 1,
                explanation: 'Use "am working" to show action happening now.'
            },
            {
                question: 'She ____ her lunch at the moment.',
                options: ['eat', 'eats', 'is eating', 'eating'],
                correctAnswer: 2,
                explanation: 'Use "is eating" with "She" for current action.'
            },
            {
                question: 'We ____ for the client presentation.',
                options: ['prepare', 'prepares', 'are preparing', 'preparing'],
                correctAnswer: 2,
                explanation: 'Use "are preparing" with "We".'
            }
        ]
    },
    {
        id: 'past-simple',
        title: 'Past Simple Tense',
        description: 'Learn to talk about completed actions',
        level: 'beginner',
        duration: 20,
        topics: ['Completed actions', 'Past events'],
        content: [
            {
                type: 'explanation',
                text: 'Past Simple is used for:\n• Completed actions: "I finished the report yesterday"\n• Past events: "She joined the company in 2020"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• Regular verbs: verb + ed\n  work → worked\n  join → joined\n\n• Irregular verbs: special forms\n  go → went\n  write → wrote\n  have → had'
            },
            {
                type: 'example',
                text: '✅ I worked late yesterday.\n✅ She went to the office.\n✅ They completed the task.\n\n❌ I worked yesterday late (Wrong word order)\n❌ She goed to office (Wrong - use "went")'
            },
            {
                type: 'tip',
                text: 'Tip: Common irregular verbs - go→went, have→had, do→did, make→made, get→got'
            }
        ],
        exercises: [
            {
                question: 'I ____ the email an hour ago.',
                options: ['send', 'sent', 'sended', 'sending'],
                correctAnswer: 1,
                explanation: '"Sent" is the past form of "send".'
            },
            {
                question: 'She ____ the meeting yesterday.',
                options: ['attend', 'attended', 'attending', 'attends'],
                correctAnswer: 1,
                explanation: 'Add "ed" to make "attend" past tense.'
            },
            {
                question: 'They ____ a new system last month.',
                options: ['implement', 'implemented', 'implementing', 'implements'],
                correctAnswer: 1,
                explanation: 'Regular verb: implement + ed = implemented'
            }
        ]
    },
    {
        id: 'questions-formation',
        title: 'Forming Questions',
        description: 'Learn to ask questions correctly',
        level: 'beginner',
        duration: 15,
        topics: ['Yes/No questions', 'Wh- questions'],
        content: [
            {
                type: 'explanation',
                text: 'Question Types:\n\n1. Yes/No Questions:\n   Do/Does + subject + verb?\n   Example: "Do you work here?"\n\n2. Wh- Questions:\n   What/Where/When/Why/How + do/does + subject + verb?\n   Example: "Where do you work?"'
            },
            {
                type: 'example',
                text: '✅ Do you speak English?\n✅ Does she work here?\n✅ Where do you live?\n✅ What does he do?\n\n❌ You speak English? (Missing "Do")\n❌ Where you work? (Missing "do")'
            },
            {
                type: 'tip',
                text: 'Tip: Always use helping verb (do/does/did) in questions!'
            }
        ],
        exercises: [
            {
                question: '____ you like your job?',
                options: ['Do', 'Does', 'Did', 'Are'],
                correctAnswer: 0,
                explanation: 'Use "Do" with "you".'
            },
            {
                question: 'Where ____ she work?',
                options: ['do', 'does', 'is', 'are'],
                correctAnswer: 1,
                explanation: 'Use "does" with "she".'
            },
            {
                question: 'What time ____ the meeting start?',
                options: ['do', 'does', 'is', 'are'],
                correctAnswer: 1,
                explanation: 'Use "does" because "meeting" is singular (like he/she/it).'
            }
        ]
    },
    {
        id: 'articles',
        title: 'Articles: A, An, The',
        description: 'Learn when to use a, an, and the',
        level: 'beginner',
        duration: 15,
        topics: ['Indefinite articles', 'Definite article'],
        content: [
            {
                type: 'explanation',
                text: 'Articles:\n\n• A - before consonant sounds\n  "a book", "a meeting"\n\n• An - before vowel sounds (a, e, i, o, u)\n  "an apple", "an email"\n\n• The - for specific things\n  "the report I sent yesterday"'
            },
            {
                type: 'example',
                text: '✅ I need a pen. (any pen)\n✅ I need an eraser. (any eraser)\n✅ I need the pen you borrowed. (specific pen)\n\n❌ I need pen (Missing article)\n❌ A apple (Wrong - use "an")'
            },
            {
                type: 'tip',
                text: 'Tip: Use "a/an" for first mention, "the" when mentioning again or when it\'s specific.'
            }
        ],
        exercises: [
            {
                question: 'I need ____ laptop for work.',
                options: ['a', 'an', 'the', 'nothing'],
                correctAnswer: 0,
                explanation: 'Use "a" before "laptop" (consonant sound).'
            },
            {
                question: 'She is ____ engineer.',
                options: ['a', 'an', 'the', 'nothing'],
                correctAnswer: 1,
                explanation: 'Use "an" before "engineer" (vowel sound).'
            },
            {
                question: 'Where is ____ file I sent you?',
                options: ['a', 'an', 'the', 'nothing'],
                correctAnswer: 2,
                explanation: 'Use "the" for the specific file mentioned.'
            }
        ]
    },
    {
        id: 'prepositions',
        title: 'Common Prepositions',
        description: 'Learn to use in, on, at correctly',
        level: 'beginner',
        duration: 15,
        topics: ['Time prepositions', 'Place prepositions'],
        content: [
            {
                type: 'explanation',
                text: 'Time Prepositions:\n\n• At - specific times\n  "at 9 AM", "at midnight"\n\n• On - days and dates\n  "on Monday", "on 15th January"\n\n• In - months, years, periods\n  "in March", "in 2024", "in the morning"'
            },
            {
                type: 'explanation',
                text: 'Place Prepositions:\n\n• At - specific points\n  "at the office", "at home"\n\n• On - surfaces\n  "on the desk", "on the wall"\n\n• In - enclosed spaces\n  "in the room", "in Mumbai"'
            },
            {
                type: 'example',
                text: '✅ The meeting is at 10 AM.\n✅ I work on Mondays.\n✅ I joined in 2020.\n✅ The file is on the desk.\n\n❌ The meeting is in 10 AM (Wrong)\n❌ I work in Mondays (Wrong)'
            },
            {
                type: 'tip',
                text: 'Tip: At = point, On = surface/day, In = enclosed/period'
            }
        ],
        exercises: [
            {
                question: 'The meeting starts ____ 3 PM.',
                options: ['at', 'on', 'in', 'by'],
                correctAnswer: 0,
                explanation: 'Use "at" for specific times.'
            },
            {
                question: 'We have a call ____ Friday.',
                options: ['at', 'on', 'in', 'by'],
                correctAnswer: 1,
                explanation: 'Use "on" for days of the week.'
            },
            {
                question: 'I will finish this ____ the evening.',
                options: ['at', 'on', 'in', 'by'],
                correctAnswer: 2,
                explanation: 'Use "in" for time periods like "in the evening".'
            }
        ]
    },
    {
        id: 'subject-verb-agreement',
        title: 'Subject-Verb Agreement',
        description: 'Make sure subject and verb match',
        level: 'beginner',
        duration: 15,
        topics: ['Singular subjects', 'Plural subjects'],
        content: [
            {
                type: 'explanation',
                text: 'Subject-Verb Agreement:\n\nSingular subject → Singular verb\n• The manager works here.\n• He has a laptop.\n\nPlural subject → Plural verb\n• The managers work here.\n• They have laptops.'
            },
            {
                type: 'example',
                text: '✅ The team is ready.\n✅ The teams are ready.\n✅ Everyone has received the email.\n✅ All employees have received the email.\n\n❌ The team are ready (Wrong)\n❌ Everyone have received (Wrong)'
            },
            {
                type: 'tip',
                text: 'Tip: "Everyone", "Someone", "Anyone" are SINGULAR. Use "is/has/does".'
            }
        ],
        exercises: [
            {
                question: 'The company ____ 500 employees.',
                options: ['has', 'have', 'having', 'had'],
                correctAnswer: 0,
                explanation: '"Company" is singular, use "has".'
            },
            {
                question: 'All the documents ____ ready.',
                options: ['is', 'are', 'was', 'be'],
                correctAnswer: 1,
                explanation: '"Documents" is plural, use "are".'
            },
            {
                question: 'Everyone ____ to attend the meeting.',
                options: ['need', 'needs', 'needing', 'are needing'],
                correctAnswer: 1,
                explanation: '"Everyone" is singular, use "needs".'
            }
        ]
    },
    {
        id: 'common-mistakes',
        title: 'Common Grammar Mistakes',
        description: 'Avoid these frequent errors',
        level: 'beginner',
        duration: 20,
        topics: ['Common errors', 'Corrections'],
        content: [
            {
                type: 'explanation',
                text: 'Top Mistakes Indians Make:\n\n1. Double negatives\n   ❌ I don\'t need nothing\n   ✅ I don\'t need anything\n\n2. Wrong word order\n   ❌ I yesterday went\n   ✅ I went yesterday\n\n3. Missing articles\n   ❌ I am engineer\n   ✅ I am an engineer'
            },
            {
                type: 'explanation',
                text: '4. Incorrect verb forms\n   ❌ She don\'t work here\n   ✅ She doesn\'t work here\n\n5. Wrong preposition\n   ❌ Discuss about the project\n   ✅ Discuss the project\n\n6. Many/Much confusion\n   ❌ How much people?\n   ✅ How many people?'
            },
            {
                type: 'tip',
                text: 'Tip: Read these corrections aloud daily to build muscle memory!'
            }
        ],
        exercises: [
            {
                question: 'Correct the sentence: "She don\'t like coffee."',
                options: ['She doesn\'t like coffee.', 'She don\'t likes coffee.', 'She not like coffee.', 'No correction needed'],
                correctAnswer: 0,
                explanation: 'Use "doesn\'t" with "she", not "don\'t".'
            },
            {
                question: 'Correct: "I am working here since 2020."',
                options: ['I am working here since 2020.', 'I have been working here since 2020.', 'I work here since 2020.', 'No correction needed'],
                correctAnswer: 1,
                explanation: 'Use "have been working" for an action that started in the past and continues.'
            },
            {
                question: 'Correct: "Please discuss about this with the team."',
                options: ['Please discuss this with the team.', 'Please discuss about this to the team.', 'Please discuss this about the team.', 'No correction needed'],
                correctAnswer: 0,
                explanation: '"Discuss" doesn\'t take "about". Just "discuss something".'
            }
        ]
    },
    {
        id: 'future-simple',
        title: 'Future Simple Tense',
        description: 'Learn to talk about future plans and predictions',
        level: 'beginner',
        duration: 15,
        topics: ['Future plans', 'Predictions', 'Decisions'],
        content: [
            {
                type: 'explanation',
                text: 'Future Simple (will) is used for:\n• Predictions: "The meeting will start at 3 PM"\n• Instant decisions: "I\'ll call him now"\n• Promises: "I will send the report today"\n• Offers: "I\'ll help you with this"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• Will + base verb\n  I/You/He/She/It/We/They + will + verb\n\nExample: I will complete, He will attend'
            },
            {
                type: 'example',
                text: '✅ I will finish the task by tomorrow.\n✅ She will join the team next month.\n✅ They will launch the product in Q2.\n\n❌ I will to finish (No "to" after will)\n❌ He will going (Wrong - use "go")'
            },
            {
                type: 'tip',
                text: 'Tip: Use "will" for decisions made at the moment of speaking. Use "going to" for pre-planned decisions.'
            }
        ],
        exercises: [
            {
                question: 'I ____ the client tomorrow morning.',
                options: ['will call', 'will to call', 'will calling', 'am will call'],
                correctAnswer: 0,
                explanation: 'Use "will + base verb". Don\'t add "to" or "-ing".'
            },
            {
                question: 'The conference ____ at 9 AM sharp.',
                options: ['will start', 'will starts', 'will be start', 'will starting'],
                correctAnswer: 0,
                explanation: 'Use "will + base verb". No "s" is added after will.'
            },
            {
                question: 'She ____ you the details soon.',
                options: ['will send', 'will sends', 'will be send', 'will sending'],
                correctAnswer: 0,
                explanation: 'Correct: will + send (base form).'
            },
            {
                question: 'They ____ the project by December.',
                options: ['will complete', 'will completes', 'will to complete', 'are will complete'],
                correctAnswer: 0,
                explanation: 'Will + complete (no "s", no "to").'
            },
            {
                question: 'We ____ our decision next week.',
                options: ['will announce', 'will announces', 'will announcing', 'will to announce'],
                correctAnswer: 0,
                explanation: 'Will + announce (base form).'
            }
        ]
    },
    {
        id: 'going-to-future',
        title: 'Going To Future',
        description: 'Express planned future actions',
        level: 'beginner',
        duration: 15,
        topics: ['Plans', 'Intentions', 'Future with evidence'],
        content: [
            {
                type: 'explanation',
                text: 'Going to is used for:\n• Pre-planned decisions: "I\'m going to apply for that job"\n• Intentions: "We\'re going to expand to new markets"\n• Predictions with evidence: "Look at those clouds - it\'s going to rain"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• am/is/are + going to + base verb\n\nI am going to work\nHe/She/It is going to work\nYou/We/They are going to work'
            },
            {
                type: 'example',
                text: '✅ I\'m going to attend the workshop.\n✅ She\'s going to start a new project.\n✅ They\'re going to hire 20 people.\n\n❌ I going to attend (Missing "am")\n❌ She is going attend (Missing "to")'
            },
            {
                type: 'tip',
                text: 'Tip: Will vs Going to - Use "going to" when you\'ve already decided. Use "will" for instant decisions.'
            }
        ],
        exercises: [
            {
                question: 'I ____ to apply for the manager position.',
                options: ['am going', 'will going', 'going', 'am go'],
                correctAnswer: 0,
                explanation: 'Use "am going to" for planned decisions.'
            },
            {
                question: 'They ____ going to launch the product soon.',
                options: ['are', 'is', 'am', 'will'],
                correctAnswer: 0,
                explanation: 'Use "are" with "They".'
            },
            {
                question: 'She ____ to resign next month.',
                options: ['is going', 'are going', 'am going', 'will going'],
                correctAnswer: 0,
                explanation: 'Use "is going to" with "She".'
            },
            {
                question: 'We ____ restructure the department.',
                options: ['are going to', 'is going to', 'am going to', 'going to'],
                correctAnswer: 0,
                explanation: 'We + are going to + base verb.'
            },
            {
                question: 'What ____ you going to do about this issue?',
                options: ['are', 'is', 'am', 'will'],
                correctAnswer: 0,
                explanation: 'Question form: What are you going to do?'
            }
        ]
    },
    {
        id: 'present-perfect',
        title: 'Present Perfect Tense',
        description: 'Connect past actions to the present',
        level: 'beginner',
        duration: 20,
        topics: ['Experience', 'Unfinished time', 'Recent actions'],
        content: [
            {
                type: 'explanation',
                text: 'Present Perfect is used for:\n• Experience: "I have worked with many clients"\n• Actions in unfinished time: "I have sent 5 emails today"\n• Recent actions: "She has just joined the team"\n• Actions continuing to now: "We have been partners since 2020"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• have/has + past participle\n\nI/You/We/They + have + worked\nHe/She/It + has + worked\n\nCommon past participles:\nwork → worked, go → gone, write → written,\nsee → seen, do → done, make → made'
            },
            {
                type: 'example',
                text: '✅ I have completed the training.\n✅ She has worked here for 3 years.\n✅ They have launched 5 products.\n\n❌ I have complete (Need past participle "completed")\n❌ She have worked (Use "has" with she)'
            },
            {
                type: 'tip',
                text: 'Tip: Use "since" with specific time (since 2020) and "for" with duration (for 3 years).'
            }
        ],
        exercises: [
            {
                question: 'I ____ three meetings today already.',
                options: ['have attended', 'has attended', 'attended', 'am attending'],
                correctAnswer: 0,
                explanation: 'Present Perfect shows action in unfinished time (today is not finished).'
            },
            {
                question: 'She ____ with our company since 2018.',
                options: ['has been', 'have been', 'is', 'was'],
                correctAnswer: 0,
                explanation: 'Use "has" with "she" + "been" (past participle of be).'
            },
            {
                question: 'We ____ the client yet.',
                options: ['haven\'t contacted', 'didn\'t contact', 'don\'t contact', 'aren\'t contacting'],
                correctAnswer: 0,
                explanation: 'Use Present Perfect with "yet" (negative).'
            },
            {
                question: '____ you ever worked in sales?',
                options: ['Have', 'Has', 'Did', 'Do'],
                correctAnswer: 0,
                explanation: 'Question with "ever" uses Present Perfect: Have you ever...?'
            },
            {
                question: 'They ____ just announced the results.',
                options: ['have', 'has', 'are', 'did'],
                correctAnswer: 0,
                explanation: 'Use "have" with "They" + "just" uses Present Perfect.'
            },
            {
                question: 'He ____ his report already.',
                options: ['has submitted', 'have submitted', 'submitted', 'is submitting'],
                correctAnswer: 0,
                explanation: 'He + has + past participle. "Already" indicates Present Perfect.'
            }
        ]
    },
    {
        id: 'modal-verbs',
        title: 'Modal Verbs: Can, Should, Must',
        description: 'Express ability, advice, and obligation',
        level: 'beginner',
        duration: 20,
        topics: ['Ability', 'Advice', 'Obligation', 'Permission'],
        content: [
            {
                type: 'explanation',
                text: 'Modal Verbs:\n\n• CAN - ability, permission\n  "I can speak English", "Can I leave early?"\n\n• SHOULD - advice, recommendation\n  "You should update your resume"\n\n• MUST - strong obligation, necessity\n  "You must attend the meeting"'
            },
            {
                type: 'explanation',
                text: 'Structure:\n• Modal + base verb (no "to", no "s")\n\nI/You/He/She/It/We/They + can/should/must + work\n\n✅ She can manage\n❌ She can manages\n❌ She can to manage'
            },
            {
                type: 'example',
                text: '✅ I can handle this project.\n✅ You should check the email.\n✅ We must submit the form today.\n\n❌ I can to handle (No "to")\n❌ He cans speak (No "s" after modal)\n❌ You should to check (No "to")'
            },
            {
                type: 'tip',
                text: 'Tip: Must = strong obligation (from speaker). Have to = external obligation. Should = advice (not as strong).'
            }
        ],
        exercises: [
            {
                question: 'You ____ read the guidelines before starting.',
                options: ['should', 'should to', 'shoulds', 'are should'],
                correctAnswer: 0,
                explanation: 'Modal + base verb. No "to", no "s".'
            },
            {
                question: 'She ____ speak three languages fluently.',
                options: ['can', 'cans', 'can to', 'is can'],
                correctAnswer: 0,
                explanation: 'Can + base verb (speak). No "s" after modal.'
            },
            {
                question: 'We ____ complete this by Friday.',
                options: ['must', 'musts', 'must to', 'are must'],
                correctAnswer: 0,
                explanation: 'Must + complete (base form).'
            },
            {
                question: '____ I use your laptop for a moment?',
                options: ['Can', 'Should', 'Must', 'Am'],
                correctAnswer: 0,
                explanation: 'Use "Can" to ask for permission.'
            },
            {
                question: 'You ____ not share confidential information.',
                options: ['must', 'can', 'should', 'may'],
                correctAnswer: 0,
                explanation: 'Must not = strong prohibition (it\'s forbidden).'
            },
            {
                question: 'They ____ improve their communication skills.',
                options: ['should', 'can', 'must', 'may'],
                correctAnswer: 0,
                explanation: 'Should = advice/recommendation.'
            }
        ]
    },
    {
        id: 'conditionals-first',
        title: 'First Conditional (Real Future)',
        description: 'Talk about real possibilities in the future',
        level: 'beginner',
        duration: 20,
        topics: ['Real possibilities', 'Future conditions', 'Cause and effect'],
        content: [
            {
                type: 'explanation',
                text: 'First Conditional is used for:\n• Real future possibilities\n• Cause and effect in the future\n\nStructure:\nIf + present simple, will + base verb\n\nExample: "If you work hard, you will succeed"'
            },
            {
                type: 'explanation',
                text: 'Common Uses:\n• Making promises: "If you help me, I\'ll help you"\n• Warnings: "If you don\'t submit on time, you will miss the deadline"\n• Plans: "If I get the job, I will move to Mumbai"'
            },
            {
                type: 'example',
                text: '✅ If she calls, I will answer.\n✅ If we finish early, we will go home.\n✅ I will help you if you ask me.\n\n❌ If she will call (Use present, not future in "if" clause)\n❌ If we will finish (Wrong tense in "if" clause)'
            },
            {
                type: 'tip',
                text: 'Tip: Never use "will" in the "if" part! Use present simple after "if".'
            }
        ],
        exercises: [
            {
                question: 'If you ____ the meeting, send me your notes.',
                options: ['attend', 'will attend', 'attended', 'are attending'],
                correctAnswer: 0,
                explanation: 'Use present simple after "if" in First Conditional.'
            },
            {
                question: 'We ____ the deadline if we start now.',
                options: ['will meet', 'meet', 'met', 'are meeting'],
                correctAnswer: 0,
                explanation: 'Use "will + base verb" in the main clause.'
            },
            {
                question: 'If she ____ the offer, she will regret it.',
                options: ['rejects', 'will reject', 'rejected', 'reject'],
                correctAnswer: 0,
                explanation: 'Present simple (rejects) after "if".'
            },
            {
                question: 'They will hire you if you ____ the interview.',
                options: ['pass', 'will pass', 'passed', 'are passing'],
                correctAnswer: 0,
                explanation: 'Present simple in the "if" clause.'
            },
            {
                question: 'If I ____ more details, I ____ you immediately.',
                options: ['get, will inform', 'will get, inform', 'get, inform', 'will get, will inform'],
                correctAnswer: 0,
                explanation: 'If + present, will + base verb.'
            }
        ]
    },
    {
        id: 'passive-voice',
        title: 'Passive Voice Construction',
        description: 'Learn when and how to use passive voice professionally',
        level: 'beginner',
        duration: 20,
        topics: ['Passive sentences', 'Formal writing', 'Professional communication'],
        content: [
            {
                type: 'explanation',
                text: 'Passive Voice is used when:\n• The action is more important than who did it\n• We don\'t know who did the action\n• We want to sound formal/professional\n\nStructure:\nbe (am/is/are/was/were) + past participle\n\nActive: The team completed the project.\nPassive: The project was completed (by the team).'
            },
            {
                type: 'explanation',
                text: 'Common Uses in Business:\n• "The meeting has been scheduled for Monday"\n• "Your application was received yesterday"\n• "The report will be sent by Friday"\n• "Several candidates were interviewed"'
            },
            {
                type: 'example',
                text: '✅ The email was sent this morning.\n✅ New policies have been implemented.\n✅ The document is being reviewed.\n\n❌ The email sent (Missing "was")\n❌ New policies implemented (Missing "have been")'
            },
            {
                type: 'tip',
                text: 'Tip: Use passive voice in formal emails and reports. Use active voice for clarity and directness.'
            }
        ],
        exercises: [
            {
                question: 'The contract ____ by both parties yesterday.',
                options: ['was signed', 'signed', 'is signed', 'has signed'],
                correctAnswer: 0,
                explanation: 'Past passive: was + past participle (signed).'
            },
            {
                question: 'Your request ____ being processed.',
                options: ['is', 'was', 'has', 'will'],
                correctAnswer: 0,
                explanation: 'Present continuous passive: is being processed.'
            },
            {
                question: 'All employees ____ informed about the change.',
                options: ['will be', 'will', 'are will', 'be will'],
                correctAnswer: 0,
                explanation: 'Future passive: will be + past participle.'
            },
            {
                question: 'The project ____ completed ahead of schedule.',
                options: ['was', 'is', 'has', 'been'],
                correctAnswer: 0,
                explanation: 'Simple past passive: was completed.'
            },
            {
                question: 'A decision ____ been made yet.',
                options: ['hasn\'t', 'hasn\'t been', 'wasn\'t', 'isn\'t'],
                correctAnswer: 0,
                explanation: 'Present perfect passive: hasn\'t been made.'
            },
            {
                question: 'The files ____ uploaded to the cloud.',
                options: ['are being', 'is being', 'was being', 'been'],
                correctAnswer: 0,
                explanation: 'Present continuous passive with plural subject.'
            }
        ]
    },
    {
        id: 'reported-speech',
        title: 'Reported Speech (Indirect Speech)',
        description: 'Report what someone said without quoting directly',
        level: 'beginner',
        duration: 20,
        topics: ['Reporting statements', 'Reporting questions', 'Tense changes'],
        content: [
            {
                type: 'explanation',
                text: 'Reported Speech reports what someone said without using their exact words.\n\nDirect: He said, "I am busy."\nReported: He said (that) he was busy.\n\nKey Changes:\n• Present → Past\n• Will → Would\n• Can → Could'
            },
            {
                type: 'explanation',
                text: 'Common Reporting Verbs:\n• say/said: "He said he was ready"\n• tell/told: "She told me to wait"\n• ask/asked: "He asked if I was available"\n• explain/explained: "She explained that it was urgent"'
            },
            {
                type: 'example',
                text: '✅ She said she would call me.\n✅ He told me he was working late.\n✅ They asked if I could help.\n\n❌ She said she will call (Should be "would")\n❌ He told he was working (Missing "me")'
            },
            {
                type: 'tip',
                text: 'Tip: Use "told" when mentioning the listener (told me/him/her). Use "said" without mentioning the listener or with "that".'
            }
        ],
        exercises: [
            {
                question: 'Direct: "I will send the report." → Reported: She said she ____ the report.',
                options: ['would send', 'will send', 'sends', 'sent'],
                correctAnswer: 0,
                explanation: 'Will → would in reported speech.'
            },
            {
                question: 'Direct: "I am working on it." → Reported: He said he ____ on it.',
                options: ['was working', 'is working', 'works', 'worked'],
                correctAnswer: 0,
                explanation: 'Present continuous → past continuous in reported speech.'
            },
            {
                question: 'She ____ me she couldn\'t attend the meeting.',
                options: ['told', 'said', 'asked', 'spoke'],
                correctAnswer: 0,
                explanation: 'Use "told" with an object (me, him, her).'
            },
            {
                question: 'They ____ that they needed more time.',
                options: ['said', 'told', 'asked', 'spoke'],
                correctAnswer: 0,
                explanation: 'Use "said" with "that" (no object needed).'
            },
            {
                question: 'He asked me ____ I had finished the task.',
                options: ['if', 'that', 'what', 'when'],
                correctAnswer: 0,
                explanation: 'Use "if" or "whether" for yes/no questions in reported speech.'
            }
        ]
    },
    {
        id: 'phrasal-verbs',
        title: 'Common Workplace Phrasal Verbs',
        description: 'Master essential phrasal verbs used in professional settings',
        level: 'beginner',
        duration: 25,
        topics: ['Workplace expressions', 'Professional language', 'Common phrases'],
        content: [
            {
                type: 'explanation',
                text: 'Phrasal Verbs are verb + preposition combinations with special meanings:\n\nCommon Workplace Phrasal Verbs:\n• Call off = cancel: "We called off the meeting"\n• Bring up = mention: "She brought up a good point"\n• Follow up = check on: "I\'ll follow up with you tomorrow"\n• Set up = arrange: "Let\'s set up a meeting"'
            },
            {
                type: 'explanation',
                text: 'More Essential Ones:\n• Take on = accept (responsibility): "I\'ll take on this project"\n• Carry out = execute: "We need to carry out this task"\n• Point out = indicate: "He pointed out an error"\n• Work out = solve: "We worked out a solution"\n• Fill in = substitute: "Can you fill in for me?"\n• Hand in = submit: "Please hand in your reports"'
            },
            {
                type: 'example',
                text: '✅ Let\'s set up a call for Monday.\n✅ I need to follow up on that email.\n✅ She brought up an important issue.\n✅ We had to call off the event.\n\n❌ Let\'s set a call (Missing "up")\n❌ I need to follow that email (Missing "up")'
            },
            {
                type: 'tip',
                text: 'Tip: Phrasal verbs are more informal. For formal writing, use single-word alternatives: arrange (set up), cancel (call off), mention (bring up).'
            }
        ],
        exercises: [
            {
                question: 'We need to ____ this issue in tomorrow\'s meeting.',
                options: ['bring up', 'bring', 'take up', 'put'],
                correctAnswer: 0,
                explanation: 'Bring up = mention or raise a topic for discussion.'
            },
            {
                question: 'Can you ____ for me while I\'m on leave?',
                options: ['fill in', 'fill', 'work in', 'take in'],
                correctAnswer: 0,
                explanation: 'Fill in = temporarily do someone\'s job.'
            },
            {
                question: 'Let\'s ____ a meeting for next week.',
                options: ['set up', 'set', 'put up', 'make up'],
                correctAnswer: 0,
                explanation: 'Set up = arrange or organize.'
            },
            {
                question: 'I\'ll ____ with the client after the presentation.',
                options: ['follow up', 'follow', 'call up', 'check'],
                correctAnswer: 0,
                explanation: 'Follow up = check on progress or continue communication.'
            },
            {
                question: 'He ____ an important mistake in the report.',
                options: ['pointed out', 'pointed', 'showed up', 'found'],
                correctAnswer: 0,
                explanation: 'Point out = indicate or draw attention to something.'
            },
            {
                question: 'We had to ____ the launch due to technical issues.',
                options: ['call off', 'call', 'put off', 'take off'],
                correctAnswer: 0,
                explanation: 'Call off = cancel an event or plan.'
            },
            {
                question: 'She decided to ____ the new project.',
                options: ['take on', 'take', 'bring on', 'put on'],
                correctAnswer: 0,
                explanation: 'Take on = accept responsibility for something.'
            }
        ]
    },
    {
        id: 'relative-clauses',
        title: 'Relative Clauses (Who, Which, That)',
        description: 'Combine sentences and add information smoothly',
        level: 'beginner',
        duration: 20,
        topics: ['Connecting ideas', 'Defining clauses', 'Professional writing'],
        content: [
            {
                type: 'explanation',
                text: 'Relative Clauses add information about nouns:\n\n• WHO - for people\n  "The employee who joined last month"\n\n• WHICH - for things\n  "The report which was sent yesterday"\n\n• THAT - for both people and things (more common)\n  "The person that/who called", "The file that/which is missing"'
            },
            {
                type: 'explanation',
                text: 'Usage:\n• Defining clause (essential info): No commas\n  "The candidate who has experience will get the job"\n\n• Non-defining clause (extra info): Use commas\n  "John, who has 10 years of experience, got promoted"'
            },
            {
                type: 'example',
                text: '✅ The manager who leads our team is excellent.\n✅ The project that we started is complete.\n✅ The office, which is downtown, is very modern.\n\n❌ The manager which leads (Use "who" for people)\n❌ The person what called (Use "who/that", not "what")'
            },
            {
                type: 'tip',
                text: 'Tip: "That" is more common in speech. "Which" is more formal. "Who" is always for people.'
            }
        ],
        exercises: [
            {
                question: 'The candidate ____ we interviewed yesterday was impressive.',
                options: ['who/that', 'which', 'what', 'whose'],
                correctAnswer: 0,
                explanation: 'Use "who" or "that" for people.'
            },
            {
                question: 'The software ____ you recommended is very useful.',
                options: ['which/that', 'who', 'what', 'whose'],
                correctAnswer: 0,
                explanation: 'Use "which" or "that" for things.'
            },
            {
                question: 'This is the employee ____ laptop was stolen.',
                options: ['whose', 'who', 'which', 'that'],
                correctAnswer: 0,
                explanation: 'Use "whose" to show possession.'
            },
            {
                question: 'The deadline ____ was set last week is approaching.',
                options: ['that/which', 'who', 'what', 'whose'],
                correctAnswer: 0,
                explanation: 'Use "that" or "which" for things (deadline).'
            },
            {
                question: 'People ____ work remotely need good internet.',
                options: ['who/that', 'which', 'what', 'whose'],
                correctAnswer: 0,
                explanation: 'Use "who" or "that" for people.'
            }
        ]
    },
    {
        id: 'word-order',
        title: 'English Word Order & Sentence Structure',
        description: 'Build grammatically correct sentences with proper word order',
        level: 'beginner',
        duration: 20,
        topics: ['Sentence structure', 'Word order', 'Clarity'],
        content: [
            {
                type: 'explanation',
                text: 'Basic English Word Order:\nSVO = Subject + Verb + Object\n\n✅ I (S) send (V) emails (O).\n✅ She (S) manages (V) the team (O).\n\nNever: Object + Subject + Verb (common mistake for Indian speakers)'
            },
            {
                type: 'explanation',
                text: 'Adding Time and Place:\nRule: Time comes BEFORE place (or at the end)\n\n✅ I work from home on Mondays.\n✅ On Mondays, I work from home.\n❌ I work on Mondays from home. (Awkward)\n\nGeneral rule: S + V + O + Manner + Place + Time\n"She drives her car carefully to office every day"'
            },
            {
                type: 'example',
                text: '✅ I sent the email yesterday.\n✅ Yesterday, I sent the email.\n✅ We will meet at the office tomorrow.\n\n❌ Yesterday I the email sent. (Wrong order)\n❌ I the email yesterday sent. (Wrong order)\n❌ Sent I the email yesterday. (Wrong order)'
            },
            {
                type: 'tip',
                text: 'Tip: Common Indian English mistake - placing time/place in the middle. Always put time at the beginning or end of the sentence.'
            }
        ],
        exercises: [
            {
                question: 'Choose the correct sentence:',
                options: [
                    'I will call you tomorrow.',
                    'I will you call tomorrow.',
                    'Tomorrow I you will call.',
                    'Will I call tomorrow you.'
                ],
                correctAnswer: 0,
                explanation: 'Correct order: Subject + will + verb + object + time.'
            },
            {
                question: 'Arrange: (the report / she / yesterday / submitted)',
                options: [
                    'She submitted the report yesterday.',
                    'Yesterday she the report submitted.',
                    'She the report yesterday submitted.',
                    'The report she submitted yesterday.'
                ],
                correctAnswer: 0,
                explanation: 'S + V + O + Time: She submitted the report yesterday.'
            },
            {
                question: 'Choose the correct sentence:',
                options: [
                    'We have a meeting at 3 PM in the conference room.',
                    'We at 3 PM have a meeting in the conference room.',
                    'We have in the conference room a meeting at 3 PM.',
                    'At 3 PM we in the conference room have a meeting.'
                ],
                correctAnswer: 0,
                explanation: 'S + V + O + Time + Place (or time can come first).'
            },
            {
                question: 'Correct the order: (I / going / am / tomorrow / there)',
                options: [
                    'I am going there tomorrow.',
                    'Tomorrow I there am going.',
                    'I am tomorrow going there.',
                    'There I am going tomorrow.'
                ],
                correctAnswer: 0,
                explanation: 'S + am + going + place + time.'
            },
            {
                question: 'Choose correct: "He plays tennis..."',
                options: [
                    'every Sunday in the park.',
                    'in the park every Sunday.',
                    'every in the park Sunday.',
                    'Sunday every park in the.'
                ],
                correctAnswer: 0,
                explanation: 'Time + Place OR Place + Time (both are okay, but time first is more common).'
            }
        ]
    },
    {
        id: 'common-confusions',
        title: 'Commonly Confused Words',
        description: 'Master tricky word pairs that are often confused',
        level: 'beginner',
        duration: 25,
        topics: ['Word choice', 'Common mistakes', 'Clarity'],
        content: [
            {
                type: 'explanation',
                text: 'Affect vs Effect:\n• Affect (verb) = to influence\n  "This will affect our sales"\n• Effect (noun) = result\n  "The effect was positive"\n\nIts vs It\'s:\n• Its = belonging to it\n  "The company increased its revenue"\n• It\'s = it is\n  "It\'s a great opportunity"'
            },
            {
                type: 'explanation',
                text: 'Their vs There vs They\'re:\n• Their = belonging to them\n  "Their office is modern"\n• There = place\n  "The file is over there"\n• They\'re = they are\n  "They\'re attending the meeting"\n\nYour vs You\'re:\n• Your = belonging to you\n  "Your presentation was excellent"\n• You\'re = you are\n  "You\'re doing great work"'
            },
            {
                type: 'example',
                text: '✅ The policy will affect employee morale.\n✅ The effect of the policy was positive.\n✅ The company announced its quarterly results.\n✅ It\'s important to meet deadlines.\n\n❌ The policy will effect morale. (Wrong - use affect)\n❌ Its important to meet deadlines. (Wrong - use it\'s)'
            },
            {
                type: 'tip',
                text: 'Tip: To check "it\'s" vs "its", expand to "it is". If it makes sense, use "it\'s". Same trick works for "you\'re" (you are) and "they\'re" (they are).'
            }
        ],
        exercises: [
            {
                question: 'How will this decision ____ our project timeline?',
                options: ['affect', 'effect', 'effects', 'affects'],
                correctAnswer: 0,
                explanation: 'Affect (verb) = to influence or impact.'
            },
            {
                question: 'The ____ of the training was immediately visible.',
                options: ['effect', 'affect', 'effects', 'affects'],
                correctAnswer: 0,
                explanation: 'Effect (noun) = result or outcome.'
            },
            {
                question: 'The company improved ____ customer service.',
                options: ['its', 'it\'s', 'its\'', 'it'],
                correctAnswer: 0,
                explanation: 'Its (possessive, no apostrophe) = belonging to the company.'
            },
            {
                question: '____ a good time to discuss this.',
                options: ['It\'s', 'Its', 'Its\'', 'It'],
                correctAnswer: 0,
                explanation: 'It\'s = It is (contraction with apostrophe).'
            },
            {
                question: '____ team will present first.',
                options: ['Their', 'There', 'They\'re', 'Thier'],
                correctAnswer: 0,
                explanation: 'Their (possessive) = belonging to them.'
            },
            {
                question: '____ going to announce the results soon.',
                options: ['They\'re', 'Their', 'There', 'Thier'],
                correctAnswer: 0,
                explanation: 'They\'re = They are (contraction).'
            },
            {
                question: '____ presentation skills have improved significantly.',
                options: ['Your', 'You\'re', 'Your\'e', 'You'],
                correctAnswer: 0,
                explanation: 'Your (possessive) = belonging to you.'
            }
        ]
    },
    {
        id: 'advanced-punctuation',
        title: 'Professional Punctuation',
        description: 'Master semicolons, colons, and dashes for professional writing',
        level: 'beginner',
        duration: 20,
        topics: ['Punctuation', 'Professional writing', 'Clarity'],
        content: [
            {
                type: 'explanation',
                text: 'Semicolon (;) - Connects related complete sentences:\n\n✅ "The project is complete; we can now move forward."\n✅ "I sent the email; however, I haven\'t received a reply."\n\nUse semicolon instead of period when sentences are closely related.'
            },
            {
                type: 'explanation',
                text: 'Colon (:) - Introduces a list or explanation:\n\n✅ "We need three things: focus, dedication, and teamwork."\n✅ "Here\'s the problem: we\'re over budget."\n\nDash (—) - Adds emphasis or interruption:\n✅ "The deadline — which was moved up — is tomorrow."\n✅ "She has one goal — to become a manager."'
            },
            {
                type: 'example',
                text: '✅ The meeting went well; everyone agreed on the plan.\n✅ We have two options: delay or cancel.\n✅ The report — all 50 pages — needs review.\n\n❌ The meeting went well, everyone agreed. (Use semicolon or period)\n❌ We need; focus and teamwork. (Wrong - use colon before list)'
            },
            {
                type: 'tip',
                text: 'Tip: Semicolons are professional and sophisticated. Use them to show relationships between ideas without starting a new sentence.'
            }
        ],
        exercises: [
            {
                question: 'The presentation is ready__we can start.',
                options: ['; (semicolon)', ': (colon)', '— (dash)', ', (comma)'],
                correctAnswer: 0,
                explanation: 'Use semicolon to connect two related complete sentences.'
            },
            {
                question: 'We need the following documents__resume, cover letter, and references.',
                options: [': (colon)', '; (semicolon)', '— (dash)', ', (comma)'],
                correctAnswer: 0,
                explanation: 'Use colon to introduce a list.'
            },
            {
                question: 'The deadline__which is non-negotiable__is Friday.',
                options: ['— (dash)', ': (colon)', '; (semicolon)', ', (comma)'],
                correctAnswer: 0,
                explanation: 'Use dashes to add emphasis or set off interrupting information.'
            },
            {
                question: 'I finished the report__however, it needs your approval.',
                options: ['; (semicolon)', ': (colon)', '— (dash)', ', (comma)'],
                correctAnswer: 0,
                explanation: 'Use semicolon before "however" when connecting sentences.'
            },
            {
                question: 'She has one goal__to lead the team.',
                options: ['— (dash) or : (colon)', '; (semicolon)', ', (comma)', '. (period)'],
                correctAnswer: 0,
                explanation: 'Both dash and colon work to introduce an explanation or elaboration.'
            }
        ]
    }
];

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
    return grammarLessons.find(lesson => lesson.id === id);
}

export function getTotalGrammarLessons(): number {
    return grammarLessons.length;
}
