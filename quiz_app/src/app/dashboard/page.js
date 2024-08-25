"use client";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import 'boxicons';

const quizList = [
    { name: "Cryptomonnaie", icon: <box-icon name="bitcoin" type="logo" color="#F5780B"></box-icon> },
    { name: "Langage C", icon: <box-icon name="code-alt" color="#2B1CCF"></box-icon> },
    { name: "Python", icon: <box-icon type='logo' name='python' color="#E6FE10"></box-icon>},
    { name: "Developpement Web", icon: <box-icon name="globe" color="#2B1CCF"></box-icon> },
    { name: "Cyber Securite", icon: <box-icon name="shield-alt" color="#1D0202"></box-icon> },
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
        return <div className="flex justify-center items-center h-screen bg-violet-700">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>;
    }

    if (!user) return null;

    return (
        <section className="bg-gradient-to-br from-violet-700 to-purple-500 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tableau de bord</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <p className="text-xl font-medium text-gray-700 mb-4 sm:mb-0">
                                Bienvenue, <span className="font-semibold text-violet-800">{user.email}</span>!
                            </p>
                            <button 
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choisissez votre Quiz</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizList.map((quiz, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
                                    onClick={() => router.push(`/Questionnaires/quiz/${quiz.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                >
                                    <div className="p-6 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {quiz.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-medium text-white">{quiz.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="bg-white rounded-lg shadow-md p-4 mt-8 text-center text-gray-900">
                    <p className="text-sm font-semibold">Développé ❤️ par <span className="text-violet-600">AGOSSOU Chrisnaud</span></p>
                </footer>
            </div>
        </section>
    );
}
