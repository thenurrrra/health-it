<script setup lang="ts"></script>
<template>
  <div class="welcome__text">
    <h1>
      <span class="fast-flicker">h</span>eal<span class="flicker">t</span>h it
    </h1>
  </div>
  <div class="popular__categories">
    <div class="popular__categories-title">
      <img src="@/assets/images/fire.png" alt="" />
      <h2>Популярные категории</h2>
    </div>
    <div class="select">
      <router-link to="/equipments">
        <div class="select-tools">
          <div class="select_img">
            <img src="@/assets/images/tools.png" alt="" />
          </div>
          <div class="select-title">
            <h3>Тренажеры</h3>
          </div>
        </div>
      </router-link>
      <router-link to="/nutritions">
        <div class="select-foods">
          <div class="select_img">
            <img src="@/assets/images/food.jpg" alt="" />
          </div>
          <div class="select-title">
            <h3>Питание</h3>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
