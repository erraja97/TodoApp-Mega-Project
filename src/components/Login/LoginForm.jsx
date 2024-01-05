import React, { useState } from "react";
import Container from "../container/container";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as authLoginSlice } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setError("");

    // Prevents the default form submission
    e.preventDefault();

    // Add your login logic here
    try {
      if (!email || !password) {
        // Handle the case where email or password is empty
        console.error("Email and password are required.");
        return;
      }

      const session = await authService.login({email, password});
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLoginSlice(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
      console.log("error in login");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <Container>
        <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full mx-auto">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md"
            />

            <button
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
              onClick={handleLogin}
              type="button"
            >
              Login
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default LoginForm;
