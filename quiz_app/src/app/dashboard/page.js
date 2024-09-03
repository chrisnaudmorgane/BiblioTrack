"use client";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";
import { motion } from "framer-motion";

const quizList = [
    { name: "Cryptomonnaie", icon: "bx bxl-bitcoin", color: "#F5780B", gradient: "from-orange-400 to-yellow-300" },
    { name: "Langage C", icon: "bx bx-code-alt", color: "#2B1CCF", gradient: "from-blue-500 to-indigo-500" },
    { name: "Python", icon: "bx bxl-python", color: "#E6FE10", gradient: "from-green-400 to-blue-500" },
    { name: "Developpement Web", icon: "bx bx-globe", color: "#2B1CCF", gradient: "from-purple-400 to-pink-500" },
    { name: "Cyber Securite", icon: "bx bx-shield-alt", color: "#1D0202", gradient: "from-gray-700 to-gray-900" },
    { name: "Sports", icon: "bx bxs-basketball", color: "#F5780B", gradient: "from-red-500 to-pink-500" },
    { name: "Cultures", icon: "bx bx-male-female", color: "#AD05C7", gradient: "from-indigo-400 to-purple-500" },
    { name: "Arts Matiaux", icon: "bx bxs-skull", color: "#B6A6B5", gradient: "from-gray-400 to-gray-600" },
    { name: "Jeux Videos", icon: "bx bxs-game", color: "#10EC29", gradient: "from-green-500 to-teal-400" },
    { name: "Ordinateur", icon: "bx bx-desktop", color: "#0943C1", gradient: "from-green-500 to-teal-400" },
    { name: "Commerce", icon: "bx bx-store-alt", color: "#424346", gradient: "from-green-500 to-teal-400" },
];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            router.push("/Auth/SignIn");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/Auth/SignIn");
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-600 to-indigo-600">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-16 w-16 border-t-4 border-white rounded-full"
                />
            </div>
        );
    }

    if (!user) return null;

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-violet-700 to-purple-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg shadow-xl overflow-hidden mb-8"
                >
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tableau de bord</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <p className="text-xl font-medium text-gray-700 mb-4 sm:mb-0">
                                Bienvenue, <span className="font-semibold text-violet-800">{user.email}</span>!
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Se déconnecter
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-lg shadow-xl overflow-hidden mb-8"
                >
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Choisissez votre Quiz</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizList.map((quiz, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`bg-gradient-to-r ${quiz.gradient} rounded-lg shadow-md cursor-pointer`}
                                    onClick={() => router.push(`/Questionnaires/quiz/${quiz.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                >
                                    <div className="p-6 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <i className={`${quiz.icon} text-4xl text-white`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-medium text-white">{quiz.name}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.footer 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-lg shadow-md p-4 mt-8 text-center text-gray-900"
                >
                    <p className="text-sm font-semibold">Développé avec ❤️ par <span className="text-violet-600">AGOSSOU Chrisnaud</span></p>
                </motion.footer>
            </div>
        </motion.section>
    );
}