<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { login } = useAuthStore();
const email = ref<string | null>(null);
const password = ref<string | null>(null);
</script>
<template>
  <h1>LogIn page</h1>
  <form @submit.prevent="login({ email, password })">
    <label for="email">
      Email: <input type="email" id="email" v-model="email" />
    </label>
    <label for="pwd">
      Password: <input type="password" id="password" v-model="password" />
    </label>
    <button type="submit">Log In</button>
  </form>
</template>
