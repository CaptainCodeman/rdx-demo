import { customElement, html, LitElement } from 'lit-element'
import { sharedStyles } from './shared-styles'

declare global {
  interface HTMLElementTagNameMap {
    'view-404': View404Element
  }
}

@customElement('view-404')
export class View404Element extends LitElement {

  render() {
    return html`404: Page Not found`
  }

  static get styles() {
    return [
      sharedStyles,
    ]
  }
}
