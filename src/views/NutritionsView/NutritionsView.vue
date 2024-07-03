<script setup lang="ts">
import { ref } from "vue";
import { useNutritionsStore } from "@/stores/nutrition";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useCartStore } from "@/stores/cart";
import type { Nutrition } from "@/types/Nutrition";
import { useFavoritesStore } from "@/stores/favorites";
const favStore = useFavoritesStore();
const { favItems } = storeToRefs(favStore);
const nutritionsStore = useNutritionsStore();
const { nutritions } = storeToRefs(nutritionsStore);
const cartStore = useCartStore();
const { cartNutritions } = storeToRefs(cartStore);
const text = ref("Все");

const befores = ref(
  nutritions.value.filter((nutrition) => nutrition.category === "before")
);
const afters = ref(
  nutritions.value.filter((nutrition) => nutrition.category === "after")
);
const carbohydrates = ref(
  nutritions.value.filter((nutrition) => nutrition.category === "carbohydrates")
);

function addToCart(cartItem: Nutrition) {
  const index = cartNutritions.value.findIndex((item) => item === cartItem);

  if (index !== -1) {
    cartNutritions.value.splice(index, 1);
  } else {
    cartNutritions.value.push(cartItem);
  }
}

function addToFav(favItem: Nutrition) {
  const index = favItems.value.findIndex((item) => item === favItem);

  if (index !== -1) {
    favItems.value.splice(index, 1);
  } else {
    favItems.value.push(favItem);
  }
}

function getButtonText(item: Nutrition) {
  if (cartNutritions.value.includes(item)) {
    return "Убрать из корзины";
  } else {
    return "В корзину";
  }
}

function getHeartButtonText(item: Nutrition) {
  if (favItems.value.includes(item)) {
    return "♥";
  } else {
    return "♡";
  }
}

onBeforeMount(() => {
  nutritionsStore.fetchNutritions();
});
</script>
<template>
  <div class="equ">
    <div class="equ__main-text">
      <img src="@/assets/images/food-hover.png" alt="" />
      <h1>Спортивное питание</h1>
    </div>
    <v-container>
      <v-row>
        <v-col class="py-2" cols="12">
          <v-btn-toggle v-model="text" rounded="1" style="padding: 3px">
            <v-btn
              value="Все"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Все
            </v-btn>

            <v-btn
              value="Перед тренировкой"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Перед тренировкой
            </v-btn>

            <v-btn
              value="После тренировки"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              После тренировки
            </v-btn>

            <v-btn
              value="Минимум углеводов"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Минимум углеводов
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="text == 'Все'">
      <div v-if="nutritions.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in nutritions"
            :to="`/nutritions/${equipment.id}`"
            ><div class="equipment-card">
              <div class="equ-img">
                <img :src="equipment.img[0]" alt="" />
              </div>
              <div class="equ-price">
                <h3>{{ equipment.price }}</h3>
              </div>
              <div class="equ-title">
                <h4>{{ equipment.title }}</h4>
              </div>
              <div class="equ-adds">
                <div class="equ-cart">
                  <button
                    @click.prevent="addToCart(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getHeartButtonText(equipment) }}
                  </button>
                </div>
              </div>
            </div></router-link
          >
        </ul>
      </div>
    </div>

    <div v-if="text == 'Перед тренировкой'">
      <div v-if="befores.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in befores"
            :to="`/nutritions/${equipment.id}`"
            ><div class="equipment-card">
              <div class="equ-img">
                <img :src="equipment.img[0]" alt="" />
              </div>
              <div class="equ-price">
                <h3>{{ equipment.price }}</h3>
              </div>
              <div class="equ-title">
                <h4>{{ equipment.title }}</h4>
              </div>
              <div class="equ-adds">
                <div class="equ-cart">
                  <button
                    @click.prevent="addToCart(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getHeartButtonText(equipment) }}
                  </button>
                </div>
              </div>
            </div></router-link
          >
        </ul>
      </div>
    </div>

    <div v-if="text == 'После тренировки'">
      <div v-if="afters.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in afters"
            :to="`/nutritions/${equipment.id}`"
            ><div class="equipment-card">
              <div class="equ-img">
                <img :src="equipment.img[0]" alt="" />
              </div>
              <div class="equ-price">
                <h3>{{ equipment.price }}</h3>
              </div>
              <div class="equ-title">
                <h4>{{ equipment.title }}</h4>
              </div>
              <div class="equ-adds">
                <div class="equ-cart">
                  <button
                    @click.prevent="addToCart(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getHeartButtonText(equipment) }}
                  </button>
                </div>
              </div>
            </div></router-link
          >
        </ul>
      </div>
    </div>

    <div v-if="text == 'Минимум углеводов'">
      <div v-if="carbohydrates.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in carbohydrates"
            :to="`/nutritions/${equipment.id}`"
            ><div class="equipment-card">
              <div class="equ-img">
                <img :src="equipment.img[0]" alt="" />
              </div>
              <div class="equ-price">
                <h3>{{ equipment.price }}</h3>
              </div>
              <div class="equ-title">
                <h4>{{ equipment.title }}</h4>
              </div>
              <div class="equ-adds">
                <div class="equ-cart">
                  <button
                    @click.prevent="addToCart(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartNutritions.includes(equipment) }"
                  >
                    {{ getHeartButtonText(equipment) }}
                  </button>
                </div>
              </div>
            </div></router-link
          >
        </ul>
      </div>
    </div>
  </div>
</template>
