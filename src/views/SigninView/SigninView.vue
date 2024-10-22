<script setup lang="ts">
import { ref } from "vue";
import { useUsersStore } from "../../stores/user";
const email = ref("");
const password = ref("");
const name = ref("");

const avatar = ref("");

const userStore = useUsersStore();

function validateData(userData) {
  const { name, email, password, avatar } = userData;
  return name && email && password && avatar;
}
async function register() {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
    avatar: avatar.value,
  };

  if (!validateData(userData)) {
    console.error("Validation failed: All fields are required.");
    return;
  }

  try {
    const user = await userStore.addUser(userData);
    if (user) {
      console.log("User registered successfully:", user);
    } else {
      console.error("Registration failed.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
  return {
    name,
    email,
    password,
    avatar,
    register,
  };
}
</script>
<template>
  <div class="login">
    <div class="login__main-text">
      <img src="@/assets/images/login-hover.png" alt="" />
      <h1>Создайте аккаунт</h1>
    </div>
    <div class="login__inner">
      <form @submit.prevent="register">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" required id="name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required id="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required id="password" />
        </div>
        <div>
          <label for="avatar">Avatar URL:</label>
          <input type="text" v-model="avatar" required id="avatar" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>
