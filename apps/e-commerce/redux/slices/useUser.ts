"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function useUser() {
  const API_URL = "http://127.0.0.1:8000/api";
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/user`);
        const data = res.data.users;
      } catch (err) {
        console.error("Error:", err);
      }
    }

    fetchUsers();
  }, [dispatch]);

  async function registerUser(data: any) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, data);
      const token = response.data.token;
      document.cookie = `token=${token}; path=/`;

      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  }

  return { registerUser };
}

export default useUser;
