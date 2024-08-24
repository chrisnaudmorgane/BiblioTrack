import { useState } from "react";
import crypto from "../Cryptomonnaies/crypto";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = (answer) => {
        if (answer === crypto[currentQuestion].correctAnswer) {
            setScore(score + 10);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < crypto.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            {showScore ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Votre score est de {score} sur {crypto.length * 10}</h2>
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">{crypto[currentQuestion].question}</h2>
                    </div>
                    <div className="space-y-2">
                        {crypto[currentQuestion].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleAnswerOptionClick(option[0])}
                                className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
