import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index.ts'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index.vue')
      },
      {
        path: '/menu-create',
        name: 'menu-create',
        component: () => import('@/views/menu/create.vue')
      },
      {
        path: '/menu-edit/:id/edit',
        name: 'menu-edit',
        component: () => import('@/views/menu/edit.vue'),
        props: true
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index.vue')
      },
      {
        path: '/allocResource/:RoleId',
        name: 'allocResource',
        component: () => import('@/views/resource/allocResource.vue'),
        props: true
      },
      {
        path: '/Role',
        name: 'Role',
        component: () => import('@/views/role/index.vue')
      },
      {
        path: '/Courses',
        name: 'Courses',
        component: () => import('@/views/course/index.vue')
      },
      {
        path: '/alloc-menu/:RoleId/alloc',
        name: 'alloc-menu',
        component: () => import('@/views/role/components/AllocMenu.vue'),
        props: true
      },
      {
        path: '/Users',
        name: 'Users',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/Courses/new',
        name: 'CourseNew',
        component: () => import('@/views/course/create.vue')
      },
      {
        path: '/Courses/:courseId/edit',
        name: 'CourseEdit',
        component: () => import('@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/Courses/:courseId/sections',
        name: 'CourseSections',
        component: () => import('@/views/course/sections.vue'),
        props: true
      },
      {
        path: '/Courses/:courseId/video',
        name: 'CourseVideo',
        component: () => import('@/views/course/video.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router