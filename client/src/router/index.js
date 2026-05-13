import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
    },
    {
        path: '/discover',
        name: 'discover',
        component: () => import('../views/DiscoverView.vue'),
    },
    {
        path: '/actions',
        name: 'actions',
        component: () => import('../views/ActionsView.vue'),
    },
    {
        path: '/events',
        name: 'events',
        component: () => import('../views/EventsView.vue'),
    },
    {
        path: '/volunteer',
        name: 'volunteer',
        component: () => import('../views/VolunteeringView.vue'),
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue'),
    },
    {
        path: '/identity',
        name: 'identity',
        component: () => import('../views/IdentityView.vue'),
    },
    {
        path: '/solidarity',
        name: 'solidarity',
        component: () => import('../views/SolidarityView.vue'),
    },
    {
        path: '/excellence',
        name: 'excellence',
        component: () => import('../views/ExcellenceView.vue'),
    },
    {
        path: '/admin/login',
        name: 'admin-login',
        component: () => import('../views/AdminLogin.vue'),
    },
    {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: () => import('../views/AdminDashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('admin_token')) {
                next('/admin/login');
            } else {
                next();
            }
        },
    },
    {
        path: '/admin/chat',
        name: 'admin-chat',
        component: () => import('../views/AdminChatView.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('admin_token')) {
                next('/admin/login');
            } else {
                next();
            }
        },
    },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    },
})

export default router
