import type { Equipment } from "@/types/Equipment";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favItems = ref<Equipment[]>([]);
  const favItem = ref<Equipment | null>(null);

  function addToFav(favItem: Equipment) {
    favItems.value.push(favItem);
  }

  function removeFav(product: Equipment, products: Equipment[]) {
    favItems.value = products.filter((item) => item !== product);
  }

  return { favItems, addToFav, removeFav };
});
