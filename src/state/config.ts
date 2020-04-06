import createMatcher from '@captaincodeman/router'
import { routingPluginFactory } from '@captaincodeman/rdx-model'
import * as models from './models'
import { html, TemplateResult } from 'lit-html'

export interface Route {
  name: string
  view: TemplateResult
}

interface Routes { [path: string]: Route }

const routes: Routes = {
  '/': {
    name: 'home',
    view: html`<view-home></view-home>`
  },
  '/about': {
    name: 'about',
    view: html`<view-about></view-about>`,
  },
  '/account': {
    name: 'account',
    view: html`<view-account></view-account>`,
  },
  '/signin': {
    name: 'signin',
    view: html`<view-signin></view-signin>`,
  },
  '/*': {
    name: '404',
    view: html`<view-404></view-404>`,
  },
}

const matcher = createMatcher(routes)
const routing = routingPluginFactory(matcher)

export const config = { models, plugins: { routing } }
