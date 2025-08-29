import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { message } from "antd";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Check if user navigated to register route and update state accordingly
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsLogin(false);
    } else if (location.pathname === "/login") {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);
    // Navigate to the appropriate route when toggling
    if (newIsLogin) {
      navigate("/login", { replace: true });
    } else {
      navigate("/register", { replace: true });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    message.loading("Logging in...", 0);
    
    login(email, password).then(
      (response) => {
        message.destroy();
        message.success(response.message || "Login successful!");
        // Redirect to original destination or profile
        const from = location.state?.from || "/profile";
        navigate(from);
      },
      (error) => {
        message.destroy();
        message.error(error.message || "Login failed!");
        console.log(error);
      }
    );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    message.loading("Creating account...", 0);
    
    register(username, email, password).then(
      (response) => {
        message.destroy();
        message.success(response.message || "Registration successful!");
        
        // Auto-login after registration
        return login(email, password);
      },
      (error) => {
        message.destroy();
        message.error(error.message || "Registration failed!");
        console.log(error);
        return Promise.reject(error);
      }
    ).then((loginResponse) => {
      if (loginResponse) {
        message.success("Auto-login successful!");
        // Redirect to original destination or profile
        const from = location.state?.from || "/profile";
        navigate(from);
      }
    }).catch((error) => {
      if (error.message !== "Registration failed!") {
        message.error("Auto-login failed!");
        console.log(error);
      }
    });
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          {!isLogin && (
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={toggleForm}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
