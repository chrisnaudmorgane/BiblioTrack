"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation"
import Link from "next/link";
import back from "../../../../public/back.jpg";
import Image from "next/image";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [connect, setConnect] = useState("");
    const router = useRouter();


    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");
        setConnect("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setConnect("Vous êtes connectés avec succès");
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError("L'email est invalide.");
                    break;
                case 'auth/invalid-password':
                    setError("Le mot de passe est incorrect.");
                    break;
                default:
                    setError("Une erreur s'est produite lors de la connexion.");
            }
        }
    };

    return (
        <section className="relative bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen">
            <div className="absolute inset-0" aria-hidden="true">
                <Image
                    src={back}
                    alt="Background image"
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={80}
                    priority
                />
            </div>
            <div className="text-black w-96 p-8 rounded-lg shadow-lg max-w-md backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>
                {connect && <p className="text-green-500 text-xl mb-4 font-semibold">{connect}</p>}
                {error && <p className="text-red-500 text-2xl mb-4 font-semibold">{error}</p>}
                <form onSubmit={handleSignIn}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre addresse email..."
                            autoComplete="on"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium mb-2">
                            Mot de Passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez votre mot de passe..."
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white cursor-pointer py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                        Se connecter
                    </button>
                    <div className="flex justify-between mt-4 text-black font-semibold">
                        <span className="text-white">Pas de compte?</span>
                        <Link href="/Auth/SignUp" className="text-blue-500 hover:underline">
                            S'inscrire
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
