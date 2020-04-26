import createMatcher from '@captaincodeman/router'
import { routingPluginFactory } from '@captaincodeman/rdx-model'
import * as models from './models'

const routes = {
  '/': 'home',
  '/about': 'about',
  '/account': 'account',
  '/dispatch': 'dispatch',
  '/subscribe': 'subscribe',
  '/signin': 'signin',
  '/*': '404',
}

const matcher = createMatcher(routes)
const routing = routingPluginFactory(matcher)

export const config = { models, plugins: { routing } }
