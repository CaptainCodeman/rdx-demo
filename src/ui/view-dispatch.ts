import { html, customElement, css } from 'lit-element'
import { Connected } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from '../state'

declare global {
  interface HTMLElementTagNameMap {
    'view-dispatch': ViewDispatchElement
  }
}

@customElement('view-dispatch')
export class ViewDispatchElement extends Connected {


  dispatchExample(_e: Event) {
    dispatch.mymodel.takeValue(25);
  }
  render() {
    return html`<button @click=${this.dispatchExample}>Click me to ask back end to square 25</button>
     then click <a href="/subscribe">here</a> to view result;
    
    `
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        button {
          padding: 1em;
        }
      `,
    ]
  }
}
