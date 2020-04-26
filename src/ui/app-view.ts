import { customElement, property, html } from 'lit-element'
import { Connected, State, RouteSelectors } from './connected'
import { sharedStyles } from './shared-styles'

import './view-404'
import './view-about'
import './view-account'
import './view-subscribe'
import './view-dispatch'
import './view-home'
import './view-signin'

declare global {
  interface HTMLElementTagNameMap {
    'app-view': AppViewElement
  }
}

@customElement('app-view')
export class AppViewElement extends Connected {
  @property({ type: String })
  view: string

  mapState(state: State) {
    return {
      view: RouteSelectors.view(state),
    }
  }

  render() {
    switch (this.view) {
      case 'home':
        return html `<view-home></view-home>`
        case 'about':
          return html `<view-about></view-about>`
      case 'dispatch':
        return html `<view-dispatch></view-dispatch>`
      case 'subscribe':
        return html `<view-subscribe></view-subscribe>`
      case 'account':
        return html `<view-account></view-account>`
      case 'signin':
        return html `<view-signin></view-signin>`
      case '404':
        return html `<view-404></view-404>`
      default:
        return html `<view-404></view-404>`
      }
  }

  static get styles() {
    return [
      sharedStyles,
    ]
  }
}

