import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Dashboard from '../views/Dashboard.vue'
import CreateProduct from '../views/CreateProduct.vue'
import ProductList from '../views/ProductList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sign-up',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/create-product',
    name: 'CreateProduct',
    component: CreateProduct,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/edit_product/:id?',
    name: 'EditProduct',
    component: CreateProduct,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList,
    meta: {
        requireLogin: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !localStorage.getItem('token')) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})
export default router
