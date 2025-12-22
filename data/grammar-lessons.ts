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
    }
];

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
    return grammarLessons.find(lesson => lesson.id === id);
}

export function getTotalGrammarLessons(): number {
    return grammarLessons.length;
}
