<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import type { Equipment } from "@/types/Equipment";
import { storeToRefs } from "pinia";
const favoritesStore = useFavoritesStore();
const { favItems } = storeToRefs(favoritesStore);

console.log(favItems);

function clear() {
  favItems.value = [];
}

function removeFav(product: Equipment, products: Equipment[]) {
  favoritesStore.removeFav(product, products);
}
</script>
<template>
  <div v-if="favItems.length > 0">
    <div class="cart__equ">
      <div class="cart__main-text">
        <img src="@/assets/images/heart-fill.png" alt="" />
        <h1>Избранные</h1>
        <button @click="clear">Очистить</button>
      </div>
      <div v-if="favItems.length > 0">
        <ul class="cart__equipments-list">
          <router-link
            tag="li"
            v-for="equipment in favItems"
            :to="`/equipments/${equipment.id}`"
            ><div class="cart__equipment-card">
              <div class="cart__equ-img">
                <img :src="equipment.img[0]" alt="" />
              </div>
              <div class="cart__title-price">
                <div class="cart__equ-title">
                  <h4>{{ equipment.title }}</h4>
                </div>
                <div class="cart__equ-price">
                  <h3>{{ equipment.price }}</h3>
                </div>
                <div class="cart__equ-delete">
                  <button @click.prevent="removeFav(equipment, favItems)">
                    Удалить из избранных
                  </button>
                </div>
              </div>
            </div></router-link
          >
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <!-- <div class="empty-cart">
      <img src="@/assets/images/empty-cart.png" alt="" />
      <h1>Корзина пуста</h1>
    </div> -->
    <div class="cart__equ">
      <div class="cart__main-text">
        <img src="@/assets/images/broken-heart.png" alt="" />
        <h1>Нету избранных</h1>
      </div>
    </div>
  </div>
</template>
