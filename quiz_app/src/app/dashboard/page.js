"use client";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black">
                <p className="mb-4">Bienvenue, <span className="font-semibold">{user.email}</span>!</p>
                {user.displayName && (
                    <p className="mb-4">Nom : {user.displayName}</p>
                )}
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}