import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    component: () => import('@/views/LoginView.vue')
  },

  {
    path: '/cadastro',
    component: () => import('@/views/CadastroView.vue')
  },

  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { requerAutenticacao: true}
      },
      {
        path: 'fotos',
        component: () => import('@/views/FotosView.vue'),
        meta: { requerAutenticacao: true}  
      },
      {
        path: 'sobre',
        component: () => import('@/views/SobreView.vue'),
        meta: { requerAutenticacao: true}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const usuarioLogado = localStorage.getItem('usuarioLogado') === 'true'

  if (to.meta.requerAutenticacao && !usuarioLogado) {
    next('/login') 
  } else {
    next() 
  }
})

export default router