<script setup lang="ts">
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useNutritionsStore } from "@/stores/nutrition";
const nutritionsStore = useNutritionsStore();
const { nutrition } = storeToRefs(nutritionsStore);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
onBeforeMount(() => {
  nutritionsStore.getNutritionById(props.id);
});
</script>

<template>
  <h1>{{ nutrition?.title }}</h1>
</template>
