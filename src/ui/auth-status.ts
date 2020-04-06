import { property, html, customElement, css } from 'lit-element'
import { Connected, User, State, AuthSelectors } from './connected'
import { sharedStyles } from './shared-styles'

declare global {
  interface HTMLElementTagNameMap {
    'auth-status': AuthStatusElement
  }
}

@customElement('auth-status')
export class AuthStatusElement extends Connected {
  @property({ type: Boolean })
  statusKnown: boolean

  @property({ type: Boolean })
  authenticated: boolean

  @property({ type: Object })
  user: User

  mapState(state: State) {
    return {
      statusKnown: AuthSelectors.statusKnown(state),
      authenticated: AuthSelectors.authenticated(state),
      user: AuthSelectors.user(state),
    }
  }

  shouldUpdate() {
    return this.statusKnown
  }

  render() {
    return this.authenticated
      ? html`
          <a href="/account"><img src=${this.user.photoURL!}></a>
          <div>
            <h2>${this.user.displayName}</h2>
            <p>${this.user.email}</p>
          </div>
        `
      : html`
          <a href="/signin">
            <svg viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </a>
          <div>
            <h2>Visitor</h2>
            <p>Sign-in to use app &hellip;</p>
          </div>`
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          width: 255px;
          height: 56px;
          padding: 3px;
          background-color: #f7f7f7;
          display: flex;
          box-sizing: border-box;
          contain: strict;
        }

        img, svg {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          color: #666;
        }

        svg path {
          fill: #666;
        }

        h2 {
          font-size: 18px;
          line-height: 18px;
          font-weight: normal;
          margin: 8px 0 6px 0;
          color: #333;
        }

        p {
          font-size: 12px;
          line-height: 12px;
          margin: 6px 0;
          color: #999;
        }

        div {
          overflow: hidden;
        }

        h2, p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        @media (min-width: 600px) {
          :host {
            height: 64px;
            padding: 8px;
          }
        }
      `,
    ]
  }
}
