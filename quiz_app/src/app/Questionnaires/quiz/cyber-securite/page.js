"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cyberSecurityQuiz from '../../question_crypto/cyber_sec';

export default function CyberSecurityQuiz() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0 && !answerSubmitted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !answerSubmitted) {
            handleAnswerClick(null);
        }
    }, [timeLeft, answerSubmitted]);

    const handleAnswerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        setAnswerSubmitted(true);
        
        if (selectedOption === cyberSecurityQuiz[currentQuestion].correctAnswer) {
            setScore(prevScore => prevScore + 100 + timeLeft);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < cyberSecurityQuiz.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
                setAnswerSubmitted(false);
                setTimeLeft(30);
            } else {
                setShowScore(true);
            }
        }, 2000);
    };

    const getButtonColor = (option) => {
        if (!answerSubmitted) return 'bg-white text-black hover:bg-gray-300';
        if (option.charAt(0) === cyberSecurityQuiz[currentQuestion].correctAnswer) {
            return 'bg-green-500 text-white';
        }
        if (option.charAt(0) === selectedAnswer) {
            return 'bg-red-500 text-white';
        }
        return 'bg-white text-black';
    };

    const goToHome = () => {
        router.push('/dashboard');
    };

    if (!cyberSecurityQuiz || cyberSecurityQuiz.length === 0) {
        return <div className="flex items-center justify-center h-screen bg-violet-800">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>;
    }

    if (showScore) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-800 to-purple-600">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                    <h2 className="text-3xl font-bold mb-4 text-center text-violet-800">Quiz terminé!</h2>
                    <p className="text-2xl mb-2 text-center text-blue-800 font-medium">Score total : <span className="font-bold text-green-600">{score} points</span></p>
                    <p className="text-xl text-center text-red-500 font-bold">Bonnes réponses : <span className="font-bold text-violet-600">{score / 100} sur {crypto.length}</span></p>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-[48%]"
                        >
                            Rejouer
                        </button>
                        <button
                            onClick={goToHome}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-[48%]"
                        >
                            Accueil
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestionData = cyberSecurityQuiz[currentQuestion];

    return (
        <section className='min-h-screen bg-gradient-to-br from-violet-800 to-purple-600 py-12 px-4'>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-2xl font-bold text-violet-800">
                            Question {currentQuestion + 1} / {cyberSecurityQuiz.length}
                        </div>
                        <div className="text-xl font-semibold text-violet-600">
                            Temps: <span className={`${timeLeft <= 10 ? 'text-red-500' : 'text-green-500'}`}>{timeLeft}s</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">{currentQuestionData.question}</h2>
                    <div className="space-y-4">
                        {currentQuestionData.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !answerSubmitted && handleAnswerClick(option.charAt(0))}
                                className={`block w-full text-left p-4 rounded-lg transition duration-300 ${getButtonColor(option)} ${!answerSubmitted && 'hover:shadow-md transform hover:-translate-y-1'}`}
                                disabled={answerSubmitted}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-semibold text-violet-800">
                        Score actuel : <span className='text-green-600'>{score} points</span>
                    </div>
                    <button
                        onClick={goToHome}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Quitter
                    </button>
                </div>
            </div>
        </section>
    );
}