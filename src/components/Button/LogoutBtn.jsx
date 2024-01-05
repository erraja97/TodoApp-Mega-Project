import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as authLogoutSlice } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(authLogoutSlice());
    });
  };

  return (
    <button
      className="inline-block bg-gray-300 px-6 py-2 duration-200 hover:bg-green-600 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
