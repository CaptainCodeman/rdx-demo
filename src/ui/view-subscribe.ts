import { property, html, customElement, css } from 'lit-element'
import { Connected, State, MyModelSelectors } from './connected'
import { sharedStyles } from './shared-styles'

declare global {
  interface HTMLElementTagNameMap {
    'view-subscribe': ViewSubscribeElement
  }
}

@customElement('view-subscribe')
export class ViewSubscribeElement extends Connected {
  @property({ type: String })
  myprop: ""

  mapState(state: State) {
    return {
      myprop: MyModelSelectors.squaredValue(state),
    }
  }

  render() {
    return html `<p>From the dispatch Web Component: ${this.myprop}</p>`
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        p {
          font-size: 12px;
        }
      `,
    ]
  }
}
