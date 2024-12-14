import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

function GroceryList({ user }) {
    const navigate = useNavigate(); 
    const [item, setItem] = useState("");
    const [groceryItems, setGroceryItems] = useState([]);
    const [isListening, setIsListening] = useState(false); 

    useEffect(() => {
        const fetchGroceryItems = async () => {
            const response = await fetch("https://grocery-mern-backend.onrender.com/grocery-items");
            const data = await response.json();
            setGroceryItems(data);
        };

        fetchGroceryItems();
    }, []);

    const addItem = async () => {
        if (item.trim() === "") return;

        const response = await fetch("https://grocery-mern-backend.onrender.com/add-grocery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item }),
        });

        const data = await response.json();
        setGroceryItems(data.items);
        setItem("");
    };

    const deleteItem = async (itemToDelete) => {
        const response = await fetch("https://grocery-mern-backend.onrender.com/delete-grocery", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: itemToDelete }),
        });

        const data = await response.json();
        setGroceryItems(data.items);
    };

    
    const handleLogout = () => {
        localStorage.removeItem("user"); 
        navigate("/"); 
    };

    
    const startVoiceInput = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Your browser does not support voice recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setItem(transcript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className="p-4 space-y-4 bg-white shadow-lg rounded-lg max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center">Welcome, {user}!</h1>

            
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mt-4"
            >
                Log Out
            </button>

            <div className="max-w-md mx-auto p-6 rounded-lg shadow-md backdrop-blur-sm bg-[rgba(255, 255, 255, 0.2)] text-black">
                <h2 className="text-xl font-semibold mb-4">Add Your Favorite Grocery Items</h2>
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="Enter grocery item"
                        className="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        onClick={startVoiceInput}
                        className={`p-2 rounded-full ${
                            isListening
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 text-black hover:bg-gray-400"
                        }`}
                        title="Click to use voice input"
                    >
                        🎤
                    </button>
                    <button
                        onClick={addItem}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
                <div className="max-h-80 overflow-y-auto space-y-2">
                    {groceryItems.map((i, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                        >
                            <p>{i}</p>
                            <button
                                onClick={() => deleteItem(i)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GroceryList;
