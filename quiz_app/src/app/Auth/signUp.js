import Link from "next/link"

export default function SignUp() {
    return (
        <section>
            <div>
                <h2></h2>
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Enter Your Email address"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            value="SIGN UP"
                            className="w-full bg-blue-500 text-white cursor-pointer py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                        >
                            
                        </button>
                    </div>
                    <div className="flex justify-between mt-4 text-black font-semibold">
                        <span className="text-white">Already have an Account?</span>
                        <Link href="/signIn" className="text-blue-500 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}