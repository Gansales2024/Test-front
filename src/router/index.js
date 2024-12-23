import { createRouter, createWebHistory } from 'vue-router'
import Page404 from "../views/Page404.vue";
import Test from "../views/Test.vue";
import {useAuthStore} from "../store/AuthStore.js";
import Main from "../views/Main.vue";
import Auth from "../views/Auth.vue";
import Users from "../views/Users.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
           path: '/login',
          name: 'Auth',
           component: Auth
         },
         {
             path: '/',
            name: 'Main',
             meta: { requiresAuth: true },
            component: Main
         },
        {
            path: '/users',
            name: 'Users',
            meta: { requiresAuth: true },
            component: Users
        },

        {
            path: '/test',
            component:Test,
            meta: { requiresAuth: true }

        },
        {
             path: '/:pathMatch(.*)*',
              redirect:{name:'NotFound'}
          },
           {
             path: '/404',
              name: 'NotFound',
             component: Page404,
         },
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!authStore.isUserAuthenticated) {
            next('/login'); // Перенаправление на страницу входа, если пользователь не авторизован
        } else {
            next(); // Разрешаем переход, если пользователь авторизован
        }
    } else if ((authStore.isUserAuthenticated) && to.path==='/login') { // если пользователь авторизован и переходит на страницу логина, перенаправляем на главную
        next('/');
    } else {
        next(); // Разрешаем переход, если маршрут не требует авторизации
    }
});

export default router
