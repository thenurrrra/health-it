<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
const cartStore = useCartStore();
const { cartEquipments } = storeToRefs(cartStore);
const { cartNutritions } = storeToRefs(cartStore);
</script>
<template>
  <div>
    <header class="header">
      <div class="header__inner">
        <router-link to="/">
          <div class="header__logo">
            <div class="logo-img">
              <img src="@/assets/images/logo.png" alt="" />
            </div>
            <div class="logo-text">
              <h3>health <span>it</span></h3>
              <p>Интернет-магазин спортивных товаров.</p>
            </div>
          </div>
        </router-link>
        <router-link to="/cart">
          <div class="header__cart">
            <div class="cart-img">
              <img src="@/assets/images/cart.png" alt="" class="block" />
              <img src="@/assets/images/cart-hover.png" alt="" class="hover" />
              <p>{{ cartEquipments.length + cartNutritions.length }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </header>
  </div>
</template>
