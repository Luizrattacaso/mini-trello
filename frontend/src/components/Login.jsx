import { useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering 
    ? "http://localhost:1212/auth/register" 
    : "http://localhost:1212/auth/login";

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          toast.success("Registration completed successfully! Please login.");
          setIsRegistering(false);
          setUsername("");
          setPassword("");
        } else {
          toast.success("Login completed successfully!");
          localStorage.setItem("user", JSON.stringify(data.user));
          onLoginSuccess(data.user);
        }
      } else {
        toast.error(data.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("The server is not responding.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <h1>TaskFlow</h1>
          <p>{isRegistering ? "Create your account" : "Access your dashboard"}</p>
        </div>

        <form onSubmit={handleAuth} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              placeholder="Your username"
              value={username}
              onSelect={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              placeholder="Your password"
              type="password"
              value={password}
              onSelect={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button text={isRegistering ? "Register" : "Login"} className="login-submit-btn" />
        </form>

        <div className="login-footer">
          <button 
            className="toggle-mode-btn" 
            onClick={() => {
                setIsRegistering(!isRegistering);
            }}
          >
            {isRegistering ? "Already have an account? Log in" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;