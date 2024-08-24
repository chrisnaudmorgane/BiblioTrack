"use client";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import 'boxicons';

const quizList = [
    { name: "Cryptomonnaie", icon: <box-icon name="bitcoin" type="logo" color="#ff9900"></box-icon> },
    { name: "Language C", icon: <box-icon name="code-alt" color="#00599C"></box-icon> },
    { name: "Python", icon: <box-icon type='logo' name='python' color="#3776AB"></box-icon>},
    { name: "Développement Web", icon: <box-icon name="globe" color="#00aaff"></box-icon> },
    { name: "CyberSécurité", icon: <box-icon name="shield-alt" color="#ff4b4b"></box-icon> },
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
        return <div>Chargement...</div>;
    }

    if (!user) return null;

    return (
        <section className="bg-violet-700">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black flex justify-around">
                    <p className="mb-4 text-3xl font-semibold">Bienvenue, <span className="font-semibold text-violet-800">{user.email}</span>!</p>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Se déconnecter
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <div className="border border-white rounded-lg w-96 focus:ring-violet-800 max-w-md p-4">
                        <div>
                            <h2 className="text-center text-3xl font-medium mb-4">Quiz</h2>
                        </div>
                        <div className="font-semibold text-2xl">
                            <ul className="space-y-4">
                                {quizList.map((quiz, index) => (
                                    <li 
                                        key={index} 
                                        className="rounded bg-white text-black py-2 px-4 shadow-md hover:bg-[#fd1d1d] cursor-pointer flex items-center space-x-2"
                                        onClick={() => router.push(`/quiz/${quiz.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                    >
                                        {quiz.icon && <span className="text-xl">{quiz.icon}</span>}
                                        <span>{quiz.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}