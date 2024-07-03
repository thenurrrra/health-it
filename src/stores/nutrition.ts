import type { Nutrition } from "@/types/Nutrition";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNutritionsStore = defineStore("nutrition", () => {
  const nutritions = ref<Nutrition[]>([]);
  const nutrition = ref<Nutrition | null>(null);

  async function fetchNutritions() {
    const { data } = await axios("http://localhost:3000/nutritions");
    nutritions.value = data;
  }

  async function getNutritionById(id: string) {
    try {
      const { data } = await axios.get<Nutrition>(
        `http://localhost:3000/nutritions/${id}`
      );
      nutrition.value = data;
    } catch (error) {
      console.error(`Failed to fetch nutrition with id ${id}:`, error);
    }
  }

  return {
    nutrition,
    nutritions,
    fetchNutritions,
    getNutritionById,
  };
});
