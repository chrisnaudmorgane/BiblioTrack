const crypto = [
    {
        question: "Qu'est-ce qu'une cryptomonnaie ?",
        options: [
            "A) Une forme de monnaie numérique décentralisée",
            "B) Un type de monnaie papier",
            "C) Un programme informatique",
            "D) Une forme de monnaie centralisée",
        ],
        correctAnswer: "A",
    },

    {
        question: "Quelle est la première cryptomonnaie créée ?";
        options: [
            "A) Ethereum",
            "B) Ripple",
            "C) Litecoin",
            "D) Bitcoin",
        ],
        correctAnswer: "D",
    },

    {
        question: "Qui est le créateur de Bitcoin ?",
        options: [
            "A) Vitalik Buterin",
            "B) Satoshi Nakamoto",
            "C) Charles Hoskinson",
            "D) Elon Musk",
        ],
        correctAnswer: "B",
    },

    {
        question: "Quelle technologie sous-tend la plupart des cryptomonnaies ?",
        options: [
            "A) Intelligence Artificielle",
            "B) Blockchain",
            "C) Big Data",
            "D) Cloud Computing",
        ],
        correctAnswer: "B",
    },

    {
        question: "Quel est le principal avantage des cryptomonnaies par rapport aux monnaies traditionnelles ?";
        options: [
            "A) Elles sont soutenues par les gouvernements",
            "B) Elles permettent des transactions sans intermédiaire",
            "C) Elles sont plus faciles à falsifier",
            "D) Elles ont des taux de change fixes",
        ],
        correctAnswer: "B",
    },
];

let score = 0;

crypto.forEach((questionObject, index) => {

    const userAnswer = prompt(
        `${index + 10}. ${questionObject.question}\n${questionObject.options.join("\n")}`
    );

    if (userAnswer.toUpperCase == questionObject.correctAnswer) {
        score++;
    }
    
});

alert(`Vous avez obtenu un score de ${score} sur ${crypto.length}`);