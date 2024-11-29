import { createRouter, createWebHistory } from 'vue-router'
import Page404 from "../views/Page404.vue";
import Test from "../views/Test.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
           path: '/login',
          name: 'Auth',
           component: Test
         },
        //  {
        //      path: '/',
        //     name: 'Main',
        //     meta: {auth:true},
        //     component: Main
        //  },

        {
            path: '/test',
            component:Test
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
    //  let isLog = localStorage.getItem('access_token')

    //  if(to.meta.auth && !Boolean(isLog)){
    //     next({name: "Auth"})
    // } else if (to.name === "Auth" && Boolean(isLog)) {
    //     next({name: "Main"})
    //     next()
    // } else {
    //     next()
    // }
next()
})
export default router
