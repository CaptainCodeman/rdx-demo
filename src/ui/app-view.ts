import { customElement, property } from 'lit-element'
import { Connected, State, Route, RouteSelectors } from './connected'
import { sharedStyles } from './shared-styles'

import './view-404'
import './view-about'
import './view-account'
import './view-home'
import './view-signin'

declare global {
  interface HTMLElementTagNameMap {
    'app-view': AppViewElement
  }
}

@customElement('app-view')
export class AppViewElement extends Connected {
  @property({ type: Object })
  route: Route

  mapState(state: State) {
    return {
      route: RouteSelectors.route(state),
    }
  }

  render() {
    return this.route.view
  }

  static get styles() {
    return [
      sharedStyles,
    ]
  }
}

