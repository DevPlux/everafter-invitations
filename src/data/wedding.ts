export const weddingData = {
    couple: {
        partnerOne: {
            firstName: "Amelia",
            fullName: "Amelia Rose Fernando",
        },
        partnerTwo: {
            firstName: "Noah",
            fullName: "Noah James Perera",
        },
    },

    wedding: {
        dateTime: "2026-12-12T16:00:00+05:30",
        displayDate: "12 December 2026",
        day: "Saturday",
        time: "4:00 PM onwards",
    },

    venue: {
        name: "The Grand Ballroom",
        address: "Colombo, Sri Lanka",
        mapUrl: "https://maps.google.com/",
    },

    message: {
        introduction:
            "Together with our families, we joyfully invite you to celebrate the beginning of our new journey.",

        closing:
            "Your presence would make our celebration complete. We cannot wait to share this beautiful day with you.",
    },

    story: {
        introduction:
            "What began as a chance meeting became a friendship, a partnership, and the love story we are delighted to celebrate with you.",

        partnerOneDescription:
            "Quietly thoughtful, endlessly supportive, and always ready for the next adventure.",

        partnerTwoDescription:
            "Warm-hearted, joyful, and the beautiful soul who makes every ordinary moment feel special.",

        milestones: [
            {
                year: "2021",
                eyebrow: "Where it began",
                title: "Our first hello",
                description:
                    "A simple introduction over coffee turned into an afternoon of conversation neither of us wanted to end.",
            },
            {
                year: "2022",
                eyebrow: "The adventure",
                title: "Falling in love",
                description:
                    "Through little road trips, shared dreams, and ordinary days, we found home in one another.",
            },
            {
                year: "2025",
                eyebrow: "The promise",
                title: "She said yes",
                description:
                    "Beneath a golden evening sky, we promised to choose each other for every chapter still to come.",
            },
            {
                year: "2026",
                eyebrow: "The celebration",
                title: "We say I do",
                description:
                    "Now we cannot wait to begin married life surrounded by the people who have shaped our story.",
            },
        ],
    },

    schedule: [
        {
            time: "3:30 PM",
            title: "Guest arrival",
            description:
                "Welcome refreshments and time to find your seat.",
        },
        {
            time: "4:00 PM",
            title: "Wedding ceremony",
            description:
                "Join us as we exchange our vows in the garden pavilion.",
        },
        {
            time: "5:00 PM",
            title: "Cocktails & photographs",
            description:
                "Raise a glass, enjoy canapés, and capture the moment with us.",
        },
        {
            time: "6:30 PM",
            title: "Dinner & celebration",
            description:
                "An evening of dinner, speeches, music, and dancing.",
        },
    ],

    dressCode: {
        title: "Garden Formal",
        description:
            "We invite our guests to dress in elegant garden-formal attire inspired by soft, natural, and earthy colours.",
        colours: [
            "#87988D",
            "#C9ADA3",
            "#B99B72",
            "#EADFD0",
            "#43584D",
        ],
    },

    contacts: [
        {
            role: "The Bride",
            name: "Amelia",
            phone: "+94771234567",
            displayPhone: "+94 77 123 4567",
        },
        {
            role: "The Groom",
            name: "Noah",
            phone: "+94777654321",
            displayPhone: "+94 77 765 4321",
        },
    ],
} as const;