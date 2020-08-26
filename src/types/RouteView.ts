import { RouteConfig } from 'vue-router'
export type MyRouteConfig = RouteConfig & {
  parent?: Array<RouteConfig>,
}