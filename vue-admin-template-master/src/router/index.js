import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    // 个人信息主页
    path: '/person',
    component: Layout,
    redirect: '/person',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/person/index'),
      meta: { title: '个人中心', icon: 'user' }
    }],
    // 隐藏路由
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: '首页' }
    }],
    // hidden: true
  },

  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/admin',
    name: 'sysManage',
    meta: { title: '系统管理', icon: '系统' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/sys/admin'),
        meta: { title: '管理员', icon: 'admin' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/sys/user'),
        meta: {title: '用户管理', icon: 'user'}
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/sys/role'),
        meta: {title: '角色管理', icon: '角色组'}
      }
    ]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/book',
    name: 'bookManage',
    meta: { title: '书籍管理', icon: '资料库' },
    children: [
      {
        path: 'book',
        name: 'Book',
        component: () => import('@/views/book/book'),
        meta: { title: '书籍', icon: '书籍' }
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/book/tags'),
        meta: {title: '标签', icon: '标签'}
      },
    ]
  },

  {
    path: '/safety',
    component: Layout,
    redirect: '/safety/safety',
    name: 'safetyManage',
    meta: { title: '系统安全', icon: '安全中心' },
    children: [
      {
        path: 'safety',
        name: 'Safety',
        component: () => import('@/views/safety/safety'),
        meta: { title: '安全管理', icon: '安全' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/safety/log'),
        meta: {title: '系统日志', icon: '系统日志'}
      },
    ]
  },

  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/notice',
    name: 'noticeManage',
    meta: { title: '系统通知', icon: '消息通知' },
    children: [
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/notice/notice'),
        meta: { title: '消息通知', icon: '通知' }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/notice/feedback'),
        meta: {title: '用户反馈', icon: '_意见反馈'}
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
