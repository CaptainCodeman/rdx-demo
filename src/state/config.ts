import createMatcher from '@captaincodeman/router'
import { routingPluginFactory } from '@captaincodeman/rdx'
import * as models from './models'

const routes = {
  '/': 'home',
  '/about': 'about',
  '/account': 'account',
  '/signin': 'signin',
  '/*': '404',
}

const matcher = createMatcher(routes)
const routing = routingPluginFactory(matcher)

export const config = { models, plugins: { routing } }
