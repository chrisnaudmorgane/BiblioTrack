"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import back from "../../../../public/back.jpg";
import Image from "next/image";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.includes('@') || password.length < 6) {
            setError("Email invalide ou mot de passe trop court (min 6 caractères)");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/Auth/SignIn");
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError("Cet email est déjà utilisé.");
                    break;
                case 'auth/invalid-email':
                    setError("L'email est invalide.");
                    break;
                case 'auth/weak-password':
                    setError("Le mot de passe est trop faible.");
                    break;
                default:
                    setError("Une erreur s'est produite lors de l'inscription.");
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
                <h2 className="text-2xl font-bold text-center mb-6">SIGN UP</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSignUp}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Your Email address"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Your Password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white cursor-pointer py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="flex justify-between mt-4 text-black font-semibold">
                        <span className="text-white">Already have an Account?</span>
                        <Link href="/Auth/SignIn" className="text-blue-500 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}