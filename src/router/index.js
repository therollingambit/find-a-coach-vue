import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "../views/coaches/CoachDetail.vue";
import CoachesList from "../views/coaches/CoachesList.vue";
import CoachRegistration from "../views/coaches/CoachRegistration.vue";
import ContactCoach from "../views/requests/ContactCoach.vue";
import RequestsReceived from "../views/requests/RequestsReceived.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true, // coz of :id
      children: [{ path: "contact", component: ContactCoach }],
    },
    {
      path: "/register",
      component: CoachRegistration,
    },
    {
      path: "/requests",
      component: RequestsReceived,
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});

export default router;
