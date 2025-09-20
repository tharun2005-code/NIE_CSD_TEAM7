import React, { useState } from "react";
import { loginAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await loginAdmin(username, password);
            if (result.success) {
                alert(result.message);
                setError("");
                navigate("/dashboard");
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error.message || JSON.stringify(error)}</p>}
        </div>
    );
}

export default AdminLogin;
