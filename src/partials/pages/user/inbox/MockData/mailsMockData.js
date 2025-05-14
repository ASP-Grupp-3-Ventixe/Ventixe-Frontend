

const mailsMockData = [
    {
        id: 1,
        senderName: 'Harmony Audio',
        senderInitials: 'HA', // logic to generate initials from senderName
        senderEmail: 'no-email@example.com',
        senderAvatar: null, // logic to generate avatar from initials from senderName if senderAvatar is null
        senderType: 'Sponsor', // logic to generate senderType based on created labels - 'Customer', 'Sponsor', 'Partner'
        labels: ['Sponsor'], // Created labels made by the user in the Label card
        subject: 'Sound System Confirmation',
        preview: "We'd like to confirm the delivery schedule for the sound system setup.", // logic to generate a shortened version of the email body for preview - 2 lines 
        time: '14:30', // format: HH:mm, logic to generate time based on the timezone, user has set in the settings
        date: '2029-02-20', // format: YYYY-MM-DD or DD/MM/YYYY or MM/DD/YYYY or Month/DD/YYYY
        unread: false,
        flagged: true,
        attachments: [],
        body: `
        Dear Event Management Team,

        We hope this message finds you well. As the official sound partner for the Rhythm & Beats Music Festival, we are reaching out to confirm the delivery schedule for the sound system setup.

        Here are a few key points we’d like to discuss:

        1. Delivery Timing: Please confirm the preferred date and time for our team to deliver the equipment to Sunset Park.
        
        2. Access Requirements: Let us know the details regarding venue access, loading dock availability, and any on-site contacts we should coordinate with.
        
        3. Setup Specifications: We would appreciate it if you could share any specific requirements for the stage layout or unique aspects of the venue that might impact our installation.
        
        4. Testing and Rehearsal: If there is a scheduled time for sound testing or rehearsal, kindly let us know so we can ensure our team is present for technical support.

        Please feel free to reach out with any questions or additional information you require from our side.

        Looking forward to your confirmation and further instructions.

        Warm regards,
        
        Harmony Audio Team
        +1-800-555-8976
        Email: support@harmonyaudio.com
    `
    },
    {
        id: 2,
        senderName: 'Patrick Cooper',
        senderInitials: 'PC',
        senderEmail: 'no-email@example.com',
        senderAvatar: null,
        senderType: 'Customer',
        subject: 'Feedback on Champions League Event',
        preview: 'The event was great, but the seating arrangements could be improved.',
        time: '13:45',
        date: '2029-02-20',
        unread: true,
        labels: ['Customer'],
        flagged: false,
        attachments: [],
        body: `
        Hi,

        Thank you for organizing the Champions League Event. Overall, it was a fantastic experience! However, I noticed that the seating arrangements near the east wing could be improved for future events.

        Best,
        Patrick
    `
    },
    {
        id: 3,
        senderName: 'Marcus Rawless',
        senderInitials: 'MR',
        senderEmail: 'no-email@example.com',
        senderAvatar: null,
        senderType: 'Customer',
        subject: 'Request for Invoice Update',
        preview: 'Could you please update the billing address on my invoice?',
        time: '11:30',
        date: '2029-02-19',
        unread: true,
        labels: ['Customer'],
        flagged: false,
        attachments: [],
        body: `
        Hello,

        I recently received my invoice, but the billing address needs to be updated. Could you please send me a revised version?

        Thank you!
        Marcus
    `
    },
    {
        id: 4,
        senderName: 'Alicia Smithson',
        senderInitials: 'AS',
        senderEmail: 'no-email@example.com',
        senderAvatar: null,
        senderType: 'Customer',
        subject: 'Query Regarding Ticket Availability',
        preview: 'Hi, I\'d like to confirm if additional Platinum tickets are available for the event.',
        time: '10:15',
        date: '2029-02-18',
        unread: false,
        labels: ['Customer'],
        flagged: true,
        attachments: [],
        body: `
        Hi,

        Are there any additional Platinum tickets available for the upcoming event? I would like to purchase two more if possible.

        Thanks,
        Alicia
    `
    },
    {
        id: 5,
        senderName: 'FreshFlavors Catering',
        senderInitials: 'FC',
        senderEmail: 'no-email@example.com',
        senderAvatar: null,
        senderType: 'Partner',
        subject: 'Final Menu Selection',
        preview: 'Please confirm the final menu selections for the event.',
        time: '09:00',
        date: '2029-02-17',
        unread: false,
        labels: ['Partner'],
        flagged: false,
        attachments: [],
        body: `
        Dear Team,

        We are finalizing the menu for your event. Please confirm your selections by the end of this week to ensure timely preparation.

        Kind regards,
        FreshFlavors Catering
    `
    }
];

export default mailsMockData;