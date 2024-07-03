<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites";
import { storeToRefs } from "pinia";
const favStore = useFavoritesStore();
const { favItems } = storeToRefs(favStore);
</script>
<template>
  <div class="wrapper">
    <div class="view">
      <div class="sidebar">
        <div class="sidebar__logo">
          <div class="logo-img">
            <img src="@/assets/images/logo.png" alt="" />
          </div>
          <div class="logo-text">
            <h3>health <span>it</span></h3>
          </div>
        </div>
        <nav>
          <li>
            <router-link to="/">
              <div class="router-name">
                <img src="@/assets/images/main.png" alt="" class="block" />
                <img src="@/assets/images/main-hover.png" alt="" class="none" />
                <p>Главная</p>
              </div>
            </router-link>
            <router-link to="/profile">
              <div class="router-name">
                <img src="@/assets/images/user.png" alt="" class="block" />
                <img src="@/assets/images/user-hover.png" alt="" class="none" />
                <p>Профиль</p>
              </div>
            </router-link>
            <router-link to="/favorites">
              <div class="router-name">
                <img src="@/assets/images/heart.png" alt="" class="block" />
                <img src="@/assets/images/heart-fill.png" alt="" class="none" />
                <p>
                  Избранные <span>{{ favItems.length }}</span>
                </p>
              </div>
            </router-link>
            <router-link to="/login">
              <div class="router-name">
                <img src="@/assets/images/login.png" alt="" class="block" />
                <img
                  src="@/assets/images/login-hover.png"
                  alt=""
                  class="none"
                />
                <p>Войти</p>
              </div>
            </router-link>
          </li>
          <p class="category">Категории</p>
          <li>
            <router-link to="/equipments">
              <div class="router-name">
                <img src="@/assets/images/dumbbell.png" alt="" class="block" />
                <img
                  src="@/assets/images/dumbbell-hover.png"
                  alt=""
                  class="none"
                />
                <p>Оборудования</p>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/nutritions">
              <div class="router-name">
                <img src="@/assets/images/food.png" alt="" class="block" />
                <img src="@/assets/images/food-hover.png" alt="" class="none" />
                <p>Питание</p>
              </div>
            </router-link>
          </li>
        </nav>
      </div>
      <div class="main-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>
