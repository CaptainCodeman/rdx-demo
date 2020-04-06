import { property, html, customElement, css } from 'lit-element'
import { Connected, User, State, AuthSelectors } from './connected'
import { sharedStyles } from './shared-styles'
import { dispatch } from '../state'

import '@material/mwc-button'

declare global {
  interface HTMLElementTagNameMap {
    'view-account': ViewAccountElement
  }
}

@customElement('view-account')
export class ViewAccountElement extends Connected {
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

  signOut(_e: Event) {
    dispatch.auth.signout()
  }

  render() {
    return this.authenticated
      ? html`
          <h1>Your Account</h1>
          <h2>${this.user.displayName}</h2>
          <p>${this.user.email}</p>
          <mwc-button raised @click=${this.signOut}>
            Sign out
          </mwc-button>
          <h3>Raw Auth Data:</h3>
          <pre>${JSON.stringify(this.user, null, '  ')}</pre>
        `
      : html`
          <h1>Your Account</h1>
          <p>You need to <a href="/signin">Sign-in</a> to use this app.</p>
        `
  }

  static get styles() {
    return [
      sharedStyles,
      css`
        mwc-button {
          --mdc-theme-on-primary: #ffffff;
          --mdc-theme-primary: #f04141;
        }
      `
    ]
  }
}
