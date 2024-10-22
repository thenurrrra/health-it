<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import type { Equipment } from "@/types/Equipment";
import type { Nutrition } from "@/types/Nutrition";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
const cartStore = useCartStore();
const { cartEquipments } = storeToRefs(cartStore);
const { cartNutritions } = storeToRefs(cartStore);

function clear() {
  cartEquipments.value = [];
  localStorage.setItem("cartEquipments", JSON.stringify(cartEquipments.value));
  cartNutritions.value = [];
  localStorage.setItem("cartNutritions", JSON.stringify(cartNutritions.value));
}

function removeEquipmentFromCart(product: Equipment, products: Equipment[]) {
  cartStore.removeEquipmentFromCart(product, products);
  localStorage.setItem("cartEquipments", JSON.stringify(cartEquipments.value));
}
function removeNutritionFromCart(product: Nutrition, products: Nutrition[]) {
  cartStore.removeNutritionFromCart(product, products);
  localStorage.setItem("cartNutritions", JSON.stringify(cartNutritions.value));
}

const counterEqu = ref(1);

let totalPriceOfEquipments = computed(() => {
  return cartEquipments.value.reduce((total: number, item: Equipment) => {
    let priceNumber = Number(item.price.replace(/[^\d]/g, ""));
    return total + priceNumber;
  }, 0);
});

function getUniqueItems(array, key) {
  const unique = array.reduce((acc, item) => {
    if (!acc.some((el) => el[key] === item[key])) {
      acc.push(item);
    }
    return acc;
  }, []);
  return unique;
}

const uniqueEquipments = computed(() => {
  return getUniqueItems(cartEquipments.value, "id"); // Assuming 'id' is a unique identifier for each item
});

const uniqueNutritions = computed(() => {
  return getUniqueItems(cartNutritions.value, "id"); // Assuming 'id' is a unique identifier for each item
});

function addCountEqu(item: Equipment) {
  counterEqu.value++;
  cartEquipments.value.push(item);
}

const totalPriceOfNutritions = computed(() => {
  return cartNutritions.value.reduce((total: number, item: Equipment) => {
    let priceNumber = Number(item.price.replace(/[^\d]/g, ""));
    return total + priceNumber;
  }, 0);
});
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
            <h2>
              Оборудования:
              {{ totalPriceOfEquipments }} ₸
            </h2>
          </div>
          <div v-if="cartEquipments.length > 0">
            <ul class="cart__equipments-list">
              <router-link
                tag="li"
                v-for="equipment in uniqueEquipments"
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
                    <div class="cart-counter">
                      <p>{{ counterEqu }}</p>
                      <button @click.prevent="addCountEqu(equipment)">+</button>
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
            <h2>Питание: {{ totalPriceOfNutritions }} ₸</h2>
          </div>
          <div v-if="cartNutritions.length > 0">
            <ul class="cart__equipments-list">
              <router-link
                tag="li"
                v-for="equipment in uniqueNutritions"
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
                    <div class="cart-counter">
                      <p>0</p>
                      <button>+</button>
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
    <div class="cart__equ">
      <div class="cart__main-text">
        <img src="@/assets/images/empty-cart.png" alt="" />
        <h1>Корзина пуста</h1>
      </div>
    </div>
  </div>
  <div v-if="totalPriceOfEquipments > 0 || totalPriceOfNutritions > 0">
    <div class="payment">
      <div class="payment__inner">
        <p>К оплате: {{ totalPriceOfEquipments + totalPriceOfNutritions }} ₸</p>
        <button>Оплатить</button>
      </div>
    </div>
  </div>
</template>
