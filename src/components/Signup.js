import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);  

    const handleSignup = async () => {
        setIsLoading(true);  
        const response = await fetch("https://grocery-mern-backend.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setIsLoading(false);  

        if (response.ok) {
            navigate("/");  
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-4 text-center bg-white shadow-lg rounded-lg max-w-sm mx-auto mt-10">
            <h1 className="text-3xl font-extrabold">Create Your Account</h1>
            <p className="text-lg text-gray-500">Sign up to manage your grocery items.</p>
            <div className="w-full space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                    onClick={handleSignup}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    disabled={isLoading}  
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
                {message && <p className="text-red-500">{message}</p>}
            </div>
            <p className="text-lg mt-4">
                Already have an account? <Link to="/" className="text-blue-500 underline">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
