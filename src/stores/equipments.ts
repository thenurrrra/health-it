import type { Equipment } from "@/types/Equipment";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEquipmentsStore = defineStore("equipment", () => {
  const equipments = ref<Equipment[]>([]);
  const equipment = ref<Equipment | null>(null);

  async function fetchEquipments() {
    const { data } = await axios("http://localhost:3000/equipments");
    equipments.value = data;
  }

  async function getEquipmentById(id: string) {
    const { data } = await axios(`http://localhost:3000/equipments/${id}`);
    equipment.value = data;
  }

  return {
    equipment,
    equipments,
    fetchEquipments,
    getEquipmentById,
  };
});
