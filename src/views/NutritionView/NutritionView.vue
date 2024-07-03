<script setup lang="ts">
import { useNutritionsStore } from "@/stores/nutrition";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount } from "vue";
const nutritionsStore = useNutritionsStore();
const { nutrition } = storeToRefs(nutritionsStore);
const { nutritions } = storeToRefs(nutritionsStore);

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
  <div class="equipment">
    <div class="equipment__inner">
      <div class="equ-img">
        <img :src="nutrition?.img[0]" alt="" />
      </div>
      <div class="equ-description">
        <h2>{{ nutrition?.title }}</h2>
        <h1>{{ nutrition?.price }}</h1>
        <p>{{ nutrition?.desc }}</p>
      </div>
    </div>
  </div>
</template>
