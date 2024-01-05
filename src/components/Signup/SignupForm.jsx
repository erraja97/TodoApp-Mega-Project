import React, { useState } from "react";
import Container from "../container/container";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login as authLoginSlice } from "../../store/authSlice";

function SignupForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    setError("");

    // Prevents the default form submission
    e.preventDefault();

    if (!email || !password || !confirmPassword || !userName) {
      // Handle the case where email or password is empty
      console.error("All fields are required.");
      return;
    } else if (password !== confirmPassword) {
      console.error("Password not matching");
      return;
    } else {
      try {
        const userData = await authService.createAccount({
          email,
          password,
          name: userName, //corrected parameter
        });
        if (userData) {
          const userData = await authService.getCurrentUser();
          if (userData) dispatch(authLoginSlice(userData));
          navigate("/");
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <Container>
        <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full mx-auto">
          <h1 className="text-2xl font-bold mb-4">Signup</h1>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
            <button
              className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500"
              type="button"
              onClick={handleSignup}
            >
              Signup
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignupForm;
