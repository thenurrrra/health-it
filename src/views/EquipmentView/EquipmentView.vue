<script setup lang="ts">
import { useEquipmentsStore } from "@/stores/equipments";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount } from "vue";
const equipmentStore = useEquipmentsStore();
const { equipments } = storeToRefs(equipmentStore);
const { equipment } = storeToRefs(equipmentStore);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

onBeforeMount(() => {
  equipmentStore.getEquipmentById(props.id);
});
</script>
<template>
  <div class="equipment">
    <div class="equipment__inner">
      <div class="equ-img">
        <v-carousel
          style="width: 400px"
          show-arrows="hover"
          hide-delimiters
          class="rounded-xl"
        >
          <v-carousel-item v-for="(slide, i) in equipment?.img" :key="i">
            <v-sheet height="100%">
              <div class="d-flex fill-height justify-center align-center">
                <img :src="slide" alt="" />
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="equ-description">
        <h2>{{ equipment?.title }}</h2>
        <h1>{{ equipment?.price }}</h1>
        <p>{{ equipment?.desc }}</p>
      </div>
    </div>
  </div>
</template>
