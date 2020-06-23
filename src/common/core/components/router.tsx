import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'

const Loading = () => <div>这是loading</div>

export const GetAsyncComponent = (component: any) =>
  loadable(component, {
    fallback: <Loading />,
  })

export interface IRouterItem extends RouteProps {
  path: string
  // key: string
  redirect?: string
  component?: any
  exact?: boolean
  layout?: any
  children?: IRouterItem[]
}
export interface ILayoutRouterProps {
  routes: IRouterItem[]
  formatProps: (props: any) => any
}

const renderRoute = ({ routes, formatProps, ...props }: ILayoutRouterProps) => {
  if (!routes?.length) return

  return routes.map((route, key) => {
    const { children, layout, component: Component, ...item } = route
    // 拦截路由重定向
    if (item.hasOwnProperty('redirect')) {
      return <Redirect key={key} to={{ pathname: item.redirect }} />
    }
    if (children) {
      return (
        <Route key={'route' + key} {...item}>
          {renderRoute({ routes: children, ...props, formatProps })}
        </Route>
      )
    } else {
      return (
        <Route
          key={'route' + key}
          {...item}
          render={routerProps => {
            const Layout = layout ? layout : <></>
            /* 合并Props传参 **/
            let _props = Object.assign({}, routerProps, props, { route })
            _props = formatProps ? formatProps(_props) : _props
            return (
              <Layout {..._props}>
                <Component {..._props} />
              </Layout>
            )
          }}></Route>
      )
    }
  })
}
export const RouterView: React.FC<ILayoutRouterProps> = props => {
  return (
    <Router>
      <Switch>{renderRoute(props)}</Switch>
    </Router>
  )
}
RouterView.propTypes = {
  routes: PropTypes.array,
}
