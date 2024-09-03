"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ordinateur from '../../question_crypto/ordinateur';
import { motion, AnimatePresence } from 'framer-motion';

export default function Ordinateur() {
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
        
        if (selectedOption === ordinateur[currentQuestion].correctAnswer) {
            setScore(prevScore => prevScore + 100);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < ordinateur.length) {
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
        if (option.charAt(0) === ordinateur[currentQuestion].correctAnswer) {
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

    if (!ordinateur || ordinateur.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-violet-800 to-purple-600">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-16 w-16 border-t-4 border-white rounded-full"
                />
            </div>
        );
    }

    if (showScore) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-800 to-purple-600"
            >
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
                >
                    <h2 className="text-3xl font-bold mb-4 text-center text-violet-800">Quiz terminé!</h2>
                    <p className="text-2xl mb-2 text-center text-blue-800 font-medium">Score total : <span className="font-bold text-green-600">{score} points</span></p>
                    <p className="text-xl text-center text-red-500 font-bold">Bonnes réponses : <span className="font-bold text-violet-600">{score / 100} sur {ordinateur.length}</span></p>
                    <div className="flex justify-between mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-[48%]"
                        >
                            Rejouer
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={goToHome}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-[48%]"
                        >
                            Accueil
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    const currentQuestionData = ordinateur[currentQuestion];

    return (
        <section className='min-h-screen bg-gradient-to-br from-violet-800 to-purple-600 py-12 px-4'>
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-2xl font-bold text-violet-800">
                            Question {currentQuestion + 1} / {ordinateur.length}
                        </div>
                        <motion.div 
                            animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
                            transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                            className="text-xl font-semibold text-violet-600"
                        >
                            Temps: <span className={`${timeLeft <= 10 ? 'text-red-500' : 'text-green-500'}`}>{timeLeft}s</span>
                        </motion.div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">{currentQuestionData.question}</h2>
                    <div className="space-y-4">
                        <AnimatePresence>
                            {currentQuestionData.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => !answerSubmitted && handleAnswerClick(option.charAt(0))}
                                    className={`block w-full text-left p-4 rounded-lg transition duration-300 ${getButtonColor(option)} ${!answerSubmitted && 'hover:shadow-md transform hover:-translate-y-1'}`}
                                    disabled={answerSubmitted}
                                    whileHover={{ scale: !answerSubmitted ? 1.02 : 1 }}
                                    whileTap={{ scale: !answerSubmitted ? 0.98 : 1 }}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-semibold text-violet-800">
                        Score actuel : <span className='text-green-600'>{score} points</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goToHome}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Quitter
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}