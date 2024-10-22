import type { Equipment } from "@/types/Equipment";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
// const router = useRouter();
export const useEquipmentsStore = defineStore("equipment", () => {
  const equipments = ref<Equipment[]>([]);
  const equipment = ref<Equipment | null>(null);

  async function fetchEquipments() {
    try {
      const { data } = await axios.get("http://localhost:3000/equipments");
      equipments.value = data;
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  }

  async function getEquipmentById(id: string) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/equipments/${id}`
      );
      equipment.value = data;
    } catch (error) {
      console.error(`Error fetching equipment with id ${id}:`, error);
    }
  }

  //CRUD
  async function createEquipment(newEquipment: Equipment) {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/equipments",
        newEquipment
      );
      equipments.value.push(data);
    } catch (error) {
      console.error("Error creating equipment:", error);
    }
  }

  async function updateEquipment(id: string, updatedData: object) {
    try {
      await axios.patch(`http://localhost:3000/equipments/${id}`, updatedData);
    } catch (error) {
      console.error("Не удалось обновить оборудование:", error);
    }
  }

  async function deleteEquipment(id: string) {
    try {
      await axios.delete(`http://localhost:3000/equipments/${id}`);
      equipments.value = equipments.value.filter(
        (equipment) => equipment.id !== id
      );
    } catch (error) {
      console.error("Failed to delete equipment:", error);
    }
  }

  return {
    equipment,
    equipments,
    fetchEquipments,
    getEquipmentById,
    createEquipment,
    deleteEquipment,
    updateEquipment,
  };
});
