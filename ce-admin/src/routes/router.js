import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import middleware from './middleware'
import store from '../store'

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

// Overwrie router push function to handle NavigationDuplicated error
if (router.push) {
  const temp = router.push
  router.push = function (...args) {
    return new Promise((resolve, reject) => {
      if (args.length == 1) {
        // On Complete handler
        args.push(() => { })
      }
      if (args.length == 2) {
        // On Abort handler
        args.push((error) => {
          if (error && error.name != 'NavigationDuplicated') {
            reject(error)
          }
        })
      }
      resolve(temp.call(this, ...args))
    })
  }
}

middleware(router, store)

// beforeResolve hook
router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    return
  }

  next()
})
export default router
