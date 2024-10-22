import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { User } from "@/types/User";

export const useUsersStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const user = ref<User | null>(null);

  async function fetchUsers() {
    try {
      const { data } = await axios("https://api.escuelajs.co/api/v1/users/");
      users.value = data;
    } catch (error) {
      console.error(error);
    }
  }
  async function addUser(newUser) {
    try {
      console.log("Отправка данных пользователя:", newUser);
      const { data } = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      users.value.push(data);
      user.value = data;
      return user.value;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Ошибка ответа:", error.response?.data);
      } else {
        console.error("Ошибка:", error.message);
      }
    }
  }

  return {
    users,
    user,
    fetchUsers,
    addUser,
  };
});
