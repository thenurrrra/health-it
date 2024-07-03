<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import type { Equipment } from "@/types/Equipment";
import type { Nutrition } from "@/types/Nutrition";
import { storeToRefs } from "pinia";
const cartStore = useCartStore();
const { cartEquipments } = storeToRefs(cartStore);
const { cartNutritions } = storeToRefs(cartStore);

function clear() {
  cartEquipments.value = [];
  cartNutritions.value = [];
}

function removeEquipmentFromCart(product: Equipment, products: Equipment[]) {
  cartStore.removeEquipmentFromCart(product, products);
}
function removeNutritionFromCart(product: Nutrition, products: Nutrition[]) {
  cartStore.removeNutritionFromCart(product, products);
}
</script>
<template>
  <div v-if="cartEquipments.length > 0 || cartNutritions.length > 0">
    <div class="cart__equ">
      <div class="cart__main-text">
        <img src="@/assets/images/shopping-cart.png" alt="" />
        <h1>Корзина</h1>
        <button @click="clear">Очистить</button>
      </div>
      <div class="cart-items">
        <div class="equipments-cart">
          <div class="cart__text">
            <img src="@/assets/images/dumbbell-hover.png" alt="" />
            <h2>Оборудования</h2>
          </div>
          <div v-if="cartEquipments.length > 0">
            <ul class="cart__equipments-list">
              <router-link
                tag="li"
                v-for="equipment in cartEquipments"
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
                      <button
                        @click.prevent="
                          removeEquipmentFromCart(equipment, cartEquipments)
                        "
                      >
                        Убрать с корзины
                      </button>
                    </div>
                  </div>
                </div></router-link
              >
            </ul>
          </div>
          <div v-else>
            <h2
              style="
                font-size: 15px;
                font-weight: 500;
                color: grey;
                margin-top: 20px;
              "
            >
              Вы не добавляли товар из этой категории
            </h2>
          </div>
        </div>
        <hr style="height: 50px" />
        <div class="nutritions-cart">
          <div class="cart__text">
            <img src="@/assets/images/food-hover.png" alt="" />
            <h2>Питание</h2>
          </div>
          <div v-if="cartNutritions.length > 0">
            <ul class="cart__equipments-list">
              <router-link
                tag="li"
                v-for="equipment in cartNutritions"
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
                      <button
                        @click.prevent="
                          removeNutritionFromCart(equipment, cartNutritions)
                        "
                      >
                        Убрать с корзины
                      </button>
                    </div>
                  </div>
                </div></router-link
              >
            </ul>
          </div>
          <div v-else>
            <h2
              style="
                font-size: 15px;
                font-weight: 500;
                color: grey;
                margin-top: 20px;
              "
            >
              Вы не добавляли товар из этой категории
            </h2>
          </div>
        </div>
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
        <img src="@/assets/images/empty-cart.png" alt="" />
        <h1>Корзина пуста</h1>
      </div>
    </div>
  </div>
</template>
