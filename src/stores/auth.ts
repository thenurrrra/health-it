import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { userCredentials } from "@/types/UserCredentials";
import { useRouter } from "vue-router";

const API_URL = "https://api.escuelajs.co/api/v1/auth";
const PRODUCTS_URL = "http://localhost:3000/equipments";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(localStorage.getItem("access_token"));
  const refreshToken = ref<string | null>(
    localStorage.getItem("refresh_token")
  );

  const user = ref<any>(null);

  async function login(userCredentials: userCredentials) {
    try {
      const { data } = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        userCredentials
      );
      accessToken.value = data.access_token;
      refreshToken.value = data.refresh_token;
      localStorage.setItem("access_token", accessToken.value || "");
      localStorage.setItem("refresh_token", refreshToken.value || "");

      await getUserDetails();
    } catch (error) {
      console.log(error);
      // logout();
    }
  }

  if (accessToken.value) {
    getUserDetails();
  }

  async function getUserDetails() {
    try {
      const { data } = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      user.value = data;
    } catch (error) {
      console.error("Failed to get user details:", error);
      logout();
    }
  }

  async function logout() {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/";
  }

  async function fetchEquipments() {
    try {
      const { data } = await axios.get(PRODUCTS_URL, {
        headers: {},
      });
      console.log("Products:", data);
    } catch (error) {
      console.log("Failed to fetch products!", error);
    }
  }
  if (accessToken.value) {
    getUserDetails();
  }

  return {
    accessToken,
    refreshToken,
    user,
    login,
    logout,
    getUserDetails,
    fetchEquipments,
  };
});
