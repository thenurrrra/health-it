<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { onBeforeMount, computed } from "vue";

// Получаем методы и состояния из auth store
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const { getUserDetails, logout } = authStore;

// Вызываем getUserDetails при монтировании компонента
onBeforeMount(async () => {
  if (authStore.accessToken) {
    await getUserDetails();
  }
});
</script>

<template>
  <div v-if="user">
    <div class="profile">
      <div class="profile__main-text">
        <img src="@/assets/images/user-hover.png" alt="" />
        <h1>Ваш профиль</h1>
      </div>
      <div class="profile__inner">
        <div class="profile-avatar">
          <img :src="user.avatar" alt="User avatar" />
        </div>
        <div class="profile-data">
          <div class="profile-name">
            <h2>{{ user.name }}</h2>
          </div>
          <div class="profile-email">
            <p>{{ user.email }}</p>
          </div>
          <div class="profile-logout-btn">
            <button @click="logout">Выйти</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <h1>Profile page</h1>
    <div>
      <img :src="user.avatar" alt="User avatar" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
    <button @click="logout">Log Out</button> -->
  </div>
  <div v-else>
    <div class="profile">
      <div class="profile__main-text">
        <img src="@/assets/images/user-hover.png" alt="" />
        <h1>Вы не вошли в аккаунт</h1>
        <button><router-link to="/login">Войти</router-link></button>
      </div>
    </div>
  </div>
</template>
