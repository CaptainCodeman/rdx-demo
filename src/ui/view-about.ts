import { customElement, html, LitElement } from 'lit-element'
import { sharedStyles } from './shared-styles'

declare global {
  interface HTMLElementTagNameMap {
    'view-about': ViewAboutElement
  }
}

@customElement('view-about')
export class ViewAboutElement extends LitElement {

  render() {
    return html`
      <h1>About</h1>
      <p>This is a demo app to show development using:</p>
      <ul>
        <li><a href="https://github.com/CaptainCodeman/rdx">rdx</a> for state management</li>
        <li><a href="https://github.com/CaptainCodeman/js-router">js-router</a> for tiny client-side routing</li>
        <li><a href="https://firebase.google.com/docs/firestore">cloud firestore</a> for live NoSQL data</li>
        <li><a href="https://firebase.google.com/docs/auth">firebase auth</a> for authentication</li>
        <li><a href="https://mwc-demos.glitch.me/demos/index.html">material web components</a> for UI</li>
        <li><a href="https://rollupjs.org/guide/en/">rollup</a> for bundling</li>
      </ul>
      <p>See <a href="https://github.com/CaptainCodeman/rdx-demo">source code</a></p>
    `
  }

  static get styles() {
    return [
      sharedStyles,
    ]
  }
}
