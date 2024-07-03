<script setup lang="ts">
import { ref } from "vue";
import { useEquipmentsStore } from "@/stores/equipments";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useCartStore } from "@/stores/cart";
import type { Equipment } from "@/types/Equipment";
import { useFavoritesStore } from "@/stores/favorites";
const favStore = useFavoritesStore();
const { favItems } = storeToRefs(favStore);
const equipmentsStore = useEquipmentsStore();
const { equipments } = storeToRefs(equipmentsStore);
const cartStore = useCartStore();
const { cartEquipments } = storeToRefs(cartStore);
const text = ref("Все");

const dumbbells = ref(
  equipments.value.filter((equipment) => equipment.category === "dumbbell")
);
const weights = ref(
  equipments.value.filter((equipment) => equipment.category === "weight")
);
const bottles = ref(
  equipments.value.filter((equipment) => equipment.category === "bottles")
);

function addToCart(cartItem: Equipment) {
  const index = cartEquipments.value.findIndex((item) => item === cartItem);

  if (index !== -1) {
    cartEquipments.value.splice(index, 1);
  } else {
    cartEquipments.value.push(cartItem);
  }
}

function addToFav(favItem: Equipment) {
  const index = favItems.value.findIndex((item) => item === favItem);

  if (index !== -1) {
    favItems.value.splice(index, 1);
  } else {
    favItems.value.push(favItem);
  }
}

function getButtonText(item: Equipment) {
  if (cartEquipments.value.includes(item)) {
    return "Убрать из корзины";
  } else {
    return "В корзину";
  }
}

function getHeartButtonText(item: Equipment) {
  if (favItems.value.includes(item)) {
    return "♥";
  } else {
    return "♡";
  }
}

onBeforeMount(() => {
  equipmentsStore.fetchEquipments();
});
</script>
<template>
  <div class="equ">
    <div class="equ__main-text">
      <img src="@/assets/images/dumbbell-hover.png" alt="" />
      <h1>Оборудования</h1>
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
              value="Гантели"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Гантели
            </v-btn>

            <v-btn
              value="Гири"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Гири
            </v-btn>

            <v-btn
              value="Бутылки"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Бутылки
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="text == 'Все'">
      <div v-if="equipments.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in equipments"
            :to="`/equipments/${equipment.id}`"
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
                    :class="{ added: cartEquipments.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartEquipments.includes(equipment) }"
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

    <div v-if="text == 'Гантели'">
      <div v-if="dumbbells.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in dumbbells"
            :to="`/equipments/${equipment.id}`"
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
                    :class="{ added: cartEquipments.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartEquipments.includes(equipment) }"
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

    <div v-if="text == 'Гири'">
      <div v-if="weights.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in weights"
            :to="`/equipments/${equipment.id}`"
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
                    :class="{ added: cartEquipments.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartEquipments.includes(equipment) }"
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

    <div v-if="text == 'Бутылки'">
      <div v-if="bottles.length > 0">
        <ul class="equipments-list">
          <router-link
            tag="li"
            v-for="equipment in bottles"
            :to="`/equipments/${equipment.id}`"
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
                    :class="{ added: cartEquipments.includes(equipment) }"
                  >
                    {{ getButtonText(equipment) }}
                  </button>
                </div>
                <div class="equ-fav">
                  <button
                    @click.prevent="addToFav(equipment)"
                    :class="{ added: cartEquipments.includes(equipment) }"
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
