import Link from "next/link";

export default function SignIn() {
    return (
        <section>
            <div className="text-black w-96 p-8 rounded-lg shadow-lg max-w-md backdrop-blur-md">
                <h2 className="text-2xl font-bold text-center mb-6">SIGN IN</h2>
                <form>
                    <div className="mb-6">
                        <label htmlFor="email" className="block font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Enter your Email..."
                            autoComplete="on"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Your Password..."
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white cursor-pointer py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                        SIGN IN
                    </button>
                    <div className="flex justify-between mt-4 text-black font-semibold">
                        <span className="text-white">Not signed up?</span>
                        <Link href="/signUp" className="text-blue-500 hover:underline">
                            Sign up here
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
