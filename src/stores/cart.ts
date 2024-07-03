import type { Equipment } from "@/types/Equipment";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Nutrition } from "@/types/Nutrition";

export const useCartStore = defineStore("cart", () => {
  const cartEquipments = ref<Equipment[]>([]);
  const cartNutritions = ref<Nutrition[]>([]);

  function removeEquipmentFromCart(product: Equipment, products: Equipment[]) {
    cartEquipments.value = products.filter((item) => item !== product);
  }

  function removeNutritionFromCart(product: Equipment, products: Equipment[]) {
    cartNutritions.value = products.filter((item) => item !== product);
  }

  return {
    cartEquipments,
    cartNutritions,
    removeEquipmentFromCart,
    removeNutritionFromCart,
  };
});
