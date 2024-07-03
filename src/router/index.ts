import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView/MainView.vue";
import CartView from "@/views/CartView/CartView.vue";
import EquipmentsView from "@/views/EquipmentsView/EquipmentsView.vue";
import NutritionsView from "@/views/NutritionsView/NutritionsView.vue";
import EquipmentView from "@/views/EquipmentView/EquipmentView.vue";
import FavoritesView from "@/views/FavoritesView/FavoritesView.vue";
import ProfileView from "@/views/ProfileView/ProfileView.vue";
import LoginView from "@/views/LoginView/LoginView.vue";
import NutritionView from "@/views/NutritionView/NutritionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/equipments",
      name: "equipments",
      component: EquipmentsView,
    },
    {
      path: "/nutritions",
      name: "nutritions",
      component: NutritionsView,
    },
    {
      path: "/equipments/:id", // Уникальный путь для EquipmentView
      name: "equipment",
      component: EquipmentView,
      props: true,
    },
    {
      path: "/nutritions/:id", // Уникальный путь для NutritionView
      name: "nutrition",
      component: NutritionView,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("access_token")) {
    next("/");
  } else {
    next();
  }
});

export default router;
