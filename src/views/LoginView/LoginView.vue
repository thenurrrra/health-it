<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { login } = useAuthStore();
const email = ref<string | null>(null);
const password = ref<string | null>(null);
</script>
<template>
  <div class="login">
    <div class="login__main-text">
      <img src="@/assets/images/login-hover.png" alt="" />
      <h1>Войти в акканут</h1>
    </div>
    <div class="login__inner">
      <form @submit.prevent="login({ email, password })">
        <label for="email">
          <input type="email" id="email" v-model="email" placeholder="Email" />
        </label>
        <br />
        <label for="pwd">
          <input
            type="password"
            id="pwd"
            v-model="password"
            placeholder="Password"
          />
        </label>
        <br />
        <button type="submit">Войти</button>
      </form>
    </div>
    <div class="signin">
      <p>Нету аккаунта?</p>
      <span
        ><router-link
          to="/signin"
          style="color: red; text-decoration: underline"
          >Зарегестрируйтесь</router-link
        ></span
      >
    </div>
  </div>
</template>
