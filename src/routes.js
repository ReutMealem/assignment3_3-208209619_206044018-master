import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipe",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/recipe/:recipe_id",
    name: "recipe_info",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("./pages/PersonalPage"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/createPersonalRecipe",
    name: "createPersonalRecipe",
    component: () => import("./pages/CreatePersonalRecipe"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
