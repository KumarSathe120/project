// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // or { email, role }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
// 

// components/LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/loginActions';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser(navigate))
    dispatch(logout()); // Clears Redux state
    localStorage.clear(); // Optional: Clear any remaining user data
    window.location.href = '/'; // Redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline px-4 py-2"
    >
      Logout
    </button>
  );
}
