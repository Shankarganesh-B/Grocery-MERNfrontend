import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        const response = await fetch("https://grocery-mern-backend.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            navigate("/grocery-list", { state: { user: username } }); 
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-4 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold">Welcome Back to Grocery List</h1>
            <p className="text-lg">Login to manage your grocery items</p>
            <div className="w-full max-w-sm space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
                {message && <p className="text-red-500">{message}</p>}
            </div>
            <p className="text-lg">
                Don't have an account? <a href="/signup" className="text-blue-500 underline text-lg">Sign Up</a>
            </p>
        </div>
    );
}

export default Login;
