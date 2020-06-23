import { IRouterItem, GetAsyncComponent } from '@/common/core'
import LayoutDefault from '@/layout/default'
// const Loading = () => <div>这是loading</div>

const routes: IRouterItem[] = [
  {
    path: '/',
    children: [
      {
        path: '/home',
        exact: true,
        layout: LayoutDefault,
        component: GetAsyncComponent(() => import(/* webpackChunkName: "home" */ '@/pages/home')),
      },
      {
        path: '/about',
        exact: true,
        layout: LayoutDefault,
        component: GetAsyncComponent(() => import(/* webpackChunkName: "about" */ '@/pages/about')),
      },
      {
        path: '*',
        redirect: '/home',
      },
    ],
  },
  {
    path: '*',
    redirect: '/home',
  },
]
export default routes
