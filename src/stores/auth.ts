import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { userCredentials } from "@/types/UserCredentials";

const API_URL = "https://api.escuelajs.co/api/v1/auth";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(localStorage.getItem("access_token"));
  const refreshToken = ref<string | null>(
    localStorage.getItem("refresh_token")
  );

  const user = ref<any>(null);

  async function login(userCredentials: userCredentials) {
    try {
      const { data } = await axios.post(`${API_URL}/login`, userCredentials);
      accessToken.value = data.access_token;
      refreshToken.value = data.refresh_token;
      localStorage.setItem("access_token", accessToken.value || "");
      localStorage.setItem("refresh_token", refreshToken.value || "");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken.value}`;
      console.log(accessToken.value, refreshToken.value);

      await getUserDetails();
    } catch (error) {
      console.log(error);
      logout();
    }
  }
  async function getUserDetails() {
    try {
      const { data } = await axios.get(`${API_URL}/profile`);
      user.value = data;
    } catch (error) {
      console.log("Failed to get user details!");
    }
  }
  async function logout() {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
  }

  return {
    accessToken,
    refreshToken,
    user,
    login,
    logout,
    getUserDetails,
  };
});
