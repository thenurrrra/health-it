<script setup lang="ts">
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useEquipmentsStore } from "@/stores/equipments";
const equipmentStore = useEquipmentsStore();
const router = useRouter();
const { equipment } = storeToRefs(equipmentStore);
const newTitle = ref("");
const newDesc = ref("");
const newPrice = ref("");
const newImage = ref("");
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

function updateEqu() {
  equipmentStore.updateEquipment(props.id, {
    title: newTitle.value,
    desc: newDesc.value,
    price: newPrice.value,
    img: [newImage.value],
  });
  router.back();
}

onBeforeMount(() => {
  equipmentStore.getEquipmentById(props.id);
});
</script>

<template>
  <div class="update">
    <form @submit.prevent="updateEqu">
      <div class="update__main-text">
        <h1>Товар №{{ equipment?.id }}</h1>
      </div>
      <div class="update__inner">
        <div class="update-item">
          <h3>Название</h3>
          <h4>{{ equipment?.title }}</h4>
          <input type="text" placeholder="Новое название" v-model="newTitle" />
        </div>
        <div class="update-item">
          <h3>Описание</h3>
          <h4>{{ equipment?.desc }}</h4>
          <input type="text" placeholder="Новое описание" v-model="newDesc" />
        </div>
        <div class="update-item">
          <h3>Цена</h3>
          <h4>{{ equipment?.price }}</h4>
          <input type="text" placeholder="Новая цена" v-model="newPrice" />
        </div>
        <div class="update-image">
          <h3>Картинка</h3>
          <img :src="equipment?.img[0]" alt="" /><br />
          <input type="text" placeholder="Новая картинка" v-model="newImage" />
        </div>
      </div>
      <div class="update-btn">
        <button type="submit">Изменить</button>
      </div>
    </form>
  </div>
</template>
