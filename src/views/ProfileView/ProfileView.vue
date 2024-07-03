<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { onBeforeMount } from "vue";

const { user, getUserDetails } = useAuthStore();
const { logout } = useAuthStore();
onBeforeMount(() => {
  getUserDetails();
});
</script>
<template>
  <h1>Profile page</h1>
  <img :src="user.avatar" alt="" />
  <h2>{{ user.name }}</h2>
  <p>{{ user.email }}</p>
  <button @click="logout">Log Out</button>
</template>
