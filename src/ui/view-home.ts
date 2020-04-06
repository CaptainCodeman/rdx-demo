import { customElement, html, LitElement } from 'lit-element'
import { sharedStyles } from './shared-styles'

declare global {
  interface HTMLElementTagNameMap {
    'view-home': ViewHomeElement
  }
}

@customElement('view-home')
export class ViewHomeElement extends LitElement {

  render() {
    return html`
      <h1>Welcome</h1>
      <p>Not much here right now &hellip;</p>
    `
  }

  static get styles() {
    return [
      sharedStyles,
    ]
  }
}
