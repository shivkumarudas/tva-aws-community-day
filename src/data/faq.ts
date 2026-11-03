export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'REGISTRATION' | 'CLEARANCE' | 'VENUE' | 'LOGISTICS';
  classificationTag: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'What is AWS Student Community Day – Pune?',
    answer: 'AWS Student Community Day is an annual, flagship community-led cloud conference organized by student leaders, AWS Community Heroes, and the AWS User Group Pune. It brings together over 800+ aspiring builders, developers, and researchers to explore modern cloud architecture, Generative AI, DevOps, and cloud careers.',
    category: 'CLEARANCE',
    classificationTag: 'TVA-DOC-001 // PURPOSE',
  },
  {
    id: 'faq-02',
    question: 'Who is eligible to attend as a Variant?',
    answer: 'Any student, engineering undergraduate, graduate, self-taught programmer, or recent fresher passionate about cloud technologies, AWS, and software engineering is welcome to register. No previous AWS certification is required.',
    category: 'REGISTRATION',
    classificationTag: 'TVA-DOC-002 // ELIGIBILITY',
  },
  {
    id: 'faq-03',
    question: 'Is there any registration fee for variants?',
    answer: 'Registration is free of charge for students selected through the application process. Upon approval, variants receive official temporal badges, access to all keynote sessions, hands-on workshop terminals, exclusive event merchandise, food, and AWS Cloud credits.',
    category: 'REGISTRATION',
    classificationTag: 'TVA-DOC-003 // ACCESS COST',
  },
  {
    id: 'faq-04',
    question: 'Where will the Temporal Cloud Authority event take place?',
    answer: 'The event will be hosted at a premier auditorium complex in Pune, Maharashtra. Exact coordinates, transit instructions, and reporting timings are provided on your confirmed Attendee Access Card.',
    category: 'VENUE',
    classificationTag: 'TVA-DOC-004 // COORDINATES',
  },
  {
    id: 'faq-05',
    question: 'What equipment should I bring to the technical missions?',
    answer: 'For hands-on workshops (Technical Missions), bring your laptop and charger. Pre-requisite accounts (e.g. AWS Free Tier or provided event sandbox accounts) will be activated during the morning briefing.',
    category: 'LOGISTICS',
    classificationTag: 'TVA-DOC-005 // PROTOCOL',
  },
  {
    id: 'faq-06',
    question: 'Will digital participation certificates and badges be provided?',
    answer: 'Yes! Every variant completing attendance will receive an official verifiable digital credential issued by the AWS Student Community, recognized by industry recruiters and community leaders.',
    category: 'CLEARANCE',
    classificationTag: 'TVA-DOC-006 // CREDENTIALS',
  },
];
