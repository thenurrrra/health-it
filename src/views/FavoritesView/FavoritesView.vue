<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import type { Equipment } from "@/types/Equipment";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
const favoritesStore = useFavoritesStore();
const { favItems } = storeToRefs(favoritesStore);
const cartStore = useCartStore();
const { cartEquipments } = storeToRefs(cartStore);

console.log(favItems);

function clear() {
  favItems.value = [];
  localStorage.setItem("favItems", JSON.stringify(favItems.value));
}

function addToCart(cartItem: Equipment) {
  const index = cartEquipments.value.findIndex((item) => item === cartItem);

  if (index !== -1) {
    cartEquipments.value.splice(index, 1);
    localStorage.setItem(
      "cartEquipments",
      JSON.stringify(cartEquipments.value)
    );
  } else {
    cartEquipments.value.push(cartItem);
    localStorage.setItem(
      "cartEquipments",
      JSON.stringify(cartEquipments.value)
    );
  }
}

function getButtonText(item: Equipment) {
  if (cartEquipments.value.includes(item)) {
    return "Убрать из корзины";
  } else {
    return "В корзину";
  }
}

function removeFav(product: Equipment, products: Equipment[]) {
  favoritesStore.removeFav(product, products);
  localStorage.setItem("favItems", JSON.stringify(favItems.value));
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
                <div
                  class="cart__equ-delete"
                  style="display: flex; flex-direction: column; gap: 20px"
                >
                  <button @click.prevent="removeFav(equipment, favItems)">
                    Удалить из избранных
                  </button>

                  <button
                    @click.prevent="addToCart(equipment)"
                    :class="{ added: cartEquipments.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
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
