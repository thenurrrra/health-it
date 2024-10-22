<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useEquipmentsStore } from "@/stores/equipments";
import { useNutritionsStore } from "@/stores/nutrition";
import { useUsersStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const equipmentsStore = useEquipmentsStore();
const nutritionsStore = useNutritionsStore();
const usersStore = useUsersStore();
const { equipments } = storeToRefs(equipmentsStore);
const { nutritions } = storeToRefs(nutritionsStore);
const { users } = storeToRefs(usersStore);
const text = ref("Товары");
function generateRandomId() {
  return Math.floor(Math.random() * 1000000);
}

//
const titleEqu = ref("");
const descEqu = ref("");
const priceEqu = ref("");
const imgEqu = ref("");
const categoryEqu = ref("");

//
const titleNutr = ref("");
const descNutr = ref("");
const priceNutr = ref("");
const imgNutr = ref("");
const categoryNutr = ref("");

async function createEqu() {
  try {
    console.log("Price before submission:", priceEqu.value);
    if (!priceEqu.value) {
      throw new Error("Price is not defined");
    }
    console.log("Price before submission:", priceEqu.value);
    await equipmentsStore.createEquipment({
      id: String(generateRandomId()),
      title: titleEqu.value,
      desc: descEqu.value,
      price: priceEqu.value + "₸",
      img: [imgEqu.value],
      category: categoryEqu.value,
    });

    titleEqu.value = "";
    descEqu.value = "";
    priceEqu.value = "";
    imgEqu.value = "";
    categoryEqu.value = "dumbbell";
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
  }
}

async function createNutr() {
  try {
    console.log("Price before submission:", priceNutr.value);
    if (!priceNutr.value) {
      throw new Error("Price is not defined");
    }
    console.log("Price before submission:", priceNutr.value);
    await nutritionsStore.createNutrition({
      id: String(generateRandomId()),
      title: titleNutr.value,
      desc: descNutr.value,
      price: priceNutr.value + "₸",
      img: [imgNutr.value],
      category: categoryNutr.value,
    });

    titleNutr.value = "";
    descNutr.value = "";
    priceNutr.value = "";
    imgNutr.value = "";
    categoryNutr.value = "before";
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
  }
}

async function deleteEquipment(equipmentId: string) {
  await equipmentsStore.deleteEquipment(equipmentId);
}

async function deleteNutrition(nutritionId: string) {
  await nutritionsStore.deleteNutrition(nutritionId);
}

onBeforeMount(() => {
  equipmentsStore.fetchEquipments();
  nutritionsStore.fetchNutritions();
  usersStore.fetchUsers();
});
</script>
<template>
  <div class="admin">
    <div class="admin__main-text">
      <img src="@/assets/images/admin-hover.png" alt="" />
      <h1>Админская панель</h1>
    </div>
    <v-container>
      <v-row>
        <v-col class="py-2" cols="12">
          <v-btn-toggle v-model="text" rounded="1" style="padding: 3px">
            <v-btn
              value="Товары"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Товары
            </v-btn>

            <v-btn
              value="Пользователи"
              color="red-darken-4"
              class="text-body-2 font-weight-bold"
            >
              Пользователи
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="text == 'Товары'" class="admin__all-products">
      <div class="create-equipment">
        <div class="create__main-text">
          <img src="@/assets/images/add.png" alt="" />
          <h1>Добавить товар</h1>
        </div>
        <div class="forms">
          <div class="equipment__create">
            <h2>Оборудование</h2>
            <form @submit.prevent="createEqu()">
              <input
                type="text"
                placeholder="Название"
                v-model="titleEqu"
              /><br />
              <input
                type="text"
                placeholder="Описание"
                v-model="descEqu"
              /><br />
              <input
                type="text"
                placeholder="Цена"
                min="1"
                v-model="priceEqu"
              /><br />
              <input
                type="text"
                placeholder="Ссылка на изображение товара"
                v-model="imgEqu"
              />
              <br />
              <p class="category-text">Категория</p>
              <select
                name="categories"
                id="categories"
                v-model="categoryEqu"
                class="select-category"
              >
                <option value="dumbbell">Гантель</option>
                <option value="weight">Гиря</option>
                <option value="bottles">Бутылка</option>
              </select>
              <br />
              <button type="submit">Готово</button>
            </form>
          </div>
          <div class="nutrition__create">
            <h2>Питание</h2>
            <form @submit.prevent="createNutr()">
              <input
                type="text"
                placeholder="Название"
                v-model="titleNutr"
              /><br />
              <input
                type="text"
                placeholder="Описание"
                v-model="descNutr"
              /><br />
              <input
                type="text"
                placeholder="Цена"
                min="1"
                v-model="priceNutr"
              /><br />
              <input
                type="text"
                placeholder="Ссылка на изображение товара"
                v-model="imgNutr"
              />
              <br />
              <p class="category-text">Категория</p>
              <select
                name="categories"
                id="categories"
                v-model="categoryNutr"
                class="select-category"
              >
                <option value="before">Переж тренировкой</option>
                <option value="after">После Тренировки</option>
                <option value="carbohydrates">Минимум углеводов</option>
              </select>
              <br />
              <button type="submit">Готово</button>
            </form>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-around">
        <div v-if="equipments.length > 0" class="products-list">
          <h2>Оборудования</h2>
          <ul class="equipments-list">
            <div v-for="equipment in equipments">
              <div class="equipment-card">
                <div style="display: flex; align-items: center; gap: 20px">
                  <div class="equ-img">
                    <img :src="equipment.img[0]" alt="" />
                  </div>
                  <div>
                    <div class="equ-price">
                      <h3>{{ equipment.price }}</h3>
                    </div>
                    <div class="equ-title">
                      <h4>{{ equipment.title }}</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <button>
                    <router-link :to="`/equipment-update/${equipment.id}`"
                      >✎</router-link
                    ></button
                  ><br />
                  <button @click.prevent="deleteEquipment(equipment.id)">
                    🗑
                  </button>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div v-if="nutritions.length > 0" class="products-list">
          <h2>Питание</h2>
          <ul class="equipments-list">
            <router-link
              tag="li"
              v-for="equipment in nutritions"
              :to="`/nutritions/${equipment.id}`"
              ><div class="equipment-card">
                <div style="display: flex; align-items: center; gap: 20px">
                  <div class="equ-img">
                    <img :src="equipment.img[0]" alt="" />
                  </div>
                  <div>
                    <div class="equ-price">
                      <h3>{{ equipment.price }}</h3>
                    </div>
                    <div class="equ-title">
                      <h4>{{ equipment.title }}</h4>
                    </div>
                  </div>
                </div>
                <div>
                  <button>
                    <router-link :to="`/nutrition-update/${equipment.id}`"
                      >✎</router-link
                    ></button
                  ><br />
                  <button @click.prevent="deleteNutrition(equipment.id)">
                    🗑
                  </button>
                </div>
              </div></router-link
            >
          </ul>
        </div>
      </div>
    </div>

    <div v-if="text == 'Пользователи'">
      <div v-if="users.length > 0">
        <div v-for="user in users">
          <div class="user-card">
            <div class="user-card__inner">
              <img :src="user.avatar" alt="" />
              <p><span>name</span> {{ user.name }}</p>
              <p><span>email</span> {{ user.email }}</p>
              <p><span>pwd</span> {{ user.password }}</p>
              <p><span>role</span> {{ user.role }}</p>
              <p><span>creation time</span> {{ user.creationAt }}</p>
              <p><span>updated time</span> {{ user.updatedAt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
