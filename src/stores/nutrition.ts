import type { Nutrition } from "@/types/Nutrition";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNutritionsStore = defineStore("nutrition", () => {
  const nutritions = ref<Nutrition[]>([]);
  const nutrition = ref<Nutrition | null>(null);

  async function fetchNutritions() {
    try {
      const { data } = await axios.get("http://localhost:3000/nutritions");
      nutritions.value = data;
    } catch (error) {
      console.error("Error fetching nutritions:", error);
      // Handle error as needed
    }
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

  //CRUD
  async function createNutrition(newNutrition: Nutrition) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/nutritions",
        newNutrition
      );
      nutritions.value.push(data);
    } catch (error) {
      console.error("Error creating nutrition:", error);
      // Handle error as needed
    }
  }

  async function deleteNutrition(id: string) {
    try {
      await axios.delete(`http://localhost:3000/nutritions/${id}`);
      nutritions.value = nutritions.value.filter(
        (nutrition) => nutrition.id !== id
      );
    } catch (error) {
      console.error("Failed to delete equipment:", error);
    }
  }

  return {
    nutrition,
    nutritions,
    fetchNutritions,
    getNutritionById,
    createNutrition,
    deleteNutrition,
  };
});
